import type { Metadata } from 'next';
import { BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { ContactSection } from '@/components/marketing/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${BRAND.nameDisplay} for a quote on printing, gifting, signage, packaging and branding.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper pt-16">
        <ContactSection />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
