import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { ScrollNarrative } from '@/components/marketing/ScrollNarrative';
import { HeroInkelse } from '@/components/marketing/HeroInkelse';
import { Industries } from '@/components/marketing/Industries';
import { Services } from '@/components/marketing/Services';
import { FeaturedProjects } from '@/components/marketing/FeaturedProjects';
import { WhyInkelse } from '@/components/marketing/WhyInkelse';
import { HowWeWork } from '@/components/marketing/HowWeWork';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { ContactSection } from '@/components/marketing/ContactSection';

/**
 * Home — Inkelse "Ink Night" homepage.
 *
 * 1. Hero             — lamp-lit headline + tilting showcase of printed artifacts
 * 2. Industries       — "built for" dual marquee
 * 3. Services         — interactive tab showcase (6 disciplines)
 * 4. FeaturedProjects — pinned horizontal case-study gallery
 * 5. WhyInkelse       — bento of reasons, each with a living micro-visual
 * 6. HowWeWork        — scroll-lit vertical process rail (#process)
 * 7. Testimonials     — genuine feedback only (honest placeholder until provided)
 * 8. Contact          — lamp-lit closing CTA + quote form (#contact)
 */
export default function HomePage() {
  return (
    <>
      <ScrollNarrative />
      <Header />

      <main id="main" className="bg-night">
        <HeroInkelse />
        <Industries />
        <Services />
        <FeaturedProjects />
        <WhyInkelse />
        <HowWeWork />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
