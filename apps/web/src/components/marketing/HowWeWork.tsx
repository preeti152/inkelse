'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { MessageSquare, FileText, PenTool, Factory, Truck } from 'lucide-react';
import { PROCESS_STEPS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { SectionDrop } from './SectionDrop';

const STEP_ICONS = [MessageSquare, FileText, PenTool, Factory, Truck];
const STEP_COLORS = ['#0AAEEC', '#6C7BF2', '#E91E63', '#FF7A45', '#FFD600'];

/**
 * Section 6 — How We Work (5-step process).
 * A CMYK progress line draws itself as the section scrolls through the viewport
 * (horizontal on desktop, vertical on mobile). Steps are glass cards.
 */
export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <SectionDrop bgKey="process" bg="#0B0B0F" bgFrom="#FAFAF7" tone="light" surface="mesh-dark">
      <Container className="py-24 md:py-32">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="Simple & transparent"
          title={
            <>
              How we <span className="text-gradient-cmyk">work</span>
            </>
          }
          lead="From first message to doorstep delivery — five clear steps, one point of contact."
        />

        <div ref={ref} className="relative mt-16 md:mt-20">
          {/* Track + animated fill — desktop (horizontal) */}
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-cyan via-magenta to-yellow"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>
          {/* Track + animated fill — mobile (vertical) */}
          <div aria-hidden="true" className="absolute bottom-8 left-8 top-8 w-px bg-white/10 lg:hidden">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-cyan via-magenta to-yellow"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          <StaggerGroup className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageSquare;
              const color = STEP_COLORS[i] ?? '#0AAEEC';
              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0 lg:mb-6">
                    <div
                      className="absolute inset-0 rounded-full opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-80"
                      style={{ backgroundColor: color }}
                    />
                    <div className="glass-dark relative flex h-16 w-16 items-center justify-center rounded-full !bg-[#141418]/90">
                      <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.75} />
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-ink"
                        style={{ backgroundColor: color }}
                      >
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass-dark flex-1 rounded-[1.5rem] p-6 transition-all duration-500 ease-emphasized group-hover:-translate-y-1 group-hover:bg-white/[0.08] lg:w-full">
                    <h3 className="text-lg font-bold text-paper">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>
    </SectionDrop>
  );
}
