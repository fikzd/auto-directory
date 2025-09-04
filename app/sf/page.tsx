'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Shop = {
  id: string;
  name: string;
  address1?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  phone?: string | null;
  website?: string | null;
  category_slug?: string | null;
};

export default function SFPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      // 1) Try RPC first (if it exists in this project)
      const rpc = await supabase.rpc('shops_by_city', {
        city: 'San Francisco',
        state: 'CA',
        search: null,
        page: 1,
        page_size: 20,
      });

      if (!rpc.error && rpc.data) {
        setShops((rpc.data as Shop[]) ?? []);
        setLoading(false);
        return;
      }

      // 2) Fallback to direct table select
      const { data, error } = await supabase
        .from('shops')
        .select(
          'id,name,address1,city,state,postal_code,phone,website,category_slug'
        )
        .eq('city', 'San Francisco')
        .eq('state', 'CA')
        .eq('is_approved', true) // remove if you don't use this
        .order('name', { ascending: true })
        .range(0, 19);

      if (error) {
        setError(
          rpc.error
            ? `RPC failed: ${rpc.error.message}; Select failed: ${error.message}`
            : error.message
        );
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
      {!loading && error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && shops.length === 0 && <p>No shops found.</p>}

      {shops.map((s) => (
        <div key={s.id} className="rounded-2xl border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            {s.category_slug && (
              <span className="text-xs rounded-full px-3 py-1 border opacity-70">
                {s.category_slug}
              </span>
            )}
          </div>
          <p className="opacity-75">
            {s.address1 ? `${s.address1}, ` : ''}
            {s.city}, {s.state} {s.postal_code ?? ''}
          </p>
          {s.phone && <p className="opacity-75">{s.phone}</p>}
          {s.website && (
            <a className="underline" href={s.website} target="_blank" rel="noreferrer">
              Website →
            </a>
          )}
        </div>
      ))}
    </main>
  );
}
