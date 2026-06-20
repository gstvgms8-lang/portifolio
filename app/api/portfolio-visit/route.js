import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const SOURCE_LABELS = new Map([
  ['linkedin.com', 'linkedin'],
  ['lnkd.in', 'linkedin'],
  ['github.com', 'github'],
  ['google.com', 'google'],
  ['instagram.com', 'instagram'],
  ['facebook.com', 'facebook'],
  ['fb.com', 'facebook'],
  ['whatsapp.com', 'whatsapp'],
  ['wa.me', 'whatsapp'],
  ['youtube.com', 'youtube'],
  ['youtu.be', 'youtube'],
  ['x.com', 'x'],
  ['twitter.com', 'x']
]);

const BOT_PATTERNS = [
  ['headless_browser', /headlesschrome|phantomjs|slimerjs/i],
  ['automation', /playwright|puppeteer|selenium|webdriver/i],
  ['crawler', /bot|crawler|spider|preview|scanner|scraper|indexer/i],
  ['monitor', /uptime|pingdom|statuscake|healthcheck|monitor/i],
  ['audit', /lighthouse|pagespeed|gtmetrix/i]
];

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

function firstHeader(request, names) {
  for (const name of names) {
    const value = request.headers.get(name);
    if (value) {
      return value;
    }
  }

  return null;
}

function getClientIp(request) {
  const forwarded = firstHeader(request, [
    'x-vercel-forwarded-for',
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'true-client-ip'
  ]);

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

  return crypto.createHash('sha256').update(`${ip}:${salt}`).digest('hex');
}

function getDomain(url) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

function getOwnDomains(request) {
  const host = request.headers.get('host')?.replace(/^www\./, '').toLowerCase();
  const envDomains = (process.env.ANALYTICS_OWN_DOMAINS || '')
    .split(',')
    .map((domain) => domain.trim().replace(/^www\./, '').toLowerCase())
    .filter(Boolean);

  return new Set([host, ...envDomains].filter(Boolean));
}

function isOwnDomain(domain, ownDomains) {
  if (!domain) {
    return false;
  }

  return [...ownDomains].some(
    (ownDomain) => domain === ownDomain || domain.endsWith(`.${ownDomain}`)
  );
}

function detectBot(userAgent) {
  for (const [reason, pattern] of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, botReason: reason };
    }
  }

  return { isBot: false, botReason: null };
}

function detectDevice(userAgent, isBot) {
  const ua = userAgent.toLowerCase();

  if (isBot) {
    return 'bot';
  }

  if (/ipad|tablet/.test(ua) || (/macintosh/.test(ua) && /mobile/.test(ua))) {
    return 'tablet';
  }

  if (/mobile|android|iphone|ipod/.test(ua)) {
    return 'mobile';
  }

  if (!ua) {
    return 'desconhecido';
  }

  return 'desktop';
}

function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase();

  if (!ua) {
    return 'Desconhecido';
  }

  if (ua.includes('linkedinapp')) {
    return 'LinkedIn App';
  }

  if (ua.includes('instagram')) {
    return 'Instagram App';
  }

  if (ua.includes('fbav') || ua.includes('fban')) {
    return 'Facebook App';
  }

  if (ua.includes('whatsapp')) {
    return 'WhatsApp';
  }

  if (ua.includes('headlesschrome')) {
    return 'Headless Chrome';
  }

  if (ua.includes('samsungbrowser')) {
    return 'Samsung Internet';
  }

  if (ua.includes('edga/') || ua.includes('edgios/') || ua.includes('edg/')) {
    return 'Edge';
  }

  if (ua.includes('crios/') || ua.includes('chrome/')) {
    return 'Chrome';
  }

  if (ua.includes('fxios/') || ua.includes('firefox/')) {
    return 'Firefox';
  }

  if (ua.includes('opr/') || ua.includes('opera')) {
    return 'Opera';
  }

  if (ua.includes('safari/') && !ua.includes('chrome/') && !ua.includes('crios/')) {
    return 'Safari';
  }

  return 'Outro';
}

function detectOS(userAgent) {
  const ua = userAgent.toLowerCase();

  if (ua.includes('android')) {
    return 'Android';
  }

  if (ua.includes('iphone') || ua.includes('ipad')) {
    return 'iOS';
  }

  if (ua.includes('windows')) {
    return 'Windows';
  }

  if (ua.includes('mac os') || ua.includes('macintosh')) {
    return 'macOS';
  }

  if (ua.includes('linux')) {
    return 'Linux';
  }

  return ua ? 'Outro' : 'Desconhecido';
}

function detectSource({ utmSource, referrerDomain, ownDomains }) {
  if (utmSource) {
    return utmSource.toLowerCase().trim();
  }

  if (!referrerDomain) {
    return 'direto';
  }

  if (isOwnDomain(referrerDomain, ownDomains)) {
    return 'interno';
  }

  for (const [domain, source] of SOURCE_LABELS.entries()) {
    if (referrerDomain === domain || referrerDomain.endsWith(`.${domain}`)) {
      return source;
    }
  }

  return referrerDomain;
}

function parseNumber(value) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getGeo(request) {
  const latitude = parseNumber(request.headers.get('x-vercel-ip-latitude'));
  const longitude = parseNumber(request.headers.get('x-vercel-ip-longitude'));

  return {
    country: request.headers.get('x-vercel-ip-country') || null,
    region: request.headers.get('x-vercel-ip-country-region') || null,
    city: safeDecode(request.headers.get('x-vercel-ip-city')),
    latitude,
    longitude,
    timezone: request.headers.get('x-vercel-ip-timezone') || null,
    postal_code: request.headers.get('x-vercel-ip-postal-code') || null,
    location_source: 'vercel_ip',
    location_accuracy: latitude != null && longitude != null ? 'city_or_region' : 'country_or_unknown'
  };
}

function buildExtendedPayload({ geo, isBot, botReason, visitorType, trafficType }) {
  if (process.env.ANALYTICS_EXTENDED_FIELDS !== 'true') {
    return {};
  }

  return {
    latitude: geo.latitude,
    longitude: geo.longitude,
    timezone: geo.timezone,
    postal_code: geo.postal_code,
    location_source: geo.location_source,
    location_accuracy: geo.location_accuracy,
    is_bot: isBot,
    bot_reason: botReason,
    visitor_type: visitorType,
    traffic_type: trafficType
  };
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
  const ownDomains = getOwnDomains(request);
  const utmSource = body.utm_source || null;
  const utmMedium = body.utm_medium || null;
  const utmCampaign = body.utm_campaign || null;
  const geo = getGeo(request);
  const { isBot, botReason } = detectBot(userAgent);
  const source = detectSource({ utmSource, referrerDomain, ownDomains });
  const trafficType = source === 'interno' ? 'internal_navigation' : source === 'direto' ? 'direct' : 'referral';
  const visitorType = isBot ? 'bot' : 'human';

  const payload = {
    page_path: body.page_path || null,
    page_title: body.page_title || null,
    source,
    referrer,
    referrer_domain: referrerDomain,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    device_type: detectDevice(userAgent, isBot),
    browser: detectBrowser(userAgent),
    os: detectOS(userAgent),
    country: geo.country,
    region: geo.region,
    city: geo.city,
    ip_hash: hashIp(getClientIp(request)),
    user_agent: userAgent,
    ...buildExtendedPayload({ geo, isBot, botReason, visitorType, trafficType })
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