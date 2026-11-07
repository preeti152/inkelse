'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { getWhatsAppUrl } from '@inkora/brand';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/#why', label: 'Why Inkelse' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Floating glass navigation.
 * Transparent over the dark hero; condenses into a frosted pill once scrolled.
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

  // Close the mobile sheet on route change and on Escape.
  useEffect(() => setIsMobileOpen(false), [pathname]);
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileOpen]);

  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);
  // Most pages open on a dark hero band, so text starts light; these open on paper.
  const LIGHT_TOP_ROUTES = ['/contact'];
  const opensOnPaper = LIGHT_TOP_ROUTES.some((r) => pathname.startsWith(r));
  const light = !isScrolled && !isMobileOpen && !opensOnPaper;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <motion.div
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between rounded-pill pl-5 pr-2 transition-all duration-500 ease-standard md:h-16 md:pl-7',
          !light
            ? 'glass shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]'
            : 'border border-white/10 bg-white/[0.04] backdrop-blur-md',
        )}
      >
        <Link
          href="/"
          aria-label="Inkelse home"
          className={cn('flex items-center transition-colors duration-300', light ? 'text-paper' : 'text-ink')}
        >
          <Logo variant="primary" className="text-base md:text-lg" />
        </Link>

        {/* Desktop nav with sliding hover pill */}
        <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-1">
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
                      light
                        ? active ? 'text-white' : 'text-white/75 hover:text-white'
                        : active ? 'text-ink' : 'text-ink/65 hover:text-ink',
                    )}
                  >
                    {link.label}
                  </Link>
                  {(hovered === link.href || (hovered === null && active)) && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className={cn('absolute inset-0 rounded-pill', light ? 'bg-white/[0.12]' : 'bg-ink/[0.06]')}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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
            className="btn-pill-gradient btn-shine hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <span className="shine" aria-hidden="true" />
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Get a quote
          </a>

          <button
            type="button"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden',
              light ? 'text-paper hover:bg-white/10' : 'text-ink hover:bg-ink/5',
            )}
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 max-w-6xl origin-top rounded-3xl p-3 md:hidden"
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
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold tracking-tight text-ink transition-colors hover:bg-ink/5"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-ink/40" strokeWidth={2} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-gradient btn-shine mt-2 w-full !py-3.5"
            >
              <span className="shine" aria-hidden="true" />
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              Get a quote on WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
