'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ShopCard, { Shop } from '@/components/ShopCard';

export default function SFPage() {
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function load(p = 1) {
    setLoading(true);
    const { data, error } = await supabase.rpc('shops_by_city', {
      city_in: 'San Francisco',
      state_in: 'CA',
      page: p,
      page_size: 20
    });
    if (error) throw error;
    setShops(data as Shop[]);
    setLoading(false);
  }

  useEffect(() => { load(1).catch(console.error); }, []);

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:'0 16px'}}>
      <h1 style={{fontSize:24, marginBottom:8}}>San Francisco Auto Shops</h1>
      {loading && <p>Loading…</p>}
      {!loading && (!shops || shops.length === 0) && <p>No shops yet.</p>}
      <div style={{marginTop:12}}>
        {shops?.map(s => <ShopCard key={s.id} shop={s} />)}
      </div>
      <div style={{display:'flex', gap:8, marginTop:16}}>
        <button onClick={() => { const p = Math.max(1, page-1); setPage(p); load(p); }} disabled={page<=1}>
          Previous
        </button>
        <button onClick={() => { const p = page+1; setPage(p); load(p); }}>
          Next
        </button>
      </div>
    </main>
  );
}