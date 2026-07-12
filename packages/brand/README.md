# @inkora/brand

The **single source of truth** for the brand's identity across the entire monorepo.

Everything visual, textual, or contact-related that defines the brand lives in [`index.ts`](./index.ts):

- Brand name, tagline, descriptions
- Contact info (WhatsApp, phone, email, address)
- Social media handles
- Color palette
- Typography stacks
- SEO defaults

## Why this exists

So that **renaming the brand later** is a 30-second job, not a multi-day refactor.

When the founder decides `inkora` should become `inklore` (or whatever), you:

1. Edit two-three constants in [`index.ts`](./index.ts)
2. Replace the SVG files in [`apps/web/public/brand/`](../../apps/web/public/brand/)
3. Run `pnpm build`

The header, footer, hero, meta tags, OG images, footer copyright, WhatsApp message templates, email signatures — everything — updates automatically.

## Usage

```tsx
import { BRAND, CONTACT, COLORS } from '@inkora/brand';

export function Header() {
  return (
    <header>
      <a href="/">{BRAND.name}</a>
      <a href={`https://wa.me/${CONTACT.whatsapp}`}>WhatsApp us</a>
    </header>
  );
}
```

## Env override

For staging/preview deploys where you want to show a different brand name (e.g., during white-labeling tests):

```bash
NEXT_PUBLIC_BRAND_NAME=clientname
NEXT_PUBLIC_BRAND_TAGLINE="Print. Gift. Belong."
NEXT_PUBLIC_SITE_URL=https://staging.example.com
```

Use the helper functions instead of direct imports when you want this:

```tsx
import { getBrandName, getBrandTagline } from '@inkora/brand';

<h1>{getBrandName()}</h1>  // Falls back to BRAND.name if env not set
```
