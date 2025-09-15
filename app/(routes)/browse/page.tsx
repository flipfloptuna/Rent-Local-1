export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';

function getBaseUrl() {
  // Use public env if provided; otherwise derive from request headers
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const h = headers();
  const host = h.get('host') || '';
  const proto = process.env.VERCEL ? 'https' : 'http';
  return `${proto}://${host}`;
}

async function getListings() {
  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/listings?status=published`, { cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }
    return await res.json();
  } catch (e: any) {
    return { __error: e?.message || 'Failed to load listings' };
  }
}

export default async function BrowsePage() {
  const data = await getListings();

  if (data && typeof data === 'object' && !Array.isArray(data) && data.__error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Browse</h1>
        <div className="rounded-lg border p-4 bg-white">
          <div className="font-semibold mb-2">Couldn’t load listings</div>
          <pre className="text-sm whitespace-pre-wrap text-red-600">{data.__error}</pre>
          <div className="text-sm mt-2 text-gray-600">Try again in a moment.</div>
        </div>
      </div>
    );
  }

  const listings = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse</h1>
      {listings.length === 0 ? (
        <p>No published listings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l: any) => {
            const firstImage =
              Array.isArray(l?.images) && l.images.length ? l.images[0] : null;

            return (
              <div key={l.id} className="border rounded-xl p-4 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {firstImage ? (
                  <img
                    src={firstImage}
                    alt={l.title || 'listing'}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                  />
                ) : null}
                <h2 className="font-semibold">{l?.title ?? 'Untitled'}</h2>
                <div className="text-sm text-gray-600">{l?.location ?? ''}</div>
                <div className="font-bold mt-1">
                  {typeof l?.pricePerDay === 'number' ? `$${l.pricePerDay}/day` : ''}
                </div>
                <div className="text-xs text-gray-500 mt-1">{l?.category ?? ''}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
