import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy — Fileninja",
  description: "How Fileninja uses cookies and similar technologies."
};

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Cookie Policy" updated="January 2025">
      <p>
        This Cookie Policy explains how Fileninja uses cookies and similar
        technologies to provide, secure and improve our Service.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They help the site remember your preferences and recognise
        you on return visits.
      </p>

      <h2>Cookies we use</h2>
      <ul>
        <li>
          <strong>Strictly necessary:</strong> session cookies that keep you
          signed in and protect against CSRF attacks.
        </li>
        <li>
          <strong>Functional:</strong> remember preferences such as theme or
          language.
        </li>
        <li>
          <strong>Analytics (privacy-friendly):</strong> aggregated, anonymised
          usage data — no third-party trackers.
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        Most browsers let you block or delete cookies. Note that disabling
        strictly necessary cookies will prevent core features like signing in
        from working.
      </p>

      <h2>Third parties</h2>
      <p>
        We use Stripe to process payments; Stripe sets its own cookies on
        checkout pages. See Stripe&apos;s privacy policy for details.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies? Email{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a>.
      </p>
    </LegalLayout>
  );
}
