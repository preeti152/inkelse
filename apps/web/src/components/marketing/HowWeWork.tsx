'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileText, PenTool, Factory, Truck } from 'lucide-react';
import { PROCESS_STEPS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

const STEP_ICONS = [MessageSquare, FileText, PenTool, Factory, Truck];
const STEP_COLORS = ['#0AAEEC', '#E91E63', '#FFD600', '#0AAEEC', '#E91E63'];

/**
 * Section 6 — How We Work (5-step process)
 * Inquiry → Quote → Design Approval → Production → Delivery
 */
export function HowWeWork() {
  return (
    <SectionDrop bgKey="process" bg="#1A1A1A" bgFrom="#FFFFFF" tone="light">
      <Container className="py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow mb-3 text-yellow">Simple & transparent</p>
          <h2 className="font-display text-display-lg uppercase tracking-tightest text-paper">
            How we work
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-cyan via-magenta to-yellow opacity-30 lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageSquare;
              const color = STEP_COLORS[i] ?? '#0AAEEC';
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  {/* Number circle */}
                  <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink ring-4 ring-ink" style={{ boxShadow: `0 0 0 2px ${color}` }}>
                    <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.75} />
                    <span
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-ink"
                      style={{ backgroundColor: color }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-paper">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-paper/60">
                    {step.description}
                  </p>

                  {/* Mobile arrow */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="mt-6 flex justify-center lg:hidden" aria-hidden="true">
                      <span className="text-2xl text-paper/30">↓</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionDrop>
  );
}
