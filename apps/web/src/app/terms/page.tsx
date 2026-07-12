import type { Metadata } from 'next';
import { BRAND, CONTACT } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms and conditions for working with ${BRAND.nameDisplay}.`,
};

const LAST_UPDATED = 'July 2026';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        {/* Hero */}
        <div className="relative overflow-hidden bg-ink pt-32 pb-20 text-paper">
          <div className="absolute inset-0 bg-halftone opacity-10" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 20% 20%, rgba(255,214,0,0.22), transparent 60%),' +
                'radial-gradient(ellipse 40% 40% at 85% 80%, rgba(10,174,236,0.25), transparent 60%)',
            }}
          />
          <Container className="relative z-10">
            <p className="eyebrow mb-3 text-yellow">Legal</p>
            <h1 className="font-display text-display-lg uppercase tracking-tightest">Terms of Service</h1>
            <p className="mt-4 text-sm text-paper/60">Last updated: {LAST_UPDATED}</p>
          </Container>
        </div>

        {/* Body */}
        <Container variant="editorial" className="py-16">
          <div className="prose-legal space-y-10 text-ink/80">
            <section>
              <p className="text-lg leading-relaxed">
                These terms govern your use of the {BRAND.nameDisplay} website and the services we provide. By requesting
                a quote or placing an order, you agree to the terms below.
              </p>
            </section>

            <Section title="Quotes and orders">
              <ul className="list-disc space-y-2 pl-6">
                <li>Quotes are based on the specifications you share and are valid for 30 days unless stated otherwise.</li>
                <li>An order is confirmed once you approve the quote and any required advance is received.</li>
                <li>Final artwork must be approved by you before production begins.</li>
              </ul>
            </Section>

            <Section title="Artwork and proofs">
              <p>
                You are responsible for the accuracy of the content, spelling, and artwork you approve. Once a proof is
                signed off and production starts, changes may not be possible or may incur additional charges.
              </p>
            </Section>

            <Section title="Production and delivery">
              <ul className="list-disc space-y-2 pl-6">
                <li>Timelines shared are estimates and begin after artwork approval and payment terms are met.</li>
                <li>Slight variations in colour and finish are normal in printing and are not considered defects.</li>
                <li>Delivery dates may be affected by courier partners and factors beyond our control.</li>
              </ul>
            </Section>

            <Section title="Payments">
              <p>
                Payment terms are set out in your quote. Orders are dispatched once payments due before delivery are
                cleared. Any applicable taxes are charged as per prevailing law.
              </p>
            </Section>

            <Section title="Cancellations and refunds">
              <p>
                As most work is custom-produced, cancellations after production has begun may not be eligible for a
                refund. If a product arrives damaged or defective, contact us within 3 days of delivery and we will make
                it right.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                You retain rights to the brand assets you provide. Designs we create for you become yours upon full
                payment. We may showcase completed work in our portfolio unless you ask us not to.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Questions about these terms? Reach us at{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-cyan underline hover:text-magenta">
                  {CONTACT.email}
                </a>{' '}
                or call{' '}
                <a href={`tel:${CONTACT.phoneHref}`} className="text-cyan underline hover:text-magenta">
                  {CONTACT.phone}
                </a>
                .
              </p>
            </Section>
          </div>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-ink">{title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
