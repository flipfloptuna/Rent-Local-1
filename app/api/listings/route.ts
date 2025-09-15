// app/api/listings/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getDb } from '../../../lib/db'
import crypto from 'node:crypto'

async function ensureSchema() {
  const db = getDb()
  await db.query(`
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      price_per_day INTEGER NOT NULL,
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      images JSONB,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `)
}

export async function GET(request: Request) {
  try {
    await ensureSchema()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // optional: 'draft' | 'published'
    const db = getDb()
    const sql =
      status === 'draft' || status === 'published'
        ? `SELECT id, title, category, price_per_day AS "pricePerDay", location, description, images, status, created_at
           FROM listings WHERE status = $1 ORDER BY created_at DESC`
        : `SELECT id, title, category, price_per_day AS "pricePerDay", location, description, images, status, created_at
           FROM listings ORDER BY created_at DESC`
    const args = status === 'draft' || status === 'published' ? [status] : []
    const { rows } = await db.query(sql, args)
    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed to load' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await ensureSchema()
    const body = await request.json()
    const { title, category, pricePerDay, location, description, images = [], status = 'draft' } = body || {}

    if (
      !title || !category || !location || !description ||
      typeof pricePerDay !== 'number' || Number.isNaN(pricePerDay)
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    const db = getDb()
    await db.query(
      `INSERT INTO listings
       (id, title, category, price_per_day, location, description, images, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id, title, category, pricePerDay, location, description, JSON.stringify(images), status]
    )

    return NextResponse.json({ id, ok: true }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed to create' }, { status: 500 })
  }
}
