export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function callSupabaseRpc(functionName) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return Response.json(
      { error: 'Supabase environment variables are not configured.' },
      { status: 500 }
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: '{}',
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Supabase RPC ${functionName} failed:`, response.status, errorText);

    return Response.json(
      { error: 'Could not update visitor counter.' },
      { status: response.status }
    );
  }

  const total = await response.json();
  return Response.json({ total });
}

export async function GET() {
  return callSupabaseRpc('get_portfolio_visits');
}

export async function POST() {
  return callSupabaseRpc('increment_portfolio_visits');
}
