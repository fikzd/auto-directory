'use client';

export type Shop = {
  id: string;
  name: string;
  slug: string;
  category_slug: string;
  address1: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  phone: string | null;
  website: string | null;
  lat_out?: number;
  lng_out?: number;
  distance_km?: number;
};

export default function ShopCard({ shop }: { shop: Shop }) {
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16, marginBottom:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
        <h3 style={{margin:0, fontSize:18}}>{shop.name}</h3>
        <span style={{fontSize:12, background:'#f3f4f6', padding:'4px 8px', borderRadius:999}}>
          {shop.category_slug.replace('-', ' ')}
        </span>
      </div>
      <div style={{fontSize:14, color:'#374151', marginTop:6}}>
        {shop.address1 ? `${shop.address1}, ` : ''}
        {shop.city}, {shop.state}{shop.postal_code ? ` ${shop.postal_code}` : ''}
      </div>
      {shop.phone && <div style={{fontSize:14, color:'#374151', marginTop:4}}>{shop.phone}</div>}
      {shop.website && (
        <div style={{marginTop:8}}>
          <a href={shop.website} rel="noopener noreferrer" target="_blank">Website →</a>
        </div>
      )}
      {typeof shop.distance_km === 'number' && (
        <div style={{marginTop:8, fontSize:12, color:'#6b7280'}}>
          {shop.distance_km.toFixed(1)} km away
        </div>
      )}
    </div>
  );
}