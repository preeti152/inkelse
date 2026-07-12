import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { BRAND, SEO, COLORS, getBrandName, getBrandTagline, getSiteUrl } from '@inkora/brand';
import './globals.css';

// ─── Fonts (self-hosted via next/font) ──────────────────────────
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

// ─── Metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND.nameDisplay} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.nameDisplay}`,
  },
  description: BRAND.longDescription,
  applicationName: BRAND.nameDisplay,
  authors: [{ name: BRAND.legalName }],
  generator: 'Next.js',
  keywords: [
    'corporate gifting',
    'corporate printing',
    'stationery',
    'employee onboarding kit',
    'business cards',
    'corporate hampers',
    'B2B gifting India',
    'premium stationery',
  ],
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: getSiteUrl(),
    siteName: BRAND.nameDisplay,
    title: `${BRAND.nameDisplay} — ${BRAND.tagline}`,
    description: BRAND.longDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${BRAND.nameDisplay} — ${BRAND.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.nameDisplay} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: COLORS.paperCream,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root layout ────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased texture-paper">
        {/* Skip-to-content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        {children}

        {/* Hidden brand identity marker — useful for debugging which
            brand config the deployed site is using (visible in HTML source). */}
        <div
          aria-hidden="true"
          data-brand-name={getBrandName()}
          data-brand-tagline={getBrandTagline()}
          className="hidden"
        />
      </body>
    </html>
  );
}
