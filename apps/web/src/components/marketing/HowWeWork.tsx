'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { PROCESS_STEPS } from '@inkora/brand';
import { Stage } from '@/components/layout/Stage';
import { Reveal, SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';

/**
 * Section — Process. Split intro (heading + envelope photograph), then five
 * columns on a single rule that draws itself across as the section scrolls by.
 */
export function HowWeWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 85%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <Stage id="process" tone="paper" divider>
      <div className="mx-auto grid max-w-[90rem] items-stretch gap-10 px-6 pt-20 md:px-10 md:pt-24 lg:grid-cols-12 lg:px-14">
        <div className="flex flex-col justify-end lg:col-span-6">
          <SectionHeading label="How we work" lines={['Five steps.', 'Zero guesswork.']} />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-coal/75">
              From first message to doorstep delivery — clear steps, transparent pricing and one person who owns your
              order end-to-end.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative min-h-[16rem] overflow-hidden bg-sand-300 lg:col-span-6 lg:min-h-[22rem]">
          <Image
            src="/images/brand/envelope.jpg"
            alt="Black Inkelse envelope sealed with a stone k monogram sticker"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>

      <div ref={railRef} className="mx-auto max-w-[90rem] px-6 pb-20 pt-16 md:px-10 md:pb-24 lg:px-14">
        {/* The rule */}
        <div aria-hidden="true" className="relative hidden h-px bg-coal/15 lg:block">
          <motion.div className="absolute inset-0 origin-left bg-coal" style={{ scaleX: reduce ? 1 : draw }} />
        </div>

        <StaggerGroup className="grid gap-px bg-coal/10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:bg-transparent">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div key={s.step} variants={itemVariants} className="relative bg-sand-100 py-8 sm:px-6 lg:px-0 lg:pr-8 lg:pt-10">
              <span aria-hidden="true" className="absolute -top-[5px] left-0 hidden h-[9px] w-[9px] rounded-full border border-coal bg-sand-100 lg:block" />
              <p className="text-[length:clamp(2.5rem,4vw,3.5rem)] font-light leading-none tracking-tight text-coal/20">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 text-xl font-normal tracking-tight text-coal">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-coal/70">{s.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </Stage>
  );
}
