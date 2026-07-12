# inkora

> **Print. Gift. Belong.** — The craft house for modern offices.

A full e-commerce experience for corporate gifting, printing, and stationery — built as a monorepo with Next.js, Sanity CMS, Supabase, and Razorpay.

---

## 🏗️ Monorepo structure

```
inkora/
├── apps/
│   ├── web/             # Next.js 15 (App Router) — the customer-facing site
│   └── studio/          # Sanity Studio — content management
├── packages/
│   └── brand/           # Single source of truth for brand identity
│                        # (rename the whole brand by editing one file)
├── supabase/
│   └── migrations/      # Database schema for orders, customers, carts
├── package.json         # Root workspace orchestrator
├── pnpm-workspace.yaml  # pnpm workspaces config
└── .env.example         # Environment variable template
```

## 🚀 Quick start

### Prerequisites
- **Node.js** ≥ 22.13 (use `nvm install 22 --lts`)
- **pnpm** ≥ 11.0 (`npm install -g pnpm`)
- A Sanity project, a Supabase project, and a Razorpay account (test mode is fine to start)

### Setup

```bash
# 1. Install all workspace dependencies
pnpm install

# 2. Copy environment file and fill in values
cp .env.example apps/web/.env.local
cp .env.example apps/studio/.env.local

# 3. Run the web app (http://localhost:3000)
pnpm dev

# 4. Run Sanity Studio in a separate terminal (http://localhost:3333)
pnpm dev:studio

# Or run both at once
pnpm dev:all
```

## 🧰 Useful scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the web app (port 3000) |
| `pnpm dev:studio` | Start Sanity Studio (port 3333) |
| `pnpm dev:all` | Run both in parallel |
| `pnpm build` | Build all workspaces |
| `pnpm lint` | Lint all workspaces |
| `pnpm format` | Prettier-format the entire repo |
| `pnpm clean` | Wipe all `node_modules` and build outputs |

## 🎨 Rebranding (changing the name later)

The brand name lives in **two places** and nowhere else:

1. [`packages/brand/index.ts`](packages/brand/index.ts) — the canonical TS export
2. [`.env.local`](.env.example) variables `NEXT_PUBLIC_BRAND_*` (which override the canonical export at runtime if set)

To rebrand from `inkora` to anything else:

```bash
# 1. Edit packages/brand/index.ts — change the constants
# 2. Update .env.local with the new NEXT_PUBLIC_BRAND_* values
# 3. Update the logo SVGs in apps/web/public/brand/
# 4. Rebuild
pnpm build
```

No find-and-replace through hundreds of files. That's the design.

## 📚 Documentation

- Master architecture: [`../plans/inkora-website-architecture.md`](../plans/inkora-website-architecture.md)
- Brand pack: [`../plans/inkora-brand-pack.md`](../plans/inkora-brand-pack.md)
- Name shortlist: [`../plans/brand-name-shortlist-print-first.md`](../plans/brand-name-shortlist-print-first.md)

## 📦 Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui (selectively) |
| Animations | Framer Motion + Lottie |
| CMS | Sanity v3 |
| Database | Supabase Postgres |
| Payments | Razorpay |
| Email | Resend |
| Hosting | Vercel |

## 📝 License

Proprietary © 2026 inkora. All rights reserved.
