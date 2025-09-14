import { Client } from "pg";

function getDbUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set in env");
  return url;
}

export async function ensureSchema() {
  const client = new Client({ connectionString: getDbUrl() });
  await client.connect();

  // Enable pgcrypto so gen_random_uuid() works everywhere
  await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS listings (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      price_per_day INT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      images TEXT[] NOT NULL DEFAULT '{}',
      supports_delivery BOOLEAN NOT NULL DEFAULT false,
      status TEXT NOT NULL DEFAULT 'published',
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await client.end();
}
