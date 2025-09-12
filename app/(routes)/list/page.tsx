"use client";

import { useState } from "react";
import Link from "next/link";

export default function ListItemPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">List an item</h1>
      {!submitted ? (
        <form
          className="card p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="block text-sm text-slate-600">Title</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Category</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600">Daily price ($)</label>
              <input type="number" min="0" className="w-full rounded-xl border border-slate-300 px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Deposit ($)</label>
              <input type="number" min="0" className="w-full rounded-xl border border-slate-300 px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Description</label>
            <textarea className="w-full rounded-xl border border-slate-300 px-4 py-2 h-28" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Photos</label>
            <input type="file" multiple className="w-full rounded-xl border border-slate-300 px-4 py-2" />
          </div>
          <button className="btn btn-primary" type="submit">Save draft</button>
        </form>
      ) : (
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Draft saved</h2>
          <p className="text-slate-700">This is a static mock page. We can wire this to a database later.</p>
          <div className="flex gap-3">
            <Link className="btn" href="/browse">Back to browse</Link>
            <Link className="btn btn-primary" href="/">Go home</Link>
          </div>
        </div>
      )}
    </div>
  );
}
