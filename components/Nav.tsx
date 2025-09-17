// components/Nav.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-bold">Rent Local</Link>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/browse" className="hover:underline">Browse</Link>
          <Link href="/list" className="hover:underline">Post</Link>
          <Link href="/feedback" className="hover:underline">Feedback</Link>

          {email ? (
            // v4: simplest, use the built-in sign-out page
            <Link href="/api/auth/signout" className="rounded-xl border px-3 py-1.5">
              Sign out
            </Link>
          ) : (
            // v4: built-in sign-in page for GitHub
            <Link href="/api/auth/signin" className="rounded-xl border px-3 py-1.5 bg-black text-white">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
