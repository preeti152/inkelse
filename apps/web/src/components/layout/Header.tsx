'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { getWhatsAppUrl } from '@inkora/brand';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'Studio' },
  { href: '/#process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Header — a quiet sand bar with the thin wordmark + tagline, tracked
 * uppercase navigation and a black "Get a quote" pill. Gains a hairline
 * and frosted backdrop once the page scrolls.
 */
export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileOpen]);

  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-standard',
        isScrolled || isMobileOpen
          ? 'border-b border-coal/10 bg-sand/85 backdrop-blur-md'
          : 'border-b border-transparent bg-sand',
      )}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 md:px-10 lg:px-14">
        <Link href="/" aria-label="Inkelse home" className="text-coal">
          <span className="text-[15px] sm:hidden">
            <Logo variant="primary" />
          </span>
          <Logo variant="stacked" className="hidden text-[15px] sm:inline-flex md:text-base" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'link-u pb-1 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors',
                      active ? 'text-coal [background-size:100%_1px]' : 'text-coal/70 hover:text-coal',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark group hidden !min-h-11 !px-6 sm:inline-flex"
          >
            Get a quote
            <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
          </a>
          <button
            type="button"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-coal transition-colors hover:bg-coal/5 lg:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-coal/10 bg-sand lg:hidden"
          >
            <ul className="px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-coal/10 last:border-0">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex min-h-14 items-center justify-between text-2xl font-light tracking-tight text-coal"
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-coal/40" strokeWidth={1.25} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-dark w-full">
                Get a quote on WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
