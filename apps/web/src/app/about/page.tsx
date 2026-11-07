import type { Metadata } from 'next';
import { BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { PageHero } from '@/components/layout/PageHero';
import { BrandBand } from '@/components/marketing/BrandBand';
import { StudioStatement } from '@/components/marketing/StudioStatement';
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
      <main id="main">
        <PageHero
          label="The studio"
          lines={['Design to print,', 'beyond the screen.']}
          lead={BRAND.longDescription}
          image={{ src: '/images/brand/hero-flatlay.jpg', alt: 'Inkelse branded stationery flat-lay in matte black and stone' }}
        />
        <BrandBand />
        <StudioStatement />
        <WhyInkelse />
        <HowWeWork />
        <CtaBand lines={['Let’s build', 'your brand.']} />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
