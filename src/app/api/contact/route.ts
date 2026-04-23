import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captcha?: number;
  challenge?: { a: number; b: number; answer: number };
};

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "hello@fileninja.cloud";

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message, captcha, challenge } = body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  // Captcha check
  if (
    !challenge ||
    typeof captcha !== "number" ||
    captcha !== challenge.a + challenge.b ||
    captcha !== challenge.answer
  ) {
    return NextResponse.json(
      { error: "Captcha verification failed." },
      { status: 400 }
    );
  }

  // Length guards
  if (message.length > 5000 || subject.length > 200 || name.length > 120) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  // Always log so the operator has a permanent record of the inbound message.
  console.log("[contact] inbound message:", {
    name,
    email,
    subject,
    preview: message.slice(0, 200),
    at: new Date().toISOString()
  });

  // If a Resend API key is configured, attempt delivery. Failures are logged
  // but do NOT fail the request — the message is already captured server-side.
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ||
    "Fileninja Contact <onboarding@resend.dev>"; // resend.dev works without domain verification

  if (resendKey) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [CONTACT_TO],
          reply_to: email,
          subject: `[Fileninja] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`
        })
      });
      if (!r.ok) {
        const t = await r.text();
        console.error("[contact] resend delivery failed:", r.status, t);
      } else {
        console.log("[contact] resend delivery ok");
      }
    } catch (err) {
      console.error("[contact] resend exception:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
