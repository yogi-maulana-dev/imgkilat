"use client";

import { useCallback, useEffect, useState } from "react";
import { RichEditor } from "@/components/site/rich-editor";

interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  lang: string;
  date: string;
  updatedAt: string;
}

const empty = { slug: "", title: "", excerpt: "", contentHtml: "", lang: "id" };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [list, setList] = useState<NewsItem[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/news");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    setAuthed(true);
    setList(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      load();
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j.error ?? "Login gagal");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setForm({ ...empty });
      setEditing(false);
      setMsg("Tersimpan & file HTML dibuat.");
      load();
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j.error ?? "Gagal menyimpan");
    }
  }

  function edit(item: NewsItem) {
    setForm({ slug: item.slug, title: item.title, excerpt: item.excerpt, contentHtml: item.contentHtml, lang: item.lang });
    setEditing(true);
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(slug: string) {
    if (!confirm(`Hapus berita "${slug}"? File HTML-nya juga akan dihapus.`)) return;
    await fetch(`/api/admin/news?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    setMsg("Berita & file index.html dihapus.");
    load();
  }

  if (authed === null) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-muted-foreground">Memuat…</div>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
        <form onSubmit={login} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password admin"
            className="w-full rounded-lg border border-border px-3 py-2"
          />
          <button className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Masuk</button>
        </form>
        {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
      </div>
    );
  }

  const inputCls = "w-full rounded-lg border border-border px-3 py-2 text-sm";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Berita</h1>
        <button onClick={logout} className="text-sm text-muted-foreground hover:underline">
          Keluar
        </button>
      </div>

      <form onSubmit={save} className="mb-10 space-y-3 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold">{editing ? "Edit Berita" : "Tulis Berita Baru"}</h2>
        <input
          className={inputCls}
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="flex gap-3">
          <input
            className={inputCls}
            placeholder="slug (opsional, otomatis dari judul)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            disabled={editing}
          />
          <select className={inputCls} value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <textarea
          className={inputCls}
          rows={2}
          placeholder="Ringkasan (untuk SEO & daftar)"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <RichEditor value={form.contentHtml} onChange={(html) => setForm({ ...form, contentHtml: html })} />
        <div className="flex items-center gap-3">
          <button
            disabled={busy}
            className="rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Menyimpan…" : editing ? "Perbarui" : "Terbitkan"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm({ ...empty });
                setEditing(false);
              }}
              className="text-sm text-muted-foreground hover:underline"
            >
              Batal edit
            </button>
          )}
          {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
        </div>
      </form>

      <h2 className="mb-3 font-semibold">Daftar Berita ({list.length})</h2>
      <div className="space-y-2">
        {list.map((n) => (
          <div key={n.slug} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{n.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                /berita/{n.slug} · {n.lang} · {new Date(n.date).toLocaleDateString("id-ID")}
              </p>
            </div>
            <a href={`/berita/${n.slug}`} target="_blank" className="text-sm text-primary hover:underline">
              Lihat
            </a>
            <button onClick={() => edit(n)} className="text-sm text-muted-foreground hover:underline">
              Edit
            </button>
            <button onClick={() => remove(n.slug)} className="text-sm text-red-600 hover:underline">
              Hapus
            </button>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-muted-foreground">Belum ada berita.</p>}
      </div>
    </div>
  );
}
