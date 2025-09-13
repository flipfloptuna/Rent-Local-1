"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  // Toggle this to show/hide the small text tagline under the title
  const SHOW_TAGLINE = false;

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container-narrow flex items-center justify-between py-3">
        {/* LEFT: small logo mark + crisp text wordmark */}
        <Link href="/" className="flex items-center gap-3">
          {/* Use a transparent mark if you have it: /logo-mark.png.
             Otherwise this will fall back to /logo.png */}
          <Image
            src="/logo-mark.png"
            alt="Rent Local mark"
            width={48}
            height={48}
            priority
            onError={(e: any) => { e.currentTarget.src = "/logo.png"; }}
          />
          <div className="leading-tight">
            <div className="font-extrabold text-2xl md:text-3xl text-[#0F2940]">
              Rent Local
            </div>
            {SHOW_TAGLINE && (
              <div className="hidden sm:block text-sm md:text-base text-slate-600">
                Borrow. Don’t buy.
              </div>
            )}
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Browse</Link>
          <Link href="/list" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">List an item</Link>
          <Link href="/waitlist" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Waitlist</Link>
          <a href="#" className="btn btn-primary px-4 md:px-5 py-2 md:text-base text-sm">Sign in</a>
        </nav>

        {/* MOBILE HAMBURGER (unchanged behavior) */}
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

      {/* MOBILE DROPDOWN (unchanged) */}
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
