import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { ScrollNarrative } from '@/components/marketing/ScrollNarrative';
import { HeroInkelse } from '@/components/marketing/HeroInkelse';
import { BrandBand } from '@/components/marketing/BrandBand';
import { Services } from '@/components/marketing/Services';
import { StudioStatement } from '@/components/marketing/StudioStatement';
import { FeaturedProjects } from '@/components/marketing/FeaturedProjects';
import { WhyInkelse } from '@/components/marketing/WhyInkelse';
import { Industries } from '@/components/marketing/Industries';
import { HowWeWork } from '@/components/marketing/HowWeWork';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { ContactSection } from '@/components/marketing/ContactSection';

/**
 * Home — "Atelier" homepage, composed from the brand board.
 * Surfaces alternate stone ↔ coal like the board itself; every section is
 * full-bleed with hairline grids, so there is no dead space.
 *
 *  Hero (sand, split with flat-lay)  →  BrandBand (coal, 4 pillars)
 *  Services (paper grid)             →  StudioStatement (image | story)
 *  FeaturedProjects (coal bento)     →  WhyInkelse (sand grid)
 *  Industries (coal marquee)         →  HowWeWork (paper, drawn rule)
 *  Testimonials (slim, honest)       →  Contact (coal | sand split)
 */
export default function HomePage() {
  return (
    <>
      <ScrollNarrative />
      <Header />

      <main id="main">
        <HeroInkelse />
        <BrandBand />
        <Services />
        <StudioStatement />
        <FeaturedProjects />
        <WhyInkelse />
        <Industries />
        <HowWeWork />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
