'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Shop = {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  website?: string | null;
  category?: string | null;
};

export default function SFPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      // Direct table read (first 20 for SF, CA)
      const { data, error } = await supabase
        .from('shops')
        .select('id,name,address,city,state,phone,website,category')
        .eq('city', 'San Francisco')
        .eq('state', 'CA')
        .order('name', { ascending: true })
        .range(0, 19);

      if (error) {
        console.error('Supabase error:', error);
        setErr(error.message);
      } else {
        setShops((data as Shop[]) ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-semibold">San Francisco Auto Shops</h1>

      {loading && <div>Loading…</div>}
      {!loading && err && (
        <div className="text-red-400">Error: {err}</div>
      )}

      {!loading && !err && shops.length === 0 && (
        <p>No shops found.</p>
      )}

      {!loading && !err && shops.length > 0 && (
        <div className="space-y-4">
          {shops.map((s) => (
            <div key={s.id} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                {s.category && (
                  <span className="text-xs rounded-full px-3 py-1 border opacity-70">
                    {s.category}
                  </span>
                )}
              </div>
              <p className="opacity-75">
                {s.address ? `${s.address}, ` : ''}
                {s.city}, {s.state}
              </p>
              {s.phone && <p className="opacity-75">{s.phone}</p>}
              {s.website && (
                <a
                  className="underline"
                  href={s.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
