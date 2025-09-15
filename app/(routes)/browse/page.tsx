async function getListings() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch(`${base}/api/listings?status=published`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function BrowsePage() {
  const listings = await getListings()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse</h1>
      {listings.length === 0 ? (
        <p>No published listings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l: any) => (
            <div key={l.id} className="border rounded-xl p-4 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {Array.isArray(l.images) && l.images[0] ? (
                <img src={l.images[0]} alt={l.title} className="w-full h-44 object-cover rounded-lg mb-3" />
              ) : null}
              <h2 className="font-semibold">{l.title}</h2>
              <div className="text-sm text-gray-600">{l.location}</div>
              <div className="font-bold mt-1">${l.pricePerDay}/day</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
