"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200">
      {/* Top bar */}
      <div className="container-narrow flex items-center justify-between py-3">
        {/* Logo + title */}
        <Link href="/" className="flex items-center gap-3">
          {/* Responsive logo: smaller on mobile, bigger on md+/lg+ */}
          <Image
            src="/logo.png"
            alt="Rent Local logo"
            width={56}         // mobile
            height={56}
            priority
            className="md:hidden"
          />
          <Image
            src="/logo.png"
            alt="Rent Local logo"
            width={80}         // tablet
            height={80}
            priority
            className="hidden md:block lg:hidden"
          />
          <Image
            src="/logo.png"
            alt="Rent Local logo"
            width={120}        // desktop
            height={120}
            priority
            className="hidden lg:block"
          />

          <div className="leading-tight">
            <div className="font-extrabold text-xl md:text-2xl lg:text-3xl text-[#0F2940]">
              Rent Local
            </div>
            {/* Hide the tiny slogan on very small screens to prevent wrapping */}
            <div className="hidden sm:block text-xs md:text-sm text-slate-600">
              Borrow. Don’t buy.
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Browse</Link>
          <Link href="/list" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">List an item</Link>
          <Link href="/waitlist" className="text-sm md:text-base text-slate-700 hover:text-[#F59E0B]">Waitlist</Link>
          <a href="#" className="btn btn-primary px-4 md:px-5 py-2 md:text-base text-sm">Sign in</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2"
          onClick={() => setOpen(!open)}
        >
          {/* simple hamburger icon */}
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-slate-800"></span>
            <span className="block h-0.5 w-5 bg-slate-800"></span>
            <span className="block h-0.5 w-5 bg-slate-800"></span>
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
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
