const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const APP_USER = process.env.APP_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const SECURITY_KEY = process.env.SECURITY_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!APP_USER || !APP_PASSWORD || !SECURITY_KEY || !SESSION_SECRET) {
  throw new Error('Variáveis de ambiente não configuradas.');
}

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');

// Lista os produtos exibidos na central.
// Para adicionar outro sistema, crie uma nova entrada em data/projetos.json.
function readProjects() {
  const file = path.join(DATA_DIR, 'projetos.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function parseCookies(req) {
  const header = req.headers.cookie || '';

  return Object.fromEntries(
    header
      .split(';')
      .filter(Boolean)
      .map(cookie => {
        const index = cookie.indexOf('=');
        return [
          cookie.slice(0, index).trim(),
          decodeURIComponent(cookie.slice(index + 1)),
        ];
      })
  );
}

function createSession() {
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const payload = `${token}.${timestamp}`;

  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  return `${payload}.${signature}`;
}

function isValidSession(req) {
  const cookie = parseCookies(req).apresentacao_session;
  if (!cookie) return false;

  const parts = cookie.split('.');
  if (parts.length !== 3) return false;

  const [token, timestamp, signature] = parts;
  const payload = `${token}.${timestamp}`;

  const expected = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expected) return false;

  const age = Date.now() - Number(timestamp);
  const maxAge = 1000 * 60 * 60 * 4; // 4 horas

  return age < maxAge;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function send(res, status, content, type = 'text/html; charset=utf-8', extraHeaders = {}) {
  res.writeHead(status, {
    'Content-Type': type,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
    ...extraHeaders,
  });

  res.end(content);
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

function renderPage(title, body) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>${body}<script src="/assets/js/app.js"></script></body>
</html>`;
}

function loginPage(error = '') {
  return renderPage('Acesso seguro', `
  <main class="login-page">
    <section class="login-card">
      <div class="brand"><span>GV</span><strong>Central Segura de Sistemas</strong></div>
      <h1>Acesso protegido</h1>
      <p>Entre com seu usuario e informe a chave de seguranca da apresentacao.</p>
      ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
      <form method="POST" action="/login" class="form">
        <label>Usuario<input name="user" autocomplete="username" required></label>
        <label>Senha<input name="password" type="password" autocomplete="current-password" required></label>
        <label>Chave de seguranca<input name="securityKey" required></label>
        <button type="submit">Entrar na apresentacao</button>
      </form>
      <small>Ambiente protegido por credenciais e chave de apresentacao.</small>
    </section>
  </main>`);
}

function homePage() {
  const projects = readProjects();

  const cards = projects.map(project => `
    <a class="project-card" href="/projeto/${escapeHtml(project.slug)}">
      <div class="status">${escapeHtml(project.status)}</div>
      <h2>${escapeHtml(project.nome)}</h2>
      <p>${escapeHtml(project.resumo)}</p>
      <div class="tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
    </a>`).join('');

  return renderPage('Projetos', `
  <header class="topbar"><div class="brand"><span>GV</span><strong>Apresentações</strong></div><a href="/logout">Sair</a></header>
  <main class="container hero">
    <p class="eyebrow">Apresentação segura</p>
    <h1>Central de apresentação de produtos finais</h1>
    <p>Escolha um sistema para abrir a versao final em modo executivo.</p>
    <section class="grid">${cards}</section>
  </main>`);
}

function projectPage(slug) {
  const project = readProjects().find(item => item.slug === slug);
  if (!project) return null;

  const hasMobile = Boolean(project.mobileUrl);
  const hasDesktop = Boolean(project.desktopUrl);
  const defaultView = hasMobile ? 'mobile' : 'desktop';

  const indicators = (project.indicadores || []).map(item => `
    <article class="metric">
      <strong>${escapeHtml(item.valor)}</strong>
      <span>${escapeHtml(item.rotulo)}</span>
    </article>`).join('');

  const mobileButton = hasMobile
    ? `<button class="${defaultView === 'mobile' ? 'active' : ''}" data-view="mobile" type="button">App mobile</button>`
    : '';

  const desktopButton = hasDesktop
    ? `<button class="${defaultView === 'desktop' ? 'active' : ''}" data-view="desktop" type="button">Portal desktop</button>`
    : '';

  const mobileFrame = hasMobile
    ? `<div class="phone-frame frame ${defaultView === 'mobile' ? 'active' : ''}" id="mobileFrame"><iframe src="${escapeHtml(project.mobileUrl)}" title="${escapeHtml(project.nome)} mobile"></iframe></div>`
    : '';

  const desktopFrame = hasDesktop
    ? `<div class="monitor-frame frame ${defaultView === 'desktop' ? 'active' : ''}" id="desktopFrame"><iframe src="${escapeHtml(project.desktopUrl)}" title="${escapeHtml(project.nome)} desktop"></iframe></div>`
    : '';

  return renderPage(project.nome, `
  <header class="topbar"><div class="brand"><span>GV</span><strong>${escapeHtml(project.nome)}</strong></div><nav><a href="/">Projetos</a><button id="fullscreenBtn" type="button">Tela cheia</button><a href="/logout">Sair</a></nav></header>
  <main class="presentation-page">
    <section class="viewer-card" id="viewerCard" data-active-view="${defaultView}">
      <div class="project-intro">
        <p class="eyebrow">Produto final</p>
        <h1>${escapeHtml(project.nome)}</h1>
        <p>${escapeHtml(project.descricao)}</p>
        <div class="metrics">${indicators}</div>
      </div>
      <div class="viewer-actions" aria-label="Opcoes de visualizacao do produto">
        ${mobileButton}
        ${desktopButton}
        <button id="frameFullscreenBtn" type="button">Abrir em tela cheia</button>
      </div>
      <div class="stage">
        ${mobileFrame}
        ${desktopFrame}
      </div>
    </section>
  </main>`);
}

function serveStatic(req, res) {
  const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
  const requested = path.normalize(path.join(PUBLIC_DIR, cleanUrl));

  if (!requested.startsWith(PUBLIC_DIR)) {
    return send(res, 403, 'Acesso negado', 'text/plain');
  }

  let filePath = requested;

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) return false;

  const ext = path.extname(filePath).toLowerCase();

  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wasm': 'application/wasm',
    '.otf': 'font/otf',
    '.ttf': 'font/ttf',
  };

  send(res, 200, fs.readFileSync(filePath), types[ext] || 'application/octet-stream');
  return true;
}

function collectBody(req) {
  return new Promise(resolve => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      resolve(new URLSearchParams(body));
    });
  });
}

const server = http.createServer(async (req, res) => {
  // Assets do proprio site precisam carregar inclusive na tela de login.
  if (req.url.startsWith('/assets/')) {
    if (serveStatic(req, res)) return;
  }

  if (req.method === 'GET' && req.url === '/login') {
    return send(res, 200, loginPage());
  }

  if (req.method === 'POST' && req.url === '/login') {
    const body = await collectBody(req);

    const ok =
      body.get('user') === APP_USER &&
      body.get('password') === APP_PASSWORD &&
      body.get('securityKey') === SECURITY_KEY;

    if (!ok) {
      return send(res, 401, loginPage('Usuario, senha ou chave de seguranca invalidos.'));
    }

    return send(res, 302, '', 'text/plain', {
      'Set-Cookie': `apresentacao_session=${createSession()}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=14400`,
      Location: '/',
    });
  }

  if (req.method === 'GET' && req.url === '/logout') {
    return send(res, 302, '', 'text/plain', {
      'Set-Cookie': 'apresentacao_session=; Max-Age=0; Path=/',
      Location: '/login',
    });
  }

  if (!isValidSession(req)) {
    return redirect(res, '/login');
  }

  // Produtos finais Flutter Web: so sao servidos depois do login.
  if (req.url.startsWith('/mobile/') || req.url.startsWith('/desktop/')) {
    if (serveStatic(req, res)) return;
  }

  if (req.method === 'GET' && req.url === '/') {
    return send(res, 200, homePage());
  }

  if (req.method === 'GET' && req.url.startsWith('/projeto/')) {
    const page = projectPage(req.url.split('/').pop());

    return page
      ? send(res, 200, page)
      : send(res, 404, 'Projeto nao encontrado', 'text/plain');
  }

  send(res, 404, 'Pagina nao encontrada', 'text/plain');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
