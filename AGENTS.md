# AGENTS.md — 21k Project

This document provides an overview of the 21k project for developers and AI agents.

## Project Purpose

21k is a premium product landing page that sells the "21k AI Developer Resource Pack" — a curated collection of AI developer resources, tools, prompts, and guides. The site explains the value proposition, shows public previews, and drives purchases.

## Design System (styles.css)

CSS custom properties in `:root`:
- `--cyan: #00d4ff` — primary accent
- `--purple: #8b5cf6` — secondary accent
- `--green: #10b981` — success/included
- `--bg-dark: #050810` — page background
- `--bg-card: #0d1117` — card backgrounds

Utility classes: `.gradient-text`, `.card-glow`, `.btn-primary`, `.btn-secondary`, `.badge`, `.cyber-grid`, `.nav-blur`

## Non-Obvious Decisions

- `__root.tsx` imports `useState` for mobile hamburger state — Nav is stateful
- Dashboard page uses `filter: blur(2px)` + `pointer-events: none` for preview-lock
- FAQ uses native `<details>/<summary>` for zero-JS accordion
- `clamp()` used throughout for fluid typography
- Mobile hamburger visibility controlled via inline `<style>` tag in RootDocument
- Payment not connected — checkout/login show "coming soon" state
- External links labeled as: Official Tool, Documentation, Reference Tutorial, Video Reference, GitHub Repo

---


## Project Overview

Interactive 21k product site built with TanStack Start and deployed on Cloudflare Pages.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Cloudflare Pages |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── logo.png
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header.
│   │   ├── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   │   ├── ProductAIAssistant.tsx  # AI marketing assistant.
│   │   └── ProductRecommendation.tsx  # Product recommendation card.
│   ├── data
│   │   └── products.ts  # Product catalog data template.
│   ├── lib
│   │   ├── product-ai-hook.ts  # useProductChat hook.
│   │   └── product-tools.ts  # AI tools: getProducts, recommendProduct.
│   ├── routes
│   │   ├── products
│   │   │   └── $productId.tsx  # Product detail page with recommendation.
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   ├── api.product-chat.ts  # POST handler for product AI chat.
│   │   └── index.tsx  # Marketing home with ProductAIAssistant.
│   ├── store
│   │   └── product-assistant.ts  # Zustand store for assistant state.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── wrangler.toml  # Cloudflare Pages config: output directory and runtime compatibility.
├── CLOUDFLARE_DEPLOY.md  # Cloudflare deployment and environment variable notes.
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, and Tailwind CSS 4; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config: TanStack Start, React, Tailwind, and path aliases.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, React, Tailwind, path aliases |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `wrangler.toml` | Cloudflare Pages output directory and compatibility settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Marketing Site with AI Assistant

Marketing site with TanStack AI chat assistant. No Stripe checkout.

**AI tools available:**
- `getProducts` - Get all products from catalog
- `recommendProduct` - Display product recommendation card (MUST use for recommendations)

**Components:** ProductAIAssistant, ProductRecommendation

**Dependencies:** @tanstack/ai, streamdown

## Environment Variables

For AI: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or OLLAMA_BASE_URL (same as ai add-on).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
