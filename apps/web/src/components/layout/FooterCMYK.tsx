'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, ArrowRight, ArrowUpRight, Check, Mail, Phone, MessageCircle } from 'lucide-react';
import { BRAND, CONTACT, SOCIAL, SERVICES, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/brand/Logo';

const COMPANY = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Footer — quiet, dark close. Newsletter, link columns, direct channels and an
 * oversized wordmark with a slow band of light passing across it.
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
    <footer className="relative overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hairline absolute inset-x-0 top-0" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan/20 via-[#8B7CF6]/15 to-magenta/20 blur-[120px]" />
      </div>

      <Container className="relative z-10 pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block text-white" aria-label={`${BRAND.nameDisplay} home`}>
              <Logo variant="primary" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">{BRAND.longDescription}</p>

            <form onSubmit={handleSubscribe} className="mt-8 max-w-md">
              <label htmlFor="footer-email" className="text-xs font-semibold uppercase tracking-tracked text-white/45">
                Print tips, occasionally
              </label>
              {subscribed ? (
                <p role="status" className="mt-3 inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">
                  <Check className="h-4 w-4 text-[#4ADE80]" strokeWidth={2.5} />
                  You&apos;re in — thanks!
                </p>
              ) : (
                <div className="mt-3 flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] p-1.5 transition-colors focus-within:border-white/25">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white/30 focus:outline-none"
                  />
                  <button type="submit" aria-label="Subscribe" className="btn-light !min-h-0 shrink-0 !px-4 !py-2.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Services</p>
            <ul className="mt-5 space-y-1">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <FooterLink href={`/services/${s.slug}`}>{s.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Company</p>
            <ul className="mt-5 space-y-1">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Talk to us */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Talk to us</p>
            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2.5 text-white/65 transition-colors hover:text-white">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.75} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="inline-flex min-h-9 items-center gap-2.5 text-white/65 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-magenta-300" strokeWidth={1.75} />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-9 max-w-full items-center gap-2.5 text-white/65 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} />
                  <span className="truncate">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
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

        {/* Oversized wordmark with a passing band of light */}
        <p
          aria-hidden="true"
          className="text-shimmer pointer-events-none mt-20 select-none text-center font-display text-[length:clamp(4.5rem,19vw,16rem)] font-semibold leading-[0.8] tracking-[-0.06em] opacity-[0.14]"
        >
          {BRAND.name}
        </p>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {CONTACT.certifications[0] && <span>{CONTACT.certifications[0]}</span>}
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-9 items-center gap-1 text-sm text-white/65 transition-colors hover:text-white">
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        strokeWidth={2}
      />
    </Link>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: typeof Facebook; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </a>
  );
}
