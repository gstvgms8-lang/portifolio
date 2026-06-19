import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

function safeDecode(value) {
  if (!value) {
    return null;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getClientIp(request) {
  const forwarded =
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip');

  if (!forwarded) {
    return null;
  }

  return forwarded.split(',')[0].trim();
}

function hashIp(ip) {
  if (!ip) {
    return null;
  }

  const salt = process.env.ANALYTICS_SALT || 'portfolio-default-salt';

  return crypto
    .createHash('sha256')
    .update(`${ip}:${salt}`)
    .digest('hex');
}

function getDomain(url) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function detectDevice(userAgent) {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) {
    return 'tablet';
  }

  if (/mobile|android|iphone|ipod/.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/')) {
    return 'Edge';
  }

  if (ua.includes('opr/') || ua.includes('opera')) {
    return 'Opera';
  }

  if (ua.includes('chrome/')) {
    return 'Chrome';
  }

  if (ua.includes('firefox/')) {
    return 'Firefox';
  }

  if (ua.includes('safari/') && !ua.includes('chrome/')) {
    return 'Safari';
  }

  return 'Outro';
}

function detectOS(userAgent) {
  const ua = userAgent.toLowerCase();

  if (ua.includes('windows')) {
    return 'Windows';
  }

  if (ua.includes('android')) {
    return 'Android';
  }

  if (ua.includes('iphone') || ua.includes('ipad')) {
    return 'iOS';
  }

  if (ua.includes('mac os')) {
    return 'macOS';
  }

  if (ua.includes('linux')) {
    return 'Linux';
  }

  return 'Outro';
}

function detectSource({ utmSource, referrerDomain }) {
  if (utmSource) {
    return utmSource.toLowerCase();
  }

  if (!referrerDomain) {
    return 'direto';
  }

  if (referrerDomain.includes('linkedin')) {
    return 'linkedin';
  }

  if (referrerDomain.includes('github')) {
    return 'github';
  }

  if (referrerDomain.includes('google')) {
    return 'google';
  }

  if (referrerDomain.includes('instagram')) {
    return 'instagram';
  }

  if (referrerDomain.includes('facebook')) {
    return 'facebook';
  }

  if (referrerDomain.includes('whatsapp')) {
    return 'whatsapp';
  }

  return referrerDomain;
}

export async function POST(request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return Response.json(
      { error: 'Supabase environment variables are not configured.' },
      { status: 500 }
    );
  }

  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const userAgent = request.headers.get('user-agent') || '';
  const referrer = body.referrer || null;
  const referrerDomain = getDomain(referrer);
  const utmSource = body.utm_source || null;
  const utmMedium = body.utm_medium || null;
  const utmCampaign = body.utm_campaign || null;

  const payload = {
    page_path: body.page_path || null,
    page_title: body.page_title || null,
    source: detectSource({ utmSource, referrerDomain }),
    referrer,
    referrer_domain: referrerDomain,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    device_type: detectDevice(userAgent),
    browser: detectBrowser(userAgent),
    os: detectOS(userAgent),
    country: request.headers.get('x-vercel-ip-country') || null,
    region: request.headers.get('x-vercel-ip-country-region') || null,
    city: safeDecode(request.headers.get('x-vercel-ip-city')),
    ip_hash: hashIp(getClientIp(request)),
    user_agent: userAgent
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/portfolio_visit_logs`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Portfolio visit log failed:', response.status, errorText);

    return Response.json(
      { error: 'Could not register portfolio visit.' },
      { status: response.status }
    );
  }

  return Response.json({ ok: true });
}
