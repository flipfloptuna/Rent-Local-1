"use client";

import { useState } from "react";

// ── SIMPLE COUNTER (manual for now) ────────────────────────────────
// Change this number whenever you want to reflect your current sign-up count.
// Later we can wire this to Google Sheets / DB automatically.
const CURRENT_SIGNUPS = 8;
const OFFER_LIMIT = 25;

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // TODO: replace with your own Formspree endpoint
  const FORMSPREE = "https://formspree.io/f/mblabqjk";

  const spotsLeft = Math.max(OFFER_LIMIT - CURRENT_SIGNUPS, 0);
  const pct = Math.min((CURRENT_SIGNUPS / OFFER_LIMIT) * 100, 100);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        email,
        zip,
        name,
        phone,
        offer: "first-25-free-listing",   // <- flag so you can find them later
        source: "rent-local-waitlist"
      };

      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        window.location.href = "/waitlist/success";
      } else {
        alert("Something went wrong. Try again?");
      }
    } catch {
      alert("Network error. Try again?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">A local marketplace to rent what you need, share what you don’t.</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-navy">
          Rent items from people in your community
        </h1>
        <p className="text-lg text-slate-700">
          Join the waitlist for early access to listings and bookings.
        </p>
      </div>

      {/* SPECIAL OFFER CARD */}
      <div className="card p-5 md:p-6 bg-orange-50 border-orange-200">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-full bg-brand-orange/20 w-10 h-10 grid place-items-center text-brand-orange font-bold">
            🎁
          </div>
          <div className="grow">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg md:text-xl font-semibold text-brand-navy">
                First {OFFER_LIMIT} sign-ups get <span className="underline">free listing fees</span> for 1 item
              </h3>
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                {spotsLeft} spots left
              </span>
            </div>

            <div className="mt-2 h-2 w-full rounded-full bg-white/70 border border-orange-200 overflow-hidden">
              <div
                className="h-full bg-brand-orange"
                style={{ width: `${pct}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Good for your first published listing within 60 days of launch. Local policies and approval apply.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={onSubmit} className="card p-5 md:p-6 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="rounded-xl border border-slate-300 px-4 py-3"
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-300 px-4 py-3"
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-[1fr,160px,160px] gap-3">
          <input
            className="rounded-xl border border-slate-300 px-4 py-3"
            type="email"
            required
            placeholder="Email for early access"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-300 px-4 py-3"
            type="text"
            inputMode="numeric"
            pattern="\d{5}"
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button className="btn btn-primary px-6 py-3" disabled={submitting}>
            {submitting ? "Joining…" : "Join Waitlist"}
          </button>
        </div>
      </form>

      <p className="text-xs text-slate-500">
        We’ll email you only about Rent Local. Unsubscribe anytime.
      </p>
    </div>
  );
}
