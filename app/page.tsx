import NearMe from '@/components/NearMe';

export default function HomePage() {
  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:'0 16px'}}>
      <h1 style={{fontSize:28, marginBottom:8}}>Bay Area Auto Directory</h1>
      <p style={{color:'#374151', marginBottom:24}}>
        Start with San Francisco, then expand nationwide.
      </p>

      <NearMe />

      <div style={{marginTop:32}}>
        <h2 style={{fontSize:20, marginBottom:8}}>Browse San Francisco</h2>
        <p><a href="/sf">View SF listings →</a></p>
      </div>
    </main>
  );
}