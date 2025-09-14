// lib/db.ts
import { Pool } from 'pg'

let _pool: Pool | null = null

export function getDb() {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // required for most managed Postgres (e.g. Vercel, Supabase, Neon)
    })
  }
  return _pool
}
