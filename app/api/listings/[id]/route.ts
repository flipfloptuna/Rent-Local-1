// app/api/listings/[id]/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  try {
    const id = ctx.params?.id;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const db = getDb();
    const { rows } = await db.query(
      `SELECT id,
              title,
              category,
              price_per_day AS "pricePerDay",
              location,
              description,
              images,
              status,
              created_at
         FROM listings
        WHERE id = $1
        LIMIT 1`,
      [id]
    );

    if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 });
  }
}
