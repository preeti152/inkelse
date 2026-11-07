import type { Metadata } from 'next';
import { BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { Stage } from '@/components/layout/Stage';
import { Reveal } from '@/components/motion/Reveal';
import { WhyInkelse } from '@/components/marketing/WhyInkelse';
import { HowWeWork } from '@/components/marketing/HowWeWork';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${BRAND.nameDisplay} — a full-service branding partner for businesses across India.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-night">
        <PageHero eyebrow="About us" title="Beyond ink." accent="Beyond the screen." lead={BRAND.longDescription} />

        {/* Story */}
        <Stage className="py-24 md:py-32">
          <Container variant="editorial">
            <Reveal>
              <p className="eyebrow">Our story</p>
              <blockquote className="mt-6 font-serif text-3xl italic leading-snug text-white md:text-5xl md:leading-[1.15]">
                &ldquo;{BRAND.story}&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 text-lg leading-relaxed text-white/65 md:text-xl md:leading-relaxed">
                {BRAND.nameDisplay} was built on a simple idea: businesses shouldn&apos;t have to juggle five vendors to look
                put-together. We bring printing, gifting, signage, packaging, design and event branding under one roof —
                so your brand shows up consistently, everywhere, without the chaos.
              </p>
            </Reveal>
          </Container>
        </Stage>

        <WhyInkelse />
        <HowWeWork />

        <CtaBand title="Let’s build" accent="your brand." />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
