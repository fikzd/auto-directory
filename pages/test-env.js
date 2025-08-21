export default function TestEnv() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Testing Environment Variables</h1>
      <p>
        <strong>SUPABASE URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || "❌ Not Found"}
      </p>
      <p>
        <strong>SUPABASE KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Loaded" : "❌ Not Found"}
      </p>
    </div>
  );
}
