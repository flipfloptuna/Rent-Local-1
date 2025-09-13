"use client";

import { useState } from "react";

export default function RequestModal({
  open,
  onClose,
  itemTitle,
}: {
  open: boolean;
  onClose: () => void;
  itemTitle: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Replace with your Formspree endpoint
  const FORMSPREE = "https://formspree.io/f/YOUR-FORM-ID";

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const payload = { item: itemTitle, name, email, phone, dates, delivery };
    const ok = await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(r => r.ok).catch(() => false);
    setSubmitting(false);
    if (ok) {
      onClose();
      alert("Request sent! We’ll get back to you shortly.");
    } else {
      alert("Something went wrong — please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4">
      <div className="card w-full max-w-lg p-6 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Request to rent — {itemTitle}</h3>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input className="w-full rounded-xl border px-4 py-2" placeholder="Your name"
                 value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full rounded-xl border px-4 py-2" type="email" required placeholder="Email"
                 value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full rounded-xl border px-4 py-2" placeholder="Phone"
                 value={phone} onChange={e=>setPhone(e.target.value)} />
          <input className="w-full rounded-xl border px-4 py-2" placeholder="Requested dates"
                 value={dates} onChange={e=>setDates(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={delivery} onChange={e=>setDelivery(e.target.checked)} />
            Delivery within 15 miles ($80 incl. pickup)
          </label>
          <button className="btn btn-primary" disabled={submitting}>
            {submitting ? "Sending…" : "Send request"}
          </button>
        </form>
      </div>
    </div>
  );
}
