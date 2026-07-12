'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/layout/Container';
import { getWhatsAppUrl } from '@inkora/brand';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/#why', label: 'Why Inkelse' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full transition-all duration-300 ease-standard',
        isScrolled ? 'bg-paper/90 shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className={cn(
            'flex items-center transition-colors',
            isScrolled ? 'text-ink' : 'text-paper',
          )}
        >
          <Logo variant="primary" className="text-base md:text-lg" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition-colors duration-150',
                isScrolled ? 'text-ink/80 hover:text-ink' : 'text-paper/80 hover:text-paper',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-pill bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1EBE57] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Get a quote
          </a>

          <button
            type="button"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden',
              isScrolled ? 'text-ink hover:bg-ink/5' : 'text-paper hover:bg-paper/10',
            )}
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </Container>

      {isMobileOpen && (
        <div className="border-t border-edge bg-paper md:hidden">
          <Container className="py-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 text-lg font-semibold tracking-tight text-ink hover:text-magenta"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-pill bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Get a quote on WhatsApp
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
