import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Data Processing Agreement — Fileninja",
  description: "Fileninja's Data Processing Agreement (DPA) for business customers."
};

export default function DPAPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Data Processing Agreement"
      updated="January 2025"
    >
      <p>
        This Data Processing Agreement (&quot;DPA&quot;) forms part of the
        Fileninja Terms of Service and applies whenever Fileninja processes
        Personal Data on behalf of a customer (&quot;Controller&quot;) acting
        as the data controller under the GDPR.
      </p>

      <h2>1. Roles</h2>
      <p>
        Customer is the Controller of Personal Data submitted to the Service.
        Fileninja acts as the Processor.
      </p>

      <h2>2. Subject matter &amp; duration</h2>
      <p>
        Processing covers files and account data submitted to the Service,
        for the duration of the Customer&apos;s subscription.
      </p>

      <h2>3. Sub-processors</h2>
      <p>
        Fileninja uses vetted sub-processors strictly required to operate the
        Service (hosting, payments, email). A current list is available on
        request via{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a>.
      </p>

      <h2>4. Security measures</h2>
      <p>
        Fileninja implements appropriate technical and organisational
        measures, including encryption at rest and in transit, access
        controls, audit logging, and regular vulnerability assessments. See
        our <a href="/security">Security</a> page for details.
      </p>

      <h2>5. Data subject rights</h2>
      <p>
        Fileninja will assist the Controller in responding to data subject
        requests as required by Articles 12-23 of the GDPR.
      </p>

      <h2>6. Data breach notification</h2>
      <p>
        Fileninja will notify the Controller without undue delay (and in any
        event within 72 hours) after becoming aware of a Personal Data
        Breach.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Where data is transferred outside the EEA, Standard Contractual
        Clauses or equivalent safeguards will apply.
      </p>

      <h2>8. Audits</h2>
      <p>
        Fileninja will make available all information necessary to
        demonstrate compliance with this DPA and allow for audits, mandated
        by Controller, no more than once per year.
      </p>

      <h2>9. Signing the DPA</h2>
      <p>
        For a counter-signed copy, email{" "}
        <a href="mailto:hello@fileninja.cloud">hello@fileninja.cloud</a> with
        your company details.
      </p>
    </LegalLayout>
  );
}
