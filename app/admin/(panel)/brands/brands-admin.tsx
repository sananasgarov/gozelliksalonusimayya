"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import ImageUpload from "@/components/admin/image-upload";
import { Card, Field, Input, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch } from "@/components/admin/admin-ui";

type Brand = { _id: string; name: string; logoUrl: string; order: number };
const empty = { name: "", logoUrl: "/brand1.png", order: 0 };

export default function BrandsAdmin({ initial }: { initial: Brand[] }) {
  const [items, setItems] = useState<Brand[]>(initial);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<Brand>("/api/admin/brands", { method: "PUT", body: JSON.stringify({ id: editId, ...form }) }, "Updated successfully");
      if (updated) { setItems((p) => p.map((i) => (i._id === editId ? updated : i))); setEditId(null); }
    } else {
      const item = await adminFetch<Brand>("/api/admin/brands", { method: "POST", body: JSON.stringify({ ...form, order: items.length }) }, "Brand added");
      if (item) setItems((p) => [...p, item]);
    }
    setForm(empty);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/brands", { method: "DELETE", body: JSON.stringify({ id }) }, "Deleted successfully", "delete");
    if (ok !== null) setItems((p) => p.filter((i) => i._id !== id));
  }

  return (
    <AdminPageShell title="Brands" description={`${items.length} partner brand${items.length !== 1 ? "s" : ""}`}>
      <Card className="mb-6">
        <SectionHeading>{editId ? "Edit Brand" : "Add Brand"}</SectionHeading>
        <div className="flex flex-col gap-4">
          <Field label="Brand Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. MAC Cosmetics" />
          </Field>
          <Field label="Logo">
            <div className="mt-1">
              <ImageUpload onUploaded={(url) => setForm({ ...form, logoUrl: url })} currentUrl={form.logoUrl} label="Upload Logo" />
            </div>
          </Field>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <PrimaryBtn onClick={save} disabled={saving || !form.name}>
            {saving ? "Saving…" : editId ? "Update Brand" : "Add Brand"}
          </PrimaryBtn>
          {editId && <SecondaryBtn onClick={() => { setEditId(null); setForm(empty); }}>Cancel</SecondaryBtn>}
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState label="No brands yet. Add one above." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl p-5 flex flex-col items-center gap-3"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: "rgba(155,109,255,0.05)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.logoUrl} alt={item.name} className="h-10 w-10 object-contain grayscale" />
              </div>
              <p className="text-sm font-medium text-center" style={{ color: "#1e1030" }}>{item.name}</p>
              <div className="flex gap-2">
                <EditBtn onClick={() => { setEditId(item._id); setForm({ name: item.name, logoUrl: item.logoUrl, order: item.order }); }}>
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
          ))}
        </div>
      )}
    </AdminPageShell>
  );
}
