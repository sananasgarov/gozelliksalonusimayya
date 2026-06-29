"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageUpload({
  onUploaded,
  disabled,
  label = "Upload Image",
  currentUrl,
}: {
  onUploaded: (url: string) => void;
  disabled?: boolean;
  label?: string;
  currentUrl?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  useEffect(() => {
    setPreview(currentUrl ?? null);
  }, [currentUrl]);

  async function handleFile(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) {
      setPreview(data.url);
      onUploaded(data.url);
    }
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {preview ? (
        <div className="relative w-28 h-28 rounded-xl overflow-hidden group" style={{ border: "2px solid rgba(155,109,255,0.2)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium"
            style={{ background: "rgba(30,16,48,0.6)" }}
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={disabled || uploading}
          className="w-28 h-28 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 cursor-pointer"
          style={{ border: "2px dashed rgba(155,109,255,0.3)", background: "rgba(155,109,255,0.04)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,109,255,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,109,255,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.04)"; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b6dff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span className="text-xs" style={{ color: "#9b6dff" }}>{uploading ? "Uploading…" : label}</span>
        </button>
      )}
      {preview && (
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 disabled:opacity-50 cursor-pointer"
          style={{ background: "rgba(155,109,255,0.08)", color: "#7c4dcc", border: "1px solid rgba(155,109,255,0.2)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.14)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.08)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          {uploading ? "Uploading…" : "Change image"}
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
