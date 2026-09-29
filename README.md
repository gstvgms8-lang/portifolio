# Portfólio — Gustavo Vieira

Portfólio profissional construído em **Next.js** e organizado como um catálogo de produtos digitais. Os projetos são apresentados com contexto, recursos, stack e demonstrações Flutter Web navegáveis.

## Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Estrutura principal

```text
app/
  page.js                 catálogo/home
  projetos/[slug]/        página de produto
  demos/[slug]/           demonstração em tela dedicada
  api/                    analytics e contador
components/               componentes visuais e motion
data/projects.js          catálogo de projetos
public/demos/              builds Flutter Web
```

## Cadastro de projetos

Os produtos exibidos no portfólio vivem em `data/projects.js`. Cada item pode definir categoria, plataforma, descrição, problema, solução, recursos, stack, dados de destaque e caminho da demo.

## Motion

A interface usa motion em quatro níveis:

- animações de entrada;
- motion de componentes e hover;
- backgrounds vivos em Canvas;
- superfícies glass/3D.

Os efeitos pesados pausam fora da viewport e a experiência respeita `prefers-reduced-motion`.

## Variáveis de ambiente

As rotas de analytics usam Supabase:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
ANALYTICS_SALT=
ANALYTICS_OWN_DOMAINS=
ANALYTICS_EXTENDED_FIELDS=false
```

Use um valor forte e exclusivo em `ANALYTICS_SALT`.

## Demos Flutter Web

Os builds ficam em subpastas de `public/demos/`. Ao gerar um build Flutter para uma subpasta, ajuste o `base href` do `index.html` para o caminho correspondente.

Exemplo:

```html
<base href="/demos/app-inventario/">
```
