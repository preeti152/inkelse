'use client';

import { motion } from 'framer-motion';
import { Zap, Gem, Headset, Truck, Layers, Sparkles } from 'lucide-react';
import { WHY_INKELSE, BRAND } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

const ICON_MAP: Record<string, typeof Zap> = {
  zap: Zap,
  gem: Gem,
  headset: Headset,
  truck: Truck,
  layers: Layers,
  sparkles: Sparkles,
};

/**
 * Section 5 — Why Inkelse (6 reasons)
 */
export function WhyInkelse() {
  return (
    <SectionDrop bgKey="why" bg="#FFFFFF" bgFrom="#1A1A1A" tone="dark">
      <Container className="py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-3">Why choose us</p>
          <h2 className="font-display text-display-lg uppercase tracking-tightest text-ink text-balance">
            Why <span className="text-cyan">{BRAND.nameDisplay}</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_INKELSE.map((reason, i) => {
            const Icon = ICON_MAP[reason.icon] ?? Zap;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group flex gap-4 rounded-2xl border border-edge p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${reason.color}18`, color: reason.color }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-quiet">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionDrop>
  );
}
