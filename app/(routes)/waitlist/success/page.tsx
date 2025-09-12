import Link from "next/link";
export default function Success() {
  return (
    <div className="max-w-lg mx-auto card p-8 space-y-4 text-center">
      <h1 className="text-2xl font-semibold">You’re on the list! 🎉</h1>
      <p className="text-slate-600">Thanks for joining the waitlist. We’ll email you when we open in your area.</p>
      <div className="flex justify-center gap-3">
        <Link className="btn" href="/browse">See demo listings</Link>
        <Link className="btn btn-primary" href="/">Go home</Link>
      </div>
    </div>
  );
}
