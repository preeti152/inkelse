'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TESTIMONIALS, getWhatsAppUrl } from '@inkora/brand';
import { Stage } from '@/components/layout/Stage';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Testimonials — renders ONLY genuine client feedback. Until some exists, a
 * compact, honest band invites the first review (no fabricated quotes, ever).
 */
export function TestimonialsSection() {
  if (TESTIMONIALS.length > 0) {
    return (
      <Stage tone="sand" divider className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="label text-mute">Client voices</p>
          <TestimonialCarousel />
        </div>
      </Stage>
    );
  }

  return (
    <Stage tone="sand" divider>
      <Reveal className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:px-10 lg:px-14">
        <div>
          <p className="label text-mute">Client voices</p>
          <p className="mt-3 text-2xl font-light text-coal md:text-3xl">Great work speaks — soon our clients will too.</p>
          <p className="mt-2 text-[15px] text-coal/65">Real testimonials will appear here. No fabricated reviews, ever.</p>
        </div>
        <a
          href={getWhatsAppUrl('Hi Inkelse! I worked with you and would like to share feedback.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-line shrink-0"
        >
          Share your feedback
        </a>
      </Reveal>
    </Stage>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const current = TESTIMONIALS[index];

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          aria-live="polite"
        >
          <blockquote className="text-2xl font-light leading-relaxed text-coal md:text-4xl md:leading-snug">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <p className="label text-coal">{current.author}</p>
            <p className="mt-1 text-sm text-mute">
              {current.role}
              {current.company ? ` · ${current.company}` : ''}
            </p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-center gap-1">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === index}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className={`block h-px transition-all duration-300 ${i === index ? 'w-10 bg-coal' : 'w-5 bg-coal/30'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
