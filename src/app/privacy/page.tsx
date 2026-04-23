import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Fileninja",
  description: "How Fileninja collects, uses and protects your data."
};

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="January 2025">
      <p>
        Fileninja respects your privacy. This policy explains what we collect,
        why, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Account data:</strong> name, email, password hash.</li>
        <li><strong>Usage data:</strong> transfer counts, file sizes, IP and browser metadata for security.</li>
        <li><strong>Files:</strong> the content you upload, stored encrypted at rest.</li>
        <li><strong>Billing:</strong> processed by Stripe — we never see your card.</li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        To operate the Service, prevent abuse, send essential service emails,
        and improve product reliability. We do not sell your personal data,
        ever.
      </p>

      <h2>3. Data sharing</h2>
      <p>
        We share data only with sub-processors strictly required to run the
        Service (e.g. hosting, payments, email delivery), all under data
        processing agreements.
      </p>

      <h2>4. Retention</h2>
      <p>
        Files are retained according to your transfer&apos;s expiry settings.
        Account data is kept while your account is active and for a short
        period after deletion to comply with legal obligations.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You have the right to access, rectify, port and delete your personal
        data. Email{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a> to
        exercise them.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Data may be processed in the EU and other jurisdictions where our
        sub-processors operate, always under appropriate safeguards.
      </p>

      <h2>7. Contact</h2>
      <p>
        Privacy questions? Email{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a>.
      </p>
    </LegalLayout>
  );
}
