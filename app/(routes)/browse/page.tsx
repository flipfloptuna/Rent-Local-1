"use client";

import { useMemo, useState } from "react";
import { ItemCard } from "../../../components/ItemCard";
import items from "../../../lib/items.json";

export default function BrowsePage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return items.filter((it) =>
      it.title.toLowerCase().includes(query) ||
      it.category.toLowerCase().includes(query) ||
      it.location.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Browse items</h1>
      <div className="card p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, category, or location…"
          className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((it) => (
          <ItemCard key={it.id} item={it} />
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-600">No items found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
