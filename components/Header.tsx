import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container-narrow flex items-center justify-between py-4">
        {/* Logo section */}
        <Link href="/" className="flex items-center gap-6">
          <Image
            src="/logo.png"
            alt="Rent Local"
            width={160}
            height={160}
            priority
            className="drop-shadow-md"
          />
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-brand-navy">
              Rent Local
            </span>
            <span className="text-lg text-slate-600">
              Borrow. Don’t buy.
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/browse"
            className="text-lg font-medium text-slate-700 hover:text-brand-orange"
          >
            Browse
          </Link>
          <Link
            href="/list"
            className="text-lg font-medium text-slate-700 hover:text-brand-orange"
          >
            List an Item
          </Link>
          <Link
            href="/waitlist"
            className="text-lg font-medium text-slate-700 hover:text-brand-orange"
          >
            Waitlist
          </Link>
          <a
            href="#"
            className="btn btn-primary px-6 py-3 text-lg"
          >
            Sign In
          </a>
        </nav>
      </div>
    </header>
  );
}
