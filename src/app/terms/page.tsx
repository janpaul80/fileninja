import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Fileninja",
  description: "The terms governing your use of Fileninja."
};

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service" updated="January 2025">
      <p>
        Welcome to Fileninja. These Terms of Service (&quot;Terms&quot;) govern
        your access to and use of the Fileninja website, applications and
        services (collectively, the &quot;Service&quot;). By using the Service
        you agree to be bound by these Terms.
      </p>

      <h2>1. Your account</h2>
      <p>
        You must provide accurate information when creating an account and are
        responsible for activity that occurs under it. Keep your credentials
        confidential.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>upload or share unlawful, infringing, or harmful content;</li>
        <li>distribute malware or attempt to compromise the Service;</li>
        <li>harvest personal data without consent;</li>
        <li>resell the Service without our written permission.</li>
      </ul>

      <h2>3. Plans, billing &amp; refunds</h2>
      <p>
        Paid plans renew automatically until cancelled. You can cancel anytime
        from your dashboard. Fees already paid are non-refundable except where
        required by law.
      </p>

      <h2>4. Content ownership</h2>
      <p>
        You retain all rights to the files you upload. You grant Fileninja a
        limited license to store, transmit and display your files solely to
        operate the Service.
      </p>

      <h2>5. Termination</h2>
      <p>
        We may suspend or terminate accounts that violate these Terms. You may
        delete your account at any time.
      </p>

      <h2>6. Disclaimer &amp; liability</h2>
      <p>
        The Service is provided &quot;as is&quot;. To the maximum extent
        permitted by law, Fileninja disclaims all implied warranties and
        limits its liability to the fees paid by you in the prior twelve
        months.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a>.
      </p>
    </LegalLayout>
  );
}
