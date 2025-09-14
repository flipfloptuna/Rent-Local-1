import { NextResponse } from "next/server";
import { Client } from "pg";
import { ensureSchema } from "../../../lib/db";

export async function GET() {
  try {
    await ensureSchema();
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    const r = await client.query("SELECT COUNT(*) FROM listings;");
    await client.end();
    return NextResponse.json({ ok: true, listingsCount: r.rows[0].count });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
