"use client";

import * as React from "react";
import { UploadIcon, FileIcon, SendIcon, CheckIcon, XIcon, LoaderIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";

type Status = "idle" | "selected" | "uploading" | "complete" | "error";

type UploadedFile = {
  name: string;
  size: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let val = bytes / 1024;
  let i = 0;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(1)} ${units[i]}`;
}

export default function UploadWidget() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [files, setFiles] = React.useState<File[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [emailTo, setEmailTo] = React.useState("");
  const [emailFrom, setEmailFrom] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [transferId, setTransferId] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const supabase = createClient();

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const next = Array.from(list);
    setFiles((prev) => [...prev, ...next]);
    setStatus("selected");
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (next.length === 0) setStatus("idle");
      return next;
    });
  };

  const startUpload = async () => {
    if (files.length === 0) return;
    setStatus("uploading");
    setProgress(0);
    setErrorMessage("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const tid = uuidv4();
      const uploadedFiles = [];

      let totalUploaded = 0;
      const totalSizeToUpload = files.reduce((acc, f) => acc + f.size, 0);

      for (const file of files) {
        const filePath = `${tid}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("fileninja-transfers")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) throw uploadError;

        uploadedFiles.push({
          name: file.name,
          size: file.size,
          key: filePath
        });

        totalUploaded += file.size;
        setProgress((totalUploaded / totalSizeToUpload) * 100);
      }

      // Create database record
      const { error: dbError } = await supabase.from("transfers").insert({
        id: tid,
        owner_id: user?.id || null,
        sender_email: emailFrom,
        recipient_email: emailTo,
        message: message,
        files: uploadedFiles,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      });

      if (dbError) throw dbError;

      setTransferId(tid);
      setStatus("complete");
    } catch (err: any) {
      console.error("Upload failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred");
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setProgress(0);
    setStatus("idle");
    setEmailTo("");
    setEmailFrom("");
    setMessage("");
    setTransferId(null);
    setErrorMessage("");
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-soft border border-white/40 p-5 sm:p-6">
        {status === "idle" || status === "selected" ? (
          <>
            <div
              className={`upload-zone rounded-2xl px-6 py-10 text-center cursor-pointer bg-brand-bg/60 ${
                dragging ? "dragging" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className="mx-auto w-14 h-14 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-4 animate-pulse-ring">
                <UploadIcon size={26} />
              </div>
              <p className="font-display font-bold text-brand-ink text-lg">
                Drop files here
              </p>
              <p className="text-sm text-brand-ink/60 mt-1">
                or click to browse from your device
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand-ink/40 mt-4">
                Up to 5 GB free · No signup required
              </p>
            </div>

            {files.length > 0 && (
              <ul className="mt-4 space-y-2 max-h-40 overflow-auto pr-1">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center gap-3 bg-brand-bg/70 rounded-xl px-3 py-2 border border-brand-grayLight/60"
                  >
                    <span className="text-brand-ink/70 shrink-0">
                      <FileIcon size={18} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-ink truncate">{f.name}</p>
                      <p className="text-[11px] text-brand-ink/50">{formatBytes(f.size)}</p>
                    </div>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-brand-ink/40 hover:text-brand-red transition-colors p-1"
                      aria-label={`Remove ${f.name}`}
                    >
                      <XIcon size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="Email to"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full rounded-xl border border-brand-grayLight bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition"
              />
              <input
                type="email"
                placeholder="Your email"
                value={emailFrom}
                onChange={(e) => setEmailFrom(e.target.value)}
                className="w-full rounded-xl border border-brand-grayLight bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition"
              />
              <textarea
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-brand-grayLight bg-white px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition"
              />
            </div>

            <button
              onClick={startUpload}
              disabled={files.length === 0}
              className="btn-primary w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <SendIcon size={18} />
              <span className="ml-2">Transfer {files.length > 0 ? `· ${formatBytes(totalSize)}` : ""}</span>
            </button>
          </>
        ) : status === "uploading" ? (
          <div className="py-6 text-center">
            <p className="font-display font-bold text-brand-ink text-lg">
              Sending {files.length} file{files.length > 1 ? "s" : ""}…
            </p>
            <p className="text-sm text-brand-ink/60 mt-1">{formatBytes(totalSize)}</p>
            <div className="mt-6 h-2.5 w-full rounded-full bg-brand-grayLight/70 overflow-hidden">
              <div
                className="h-full progress-shimmer rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-ink/50 mt-3">
              {Math.round(progress)}%
            </p>
          </div>
        ) : status === "error" ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-red/15 text-brand-red flex items-center justify-center mb-4">
              <XIcon size={32} />
            </div>
            <p className="font-display font-bold text-brand-ink text-xl">
              Upload failed
            </p>
            <p className="text-sm text-brand-ink/60 mt-1">
              {errorMessage}
            </p>
            <button onClick={() => setStatus("selected")} className="btn-primary mt-6 w-full">
              Try again
            </button>
            <button onClick={reset} className="text-sm text-brand-ink/50 hover:text-brand-ink mt-4 block w-full">
              Cancel
            </button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center mb-4">
              <CheckIcon size={32} />
            </div>
            <p className="font-display font-bold text-brand-ink text-xl">
              Transfer complete
            </p>
            <p className="text-sm text-brand-ink/60 mt-1">
              Your files have been sent successfully.
            </p>
            <div className="mt-5 rounded-xl bg-brand-bg p-3 text-sm font-mono text-brand-ink/70 break-all border border-brand-grayLight">
              {typeof window !== "undefined" ? `${window.location.origin}/d/${transferId}` : ""}
            </div>
            <button onClick={reset} className="btn-dark mt-5">
              Send another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
