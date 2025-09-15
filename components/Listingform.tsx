"use client";

import { useState } from "react";

type Form = {
  title: string;
  category: string;
  pricePerDay: string;
  location: string;
  description: string;
  status: "draft" | "published";
  images: string[];
};

export default function ListingForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    category: "tools",
    pricePerDay: "",
    location: "Moyock, NC",
    description: "",
    status: "draft",
    images: [],
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET!;

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", unsignedPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok || !data.secure_url) throw new Error(data.error?.message || "Upload failed");
        urls.push(data.secure_url as string);
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      setMsg(`Uploaded ${urls.length} image${urls.length > 1 ? "s" : ""}.`);
    } catch (e: any) {
      setMsg(e?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const payload = {
        title: form.title.trim(),
        category: form.category,
        pricePerDay: Number(form.pricePerDay),
        location: form.location.trim(),
        description: form.description.trim(),
        images: form.images,
        status: form.status,
      };
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg(form.status === "published" ? "Published!" : "Saved as draft.");
      setForm({
        title: "",
        category: "tools",
        pricePerDay: "",
        location: "Moyock, NC",
        description: "",
        status: "draft",
        images: [],
      });
    } catch (e: any) {
      setMsg(e?.message || "Failed to save listing");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="mt-1 w-full rounded-xl border p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            placeholder="Kioti CS2220 Tractor + Loader"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="mt-1 w-full rounded-xl border p-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="tools">Tools</option>
            <option value="vehicles">Vehicles</option>
            <option value="lodging">Lodging</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Daily price (USD)</label>
          <input
            type="number"
            min={0}
            step="1"
            className="mt-1 w-full rounded-xl border p-2"
            value={form.pricePerDay}
            onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            required
            placeholder="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-1 w-full rounded-xl border p-2"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            placeholder="City, State"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-2 min-h-28"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            placeholder="Specs, delivery info, requirements, etc."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="mt-1"
            onChange={(e) => handleUpload(e.target.files)}
          />
          {form.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {form.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`img-${i}`} className="h-28 w-full object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="mt-1 w-full rounded-xl border p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {msg && <div className="text-sm">{msg}</div>}

      <button
        type="submit"
        disabled={busy}
        className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
      >
        {busy ? "Saving..." : form.status === "published" ? "Publish" : "Save Draft"}
      </button>
    </form>
  );
}
