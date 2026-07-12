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
 * Home — Inkelse immersive scroll-narrative homepage.
 *
 * 1. Hero            — Everything Your Brand Needs. Designed. Printed. Delivered.
 * 2. Industries      — "We work with" (Hotels, Restaurants, Healthcare, …)
 * 3. Services        — 6 cards (Printing, Gifting, Signage, Packaging, Design, Events)
 * 4. FeaturedProjects— 5 case-study cards → /projects/[slug]
 * 5. WhyInkelse      — 6 reasons
 * 6. HowWeWork       — Inquiry → Quote → Design Approval → Production → Delivery
 * 7. Testimonials    — genuine feedback only (placeholder until provided)
 * 8. Contact         — quote form + WhatsApp + email + phone + map
 */
export default function HomePage() {
  return (
    <>
      <ScrollNarrative />
      <Header />

      <main id="main">
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
