"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import ImageUpload from "@/components/admin/image-upload";
import {
  Card, Field, Input, Textarea, Select, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch,
} from "@/components/admin/admin-ui";

type Service = { _id: string; title: string; desc: string; category: string; imageUrl: string; order: number };
type Cat = "makeup" | "hair" | "nail";
const empty = { title: "", desc: "", category: "makeup" as Cat, imageUrl: "/servicemarkup.png", order: 0 };
const cats: Cat[] = ["makeup", "hair", "nail"];
const catColors: Record<Cat, string> = { makeup: "#e91e8c", hair: "#7c4dcc", nail: "#f59e0b" };

export default function ServicesAdmin({ initial }: { initial: Service[] }) {
  const [items, setItems] = useState<Service[]>(initial);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Cat>("makeup");
  const [saving, setSaving] = useState(false);

  const filtered = items.filter((i) => i.category === activeTab);

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<Service>("/api/admin/services", { method: "PUT", body: JSON.stringify({ id: editId, ...form }) });
      if (updated) { setItems((p) => p.map((i) => (i._id === editId ? updated : i))); setEditId(null); }
    } else {
      const item = await adminFetch<Service>("/api/admin/services", { method: "POST", body: JSON.stringify({ ...form, order: items.filter((i) => i.category === form.category).length }) });
      if (item) setItems((p) => [...p, item]);
    }
    setForm(empty);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/services", { method: "DELETE", body: JSON.stringify({ id }) });
    if (ok !== null) setItems((p) => p.filter((i) => i._id !== id));
  }

  function startEdit(item: Service) {
    setEditId(item._id);
    setForm({ title: item.title, desc: item.desc, category: item.category as Cat, imageUrl: item.imageUrl, order: item.order });
    setActiveTab(item.category as Cat);
  }

  return (
    <AdminPageShell title="Services" description={`${items.length} service${items.length !== 1 ? "s" : ""} across all categories`}>
      <Card className="mb-6">
        <SectionHeading>{editId ? "Edit Service" : "Add Service"}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Service Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Bridal Makeup" />
          </Field>
          <Field label="Category">
            <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Cat })}>
              {cats.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Description">
          <Textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short description of this service…" />
        </Field>
        <div className="mt-4">
          <Field label="Service Image">
            <div className="mt-1">
              <ImageUpload onUploaded={(url) => setForm({ ...form, imageUrl: url })} currentUrl={form.imageUrl} label="Change Image" />
            </div>
          </Field>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <PrimaryBtn onClick={save} disabled={saving || !form.title}>
            {saving ? "Saving…" : editId ? "Update Service" : "Add Service"}
          </PrimaryBtn>
          {editId && <SecondaryBtn onClick={() => { setEditId(null); setForm(empty); }}>Cancel</SecondaryBtn>}
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl w-fit" style={{ background: "rgba(155,109,255,0.07)" }}>
        {cats.map((c) => {
          const active = activeTab === c;
          return (
            <button
              key={c}
              onClick={() => setActiveTab(c)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150"
              style={{
                background: active ? "#ffffff" : "transparent",
                color: active ? catColors[c] : "#6b5f80",
                boxShadow: active ? "0 1px 4px rgba(30,16,48,0.1)" : "none",
              }}
            >
              {c}
              <span className="ml-1.5 text-xs opacity-60">({items.filter((i) => i.category === c).length})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState label={`No ${activeTab} services yet.`} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                  style={{ background: `${catColors[item.category as Cat]}18`, color: catColors[item.category as Cat] }}
                >
                  {item.category}
                </span>
                <p className="text-sm font-semibold mb-1" style={{ color: "#1e1030" }}>{item.title}</p>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#6b5f80" }}>{item.desc}</p>
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
    </AdminPageShell>
  );
}
