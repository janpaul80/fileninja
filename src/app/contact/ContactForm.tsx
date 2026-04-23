"use client";

import * as React from "react";
import { CheckIcon, SendIcon } from "@/components/icons";

function makeChallenge() {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  return { a, b, answer: a + b };
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [challenge, setChallenge] = React.useState(makeChallenge);
  const [captcha, setCaptcha] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (Number(captcha) !== challenge.answer) {
      setError("Incorrect answer to the challenge — please try again.");
      setChallenge(makeChallenge());
      setCaptcha("");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      captcha: Number(captcha),
      challenge
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to send.");
      }
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setStatus("error");
      setChallenge(makeChallenge());
      setCaptcha("");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center mx-auto">
          <CheckIcon size={28} />
        </div>
        <h2 className="font-display text-3xl font-extrabold text-brand-ink mt-5">
          Message sent!
        </h2>
        <p className="text-brand-ink/65 mt-2 max-w-md mx-auto">
          Thanks for reaching out. We&apos;ll get back to you at the email
          address you provided within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.14em] font-bold text-brand-ink/70 mb-2">
            Name
          </label>
          <input
            name="name"
            required
            autoComplete="name"
            className="input-fn"
            placeholder="Jane Cooper"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em] font-bold text-brand-ink/70 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input-fn"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-bold text-brand-ink/70 mb-2">
          Subject
        </label>
        <input
          name="subject"
          required
          className="input-fn"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-bold text-brand-ink/70 mb-2">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="input-fn resize-y min-h-[140px]"
          placeholder="Tell us a bit more…"
        />
      </div>

      {/* Captcha */}
      <div className="rounded-xl bg-brand-bg border border-brand-grayLight p-4 flex items-center gap-4">
        <div className="text-sm font-medium text-brand-ink/80">
          Quick check:{" "}
          <span className="font-display font-extrabold text-brand-ink text-lg">
            {challenge.a} + {challenge.b}
          </span>{" "}
          =
        </div>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          required
          aria-label="Captcha answer"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value.replace(/\D/g, ""))}
          className="w-24 input-fn !py-2 !text-center font-bold"
          placeholder="?"
        />
        <button
          type="button"
          onClick={() => {
            setChallenge(makeChallenge());
            setCaptcha("");
          }}
          className="text-xs text-brand-ink/55 hover:text-brand-red font-medium ml-auto"
        >
          New question
        </button>
      </div>

      {error && (
        <div className="text-sm text-brand-red bg-brand-red/8 border border-brand-red/30 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <SendIcon size={16} />
      </button>

      <p className="text-xs text-brand-ink/50">
        By sending, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-brand-ink">
          privacy policy
        </a>
        . We never share your information.
      </p>
    </form>
  );
}
