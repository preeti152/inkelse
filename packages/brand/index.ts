/**
 * @inkelse/brand — Single source of truth for the brand identity.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ TO REBRAND: Change the constants below, update logo SVGs in     │
 * │ apps/web/public/brand/, and the entire site picks it up.        │
 * └─────────────────────────────────────────────────────────────────┘
 */

// -----------------------------------------------------------------
// Core identity
// -----------------------------------------------------------------

export const BRAND = {
  name: 'inkelse',
  nameDisplay: 'Inkelse',
  legalName: 'Inkelse',

  tagline: 'Designed. Printed. Delivered.',

  heroHeadline: 'Everything Your Brand Needs. Designed. Printed. Delivered.',
  heroSubheadline:
    'Premium printing, corporate gifting, packaging and branding solutions for businesses across India.',

  description: 'Design to print, beyond the screen.',

  longDescription:
    'Inkelse is a full-service branding partner for businesses across India — premium printing, corporate gifting, signage, packaging, graphic design, and event branding, all under one roof.',

  story:
    'Inkelse means beyond ink — beyond standard printing and design. One partner for all your branding needs.',

  yearsInBusiness: 'years',
} as const;

// -----------------------------------------------------------------
// Contact (drives WhatsApp widget, click-to-call, footer)
// -----------------------------------------------------------------

export const CONTACT = {
  /** WhatsApp number in international format WITHOUT + (for wa.me URLs). */
  whatsapp: '918920468955',

  /** Predefined WhatsApp message. */
  whatsappMessage:
    "Hi Inkelse! I'd like to get a quote for my branding / printing requirement.",

  /** Display phone. */
  phone: '+91 89204 68955',
  phoneHref: '+918920468955',

  /** Primary contact email. */
  email: 'deepanshu06022003@gmail.com',
  supportEmail: 'deepanshu06022003@gmail.com',
  ordersEmail: 'deepanshu06022003@gmail.com',

  /** Office address. */
  address: {
    line1: 'Inkelse',
    line2: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '',
    country: 'India',
  },

  /** Google Maps embed query (city-level until exact address is provided). */
  mapQuery: 'New Delhi, India',

  hours: 'Mon–Sat · 10am–7pm IST',

  certifications: [] as string[],
} as const;

// -----------------------------------------------------------------
// Social handles
// -----------------------------------------------------------------

export const SOCIAL = {
  instagram: 'https://instagram.com/inkelse',
  linkedin: 'https://linkedin.com/company/inkelse',
  facebook: '',
  youtube: '',
  twitter: '',
  pinterest: '',
} as const;

// -----------------------------------------------------------------
// Visual identity — CMYK PRINT PALETTE
// -----------------------------------------------------------------

