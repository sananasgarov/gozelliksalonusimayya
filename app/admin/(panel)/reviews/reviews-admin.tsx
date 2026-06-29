"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import ImageUpload from "@/components/admin/image-upload";
import {
  Card, Field, Input, Textarea, Select, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch,
} from "@/components/admin/admin-ui";

type Review = { _id: string; name: string; stars: number; text: string; avatarUrl: string };
const empty = { name: "", stars: 5, text: "", avatarUrl: "/avatar.png" };

export default function ReviewsAdmin({ initial }: { initial: Review[] }) {
  const [items, setItems] = useState<Review[]>(initial);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<Review>("/api/admin/reviews", { method: "PUT", body: JSON.stringify({ id: editId, ...form }) });
      if (updated) { setItems((p) => p.map((i) => (i._id === editId ? updated : i))); setEditId(null); }
    } else {
      const item = await adminFetch<Review>("/api/admin/reviews", { method: "POST", body: JSON.stringify(form) });
      if (item) setItems((p) => [item, ...p]);
    }
    setForm(empty);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/reviews", { method: "DELETE", body: JSON.stringify({ id }) });
    if (ok !== null) setItems((p) => p.filter((i) => i._id !== id));
  }

  function startEdit(item: Review) {
    setEditId(item._id);
    setForm({ name: item.name, stars: item.stars, text: item.text, avatarUrl: item.avatarUrl });
  }

  return (
    <AdminPageShell title="Reviews" description={`${items.length} customer review${items.length !== 1 ? "s" : ""}`}>
      <Card className="mb-6">
        <SectionHeading>{editId ? "Edit Review" : "Add Review"}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Customer Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sarah M." />
          </Field>
          <Field label="Stars">
            <Select value={form.stars} onChange={(e) => setForm({ ...form, stars: +e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{"★".repeat(n)} — {n} star{n !== 1 ? "s" : ""}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Review Text">
          <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="What the customer said…" />
        </Field>
        <Field label="Avatar Photo">
          <div className="flex items-center gap-4 mt-1">
            {form.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.avatarUrl} alt="avatar" className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#d9caea]" />
            )}
            <ImageUpload
              onUploaded={(url) => setForm({ ...form, avatarUrl: url })}
              currentUrl={form.avatarUrl || undefined}
              label="Upload Photo"
            />
          </div>
        </Field>
        <div className="flex items-center gap-3 mt-5">
          <PrimaryBtn onClick={save} disabled={saving || !form.name || !form.text}>
            {saving ? "Saving…" : editId ? "Update Review" : "Add Review"}
          </PrimaryBtn>
          {editId && (
            <SecondaryBtn onClick={() => { setEditId(null); setForm(empty); }}>Cancel</SecondaryBtn>
          )}
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState label="No reviews yet. Add one above." />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatarUrl || "/avatar.png"} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#d9caea]" />
                  <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold" style={{ color: "#1e1030" }}>{item.name}</span>
                    <span className="text-xs" style={{ color: "#f59e0b" }}>{"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b5f80" }}>{item.text}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
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
    </AdminPageShell>
  );
}
