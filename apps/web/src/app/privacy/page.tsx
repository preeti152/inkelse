import type { Metadata } from 'next';
import { BRAND, CONTACT } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BRAND.nameDisplay} collects, uses and protects your information.`,
};

const LAST_UPDATED = 'July 2026';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-sand-100">
        <PageHero label="Legal" lines={['Privacy Policy']} lead={`Last updated: ${LAST_UPDATED}`} />

        {/* Body */}
        <Container variant="editorial" className="py-20 md:py-24">
          <div className="prose-legal space-y-12 text-[17px] leading-relaxed text-coal/75 [&_strong]:font-medium [&_strong]:text-coal">
            <section>
              <p className="text-lg leading-relaxed">
                At {BRAND.nameDisplay}, your privacy matters. This policy explains what information we collect when you
                use our website or request a quote, why we collect it, and how we keep it safe.
              </p>
            </section>

            <Section title="Information we collect">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Contact details</strong> you share when requesting a quote or reaching out — such as your name,
                  email address, phone number, and company.
                </li>
                <li>
                  <strong>Project details</strong> you provide about your printing, gifting, packaging, or branding
                  requirements.
                </li>
                <li>
                  <strong>Usage data</strong> like pages viewed and general device information, used only to improve the
                  website.
                </li>
              </ul>
            </Section>

            <Section title="How we use your information">
              <ul className="list-disc space-y-2 pl-6">
                <li>To respond to enquiries and prepare accurate quotes.</li>
                <li>To deliver, produce, and ship your orders.</li>
                <li>To share updates about your project when you ask us to.</li>
                <li>To improve our services and website experience.</li>
              </ul>
            </Section>

            <Section title="Sharing your information">
              <p>
                We do not sell your personal information. We only share it with trusted partners who help us fulfil your
                order — such as production and courier partners — and only to the extent needed to serve you.
              </p>
            </Section>

            <Section title="Data security">
              <p>
                We take reasonable technical and organisational measures to protect your information from loss, misuse,
                and unauthorised access. No method of transmission over the internet is fully secure, but we work to keep
                your data safe at every step.
              </p>
            </Section>

            <Section title="Your choices">
              <p>
                You can request access to, correction of, or deletion of your personal information at any time. To do so,
                simply contact us at{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-coal underline underline-offset-4 hover:opacity-70">
                  {CONTACT.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Questions about this policy? Reach us at{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-coal underline underline-offset-4 hover:opacity-70">
                  {CONTACT.email}
                </a>{' '}
                or call{' '}
                <a href={`tel:${CONTACT.phoneHref}`} className="text-coal underline underline-offset-4 hover:opacity-70">
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
      <h2 className="label mb-4 text-coal">{title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
