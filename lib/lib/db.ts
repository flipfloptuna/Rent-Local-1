import { Client } from "pg";

export async function ensureSchema() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);

  await client.end();
}
