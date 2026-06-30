"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import {
  Card, Field, Input, PrimaryBtn, SecondaryBtn, DangerBtn, EditBtn, EmptyState, SectionHeading, SavedBadge, adminFetch,
} from "@/components/admin/admin-ui";

type ContactInfo = {
  phone: string; phoneHref: string;
  address: string; mapUrl: string;
  instagram: string; tiktok: string; facebook: string;
};
type WorkHour = { _id: string; day: string; openTime: string; closeTime: string; order: number };

const hourEmpty = { day: "", openTime: "9:00 AM", closeTime: "6:00 PM", order: 0 };

function digitsFromHref(href: string): string {
  const match = href.match(/tel:\+?1?(\d+)/);
  return match ? match[1] : href.replace(/^tel:\+?1?/, "").replace(/\D/g, "");
}

const otherContactFields: [keyof ContactInfo, string][] = [
  ["address", "Full Address"],
  ["mapUrl", "Google Maps URL"],
  ["instagram", "Instagram URL"],
  ["tiktok", "TikTok URL"],
  ["facebook", "Facebook URL"],
];

export default function ContactAdmin({
  initial,
}: {
  initial: { info: ContactInfo; hours: WorkHour[] } | null;
}) {
  const [info, setInfo] = useState<ContactInfo>(
    initial?.info ?? {
      phone: "347-612-7994", phoneHref: "tel:+13476127994",
      address: "4624 Chatsworth Ave zip 15207, Pennsylvania, Pittsburgh",
      mapUrl: "https://maps.google.com/?q=4624+Chatsworth+Ave+Pittsburgh+PA+15207",
      instagram: "https://www.instagram.com/samiyya.studio",
      tiktok: "https://www.tiktok.com/@samiyya.studio",
      facebook: "https://www.facebook.com/samiyya.studio",
    }
  );
  const [phoneDigits, setPhoneDigits] = useState(() =>
    digitsFromHref(initial?.info?.phoneHref ?? "tel:+13476127994")
  );
  const [hours, setHours] = useState<WorkHour[]>(initial?.hours ?? []);
  const [hourForm, setHourForm] = useState(hourEmpty);
  const [editHourId, setEditHourId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handlePhoneChange(digits: string) {
    const clean = digits.replace(/\D/g, "").slice(0, 10);
    setPhoneDigits(clean);
    const display = clean.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    setInfo((prev) => ({
      ...prev,
      phone: display || clean,
      phoneHref: clean ? `tel:+1${clean}` : "",
    }));
  }

  async function saveInfo() {
    setSaving(true);
    const ok = await adminFetch("/api/admin/contact", { method: "PUT", body: JSON.stringify(info) }, "Saved successfully");
    setSaving(false);
    if (ok !== null) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  }

  async function saveHour() {
    if (editHourId) {
      const updated = await adminFetch<WorkHour>("/api/admin/work-hours", { method: "PUT", body: JSON.stringify({ id: editHourId, ...hourForm }) }, "Updated successfully");
      if (updated) { setHours((p) => p.map((h) => (h._id === editHourId ? updated : h))); setEditHourId(null); }
    } else {
      const item = await adminFetch<WorkHour>("/api/admin/work-hours", { method: "POST", body: JSON.stringify({ ...hourForm, order: hours.length }) }, "Added successfully");
      if (item) setHours((p) => [...p, item]);
    }
    setHourForm(hourEmpty);
  }

  async function delHour(id: string) {
    const ok = await adminFetch("/api/admin/work-hours", { method: "DELETE", body: JSON.stringify({ id }) }, "Deleted successfully", "delete");
    if (ok !== null) setHours((p) => p.filter((h) => h._id !== id));
  }

  return (
    <AdminPageShell title="Contact" description="Manage contact info, social links, and working hours">
      <div className="flex flex-col gap-5 max-w-3xl">
        {/* Contact Info */}
        <Card>
          <SectionHeading>Contact Information</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone number — auto-formats display + href */}
            <Field label="Phone Number">
              <div className="relative">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium select-none pointer-events-none"
                  style={{ color: "#7c4dcc" }}
                >
                  +1
                </span>
                <Input
                  value={phoneDigits}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="3476127994"
                  className="pl-9"
                  inputMode="numeric"
                  maxLength={10}
                />
              </div>
              <p className="text-[11px] mt-1" style={{ color: "#9b6dff" }}>
                Display: <span className="font-mono">{info.phone}</span> · Link: <span className="font-mono">{info.phoneHref}</span>
              </p>
            </Field>

            {/* Other fields */}
            {otherContactFields.map(([key, label]) => (
              <Field key={key} label={label}>
                <Input value={info[key]} onChange={(e) => setInfo({ ...info, [key]: e.target.value })} />
              </Field>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-5">
            <PrimaryBtn onClick={saveInfo} disabled={saving}>
              {saving ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Saving…
                </>
              ) : "Save Contact Info"}
            </PrimaryBtn>
            <SavedBadge show={saved} />
          </div>
        </Card>

        {/* Work Hours */}
        <Card>
          <SectionHeading>Working Hours</SectionHeading>

          {/* Add/Edit form */}
          <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(155,109,255,0.04)", border: "1px dashed rgba(155,109,255,0.2)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9b6dff" }}>
              {editHourId ? "Edit Day" : "Add Day"}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Day">
                <Input value={hourForm.day} onChange={(e) => setHourForm({ ...hourForm, day: e.target.value })} placeholder="e.g. Mon–Fri" />
              </Field>
              <Field label="Opens">
                <Input value={hourForm.openTime} onChange={(e) => setHourForm({ ...hourForm, openTime: e.target.value })} placeholder="9:00 AM" />
              </Field>
              <Field label="Closes">
                <Input value={hourForm.closeTime} onChange={(e) => setHourForm({ ...hourForm, closeTime: e.target.value })} placeholder="6:00 PM" />
              </Field>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <PrimaryBtn onClick={saveHour} disabled={!hourForm.day}>
                {editHourId ? "Update" : "Add Day"}
              </PrimaryBtn>
              {editHourId && (
                <SecondaryBtn onClick={() => { setEditHourId(null); setHourForm(hourEmpty); }}>Cancel</SecondaryBtn>
              )}
            </div>
          </div>

          {/* Hours list */}
          {hours.length === 0 ? (
            <EmptyState label="No work hours added yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {hours.map((h) => (
                <div
                  key={h._id}
                  className="rounded-xl p-4 flex items-center justify-between gap-3"
                  style={{ background: "rgba(155,109,255,0.04)", border: "1px solid rgba(155,109,255,0.1)" }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1e1030" }}>{h.day}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b5f80" }}>{h.openTime} — {h.closeTime}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <EditBtn onClick={() => { setEditHourId(h._id); setHourForm({ day: h.day, openTime: h.openTime, closeTime: h.closeTime, order: h.order }); }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </EditBtn>
                    <DangerBtn onClick={() => delHour(h._id)}>
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
        </Card>
      </div>
    </AdminPageShell>
  );
}
