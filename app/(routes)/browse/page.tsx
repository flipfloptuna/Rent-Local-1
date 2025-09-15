// app/(routes)/browse/page.tsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { headers } from 'next/headers';

function baseUrl() {
  const h = headers();
  const host = h.get('host') || '';
  const proto =
    h.get('x-forwarded-proto') ||
    (process.env.VERCEL ? 'https' : 'http');
  return `${proto}://${host}`;
}

async function getListings() {
  try {
    const res = await fetch(`${baseUrl()}/api/listings?status=published`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    return await res.json();
  } catch (e: any) {
    return { __error: e?.message || 'Failed to load listings' };
  }
}

export default async function BrowsePage() {
  const data = await getListings();

  if (data && typeof data === 'object' && !Array.isArray(data) && (data as any).__error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Browse</h1>
        <div className="rounded-lg border p-4 bg-white">
          <div className="font-semibold mb-2">Couldn’t load listings</div>
          <pre className="text-sm whitespace-pre-wrap text-red-600">{(data as any).__error}</pre>
        </div>
      </div>
    );
  }

  const listings: any[] = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse</h1>
      {listings.length === 0 ? (
        <p>No published listings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => {
            const img = Array.isArray(l?.images) && l.images.length ? l.images[0] : null;
            return (
              <Link key={l.id} href={`/item/${l.id}`} className="border rounded-xl p-4 bg-white block hover:shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img ? <img src={img} alt={l.title || 'listing'} className="w-full h-44 object-cover rounded-lg mb-3" /> : null}
                <h2 className="font-semibold">{l?.title ?? 'Untitled'}</h2>
                <div className="text-sm text-gray-600">{l?.location ?? ''}</div>
                <div className="font-bold mt-1">{typeof l?.pricePerDay === 'number' ? `$${l.pricePerDay}/day` : ''}</div>
                <div className="text-xs text-gray-500 mt-1">{l?.category ?? ''}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
