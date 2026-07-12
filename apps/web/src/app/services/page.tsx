import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Printing, corporate gifting, signage, packaging, graphic design and event branding by Inkelse.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        <div className="bg-ink pt-32 pb-20 text-paper">
          <Container>
            <p className="eyebrow mb-3 text-cyan">What we do</p>
            <h1 className="font-display text-display-xl uppercase tracking-tightest">Services</h1>
            <p className="mt-4 max-w-2xl text-lg text-paper/70">
              {BRAND.nameDisplay} is one partner for every branding need — from a single business card to a full event.
            </p>
          </Container>
        </div>

        <Container className="py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-edge bg-paper p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition-all duration-500 group-hover:scale-[6] group-hover:opacity-100"
                  style={{ backgroundColor: service.accent }}
                />
                <div className="relative z-10">
                  <span className="text-4xl" aria-hidden>{service.emoji}</span>
                  <h2 className="mt-4 text-xl font-bold text-ink transition-colors duration-500 group-hover:text-white">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-quiet transition-colors duration-500 group-hover:text-white/90">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-ink transition-colors duration-500 group-hover:text-white">
                    <span>Explore</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
