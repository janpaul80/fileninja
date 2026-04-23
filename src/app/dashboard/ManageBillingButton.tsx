"use client";

import * as React from "react";

export default function ManageBillingButton() {
  const [pending, setPending] = React.useState(false);

  async function openPortal() {
    setPending(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        alert(json.error || "Unable to open billing portal");
        setPending(false);
      }
    } catch (err) {
      alert("Network error opening portal");
      setPending(false);
    }
  }

  return (
    <button
      onClick={openPortal}
      disabled={pending}
      className="btn-primary disabled:opacity-60"
    >
      {pending ? "Opening…" : "Manage billing"}
    </button>
  );
}
