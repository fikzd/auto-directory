'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ShopCard, { Shop } from '@/components/ShopCard';

export default function Debug() {
  const [rows, setRows] = useState<Shop[]>([]);
  async function run() {
    const { data } = await supabase.rpc('shops_near', {
      lat: 37.789, lng: -122.401, radius_km: 10, page: 1, page_size: 20
    });
    setRows((data || []) as Shop[]);
  }
  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:'0 16px'}}>
      <button onClick={run} style={{padding:'8px 12px', border:'1px solid #e5e7eb', borderRadius:8}}>
        Run near-me (downtown SF)
      </button>
      <div style={{marginTop:16}}>
        {rows.map(s => <ShopCard key={s.id} shop={s} />)}
      </div>
    </main>
  );
}