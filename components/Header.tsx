// components/Header.tsx (safe version – no server session)
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-bold">Rent Local</Link>

        <nav className="ml-auto flex items-center gap-3">
          <Link href="/browse" className="hover:underline">Browse</Link>
          <Link href="/list" className="hover:underline">Post</Link>
          <Link href="/feedback" className="hover:underline">Feedback</Link>

          {/* Use plain anchors for NextAuth route handlers */}
          <a href="/api/auth/signin" className="rounded-xl border px-3 py-1.5 bg-black text-white">
            Sign in
          </a>
          <a href="/api/auth/signout" className="rounded-xl border px-3 py-1.5">
            Sign out
          </a>
        </nav>
      </div>
    </header>
  );
}
