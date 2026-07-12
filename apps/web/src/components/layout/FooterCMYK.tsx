'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, ArrowRight } from 'lucide-react';
import { BRAND, CONTACT, SOCIAL } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/brand/Logo';

/**
 * FooterCMYK — Black footer with the signature CMYK stripe at the top,
 * a cyan newsletter subscribe pill, sales-office address, social icons,
 * and a legal strip. Matches the brochure's footer exactly.
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
    <footer className="relative bg-ink text-paper">
      {/* CMYK stripe at the very top */}
      <div className="cmyk-bar h-2.5" aria-hidden="true" />

      <Container className="py-16">
        {/* Newsletter subscribe pill */}
        <form
          onSubmit={handleSubscribe}
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-cyan p-6 shadow-2xl md:flex-row md:gap-6 md:rounded-pill md:p-2.5 md:pl-8"
        >
          <div className="text-center md:flex-1 md:text-left">
            <p className="text-lg font-bold text-paper md:text-xl">Subscribe to our newsletter</p>
            <p className="text-xs text-paper/80">Helpful articles about printing best practices</p>
          </div>

          {subscribed ? (
            <span className="rounded-pill bg-paper px-6 py-3 text-sm font-semibold text-ink">
              You&apos;re in 🎉
            </span>
          ) : (
            <div className="flex w-full items-center gap-2 md:w-auto md:gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full flex-1 rounded-pill border-0 bg-paper/20 px-5 py-3 text-paper placeholder:text-paper/70 focus:bg-paper focus:text-ink focus:outline-none focus:placeholder:text-quiet md:w-72"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          )}
        </form>

        {/* Brand + meta */}
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-block text-paper">
              <Logo variant="primary" />
            </Link>
            <p className="mt-4 text-sm text-paper/70">{BRAND.tagline}</p>
          </div>

          <div className="text-sm text-paper/80">
            <p className="font-bold text-paper">Explore</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/services" className="text-paper/70 hover:text-paper">Services</Link></li>
              <li><Link href="/projects" className="text-paper/70 hover:text-paper">Projects</Link></li>
              <li><Link href="/about" className="text-paper/70 hover:text-paper">About</Link></li>
              <li><Link href="/contact" className="text-paper/70 hover:text-paper">Contact</Link></li>
            </ul>
          </div>

          <div className="text-sm text-paper/80">
            <p className="font-bold text-paper">Sales office</p>
            <p className="mt-2 leading-relaxed">
              {CONTACT.address.line1}
              <br />
              {CONTACT.address.line2}
              <br />
              {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.pincode} · {CONTACT.address.country}
            </p>
          </div>

          <div>
            <p className="font-bold text-paper">Follow us</p>
            <div className="mt-3 flex items-center gap-3">
              {SOCIAL.facebook && (
                <SocialLink href={SOCIAL.facebook} icon={Facebook} label="Facebook" />
              )}
              {SOCIAL.instagram && (
                <SocialLink href={SOCIAL.instagram} icon={Instagram} label="Instagram" />
              )}
              {SOCIAL.youtube && (
                <SocialLink href={SOCIAL.youtube} icon={Youtube} label="YouTube" />
              )}
              {SOCIAL.twitter && (
                <SocialLink href={SOCIAL.twitter} icon={Twitter} label="Twitter" />
              )}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BRAND.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {CONTACT.certifications[0] && (
              <>
                <span>{CONTACT.certifications[0]}</span>
                <span>·</span>
              </>
            )}
            <Link href="/privacy" className="hover:text-paper">Privacy</Link>
            <Link href="/terms" className="hover:text-paper">Terms</Link>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper hover:text-ink"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </a>
  );
}
