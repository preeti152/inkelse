'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { getWhatsAppUrl } from '@inkora/brand';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Work' },
  { href: '/#process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Floating dark-glass navigation pill.
 * Always legible (dark glass + white text) on every page and background.
 * Tightens and gains a light edge once the page scrolls.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <motion.div
        initial={reduce ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'relative mx-auto flex h-14 items-center justify-between rounded-pill pl-5 pr-2 transition-all duration-500 ease-standard md:h-[3.75rem] md:pl-6',
          'border bg-night/55 backdrop-blur-xl backdrop-saturate-150',
          isScrolled
            ? 'max-w-5xl border-white/[0.12] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]'
            : 'max-w-6xl border-white/[0.07]',
        )}
      >
        {/* Light edge along the top of the pill */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent transition-opacity duration-500',
            isScrolled ? 'opacity-100' : 'opacity-0',
          )}
        />

        <Link href="/" aria-label="Inkelse home" className="flex items-center text-white">
          <Logo variant="primary" className="text-base md:text-lg" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative z-10 block rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-200',
                      active ? 'text-white' : 'text-white/60 hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                  {(hovered === link.href || (hovered === null && active)) && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-pill bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
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
            className="btn-light btn-shine group hidden !min-h-0 !px-5 !py-2.5 sm:inline-flex"
          >
            <span className="shine" aria-hidden="true" />
            Get a quote
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.25} />
          </a>

          <button
            type="button"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-[1.75rem] border border-white/10 bg-night/85 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-lg font-medium tracking-tight text-white transition-colors hover:bg-white/5"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-white/40" strokeWidth={2} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-2 w-full !py-3.5"
            >
              Get a quote on WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
