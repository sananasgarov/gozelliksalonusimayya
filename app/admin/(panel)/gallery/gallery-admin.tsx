"use client";

import { useState } from "react";
import AdminPageShell from "@/components/admin/page-shell";
import ImageUpload from "@/components/admin/image-upload";
import { Card, DangerBtn, EmptyState, Field, Input, adminFetch } from "@/components/admin/admin-ui";

type GalleryItem = { _id: string; imageUrl: string; altText: string; order: number };

export default function GalleryAdmin({ initial }: { initial: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [saving, setSaving] = useState(false);

  async function addItem(url: string) {
    setSaving(true);
    const item = await adminFetch<GalleryItem>("/api/admin/gallery", {
      method: "POST",
      body: JSON.stringify({ imageUrl: url, altText: "", order: items.length }),
    }, "Photo added");
    if (item) setItems((prev) => [...prev, item]);
    setSaving(false);
  }

  async function deleteItem(id: string) {
    setSaving(true);
    const ok = await adminFetch("/api/admin/gallery", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }, "Photo deleted", "delete");
    if (ok !== null) setItems((prev) => prev.filter((i) => i._id !== id));
    setSaving(false);
  }

  async function updateAlt(id: string, altText: string) {
    const ok = await adminFetch("/api/admin/gallery", {
      method: "PUT",
      body: JSON.stringify({ id, altText }),
    }, "Updated successfully");
    if (ok !== null) setItems((prev) => prev.map((i) => (i._id === id ? { ...i, altText } : i)));
  }

  return (
    <AdminPageShell title="Gallery" description={`${items.length} photo${items.length !== 1 ? "s" : ""} in the portfolio`}>
      <Card className="mb-6">
        <Field label="Add New Photo">
          <div className="mt-1">
            <ImageUpload onUploaded={addItem} disabled={saving} label="Upload Photo" />
          </div>
        </Field>
      </Card>

      {items.length === 0 ? (
        <EmptyState label="No gallery images yet. Upload one above." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="group rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.altText} className="w-full h-44 object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(30,16,48,0.4)" }}>
                  <DangerBtn onClick={() => deleteItem(item._id)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    Delete
                  </DangerBtn>
                </div>
              </div>
              <div className="p-3">
                <Input
                  placeholder="Alt text (for SEO)"
                  defaultValue={item.altText}
                  onBlur={(e) => updateAlt(item._id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPageShell>
  );
}
