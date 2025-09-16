// app/(routes)/item/[id]/page.tsx
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { headers } from 'next/headers';

function baseUrl() {
  const h = headers();
  const host = h.get('host') || '';
  const proto = h.get('x-forwarded-proto') || (process.env.VERCEL ? 'https' : 'http');
  return `${proto}://${host}`;
}

async function getListing(id: string) {
  const res = await fetch(`${baseUrl()}/api/listings/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const l = await getListing(params.id);

  if (!l) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Item not found</h1>
        <Link href="/browse" className="px-3 py-2 rounded bg-slate-200">
          Back to browse
        </Link>
      </div>
    );
  }

  const images: string[] = Array.isArray(l?.images) ? l.images : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold">{l.title}</h1>
      <div className="mt-2 text-gray-600">
        {l.location} · {typeof l.pricePerDay === 'number' ? `$${l.pricePerDay}/day` : ''}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-12">
        <div className="md:col-span-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {images[0] ? (
            <img
              src={images[0]}
              alt={l.title}
              className="w-full h-[380px] object-cover rounded-2xl bg-gray-100"
            />
          ) : (
            <div className="w-full h-[380px] rounded-2xl bg-gray-100 grid place-items-center text-gray-500">
              No photo
            </div>
          )}
        </div>
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3">
          {images.slice(1, 5).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${l.title} ${i + 2}`}
              className="w-full h-40 object-cover rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-800 whitespace-pre-line">{l.description}</p>
        </div>
        <aside className="md:col-span-1">
          <div className="rounded-2xl border p-4 bg-white">
            <div className="text-xl font-bold">
              {typeof l.pricePerDay === 'number' ? `$${l.pricePerDay}` : ''}
              <span className="text-sm font-normal"> /day</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
