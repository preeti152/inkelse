'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Quote, MessageCircle } from 'lucide-react';
import { TESTIMONIALS, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { Reveal, SectionHeading } from '@/components/motion/Reveal';

/**
 * Section 7 — Testimonials.
 * Renders a carousel ONLY when there is genuine client feedback.
 * Until then, a compact, honest invitation (no fabricated reviews, ever).
 */
export function TestimonialsSection() {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <Stage className="py-24 md:py-28">
      <Container variant="editorial">
        <SectionHeading align="center" eyebrow="Client voices" title="What clients" accent="say." />

        {hasTestimonials ? (
          <TestimonialCarousel />
        ) : (
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <div className="border-beam relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-night-800 p-10 text-center">
              <Quote aria-hidden="true" className="mx-auto h-10 w-10 text-white/15" strokeWidth={1} />
              <p className="mt-5 font-serif text-2xl italic leading-snug text-white md:text-3xl">
                Great work speaks — soon our clients will too.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                We&apos;re gathering genuine feedback from the brands we work with. Real testimonials will appear here —
                no fabricated reviews, ever.
              </p>
              <a
                href={getWhatsAppUrl('Hi Inkelse! I worked with you and would like to share feedback.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-glass mt-8"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Worked with us? Share your feedback
              </a>
            </div>
          </Reveal>
        )}
      </Container>
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
      className="relative mt-12 min-h-[260px] rounded-[2rem] border border-white/[0.08] bg-night-800 p-8 md:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.5 }}
          className="text-center"
          aria-live="polite"
        >
          <blockquote className="font-serif text-2xl italic leading-relaxed text-white md:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-sm font-semibold text-white">{current.author}</p>
            <p className="text-xs text-white/50">
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
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-gradient-to-r from-cyan to-magenta' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