export const COLORS = {
  cyan: '#0AAEEC',
  magenta: '#E91E63',
  yellow: '#FFD600',
  black: '#1A1A1A',

  paperWhite: '#FFFFFF',
  paperCream: '#F7F4EE',
  paperGrey: '#F0F0F0',

  textPrimary: '#1A1A1A',
  textMuted: '#6B6B6B',
  textSubtle: '#9CA3AF',
  border: '#E5E7EB',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

export const FONTS = {
  sans: 'Inter, system-ui, -apple-system, sans-serif',
  display: 'Inter, system-ui, sans-serif',
  serif: 'Fraunces, Georgia, serif',
  mono: 'JetBrains Mono, ui-monospace, monospace',
} as const;

// -----------------------------------------------------------------
// SEO defaults
// -----------------------------------------------------------------

export const SEO = {
  siteUrl: 'https://inkelse.com',
  defaultTitle: `${BRAND.nameDisplay} — ${BRAND.tagline}`,
  titleTemplate: `%s · ${BRAND.nameDisplay}`,
  defaultDescription: BRAND.longDescription,
  defaultOgImage: '/og-image.png',
  themeColor: COLORS.cyan,
  locale: 'en_IN',
} as const;

// -----------------------------------------------------------------
// Industries served ("We work with")
// -----------------------------------------------------------------

export const INDUSTRIES = [
  { name: 'Hotels',       icon: 'hotel',      color: '#0AAEEC' },
  { name: 'Restaurants',  icon: 'utensils',   color: '#E91E63' },
  { name: 'Healthcare',   icon: 'heart-pulse', color: '#22C55E' },
  { name: 'Real Estate',  icon: 'building',   color: '#FFD600' },
  { name: 'Travel',       icon: 'plane',      color: '#0AAEEC' },
  { name: 'Education',    icon: 'graduation-cap', color: '#E91E63' },
  { name: 'Startups',     icon: 'rocket',     color: '#1A1A1A' },
] as const;

// -----------------------------------------------------------------
// Services (6 clean cards)
// -----------------------------------------------------------------

export interface Service {
  id: string;
  slug: string;
  emoji: string;
  icon: string;
  name: string;
  description: string;
  accent: string;
  intro: string;
  offerings: string[];
}

export const SERVICES: Service[] = [
  {
    id: 's1', slug: 'printing', emoji: '🖨', icon: 'printer', name: 'Printing', accent: '#0AAEEC',
    description: 'Business cards, brochures, catalogues, stationery, large-format — premium print on the finest stocks.',
    intro: 'From a single business card to a full corporate stationery suite, our printing runs on premium stocks with pin-sharp color and finishes that feel as good as they look. Digital for short runs, offset for volume — always consistent.',
    offerings: ['Business cards', 'Brochures & flyers', 'Catalogues & booklets', 'Letterheads & envelopes', 'Posters & large-format', 'Desk & wall calendars', 'A3 menu printing', 'File folders'],
  },
  {
    id: 's2', slug: 'corporate-gifting', emoji: '🎁', icon: 'gift', name: 'Corporate Gifting', accent: '#E91E63',
    description: 'Curated hampers, onboarding kits, festival gifts, and branded merchandise for clients and teams.',
    intro: 'Thoughtful gifting that makes clients and employees feel genuinely valued. We curate, brand, assemble, and ship — so you get a memorable moment, not a logistics headache.',
    offerings: ['Onboarding kits', 'Festival hampers (Diwali, New Year)', 'Client appreciation gifts', 'Work-anniversary tokens', 'Branded merchandise', 'MDF tealight holders', 'Coasters & desk accessories'],
  },
  {
    id: 's3', slug: 'signage', emoji: '🏢', icon: 'panels-top-left', name: 'Signage', accent: '#FFD600',
    description: 'Beach flags, standees, banners, sunboards, and storefront signage that gets you noticed.',
    intro: 'Large-format signage that turns heads — indoors and out. Durable materials, vivid print, and finishing that survives the elements.',
    offerings: ['Beach flags', 'Standees (canvas material)', 'Banners (6x3 ft and custom)', 'Sunboard menus and boards', 'Placards with handles', 'Storefront and wayfinding signage'],
  },
  {
    id: 's4', slug: 'packaging', emoji: '📦', icon: 'package', name: 'Packaging', accent: '#0AAEEC',
    description: 'Rigid boxes, paper bags, custom product packaging designed to make unboxing memorable.',
    intro: 'Packaging is your brand last impression — and often the most shared. We design and produce packaging that protects the product and elevates the moment.',
    offerings: ['Rigid boxes (magnetic flap)', 'Paper bags (rope/ribbon handles)', 'Custom product packaging', 'Food & takeaway packaging', 'Corrugated & kraft boxes', 'Tissue & inserts'],
  },
  {
    id: 's5', slug: 'graphic-design', emoji: '🎨', icon: 'palette', name: 'Graphic Design', accent: '#E91E63',
    description: 'Logos, brand identity, marketing collateral, and creative direction from our in-house studio.',
    intro: 'Our in-house studio makes everything look intentional. Whether it is a brand-new identity or a one-off campaign, we design with print production in mind so it looks perfect on paper, not just on screen.',
    offerings: ['Logo & brand identity', 'Brand guidelines', 'Marketing collateral', 'Social media creatives', 'Packaging artwork', 'Presentation & pitch decks', 'Illustration & iconography'],
  },
  {
    id: 's6', slug: 'event-branding', emoji: '🎪', icon: 'tent', name: 'Event Branding', accent: '#FFD600',
    description: 'End-to-end event branding — backdrops, booths, banners, kits, and on-site collateral.',
    intro: 'Turnkey event branding — one team owns design, production, and on-site installation, so nothing falls through the cracks on the day that matters.',
    offerings: ['Stage backdrops', 'Exhibition booths', 'Wayfinding & signage', 'Attendee badges & lanyards', 'Welcome kits', 'Standees & banners', 'Certificates & awards'],
  },
];

// -----------------------------------------------------------------
// Featured projects / case studies
// -----------------------------------------------------------------

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  accent: string;
  summary: string;
  services: string[];
  /** Case study body sections. */
  challenge: string;
  approach: string;
  outcome: string;
  deliverables: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'luxury-hotel-branding',
    title: 'Luxury Hotel Branding',
    client: 'A 5-star boutique hotel',
    industry: 'Hotels',
    accent: '#0AAEEC',
    summary: 'Complete branded guest experience — from key-card pouches to in-room collateral and signage.',
    services: ['Printing', 'Signage', 'Graphic Design'],
    challenge:
      'The hotel wanted a cohesive premium identity across every guest touchpoint — but was juggling five different vendors with inconsistent quality and color.',
    approach:
      'We consolidated everything under one roof. Our design studio locked a refined brand system, then produced every physical touchpoint in-house to guarantee color and finish consistency.',
    outcome:
      'A seamless, elevated guest experience. Guests now encounter one confident brand voice from the moment they check in to the turndown card at night.',
    deliverables: ['Key-card pouches', 'In-room directory', 'Do-not-disturb cards', 'Welcome letters', 'Lobby & wayfinding signage', 'Restaurant menus'],
  },
  {
    slug: 'travel-company-welcome-kit',
    title: 'Travel Company Welcome Kit',
    client: 'A premium travel operator',
    industry: 'Travel',
    accent: '#E91E63',
    summary: 'A beautifully boxed welcome kit that makes every traveller feel like a VIP before they depart.',
    services: ['Corporate Gifting', 'Packaging', 'Printing'],
    challenge:
      'The operator needed a memorable "first touch" that travellers would receive before their trip — something premium enough to justify their pricing.',
    approach:
      'We designed a custom rigid box with a magnetic flap, filled it with a printed itinerary booklet, luggage tags, a travel journal, and thoughtful extras — all brand-consistent.',
    outcome:
      'The kit became a social-media moment. Travellers unboxed and shared it, turning a logistics necessity into organic marketing.',
    deliverables: ['Custom rigid box', 'Itinerary booklet', 'Luggage tags', 'Travel journal', 'Destination cards'],
  },
  {
    slug: 'restaurant-packaging',
    title: 'Restaurant Packaging',
    client: 'A multi-outlet restaurant brand',
    industry: 'Restaurants',
    accent: '#FFD600',
    summary: 'Takeaway packaging that keeps the brand experience alive well beyond the dining room.',
    services: ['Packaging', 'Printing', 'Graphic Design'],
    challenge:
      'With delivery booming, the brand realised most customers now experienced them through a plain brown bag. The brand vanished at the most important moment.',
    approach:
      'We designed a full takeaway system — printed bags, food boxes, tent cards, coasters, and napkins — so the brand traveled home with every order.',
    outcome:
      'A consistent, craveable brand presence across dine-in and delivery, with packaging customers actually kept.',
    deliverables: ['Printed paper bags', 'Food packaging boxes', 'Tent cards', 'Coasters', 'Cotton napkins', 'A3 menu prints'],
  },
  {
    slug: 'corporate-event-branding',
    title: 'Corporate Event Branding',
    client: 'A technology company',
    industry: 'Startups',
    accent: '#0AAEEC',
    summary: 'Turnkey event branding for a 500-person annual conference — designed, printed, and installed.',
    services: ['Event Branding', 'Signage', 'Printing', 'Corporate Gifting'],
    challenge:
      'The company needed a complete on-brand event environment in three weeks — backdrops, wayfinding, badges, and attendee kits — with zero room for error on the day.',
    approach:
      'One project team owned everything end-to-end: design, production, and on-site installation. A single point of contact meant nothing fell through the cracks.',
    outcome:
      'A flawless event that looked twice its budget. Attendees left with premium kits and a lasting impression of the brand.',
    deliverables: ['Stage backdrops', 'Wayfinding signage', 'Attendee badges', 'Welcome kits', 'Standees & banners', 'Certificates'],
  },
  {
    slug: 'real-estate-sales-office',
    title: 'Real Estate Sales Office',
    client: 'A premium property developer',
    industry: 'Real Estate',
    accent: '#E91E63',
    summary: 'A sales-gallery experience that sells the lifestyle before a single flat is shown.',
    services: ['Signage', 'Printing', 'Graphic Design', 'Corporate Gifting'],
    challenge:
      'The developer\'s sales office looked generic. High-ticket buyers expected a premium environment that matched the price point of the property.',
    approach:
      'We reimagined the entire sales-office collateral — from the exterior signage to the printed brochures handed to buyers, to the closing-gift hampers.',
    outcome:
      'A sales gallery that reinforced the premium positioning at every step, giving the sales team confident, beautiful tools to close with.',
    deliverables: ['Exterior & interior signage', 'Project brochures', 'Floor-plan folders', 'Business cards', 'Closing-gift hampers'],
  },
];

