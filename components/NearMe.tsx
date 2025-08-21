'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ShopCard, { Shop } from './ShopCard';

export default function NearMe() {
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNearMe(lat: number, lng: number, radiusKm = 10) {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc('shops_near', {
      lat, lng, radius_km: radiusKm, page: 1, page_size: 20
    });
    if (error) setError(error.message);
    setShops((data || []) as Shop[]);
    setLoading(false);
  }

  function handleClick() {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchNearMe(pos.coords.latitude, pos.coords.longitude),
      (err) => setError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div>
      <button onClick={handleClick} style={{padding:'10px 14px', borderRadius:8, border:'1px solid #e5e7eb'}}>
        Find shops near me
      </button>
      {loading && <p style={{marginTop:12}}>Loading…</p>}
      {error && <p style={{marginTop:12, color:'#b91c1c'}}>Error: {error}</p>}
      <div style={{marginTop:16}}>
        {shops?.map(s => <ShopCard key={s.id} shop={s} />)}
      </div>
    </div>
  );
}
