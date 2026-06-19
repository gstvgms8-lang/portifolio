# Central de Apresentacao de Produtos Finais

Projeto Node.js sem dependencias externas, preparado para apresentar produtos finais em Flutter Web dentro de molduras mobile e desktop.

## Como rodar

```bash
node server.js
```

ou:

```bash
npm run dev
```

Nao precisa rodar `npm install`.

## Acesso padrao

- Usuario: `gustavo`
- Senha: `123456`
- Chave de seguranca: `CHECK-2026`

## Onde colocar os builds Flutter Web

Os builds finais devem ficar nestas pastas:

```txt
public/mobile/web/
public/mobile/web2/
public/desktop/web/
```

Copie o conteudo de cada `build/web` para a pasta correspondente.

## Ajuste importante do Flutter

Antes de gerar o build, ou depois copiando o arquivo final, confira o `base href` do `web/index.html`.

Mobile:

```html
<base href="/mobile/web/">
```

Desktop:

```html
<base href="/desktop/web/">
```

## Onde trocar os links

Os links exibidos na tela de projeto ficam em:

```txt
data/projetos.json
```

Os campos principais sao:

```json
"mobileUrl": "/mobile/web/",
"desktopUrl": "/desktop/web/"
```

Para projetos somente mobile, use apenas `mobileUrl`, como:

```json
"mobileUrl": "/mobile/web2/"
```

O visual das molduras fica em `public/assets/css/styles.css`, e a troca entre app mobile e portal desktop fica em `public/assets/js/app.js`.
