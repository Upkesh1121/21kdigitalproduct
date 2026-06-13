# 21k — AI Developer Resource Pack

A premium landing page and buyer-access product built with TanStack Start, React, Tailwind CSS v4, and Cloudflare Pages Functions.

## What It Is

21k sells a curated **21k AI Developer Resource Pack** — 100+ organized resources including AI coding tool links, setup commands, prompt templates, checklists, and guides for developers building with AI.

## Key Technologies

- **TanStack Start** — React-based SSR framework with file-based routing
- **Tailwind CSS v4** — Utility-first styling
- **Cloudflare Pages** — Hosting, Pages Functions, and deployment
- **TypeScript** — Full type safety

## Project Structure

```
src/
  routes/
    __root.tsx       # Root layout with Nav + Footer
    index.tsx        # Main landing page (all sections)
    checkout.tsx     # Checkout placeholder
    login.tsx        # Login page placeholder
    admin.tsx        # Admin access grant page
    dashboard.tsx    # Buyer dashboard preview
    resources.tsx    # Resource library preview
  styles.css         # Global styles and design tokens
functions/
  [[path]].js        # Cloudflare Pages catch-all for SSR and API routing
  api/               # Payment, login, access, webhook, and admin APIs
```

## Running Locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

## Deploying

Deploy on Cloudflare Pages with:

```text
Build command: npm run build
Build output directory: dist/client
Functions directory: functions
```

See `CLOUDFLARE_DEPLOY.md` for required environment variables.

## Design

Dark cyber/AI aesthetic with cyan (`#00d4ff`) and purple (`#8b5cf6`) as primary accent colors on a deep navy background (`#050810`). Fully responsive, mobile-first with fluid typography using `clamp()`.
