'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, FileText, PenTool, Factory, Truck, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { Reveal, SectionHeading } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

const STEP_ICONS = [MessageSquare, FileText, PenTool, Factory, Truck];
const STEP_COLORS = ['#38C8F5', '#8B7CF6', '#F0458A', '#FF8A5B', '#FFC53D'];

/**
 * Section 6 — How we work.
 * Sticky heading on the left; on the right a vertical rail fills with CMYK
 * light as you scroll, a glowing "torch" rides its tip, and each step lights
 * up as the beam reaches it.
 */
export function HowWeWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 65%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 26, restDelta: 0.001 });
  const torchTop = useTransform(fill, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  return (
    <Stage id="process" glow="amber" grid className="py-24 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <SectionHeading
                eyebrow="How we work"
                title="Five steps."
                accent="Zero guesswork."
                lead="From first message to doorstep delivery — clear steps, transparent pricing and one person who owns your order end-to-end."
              />
              <Reveal delay={0.2}>
                <Link href="/#contact" className="btn-light group mt-10">
                  Start with step one
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                </Link>
              </Reveal>
            </div>
          </div>

          <div ref={railRef} className="relative lg:col-span-7">
            {/* Rail */}
            <div aria-hidden="true" className="absolute bottom-6 left-[1.75rem] top-6 w-px bg-white/[0.08] md:left-8">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan via-magenta to-yellow"
                style={{ scaleY: reduce ? 1 : fill }}
              />
              {!reduce && (
                <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: torchTop }}>
                  <span className="block h-3 w-3 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.6),0_0_60px_14px_rgba(56,200,245,0.45)]" />
                </motion.div>
              )}
            </div>

            <ol className="space-y-5">
              {PROCESS_STEPS.map((step, i) => (
                <Step key={step.step} index={i} title={step.title} description={step.description} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Stage>
  );
}

function Step({ index, title, description }: { index: number; title: string; description: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // "Lit" once the step's centre crosses the middle band of the viewport.
  const seen = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const lit = reduce || seen;
  const Icon = STEP_ICONS[index] ?? MessageSquare;
  const color = STEP_COLORS[index] ?? '#38C8F5';

  return (
    <li ref={ref} className="relative flex gap-5 md:gap-7">
      {/* Node */}
      <div className="relative z-10 shrink-0">
        <div
          className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-700"
          style={{ backgroundColor: color, opacity: lit ? 0.45 : 0 }}
        />
        <div
          className={cn(
            'relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-700 md:h-16 md:w-16',
            lit ? 'border-white/20 bg-night-700' : 'border-white/[0.07] bg-night-850',
          )}
        >
          <Icon
            className="h-6 w-6 transition-colors duration-700"
            style={{ color: lit ? color : 'rgba(255,255,255,0.3)' }}
            strokeWidth={1.75}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className={cn(
          'flex-1 rounded-[1.5rem] border p-6 transition-all duration-700 ease-emphasized md:p-7',
          lit
            ? 'translate-x-0 border-white/[0.12] bg-white/[0.04] opacity-100'
            : 'translate-x-2 border-white/[0.05] bg-transparent opacity-50',
        )}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tabular-nums" style={{ color: lit ? color : 'rgba(255,255,255,0.3)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h3>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-white/60">{description}</p>
      </div>
    </li>
  );
}
