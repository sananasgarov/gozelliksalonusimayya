"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import { Card, Field, Input, Textarea, PrimaryBtn, SavedBadge, SectionHeading, adminFetch } from "@/components/admin/admin-ui";

type Hero = { title: string; subtitle: string; buttonText: string; videoUrl: string };

export default function HeroAdmin({ initial }: { initial: Hero | null }) {
  const defaultHero = {
    title: "Where Beauty Meets Elegance",
    subtitle: "Experience refined beauty services crafted for confidence, elegance, and individuality.",
    buttonText: "Book Now",
    videoUrl: "/home1.mp4",
  };
  const [form, setForm] = useState<Hero>(initial ?? defaultHero);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    const ok = await adminFetch("/api/admin/hero", { method: "PUT", body: JSON.stringify(form) }, "Saved successfully");
    setSaving(false);
    if (ok !== null) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  }

  return (
    <AdminPageShell title="Hero Section" description="Customize the homepage banner headline and background video">
      <div className="max-w-2xl">
        <Card>
          <SectionHeading>Content</SectionHeading>
          <div className="flex flex-col gap-4">
            <Field label="Main Headline">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Subtitle">
              <Textarea value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </Field>
            <Field label="Button Text">
              <Input value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} />
            </Field>

<div className="flex items-center gap-4 pt-2">
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
        </Card>
      </div>
    </AdminPageShell>
  );
}
