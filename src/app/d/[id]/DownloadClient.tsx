"use client";

import * as React from "react";
import { FileIcon, DownloadIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

type FileData = {
  name: string;
  size: number;
  key: string;
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

export default function DownloadClient({ transfer }: { transfer: any }) {
  const [downloading, setDownloading] = React.useState<string | null>(null);
  const supabase = createClient();
  const files = (transfer.files as FileData[]) || [];

  const handleDownload = async (file: FileData) => {
    setDownloading(file.key);
    try {
      const { data, error } = await supabase.storage
        .from("fileninja-transfers")
        .download(file.key);

      if (error) throw error;

      // Create a temporary link to trigger download
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file. It may have expired.");
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    for (const file of files) {
      await handleDownload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-brand-ink">
          {files.length} {files.length === 1 ? "file" : "files"} (
          {formatBytes(files.reduce((acc, f) => acc + f.size, 0))})
        </p>
        {files.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="text-xs font-bold text-brand-red uppercase tracking-widest hover:underline"
          >
            Download all
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {files.map((file, i) => (
          <li
            key={`${file.name}-${i}`}
            className="group flex items-center gap-4 bg-brand-bg/50 hover:bg-brand-bg rounded-2xl p-4 border border-brand-grayLight/40 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-ink/40 group-hover:text-brand-red transition-colors shadow-sm">
              <FileIcon size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-brand-ink truncate">{file.name}</p>
              <p className="text-xs text-brand-ink/50 mt-0.5">
                {formatBytes(file.size)}
              </p>
            </div>
            <button
              onClick={() => handleDownload(file)}
              disabled={downloading === file.key}
              className="w-10 h-10 rounded-full bg-brand-ink text-white flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
              aria-label={`Download ${file.name}`}
            >
              {downloading === file.key ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <DownloadIcon size={18} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
