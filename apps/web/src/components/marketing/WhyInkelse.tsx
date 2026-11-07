'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Gem, Headset, Truck, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { WHY_INKELSE, BRAND } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { SectionDrop } from './SectionDrop';

const ICON_MAP: Record<string, typeof Zap> = {
  zap: Zap,
  gem: Gem,
  headset: Headset,
  truck: Truck,
  layers: Layers,
  sparkles: Sparkles,
};

const iconInk = (hex: string) => (hex.toUpperCase() === '#FFD600' ? '#B38F00' : hex);

/**
 * Section 5 — Why Inkelse.
 * Split layout: sticky heading + story on the left, 2×3 glass reason cards on the right.
 */
export function WhyInkelse() {
  return (
    <SectionDrop id="why" bgKey="why" bg="#FAFAF7" bgFrom="#0B0B0F" tone="dark" surface="mesh-light">
      <Container className="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Why choose us"
                title={
                  <>
                    Why brands pick <span className="text-gradient-ink">{BRAND.nameDisplay}</span>
                  </>
                }
                lead={BRAND.story}
              />
              <Link href="/about" className="btn-pill-dark group mt-8">
                Our story
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {WHY_INKELSE.map((reason, i) => {
              const Icon = ICON_MAP[reason.icon] ?? Zap;
              return (
                <motion.div key={reason.title} variants={itemVariants} className={i % 2 === 1 ? 'sm:mt-8' : ''}>
                  <SpotlightCard
                    color={`${reason.color}26`}
                    className="glass group h-full rounded-[1.5rem] p-7 transition-transform duration-500 ease-emphasized hover:-translate-y-1"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-bounce group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${reason.color}2E, ${reason.color}0D)`,
                            color: iconInk(reason.color),
                          }}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </span>
                        <span className="font-display text-sm font-bold tabular-nums text-ink/25">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{reason.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{reason.description}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>
    </SectionDrop>
  );
}
