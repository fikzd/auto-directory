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
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  category?: string;
};

export default function SFPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // call your RPC: shops_by_city(city, state, search, page, page_size)
      const { data, error } = await supabase.rpc('shops_by_city', {
        city: 'San Francisco',
        state: 'CA',
        search: null,
        page: 1,
        page_size: 20,
      });
      if (error) {
        console.error('Supabase error:', error);
      }
      setShops((data as Shop[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-semibold">San Francisco Auto Shops</h1>
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
            <a className="underline" href={s.website} target="_blank" rel="noreferrer">
              Website →
            </a>
          )}
        </div>
      ))}
      {shops.length === 0 && <p>No shops found.</p>}
    </main>
  );
}
