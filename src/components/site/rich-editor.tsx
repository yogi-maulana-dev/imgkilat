"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Heading2, List, Link2, ImagePlus, Loader2 } from "lucide-react";

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Apply external value (e.g. when loading an article to edit) without
  // resetting the caret on every keystroke.
  useEffect(() => {
    const el = ref.current;
    if (el && value !== el.innerHTML) el.innerHTML = value;
  }, [value]);

  function sync() {
    onChange(ref.current?.innerHTML ?? "");
  }

  function exec(cmd: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    sync();
  }

  function addLink() {
    const url = window.prompt("URL:");
    if (url) exec("createLink", url);
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.url) exec("insertHTML", `<img src="${j.url}" alt="" />`);
      else window.alert(j.error ?? "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  const tools: { icon: React.ReactNode; title: string; onClick: () => void }[] = [
    { icon: <Bold className="h-4 w-4" />, title: "Tebal", onClick: () => exec("bold") },
    { icon: <Italic className="h-4 w-4" />, title: "Miring", onClick: () => exec("italic") },
    { icon: <Heading2 className="h-4 w-4" />, title: "Subjudul", onClick: () => exec("formatBlock", "<h2>") },
    { icon: <List className="h-4 w-4" />, title: "Daftar", onClick: () => exec("insertUnorderedList") },
    { icon: <Link2 className="h-4 w-4" />, title: "Tautan", onClick: addLink },
  ];

  return (
    <div className="rounded-lg border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-1.5">
        {tools.map((t) => (
          <button
            key={t.title}
            type="button"
            title={t.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={t.onClick}
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
          >
            {t.icon}
          </button>
        ))}
        <button
          type="button"
          title="Sisipkan gambar"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex h-8 items-center gap-1.5 rounded px-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          Gambar
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        data-placeholder="Tulis isi berita…"
        className="rich min-h-[220px] p-3 text-sm focus:outline-none"
      />
    </div>
  );
}
