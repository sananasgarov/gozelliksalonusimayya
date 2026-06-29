"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import {
  Card, Field, Input, Textarea, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch,
} from "@/components/admin/admin-ui";

type PageKey = "terms" | "privacy" | "booking";
type Section = { _id: string; pageKey: PageKey; title: string; body: string; order: number };

const pages: { key: PageKey; label: string; desc: string }[] = [
  { key: "terms", label: "Terms & Conditions", desc: "Booking, payment, and service terms" },
  { key: "privacy", label: "Privacy Policy", desc: "Data collection and usage policy" },
  { key: "booking", label: "Booking Policy", desc: "Appointment and cancellation rules" },
];

const emptyForm = { title: "", body: "" };

export default function LegalAdmin({ initial }: { initial: Record<PageKey, Section[]> }) {
  const [activeKey, setActiveKey] = useState<PageKey>("terms");
  const [data, setData] = useState(initial);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const sections = data[activeKey];

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<Section>("/api/admin/legal", { method: "PUT", body: JSON.stringify({ id: editId, title: form.title, body: form.body }) });
      if (updated) { setData((prev) => ({ ...prev, [activeKey]: prev[activeKey].map((s) => s._id === editId ? updated : s) })); setEditId(null); }
    } else {
      const item = await adminFetch<Section>("/api/admin/legal", { method: "POST", body: JSON.stringify({ pageKey: activeKey, title: form.title, body: form.body, order: sections.length }) });
      if (item) setData((prev) => ({ ...prev, [activeKey]: [...prev[activeKey], item] }));
    }
    setForm(emptyForm);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/legal", { method: "DELETE", body: JSON.stringify({ id }) });
    if (ok !== null) setData((prev) => ({ ...prev, [activeKey]: prev[activeKey].filter((s) => s._id !== id) }));
  }

  function startEdit(s: Section) {
    setEditId(s._id);
    setForm({ title: s.title, body: s.body });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancel() {
    setEditId(null);
    setForm(emptyForm);
  }

  return (
    <AdminPageShell
      title="Legal Pages"
      description="Manage Terms & Conditions, Privacy Policy, and Booking Policy"
    >
      {/* Page tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {pages.map((p) => {
          const active = activeKey === p.key;
          return (
            <button
              key={p.key}
              onClick={() => { setActiveKey(p.key); cancel(); }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
              style={{
                background: active ? "linear-gradient(135deg, #7c4dcc 0%, #9b6dff 100%)" : "#ffffff",
                color: active ? "#ffffff" : "#6b5f80",
                border: active ? "none" : "1px solid rgba(155,109,255,0.15)",
                boxShadow: active ? "0 4px 12px rgba(155,109,255,0.25)" : "0 1px 4px rgba(30,16,48,0.05)",
              }}
            >
              <span className="font-semibold">{p.label}</span>
              <span className="block text-[11px] mt-0.5 opacity-70">{p.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Add / Edit form */}
      <Card className="mb-6">
        <SectionHeading>{editId ? `Editing: "${form.title || "…"}"` : `Add Section to ${pages.find((p) => p.key === activeKey)?.label}`}</SectionHeading>
        <div className="flex flex-col gap-4">
          <Field label="Section Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Cancellation Policy"
            />
          </Field>
          <Field label="Content">
            <div>
              <Textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder={"Write text here.\n\nBlank lines = new paragraph.\nLines starting with '- ' = bullet point."}
                className="min-h-36 font-mono text-xs"
              />
              <p className="text-[11px] mt-1.5" style={{ color: "#9b6dff" }}>
                Tip: blank line = new paragraph · lines starting with <code className="bg-purple-50 px-1 rounded">- </code> = bullet list
              </p>
            </div>
          </Field>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <PrimaryBtn onClick={save} disabled={saving || !form.title || !form.body}>
            {saving ? "Saving…" : editId ? "Update Section" : "Add Section"}
          </PrimaryBtn>
          {editId && <SecondaryBtn onClick={cancel}>Cancel</SecondaryBtn>}
        </div>
      </Card>

      {/* Sections list */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold" style={{ color: "#1e1030" }}>
          {sections.length} section{sections.length !== 1 ? "s" : ""}
        </p>
        <a
          href={activeKey === "terms" ? "/terms" : activeKey === "privacy" ? "/privacy-policy" : "/booking-policy"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: "#9b6dff" }}
        >
          Preview page
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      {sections.length === 0 ? (
        <EmptyState label="No sections yet. Add one above." />
      ) : (
        <div className="flex flex-col gap-2">
          {sections.map((s, idx) => {
            const isExpanded = expanded === s._id;
            return (
              <div
                key={s._id}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.05)" }}
              >
                <div className="flex items-center gap-3 px-5 py-4">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(155,109,255,0.1)", color: "#7c4dcc" }}>
                    {idx + 1}
                  </span>
                  <button
                    className="flex-1 text-left text-sm font-semibold"
                    style={{ color: "#1e1030" }}
                    onClick={() => setExpanded(isExpanded ? null : s._id)}
                  >
                    {s.title}
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : s._id)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#9b6dff", background: "rgba(155,109,255,0.07)" }}
                    >
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    <EditBtn onClick={() => startEdit(s)}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </EditBtn>
                    <DangerBtn onClick={() => del(s._id)}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Delete
                    </DangerBtn>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-4 pt-0 border-t" style={{ borderColor: "rgba(155,109,255,0.08)" }}>
                    <pre className="text-xs leading-relaxed whitespace-pre-wrap font-sans mt-3" style={{ color: "#6b5f80" }}>
                      {s.body}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminPageShell>
  );
}
