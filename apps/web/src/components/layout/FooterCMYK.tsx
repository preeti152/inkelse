'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, ArrowRight, Check } from 'lucide-react';
import { BRAND, CONTACT, SOCIAL, SERVICES, getWhatsAppUrl } from '@inkora/brand';
import { Logo } from '@/components/brand/Logo';

const STUDIO = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'Studio' },
  { href: '/#process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Footer — coal, editorial. Big tracked wordmark + tagline, newsletter,
 * link columns, legal strip with the k seal.
 */
export function FooterCMYK() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-sand/10 bg-coal text-sand-50">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        {/* Wordmark band */}
        <div className="grid gap-10 border-b border-sand/15 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link href="/" aria-label={`${BRAND.nameDisplay} home`} className="inline-block text-sand-50">
              <Logo variant="stacked" className="text-[length:clamp(1.75rem,4.5vw,3.25rem)]" />
            </Link>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col justify-end lg:col-span-5">
            <label htmlFor="footer-email" className="label text-sand/55">
              Print notes, occasionally
            </label>
            {subscribed ? (
              <p role="status" className="mt-4 flex items-center gap-2 border-b border-sand/30 py-3 text-lg font-light">
                <Check className="h-5 w-5" strokeWidth={1.5} />
                You&apos;re in — thank you.
              </p>
            ) : (
              <div className="mt-4 flex items-center border-b border-sand/30 transition-colors focus-within:border-sand">
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-lg font-light text-sand-50 placeholder:text-sand/35 focus:outline-none focus:ring-0"
                />
                <button type="submit" aria-label="Subscribe" className="group flex h-11 w-11 items-center justify-center">
                  <ArrowRight className="arrow-nudge h-5 w-5" strokeWidth={1.25} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-sand/45">Studio</p>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-sand/65">{BRAND.longDescription}</p>
          </div>
          <FooterCol title="Services" className="lg:col-span-3">
            {SERVICES.map((s) => (
              <FooterLink key={s.id} href={`/services/${s.slug}`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Explore" className="lg:col-span-2">
            {STUDIO.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>
          <div className="lg:col-span-3">
            <p className="label text-sand/45">Contact</p>
            <ul className="mt-5 space-y-2 text-[15px]">
              <li>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="link-u pb-0.5 text-sand/75 hover:text-sand-50">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="link-u pb-0.5 text-sand/75 hover:text-sand-50">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="truncate">
                <a href={`mailto:${CONTACT.email}`} className="link-u pb-0.5 text-sand/75 hover:text-sand-50">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-sand/50">
              {CONTACT.address.line1}
              <br />
              {CONTACT.address.line2}
              <br />
              {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.pincode}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.facebook && <SocialLink href={SOCIAL.facebook} icon={Facebook} label="Facebook" />}
              {SOCIAL.instagram && <SocialLink href={SOCIAL.instagram} icon={Instagram} label="Instagram" />}
              {SOCIAL.youtube && <SocialLink href={SOCIAL.youtube} icon={Youtube} label="YouTube" />}
              {SOCIAL.twitter && <SocialLink href={SOCIAL.twitter} icon={Twitter} label="Twitter" />}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-sand/15 py-7 text-xs text-sand/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {CONTACT.certifications[0] && <span>{CONTACT.certifications[0]}</span>}
            <Link href="/privacy" className="link-u pb-0.5 hover:text-sand-50">
              Privacy
            </Link>
            <Link href="/terms" className="link-u pb-0.5 hover:text-sand-50">
              Terms
            </Link>
            <Logo variant="monogram" className="h-7 w-7 text-sand/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="label text-sand/45">{title}</p>
      <ul className="mt-5 space-y-2">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-u pb-0.5 text-[15px] text-sand/75 transition-colors hover:text-sand-50">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: typeof Facebook; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/20 text-sand/75 transition-colors duration-300 hover:border-sand hover:bg-sand hover:text-coal"
    >
      <Icon className="h-4 w-4" strokeWidth={1.25} />
    </a>
  );
}
