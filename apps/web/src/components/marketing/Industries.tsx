'use client';

import { Hotel, Utensils, HeartPulse, Building2, Plane, GraduationCap, Rocket } from 'lucide-react';
import { INDUSTRIES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { Reveal } from '@/components/motion/Reveal';
import { lit } from '@/lib/lit';

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
 * Section 2 — Industries. A quiet "built for" band: two marquee rows drifting
 * in opposite directions, faded at the edges, pausing on hover.
 */
export function Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  const half = Math.ceil(INDUSTRIES.length / 2);
  const rowB = [...INDUSTRIES.slice(half), ...INDUSTRIES.slice(0, half)];
  const rowBLoop = [...rowB, ...rowB];

  return (
    <Stage ariaLabel="Industries we serve" className="py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-sm text-white/45">
            Built for brands across <span className="text-white/80">hospitality, healthcare, real estate, education</span> and more
          </p>
        </Reveal>
      </Container>

      <div className="group mask-fade-x relative mt-10 space-y-3 overflow-hidden">
        <MarqueeRow items={row} />
        <MarqueeRow items={rowBLoop} reverse />
      </div>
    </Stage>
  );
}

function MarqueeRow({ items, reverse = false }: { items: readonly (typeof INDUSTRIES)[number][]; reverse?: boolean }) {
  const realCount = items.length / 2;
  return (
    <ul
      className="marquee-track group-hover:[animation-play-state:paused]"
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {items.map((ind, i) => {
        const Icon = ICON_MAP[ind.icon] ?? Building2;
        const color = lit(ind.color);
        return (
          <li
            key={`${ind.name}-${i}`}
            aria-hidden={i >= realCount || reverse || undefined}
            className="mr-3 flex shrink-0 items-center gap-3 rounded-pill border border-white/[0.07] bg-white/[0.03] py-2.5 pl-2.5 pr-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: `${color}1A`, color, boxShadow: `0 0 18px -4px ${color}66` }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="whitespace-nowrap text-[15px] font-medium text-white/80">{ind.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
