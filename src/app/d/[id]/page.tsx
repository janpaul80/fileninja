import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HeroBackground from "@/components/HeroBackground";
import DownloadClient from "./DownloadClient";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Download Files — Fileninja",
  description: "Your files are ready for download."
};

export default async function DownloadPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: transfer, error } = await supabase
    .from("transfers")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !transfer) {
    return notFound();
  }

  // Update view count
  await supabase
    .from("transfers")
    .update({ view_count: (transfer.view_count || 0) + 1 })
    .eq("id", params.id);

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      <HeroBackground />

      <div className="container-fn relative z-10 w-full max-w-2xl">
        <FadeIn>
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-soft border border-white/40 p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg text-brand-red text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                Files received
              </span>
              <h1 className="h-display text-3xl sm:text-4xl text-brand-ink">
                Your files are ready.
              </h1>
              {transfer.sender_email && (
                <p className="mt-3 text-brand-ink/60 font-light">
                  Sent by <span className="font-medium text-brand-ink">{transfer.sender_email}</span>
                </p>
              )}
            </div>

            {transfer.message && (
              <div className="mb-10 p-5 rounded-2xl bg-brand-bg border border-brand-grayLight/60 italic text-brand-ink/80 text-sm leading-relaxed">
                &ldquo;{transfer.message}&rdquo;
              </div>
            )}

            <DownloadClient transfer={transfer} />

            <div className="mt-12 pt-8 border-t border-brand-grayLight/60 text-center">
              <p className="text-xs text-brand-ink/40 uppercase tracking-widest">
                Protected by Fileninja encryption
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
