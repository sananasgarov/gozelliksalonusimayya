"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import {
  Card, Field, Input, Textarea, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, adminFetch,
} from "@/components/admin/admin-ui";

type FaqItem = { _id: string; question: string; answer: string; order: number };
const empty = { question: "", answer: "" };

export default function FaqAdmin({ initial }: { initial: FaqItem[] }) {
  const [items, setItems] = useState<FaqItem[]>(initial);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    if (editId) {
      const updated = await adminFetch<FaqItem>("/api/admin/faq", { method: "PUT", body: JSON.stringify({ id: editId, ...form }) });
      if (updated) { setItems((p) => p.map((i) => (i._id === editId ? updated : i))); setEditId(null); }
    } else {
      const item = await adminFetch<FaqItem>("/api/admin/faq", { method: "POST", body: JSON.stringify({ ...form, order: items.length }) });
      if (item) setItems((p) => [...p, item]);
    }
    setForm(empty);
    setSaving(false);
  }

  async function del(id: string) {
    const ok = await adminFetch("/api/admin/faq", { method: "DELETE", body: JSON.stringify({ id }) });
    if (ok !== null) setItems((p) => p.filter((i) => i._id !== id));
  }

  return (
    <AdminPageShell title="FAQ" description={`${items.length} question${items.length !== 1 ? "s" : ""} answered`}>
      <Card className="mb-6">
        <SectionHeading>{editId ? "Edit Question" : "Add Question"}</SectionHeading>
        <div className="flex flex-col gap-4">
          <Field label="Question">
            <Input
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="e.g. How do I book an appointment?"
            />
          </Field>
          <Field label="Answer">
            <Textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="The answer to this question…"
            />
          </Field>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <PrimaryBtn onClick={save} disabled={saving || !form.question || !form.answer}>
            {saving ? "Saving…" : editId ? "Update Question" : "Add Question"}
          </PrimaryBtn>
          {editId && (
            <SecondaryBtn onClick={() => { setEditId(null); setForm(empty); }}>Cancel</SecondaryBtn>
          )}
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState label="No FAQ items yet. Add one above." />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, idx) => (
            <div
              key={item._id}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(155,109,255,0.1)", color: "#7c4dcc" }}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1.5" style={{ color: "#1e1030" }}>{item.question}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b5f80" }}>{item.answer}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <EditBtn onClick={() => { setEditId(item._id); setForm({ question: item.question, answer: item.answer }); }}>
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
