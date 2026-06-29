"use client";

import { useState } from "react";
import ImageUpload from "@/components/admin/image-upload";
import { Card, Field, Input, Textarea, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch } from "@/components/admin/admin-ui";

type Slide = { _id: string; title: string; desc: string; imageUrl: string; watermark: string; bg: string; btnColor: string; order: number };

const empty = { title: "", desc: "", imageUrl: "", watermark: "", bg: "#d9caea", btnColor: "#9b6dff", order: 0 };

export default function HomeSlidesAdmin({ initial }: { initial: Slide[] }) {
  const [items, setItems] = useState<Slide[]>(initial);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<Slide>("/api/admin/home-slides", { method: "PUT", body: JSON.stringify({ id: editId, ...form }) }, "Updated successfully");
      if (updated) { setItems((p) => p.map((i) => (i._id === editId ? updated : i))); setEditId(null); }
    } else {
      const item = await adminFetch<Slide>("/api/admin/home-slides", { method: "POST", body: JSON.stringify({ ...form, order: items.length }) }, "Slide added");
      if (item) setItems((p) => [...p, item]);
    }
    setForm(empty);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/home-slides", { method: "DELETE", body: JSON.stringify({ id }) }, "Deleted successfully", "delete");
    if (ok !== null) setItems((p) => p.filter((i) => i._id !== id));
  }

  function startEdit(item: Slide) {
    setEditId(item._id);
    setForm({ title: item.title, desc: item.desc, imageUrl: item.imageUrl, watermark: item.watermark, bg: item.bg, btnColor: item.btnColor, order: item.order });
  }

  return (
    <Card className="mb-6">
      <SectionHeading>Homepage Service Slides</SectionHeading>

      {/* Form */}
      <div className="flex flex-col gap-4 max-w-2xl mb-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slide Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Make-up" />
          </Field>
          <Field label="Watermark Text">
            <Input value={form.watermark} onChange={(e) => setForm({ ...form, watermark: e.target.value })} placeholder="e.g. Nude Makeup" />
          </Field>
        </div>
        <Field label="Description">
          <Textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short description shown on the slide…" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Background Color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.bg}
                onChange={(e) => setForm({ ...form, bg: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5"
                style={{ background: "none" }}
              />
              <Input value={form.bg} onChange={(e) => setForm({ ...form, bg: e.target.value })} placeholder="#d9caea" />
            </div>
          </Field>
          <Field label="Button Color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.btnColor}
                onChange={(e) => setForm({ ...form, btnColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5"
                style={{ background: "none" }}
              />
              <Input value={form.btnColor} onChange={(e) => setForm({ ...form, btnColor: e.target.value })} placeholder="#9b6dff" />
            </div>
          </Field>
        </div>
        <Field label="Slide Image">
          <div className="mt-1">
            <ImageUpload onUploaded={(url) => setForm({ ...form, imageUrl: url })} currentUrl={form.imageUrl || undefined} label="Upload Image" />
          </div>
        </Field>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <PrimaryBtn onClick={save} disabled={saving || !form.title}>
          {saving ? "Saving…" : editId ? "Update Slide" : "Add Slide"}
        </PrimaryBtn>
        {editId && <SecondaryBtn onClick={() => { setEditId(null); setForm(empty); }}>Cancel</SecondaryBtn>}
      </div>

      {/* List */}
      {items.length === 0 ? (
        <EmptyState label="No slides yet. Add one above." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              <div className="h-20 flex items-center justify-center relative" style={{ background: item.bg }}>
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover object-top opacity-60" />
                )}
                <span className="absolute inset-0 flex items-center justify-center text-[#433459] font-bold text-xl" style={{ fontFamily: "var(--font-antonio)" }}>
                  {item.title}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.btnColor }} />
                  <span className="text-xs font-medium truncate" style={{ color: "#6b5f80" }}>{item.watermark || "—"}</span>
                </div>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#6b5f80" }}>{item.desc || "—"}</p>
                <div className="flex gap-2">
                  <EditBtn onClick={() => startEdit(item)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </EditBtn>
                  <DangerBtn onClick={() => del(item._id)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    Delete
                  </DangerBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
