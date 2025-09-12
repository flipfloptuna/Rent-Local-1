import Image from "next/image";
import Link from "next/link";
import items from "../../../../lib/items.json";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const item = items.find((it) => it.id === params.id);
  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Item not found</h1>
        <Link className="btn" href="/browse">Back to browse</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card overflow-hidden">
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{item.title}</h1>
        <p className="text-slate-600">{item.category} · {item.location}</p>
        <div className="text-2xl font-bold">${item.pricePerDay}/day</div>
        <div className="flex gap-3 pt-2">
          <button className="btn btn-primary">Request to rent</button>
          <Link className="btn" href="/browse">Back to browse</Link>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-sm text-slate-700">
            Owner-provided details coming soon. For now this is a static mock page.
          </p>
        </div>
      </div>
    </div>
  );
}
