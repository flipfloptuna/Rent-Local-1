"use client";

import Link from "next/link";
import { useState } from "react";

/** Inline SVG icon: pin + house (no slogan), scales perfectly on all screens */
function LogoMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      width="64"
      height="64"
    >
      {/* Pin shape */}
      <path
        d="M32 4c-11 0-20 9-20 20 0 12.5 13.7 25.1 19 32.2a2 2 0 0 0 3 0C38.3 49.1 52 36.5 52 24 52 13 43 4 32 4z"
        fill="#F59E0B"
      />
      {/* Inner circle */}
      <circle cx="32" cy="24" r="12" fill="#fff" />
      {/* House */}
      <path
        d="M24 30v-6.2l8-6.3 8 6.3V30h-4v-6l-4-3-4 3v6h-4z"
        fill="#0F2940"
      />
      <rect x="30.5" y="26" width="3" height="4.5" rx="0.5" fill="#0F2940" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container-narrow flex items-center justify-between py-3">
        {/* LEFT: icon + crisp wordmark (no baked-in slogan) */}
        <Link href="/" className="flex items-center gap-3">
          {/* Responsive sizes: smaller on mobile, larger on desktop */}
          <LogoMark className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
          <div className="leading-tight">
            <div className="font-extrabold text-2xl md:text-3xl text-[#0F2940]">
              Rent Local
            </div>
            {/* If you ever want a small tagline back, uncomment below:
            <div className="hidden sm:block text-sm md:text-base text-slate-600">
              Borrow. Don’t buy.
            </div>
            */}
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Browse</Link>
          <Link href="/list" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">List an item</Link>
          <Link href="/waitlist" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Waitlist</Link>
          <a href="#" className="btn btn-primary px-4 md:px-5 py-2 md:text-base text-sm">Sign in</a>
        </nav>

        {/* MOBILE HAMBURGER (unchanged) */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-slate-800"></span>
            <span className="block h-0.5 w-5 bg-slate-800"></span>
            <span className="block h-0.5 w-5 bg-slate-800"></span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU (unchanged) */}
      {open && (
        <div className="md:hidden border-t border-slate-200">
          <div className="container-narrow py-3 flex flex-col gap-2">
            <Link href="/browse" className="py-2 text-slate-800" onClick={() => setOpen(false)}>Browse</Link>
            <Link href="/list" className="py-2 text-slate-800" onClick={() => setOpen(false)}>List an item</Link>
            <Link href="/waitlist" className="py-2 text-slate-800" onClick={() => setOpen(false)}>Waitlist</Link>
            <a href="#" className="btn btn-primary mt-2 w-full justify-center" onClick={() => setOpen(false)}>
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
