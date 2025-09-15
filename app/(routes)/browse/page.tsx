export const dynamic = 'force-dynamic';

async function getListings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/listings?status=published`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BrowsePage() {
  const listings = await getListings();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse</h1>

      {listings.length === 0 ? (
        <p>No published listings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l: any) => {
            const firstImage =
              Array.isArray(l?.images) && l.images.length > 0
                ? l.images[0]
                : null;

            return (
              <div key={l.id} className="border rounded-xl p-4 bg-white">
                {firstImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={firstImage}
                    alt={l.title || 'Listing'}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                  />
                )}

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
