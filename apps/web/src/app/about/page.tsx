import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BRAND, WHY_INKELSE, PROCESS_STEPS } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${BRAND.nameDisplay} — a full-service branding partner for businesses across India.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        {/* Hero */}
        <div className="relative overflow-hidden bg-ink pt-32 pb-24 text-paper">
          <div className="absolute inset-0 bg-halftone opacity-10" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 20% 20%, rgba(10,174,236,0.3), transparent 60%),' +
                'radial-gradient(ellipse 40% 40% at 85% 80%, rgba(233,30,99,0.25), transparent 60%)',
            }}
          />
          <Container className="relative z-10">
            <p className="eyebrow mb-3 text-cyan">About us</p>
            <h1 className="max-w-3xl font-display text-display-xl uppercase tracking-tightest text-balance">
              Beyond ink. Beyond the screen.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-paper/80">{BRAND.longDescription}</p>
          </Container>
        </div>

        {/* Story */}
        <Container variant="editorial" className="py-20">
          <p className="eyebrow mb-4">Our story</p>
          <p className="font-serif text-2xl italic leading-relaxed text-ink md:text-3xl">
            &ldquo;{BRAND.story}&rdquo;
          </p>
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            {BRAND.nameDisplay} was built on a simple idea: businesses shouldn&apos;t have to juggle five vendors to look
            put-together. We bring printing, gifting, signage, packaging, design, and event branding under one roof — so
            your brand shows up consistently, everywhere, without the chaos.
          </p>
        </Container>

        {/* Values / Why */}
        <div className="bg-paper-cream py-20">
          <Container>
            <p className="eyebrow mb-4">What we stand for</p>
            <h2 className="font-display text-display-md uppercase tracking-tightest text-ink">Our promise</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_INKELSE.map((w) => (
                <div key={w.title} className="rounded-2xl bg-paper p-6 shadow-sm">
                  <div className="mb-4 h-1 w-10" style={{ backgroundColor: w.color }} />
                  <h3 className="text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{w.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Process */}
        <Container className="py-20">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="font-display text-display-md uppercase tracking-tightest text-ink">A simple, transparent process</h2>
          <div className="mt-10 space-y-4">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="flex gap-5 rounded-2xl border border-edge p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-quiet">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* CTA */}
        <div className="bg-ink py-16 text-center text-paper">
          <Container variant="editorial">
            <h2 className="font-display text-display-md uppercase tracking-tightest">
              Let&apos;s build your <span className="text-cyan">brand.</span>
            </h2>
            <div className="mt-8">
              <Link href="/#contact" className="btn-pill-cyan group">
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </Container>
        </div>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
