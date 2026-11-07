'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, ArrowRight, Check, Mail, Phone, MessageCircle } from 'lucide-react';
import { BRAND, CONTACT, SOCIAL, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/brand/Logo';

const EXPLORE = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Footer — dark CMYK mesh sheet that overlaps the section above, with a glass
 * newsletter card, link columns, an oversized gradient wordmark and the
 * signature CMYK hairline.
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
    <footer className="bg-mesh-dark bg-grain relative -mt-10 overflow-hidden rounded-t-[2.5rem] text-paper md:-mt-14 md:rounded-t-[3.5rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-fade absolute inset-0 opacity-60" />
        <div className="aurora-blob -left-24 bottom-0 h-96 w-96 bg-cyan/30" />
        <div className="aurora-blob -right-24 top-0 h-96 w-96 bg-magenta/25" style={{ animationDelay: '-9s' }} />
      </div>

      {/* CMYK hairline along the sheet edge */}
      <div className="cmyk-bar absolute inset-x-10 top-0 h-[3px] rounded-b-full md:inset-x-20" aria-hidden="true" />

      <Container className="relative z-10 pb-10 pt-20 md:pt-24">
        {/* Newsletter */}
        <form
          onSubmit={handleSubscribe}
          className="glass-dark mx-auto flex max-w-4xl flex-col gap-5 rounded-[2rem] p-6 md:flex-row md:items-center md:gap-8 md:p-4 md:pl-8"
        >
          <div className="md:flex-1">
            <p className="text-lg font-bold tracking-tight md:text-xl">Subscribe to our newsletter</p>
            <p className="mt-0.5 text-sm text-paper/60">Helpful articles about printing best practices.</p>
          </div>

          {subscribed ? (
            <span role="status" className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-ink">
              <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={2.5} />
              You&apos;re in — thanks!
            </span>
          ) : (
            <div className="flex w-full items-center gap-2 rounded-pill border border-white/10 bg-white/5 p-1.5 md:w-auto">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-paper placeholder:text-paper/40 focus:outline-none md:w-64"
              />
              <button type="submit" className="btn-pill-gradient btn-shine shrink-0 !px-5 !py-2.5">
                <span className="shine" aria-hidden="true" />
                Subscribe
              </button>
            </div>
          )}
        </form>

        {/* Columns */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block text-paper" aria-label={`${BRAND.nameDisplay} home`}>
              <Logo variant="primary" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">{BRAND.longDescription}</p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.facebook && <SocialLink href={SOCIAL.facebook} icon={Facebook} label="Facebook" />}
              {SOCIAL.instagram && <SocialLink href={SOCIAL.instagram} icon={Instagram} label="Instagram" />}
              {SOCIAL.youtube && <SocialLink href={SOCIAL.youtube} icon={Youtube} label="YouTube" />}
              {SOCIAL.twitter && <SocialLink href={SOCIAL.twitter} icon={Twitter} label="Twitter" />}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-tracked text-paper/45">Explore</p>
            <ul className="mt-4 space-y-1">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex min-h-9 items-center gap-1 text-sm text-paper/75 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-tracked text-paper/45">Sales office</p>
            <p className="mt-4 text-sm leading-relaxed text-paper/75">
              {CONTACT.address.line1}
              <br />
              {CONTACT.address.line2}
              <br />
              {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.pincode} · {CONTACT.address.country}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-tracked text-paper/45">Talk to us</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 text-paper/75 transition-colors hover:text-white">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.75} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="inline-flex min-h-9 items-center gap-2 text-paper/75 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-magenta-300" strokeWidth={1.75} />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-9 max-w-full items-center gap-2 text-paper/75 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} />
                  <span className="truncate">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none text-center font-display text-[length:clamp(4rem,17vw,14rem)] font-black leading-none tracking-tightest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
        >
          {BRAND.name}
        </p>

        {/* Legal */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {CONTACT.certifications[0] && (
              <>
                <span>{CONTACT.certifications[0]}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: typeof Facebook; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-cyan hover:to-magenta hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </a>
  );
}
