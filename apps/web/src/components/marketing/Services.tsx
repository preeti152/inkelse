'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { Reveal, SectionHeading, EASE_OUT } from '@/components/motion/Reveal';
import { lit } from '@/lib/lit';
import { cn } from '@/lib/cn';
import { BusinessCards, GiftBox, Letterhead, PackBox, Standee, Tote } from './Artifacts';

/** Which illustration represents each service. */
const ART: Record<string, (p: { className?: string }) => React.ReactElement> = {
  printing: BusinessCards,
  'corporate-gifting': GiftBox,
  signage: Standee,
  packaging: PackBox,
  'graphic-design': Letterhead,
  'event-branding': Tote,
};

/**
 * Section 3 — Services as an interactive showcase.
 * Desktop: vertical tab list (left) drives a large lit glass panel (right).
 * Mobile: horizontally scrollable chips above the same panel.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = SERVICES[active];
  const accent = lit(service.accent);
  const Art = ART[service.slug] ?? BusinessCards;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % SERVICES.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + SERVICES.length) % SERVICES.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = SERVICES.length - 1;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Stage id="services" glow="split" torch className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="What we do"
            title="One partner."
            accent="Every branding need."
            lead="Six disciplines under one roof — so your cards, gifts, signs and boxes all look like they came from the same brand. Because they did."
          />
          <Reveal delay={0.2}>
            <Link href="/services" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
              All services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* ── Tab list ───────────────────────────────── */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s, i) => {
              const selected = i === active;
              const c = lit(s.accent);
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`svc-tab-${s.slug}`}
                  aria-selected={selected}
                  aria-controls="svc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'group relative flex shrink-0 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors duration-300 lg:w-full lg:px-5 lg:py-5',
                    selected ? 'text-white' : 'text-white/45 hover:text-white/80',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="svc-active"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.05]"
                    >
                      <span
                        className="absolute left-0 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full lg:block"
                        style={{ backgroundColor: c, boxShadow: `0 0 16px 2px ${c}` }}
                      />
                    </motion.span>
                  )}
                  <span className="relative hidden w-7 font-mono text-xs tabular-nums text-white/30 lg:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500"
                    style={{
                      color: selected ? c : 'rgba(255,255,255,0.5)',
                      backgroundColor: selected ? `${c}1F` : 'rgba(255,255,255,0.04)',
                      boxShadow: selected ? `0 0 24px -6px ${c}` : 'none',
                    }}
                  >
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="relative whitespace-nowrap text-base font-semibold tracking-tight lg:text-2xl">
                    {s.name}
                  </span>
                  <ArrowRight
                    className={cn(
                      'relative ml-auto hidden h-5 w-5 transition-all duration-300 lg:block',
                      selected ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                    )}
                    strokeWidth={2}
                  />
                </button>
              );
            })}
          </div>

          {/* ── Panel ─────────────────────────────────── */}
          <div
            id="svc-panel"
            role="tabpanel"
            aria-labelledby={`svc-tab-${service.slug}`}
            className="border-beam relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-night-800 lg:col-span-7"
          >
            {/* Accent light pooling from the top of the panel */}
            <motion.div
              aria-hidden="true"
              animate={{ backgroundColor: accent }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
            />
            <div aria-hidden="true" className="bg-grid-fade pointer-events-none absolute inset-0 opacity-60" />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.slug}
                initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? undefined : { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="relative grid h-full gap-8 p-7 md:grid-cols-5 md:p-10"
              >
                <div className="flex flex-col md:col-span-3">
                  <span
                    className="inline-flex w-fit items-center gap-2 rounded-pill px-3 py-1 text-xs font-semibold"
                    style={{ color: accent, backgroundColor: `${accent}1A` }}
                  >
                    <ServiceIcon name={service.icon} className="h-3.5 w-3.5" />
                    {service.name}
                  </span>
                  <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white md:text-[1.75rem]">
                    {service.description}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/55">{service.intro}</p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.offerings.slice(0, 6).map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-white/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} strokeWidth={2.5} />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Link href={`/services/${service.slug}`} className="btn-light group !py-2.5">
                      Explore {service.name.toLowerCase()}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                    </Link>
                    <a
                      href={getWhatsAppUrl(`Hi Inkelse! I'd like a quote for ${service.name.toLowerCase()}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-glass !py-2.5"
                    >
                      Get a quote
                    </a>
                  </div>
                </div>

                {/* Illustration on a lit plinth */}
                <div className="relative hidden items-center justify-center md:col-span-2 md:flex">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-10 h-10 w-48 rounded-[100%] blur-xl"
                    style={{ backgroundColor: `${accent}55` }}
                  />
                  <motion.div
                    initial={reduce ? false : { y: 24, rotate: -4, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
                    className="relative w-full max-w-[15rem] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
                  >
                    <Art className="h-auto w-full" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </Stage>
  );
}
