'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Printer, Gift, PanelsTopLeft, Package, Palette, Tent, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { cn } from '@/lib/cn';
import { SectionDrop } from './SectionDrop';

const ICON_MAP: Record<string, typeof Printer> = {
  printer: Printer,
  gift: Gift,
  'panels-top-left': PanelsTopLeft,
  package: Package,
  palette: Palette,
  tent: Tent,
};

/** Accent → translucent glow colour for the spotlight. */
const glow = (hex: string) => `${hex}2E`;
/** Yellow fails contrast as an icon colour on light glass — darken it. */
const iconInk = (hex: string) => (hex.toUpperCase() === '#FFD600' ? '#B38F00' : hex);

/**
 * Section 3 — Services as a bento grid.
 * Lead service gets a 2×2 tile; the rest are glass cards with a pointer
 * spotlight and an animated CMYK gradient border on hover.
 */
export function Services() {
  return (
    <SectionDrop bgKey="services" bg="#F4F1EA" bgFrom="#FAFAF7" tone="dark" surface="mesh-light">
      <Container className="py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                One partner. <span className="text-gradient-ink">Every branding need.</span>
              </>
            }
          />
          <Link
            href="/services"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
          >
            All services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>

        <StaggerGroup className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Printer;
            const lead = i === 0;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={cn(lead && 'sm:col-span-2 lg:row-span-2')}
              >
                <SpotlightCard
                  color={glow(service.accent)}
                  className="border-gradient glass group h-full rounded-[1.75rem] transition-transform duration-500 ease-emphasized hover:-translate-y-1.5"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn('relative z-10 flex h-full flex-col p-7 md:p-8', lead && 'lg:p-10')}
                  >
                    {/* Oversized watermark icon on the lead tile */}
                    {lead && (
                      <Icon
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 opacity-[0.06] transition-transform duration-700 ease-emphasized group-hover:-rotate-6 group-hover:scale-105"
                        style={{ color: service.accent }}
                        strokeWidth={1}
                      />
                    )}

                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset ring-black/5 transition-transform duration-500 ease-bounce group-hover:scale-110 group-hover:-rotate-3"
                      style={{
                        background: `linear-gradient(135deg, ${service.accent}26, ${service.accent}0D)`,
                        color: iconInk(service.accent),
                      }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>

                    <h3 className={cn('mt-6 font-bold tracking-tight text-ink', lead ? 'text-3xl md:text-4xl' : 'text-xl')}>
                      {service.name}
                    </h3>
                    <p className={cn('mt-3 leading-relaxed text-ink/65', lead ? 'max-w-md text-base md:text-lg' : 'text-sm')}>
                      {lead ? service.intro : service.description}
                    </p>

                    <span className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-semibold text-ink">
                      Learn more
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                    </span>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </Container>
    </SectionDrop>
  );
}
