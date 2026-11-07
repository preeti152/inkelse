'use client';

import { Hotel, Utensils, HeartPulse, Building2, Plane, GraduationCap, Rocket } from 'lucide-react';
import { INDUSTRIES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionDrop } from './SectionDrop';

const ICON_MAP: Record<string, typeof Hotel> = {
  hotel: Hotel,
  utensils: Utensils,
  'heart-pulse': HeartPulse,
  building: Building2,
  plane: Plane,
  'graduation-cap': GraduationCap,
  rocket: Rocket,
};

/**
 * Section 2 — Industries ("We work with")
 * Infinite glass-pill marquee with edge fade. Pauses on hover/focus; static
 * (wrapping) under reduced motion via the global reduced-motion rule.
 */
export function Industries() {
  // Two copies → seamless -50% loop.
  const loop = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <SectionDrop bgKey="industries" bg="#FAFAF7" bgFrom="#0B0B0F" tone="dark" surface="mesh-light">
      <div className="py-20 md:py-24">
        <Container>
          <Reveal className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow">Industries we serve</p>
            <h2 className="font-display text-display-sm tracking-tightest text-ink">
              Trusted across <span className="text-gradient-ink">every kind of business</span>
            </h2>
          </Reveal>
        </Container>

        <div
          className="group relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
          aria-label="Industries"
        >
          <ul className="marquee-track py-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {loop.map((ind, i) => {
              const Icon = ICON_MAP[ind.icon] ?? Building2;
              const duplicate = i >= INDUSTRIES.length;
              return (
                <li
                  key={`${ind.name}-${i}`}
                  aria-hidden={duplicate || undefined}
                  className="glass mr-4 flex shrink-0 items-center gap-3 rounded-pill py-3 pl-3 pr-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${ind.color}1F`, color: ind.color === '#FFD600' ? '#B38F00' : ind.color }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="whitespace-nowrap text-base font-semibold text-ink">{ind.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionDrop>
  );
}
