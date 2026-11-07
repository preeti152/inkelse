import type { Metadata } from 'next';
import { BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { PageHero } from '@/components/layout/PageHero';
import { BrandBand } from '@/components/marketing/BrandBand';
import { ServiceGrid } from '@/components/marketing/Services';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Printing, corporate gifting, signage, packaging, graphic design and event branding by Inkelse.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-sand-100">
        <PageHero
          label="What we do"
          lines={['Every brand touchpoint,', 'one studio.']}
          lead={`${BRAND.nameDisplay} handles everything from a single business card to a full event — designed, produced and delivered under one roof.`}
          image={{ src: '/images/brand/box.jpg', alt: 'Black Inkelse rigid gift box with white foil wordmark' }}
        />
        <BrandBand />
        <ServiceGrid />
        <CtaBand lines={['Not sure what', 'you need?']} lead="Tell us about your brand or event — we’ll recommend the right mix and send a clear quote." />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
