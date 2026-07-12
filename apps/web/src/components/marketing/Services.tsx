'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Printer, Gift, PanelsTopLeft, Package, Palette, Tent, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

const ICON_MAP: Record<string, typeof Printer> = {
  printer: Printer,
  gift: Gift,
  'panels-top-left': PanelsTopLeft,
  package: Package,
  palette: Palette,
  tent: Tent,
};

/**
 * Section 3 — Services (6 clean cards)
 */
export function Services() {
  return (
    <SectionDrop bgKey="services" bg="#F7F4EE" bgFrom="#FFFFFF" tone="dark">
      <Container className="py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="font-display text-display-lg uppercase tracking-tightest text-ink text-balance">
            One partner. <span className="text-magenta">Every branding need.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Printer;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <Link href={`/services/${service.slug}`} className="block p-8">
                {/* Accent blob */}
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition-all duration-500 group-hover:scale-[6] group-hover:opacity-100"
                  style={{ backgroundColor: service.accent }}
                />

                <div className="relative z-10">
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 group-hover:bg-white/20"
                    style={{ backgroundColor: `${service.accent}18`, color: service.accent }}
                  >
                    <Icon className="h-6 w-6 transition-colors duration-500 group-hover:text-white" strokeWidth={1.75} />
                  </div>

                  <h3 className="flex items-center gap-2 text-xl font-bold text-ink transition-colors duration-500 group-hover:text-white">
                    <span className="text-2xl" aria-hidden>{service.emoji}</span>
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-quiet transition-colors duration-500 group-hover:text-white/90">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-ink opacity-0 transition-all duration-500 group-hover:text-white group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionDrop>
  );
}