// -----------------------------------------------------------------
// Why Inkelse (6 reasons)
// -----------------------------------------------------------------

export const WHY_INKELSE = [
  { title: 'Fast Delivery',                 description: 'Tight timelines? We move fast without cutting corners.', icon: 'zap',          color: '#0AAEEC' },
  { title: 'Premium Quality',               description: 'The finest stocks, finishes, and craftsmanship — every time.', icon: 'gem',        color: '#E91E63' },
  { title: 'Dedicated Support',             description: 'A single point of contact who actually picks up the phone.', icon: 'headset',      color: '#FFD600' },
  { title: 'Nationwide Shipping',           description: 'Pan-India delivery, tracked and reliable.', icon: 'truck',                          color: '#0AAEEC' },
  { title: 'One Partner for All Branding',  description: 'Print, gifting, signage, packaging, design — all under one roof.', icon: 'layers', color: '#E91E63' },
  { title: 'Design Expertise',              description: 'An in-house studio that makes everything look intentional.', icon: 'sparkles',     color: '#FFD600' },
];

// -----------------------------------------------------------------
// How We Work (5-step process)
// -----------------------------------------------------------------

export const PROCESS_STEPS = [
  { step: 1, title: 'Inquiry',          description: 'Tell us what you need. A quick call or WhatsApp message is all it takes to start.' },
  { step: 2, title: 'Quote',            description: 'We send a clear, itemised quote — no hidden costs, no surprises.' },
  { step: 3, title: 'Design Approval',  description: 'Our studio designs it; you review and approve before anything is printed.' },
  { step: 4, title: 'Production',       description: 'We produce your order in-house with rigorous quality checks.' },
  { step: 5, title: 'Delivery',         description: 'Packed with care and shipped anywhere in India — on time.' },
];

// -----------------------------------------------------------------
// Testimonials (only use genuine feedback — empty until provided)
// -----------------------------------------------------------------

export const TESTIMONIALS: {
  quote: string;
  author: string;
  role: string;
  company: string;
}[] = [];

// -----------------------------------------------------------------
// Runtime env override
// -----------------------------------------------------------------

export function getBrandName(): string {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BRAND_NAME) {
    return process.env.NEXT_PUBLIC_BRAND_NAME;
  }
  return BRAND.name;
}

export function getBrandTagline(): string {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BRAND_TAGLINE) {
    return process.env.NEXT_PUBLIC_BRAND_TAGLINE;
  }
  return BRAND.tagline;
}

export function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return SEO.siteUrl;
}

/** Build a wa.me URL with the predefined message. */
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage ?? CONTACT.whatsappMessage);
  return `https://wa.me/${CONTACT.whatsapp}?text=${msg}`;
}

export type BrandConfig = typeof BRAND;
export type ContactConfig = typeof CONTACT;
export type ColorsConfig = typeof COLORS;
