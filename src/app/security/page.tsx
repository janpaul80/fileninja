import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Security — Fileninja",
  description:
    "How Fileninja protects your files, your accounts, and your data."
};

export default function SecurityPage() {
  return (
    <LegalLayout eyebrow="Trust" title="Security at Fileninja" updated="January 2025">
      <p>
        Security isn&apos;t a feature — it&apos;s a foundation. Here&apos;s
        how we keep your data safe.
      </p>

      <h2>Encryption</h2>
      <ul>
        <li>TLS 1.2+ for all data in transit.</li>
        <li>AES-256 encryption at rest for all stored files.</li>
        <li>Per-object content keys with rotated master keys.</li>
      </ul>

      <h2>Account security</h2>
      <ul>
        <li>Strong password policy and bcrypt hashing.</li>
        <li>Optional two-factor authentication (TOTP).</li>
        <li>Session invalidation on password change.</li>
      </ul>

      <h2>File scanning</h2>
      <p>
        Every uploaded file is scanned for known malware signatures. Files
        that fail the scan are quarantined and never delivered to recipients.
      </p>

      <h2>Infrastructure</h2>
      <ul>
        <li>EU-based primary infrastructure on hardened VPS hosts.</li>
        <li>Network-level firewalls; SSH key-only access.</li>
        <li>Automated backups with point-in-time recovery.</li>
        <li>Stripe handles all payment data — we never store cards.</li>
      </ul>

      <h2>Responsible disclosure</h2>
      <p>
        Found a vulnerability? Please report it privately to{" "}
        <a href="mailto:security@fileninja.cloud">security@fileninja.cloud</a>.
        We commit to acknowledging reports within 48 hours.
      </p>
    </LegalLayout>
  );
}
