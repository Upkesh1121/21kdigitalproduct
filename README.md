# DevPackAI — AI Developer Resource Pack

A premium landing page and buyer-access product built with TanStack Start, React, and Tailwind CSS v4, deployed on Netlify.

## What It Is

DevPackAI sells a curated **AI Developer Resource Pack** — 100+ organized resources including AI coding tool links, setup commands, prompt templates, checklists, and guides for developers building with AI.

## Key Technologies

- **TanStack Start** — React-based SSR framework with file-based routing
- **Tailwind CSS v4** — Utility-first styling
- **Netlify** — Hosting, edge functions, and deployment
- **TypeScript** — Full type safety

## Project Structure

```
src/
  routes/
    __root.tsx       # Root layout with Nav + Footer
    index.tsx        # Main landing page (all sections)
    checkout.tsx     # Checkout placeholder
    login.tsx        # Login page placeholder
    dashboard.tsx    # Buyer dashboard preview
    resources.tsx    # Resource library preview
  styles.css         # Global styles and design tokens
```

## Running Locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

## Design

Dark cyber/AI aesthetic with cyan (`#00d4ff`) and purple (`#8b5cf6`) as primary accent colors on a deep navy background (`#050810`). Fully responsive, mobile-first with fluid typography using `clamp()`.
