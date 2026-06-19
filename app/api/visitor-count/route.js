const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export const dynamic = 'force-dynamic';

async function callSupabaseRpc(functionName) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return Response.json(
      { error: 'Supabase environment variables are not configured.' },
      { status: 500 }
    );
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${functionName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: '{}',
    cache: 'no-store'
  });

  if (!response.ok) {
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
