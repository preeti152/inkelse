import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { CtaBand } from '@/components/marketing/CtaBand';
import { BusinessCards, GiftBox, Letterhead, PackBox, Standee, Tote } from '@/components/marketing/Artifacts';
import { lit } from '@/lib/lit';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ART: Record<string, (p: { className?: string }) => React.ReactElement> = {
  printing: BusinessCards,
  'corporate-gifting': GiftBox,
  signage: Standee,
  packaging: PackBox,
  'graphic-design': Letterhead,
  'event-branding': Tote,
};

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
  const c = lit(service.accent);
  const Art = ART[service.slug] ?? BusinessCards;

  return (
    <>
      <Header />
      <main id="main" className="bg-night">
        <PageHero
          back={{ href: '/services', label: 'All services' }}
          eyebrow="Service"
          title={service.name}
          lead={service.description}
          tint={c}
          icon={
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
              style={{ color: c, boxShadow: `0 0 40px -6px ${c}` }}
            >
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
          }
        />

        <Container className="py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Overview</p>
              <p className="mt-5 text-2xl font-medium leading-relaxed tracking-tight text-white/85 md:text-[1.75rem]">
                {service.intro}
              </p>
            </div>
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div aria-hidden="true" className="absolute h-64 w-64 rounded-full blur-[90px]" style={{ backgroundColor: `${c}40` }} />
              <div className="relative w-full max-w-xs drop-shadow-[0_40px_50px_rgba(0,0,0,0.7)]">
                <Art className="h-auto w-full" />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p className="eyebrow">What we offer</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.offerings.map((o) => (
                <li
                  key={o}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-night-800 p-5 transition-colors duration-300 hover:border-white/15"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ color: c, backgroundColor: `${c}1A` }}
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-medium text-white/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <CtaBand
          title={`Need ${service.name.toLowerCase()}?`}
          accent="Let’s talk."
          whatsappMessage={`Hi ${BRAND.nameDisplay}! I'm interested in your ${service.name} service.`}
        />

        <Container className="pb-24">
          <Link
            href={`/services/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[1.75rem] border border-white/[0.07] bg-night-800 p-8 transition-colors duration-300 hover:border-white/20 md:p-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Next service</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{next.name}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-night transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </Link>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
