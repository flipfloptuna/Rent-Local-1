import Image from "next/image";
import Link from "next/link";

type Item = {
  id: string;
  title: string;
  category: string;
  pricePerDay: number;
  image: string;
  location: string;
};

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        <span className="badge absolute left-3 top-3 bg-white/90 border-slate-200 text-slate-700">{item.category}</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{item.title}</h3>
          <div className="text-sm font-semibold">${item.pricePerDay}/day</div>
        </div>
        <p className="text-sm text-slate-600">{item.location}</p>
        <div className="flex gap-2 pt-2">
          <Link className="btn btn-primary" href={`/item/${item.id}`}>Details</Link>
          <a className="btn" href="#">Share</a>
        </div>
      </div>
    </div>
  );
}
