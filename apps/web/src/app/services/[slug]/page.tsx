import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { SERVICES, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service not found' };
  return { title: service.name, description: service.description };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        {/* Hero */}
        <div
          className="relative flex min-h-[50vh] items-end overflow-hidden pt-24"
          style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}99 40%, #1A1A1A)` }}
        >
          <div className="absolute inset-0 bg-halftone opacity-20" />
          <Container className="relative z-10 pb-16">
            <Link href="/services" className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              All services
            </Link>
            <div className="text-6xl" aria-hidden>{service.emoji}</div>
            <h1 className="mt-4 font-display text-display-xl uppercase tracking-tightest text-white">{service.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{service.description}</p>
          </Container>
        </div>

        {/* Body */}
        <Container variant="editorial" className="py-20">
          <p className="text-lg leading-relaxed text-ink/80">{service.intro}</p>

          <div className="mt-12">
            <p className="eyebrow mb-5" style={{ color: service.accent }}>What we offer</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <div key={o} className="flex items-center gap-3 rounded-xl border border-edge p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ backgroundColor: service.accent }}>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-ink">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* CTA */}
        <div className="bg-ink py-16 text-center text-paper">
          <Container variant="editorial">
            <h2 className="font-display text-display-md uppercase tracking-tightest">
              Need <span style={{ color: service.accent }}>{service.name.toLowerCase()}</span>?
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#contact" className="btn-pill-cyan group">
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <a
                href={getWhatsAppUrl(`Hi ${BRAND.nameDisplay}! I'm interested in your ${service.name} service.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1EBE57]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp us
              </a>
            </div>
          </Container>
        </div>

        {/* Next service */}
        <Container className="py-16">
          <Link href={`/services/${next.slug}`} className="group flex items-center justify-between rounded-2xl border border-edge p-8 transition-colors hover:border-ink">
            <div>
              <p className="text-xs uppercase tracking-tracked text-quiet">Next service</p>
              <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tightest text-ink">{next.emoji} {next.name}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-ink transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
