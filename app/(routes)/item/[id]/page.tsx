"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import items from "../../../../lib/items.json";
import RequestModal from "../../../../components/RequestModal";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const item = (items as any[]).find((it) => it.id === params.id);
  const [open, setOpen] = useState(false);

  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Item not found</h1>
        <Link className="btn" href="/browse">Back to browse</Link>
      </div>
    );
  }

  // If you added multiple images to items.json (images: []), use them; else fall back to single image
  const gallery: string[] = (item as any).images?.length ? (item as any).images : [item.image];
  const [idx, setIdx] = useState(0);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT: main image + thumbnails (works with single or multiple images) */}
        <div className="space-y-3">
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image src={gallery[idx]} alt={item.title} fill className="object-cover" />
            </div>
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  className={`relative h-20 w-28 rounded-lg overflow-hidden border ${i===idx ? "border-brand-orange" : "border-slate-200"}`}
                  aria-label={`Thumbnail ${i+1}`}
                >
                  <Image src={src} alt={`${item.title} ${i+1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: details + actions */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <p className="text-slate-600">{item.category} · {item.location}</p>
          <div className="text-2xl font-bold">${item.pricePerDay}/day</div>
          <div className="flex gap-3 pt-2">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Request to rent
            </button>
            <Link className="btn" href="/browse">Back to browse</Link>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-sm text-slate-700">
              Owner-provided details coming soon. For now this is a static mock page.
            </p>
          </div>
        </div>
      </div>

      {/* Modal that submits to Formspree */}
      <RequestModal open={open} onClose={() => setOpen(false)} itemTitle={item.title} />
    </>
  );
}
