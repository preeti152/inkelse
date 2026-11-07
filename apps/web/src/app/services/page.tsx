import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { CtaBand } from '@/components/marketing/CtaBand';
import { lit } from '@/lib/lit';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Printing, corporate gifting, signage, packaging, graphic design and event branding by Inkelse.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-night">
        <PageHero
          eyebrow="What we do"
          title="Every branding need,"
          accent="one partner."
          lead={`${BRAND.nameDisplay} handles everything from a single business card to a full event — designed, produced and delivered under one roof.`}
        />

        <Container className="py-20 md:py-28">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const c = lit(service.accent);
              return (
                <SpotlightCard
                  key={service.id}
                  color={`${c}22`}
                  className="group rounded-[1.75rem] border border-white/[0.07] bg-night-800 transition-all duration-500 ease-emphasized hover:-translate-y-1.5 hover:border-white/15"
                >
                  <Link href={`/services/${service.slug}`} className="relative z-10 flex h-full flex-col p-8">
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-bounce group-hover:scale-110"
                        style={{ color: c, backgroundColor: `${c}1A`, boxShadow: `0 0 30px -8px ${c}` }}
                      >
                        <ServiceIcon name={service.icon} className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-xs tabular-nums text-white/25">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="mt-8 text-2xl font-semibold tracking-tight text-white">{service.name}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{service.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {service.offerings.slice(0, 3).map((o) => (
                        <li key={o} className="rounded-pill border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60">
                          {o}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-white">
                      Explore
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                    </span>
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </Container>

        <CtaBand title="Not sure what" accent="you need?" lead="Tell us about your brand or event — we’ll recommend the right mix and send a clear quote." />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
