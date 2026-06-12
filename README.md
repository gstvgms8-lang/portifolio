# meu_portifolio

Portfólio profissional em Node.js/Next.js para apresentar projetos web, mobile, desktop e demos em Flutter Web.

## Como rodar

```bash
cd site
npm install
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Estrutura

```txt
meu_portifolio/
  site/                 # Projeto Next.js / Node.js
    app/                # Páginas do site
    components/         # Componentes reutilizáveis
    data/projects.js    # Lista dos projetos exibidos
    public/demos/       # Futuro local dos builds Flutter Web
```

## Onde editar seus projetos

Edite o arquivo:

```txt
site/data/projects.js
```

## Demos Flutter Web

Para gerar uma demo Flutter Web:

```bash
flutter build web --release
```

Depois copie o conteúdo de:

```txt
build/web
```

para uma pasta dentro de:

```txt
site/public/demos/nome-da-demo
```

## Deploy na Vercel

Na Vercel, configure o diretório raiz do projeto como:

```txt
site
```

Build command:

```bash
npm run build
```

Output padrão do Next.js.
