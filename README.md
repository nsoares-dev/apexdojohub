# Apex Dojo Hub — site e controle financeiro

Frontend integrado em React e Vite com duas áreas independentes:

- `/`: vitrine pública da Apex Dojo Hub;
- `/login`: acesso administrativo;
- `/admin`: controle financeiro protegido por sessão.

## Requisitos

- Node.js 20.19 ou superior;
- backend da Apex disponível para as funções administrativas.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos compilados serão criados em `dist/`.

## Endereço da API

O padrão continua sendo:

```text
https://localhost:7217/API
```

Para usar outro endereço, copie `.env.example` para `.env` e altere:

```text
VITE_API_URL=https://seu-servidor/API
```

## Isolamento visual

Os estilos da vitrine ficam limitados a `.vitrine-root`, enquanto os estilos do controle financeiro ficam limitados a `.finance-app`. Isso impede conflitos entre seletores genéricos como `main`, `header`, `.hero`, `.brand`, `.card` e animações CSS.

O Tailwind e o shadcn permanecem disponíveis no projeto, mas as telas atuais usam CSS próprio. A classe genérica `.container` da vitrine foi substituída por `.vitrine-container` para evitar colisões futuras.
