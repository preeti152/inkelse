'use client';

import { motion } from 'framer-motion';
import { Hotel, Utensils, HeartPulse, Building2, Plane, GraduationCap, Rocket } from 'lucide-react';
import { INDUSTRIES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
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
 */
export function Industries() {
  return (
    <SectionDrop bgKey="industries" bg="#FFFFFF" bgFrom="#0F0F0F" tone="dark">
      <Container className="py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="eyebrow mb-3">Industries we serve</p>
          <h2 className="font-display text-display-md uppercase tracking-tightest text-ink">
            We work with
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ICON_MAP[ind.icon] ?? Building2;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                className="group flex items-center gap-3 rounded-pill border border-edge bg-paper px-6 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: `${ind.color}33` }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                  style={{ backgroundColor: `${ind.color}18`, color: ind.color }}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <span className="text-base font-semibold text-ink">{ind.name}</span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionDrop>
  );
}
