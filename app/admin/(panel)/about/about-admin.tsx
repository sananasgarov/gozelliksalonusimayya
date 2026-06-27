"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import { Card, Field, Input, Textarea, PrimaryBtn, SavedBadge, SectionHeading } from "@/components/admin/admin-ui";

type About = {
  description: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
};

const defaults: About = {
  description: "",
  stat1Value: "5+", stat1Label: "Years of Experience",
  stat2Value: "95%", stat2Label: "Client Satisfaction",
  stat3Value: "250+", stat3Label: "Appointments",
};

const statDefs: [keyof About, keyof About, string][] = [
  ["stat1Value", "stat1Label", "Stat 1"],
  ["stat2Value", "stat2Label", "Stat 2"],
  ["stat3Value", "stat3Label", "Stat 3"],
];

export default function AboutAdmin({ initial }: { initial: About | null }) {
  const [form, setForm] = useState<About>(initial ?? defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: keyof About, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <AdminPageShell title="About Section" description="Edit the studio description and key statistics">
      <div className="max-w-2xl flex flex-col gap-5">
        <Card>
          <SectionHeading>Studio Description</SectionHeading>
          <Field label="About Text">
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Tell visitors about Samiyya Studio…"
              className="min-h-36"
            />
          </Field>
        </Card>

        <Card>
          <SectionHeading>Statistics</SectionHeading>
          <div className="grid grid-cols-3 gap-4">
            {statDefs.map(([valKey, labelKey, title]) => (
              <div key={valKey} className="flex flex-col gap-3 p-4 rounded-xl" style={{ background: "rgba(155,109,255,0.04)", border: "1px dashed rgba(155,109,255,0.2)" }}>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#9b6dff" }}>{title}</p>
                <Field label="Value">
                  <Input value={form[valKey]} onChange={(e) => set(valKey, e.target.value)} placeholder="e.g. 5+" />
                </Field>
                <Field label="Label">
                  <Input value={form[labelKey]} onChange={(e) => set(labelKey, e.target.value)} placeholder="e.g. Years" />
                </Field>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <PrimaryBtn onClick={save} disabled={saving}>
            {saving ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Saving…
              </>
            ) : "Save Changes"}
          </PrimaryBtn>
          <SavedBadge show={saved} />
        </div>
      </div>
    </AdminPageShell>
  );
}
