'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Quote, MessageCircle } from 'lucide-react';
import { TESTIMONIALS, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Reveal, SectionHeading } from '@/components/motion/Reveal';
import { SectionDrop } from './SectionDrop';

/**
 * Section 7 — Testimonials
 * Renders a carousel ONLY when there is genuine client feedback.
 * Until then, shows a tasteful glass placeholder inviting the first review.
 */
export function TestimonialsSection() {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <SectionDrop bgKey="testimonials" bg="#F4F1EA" bgFrom="#0B0B0F" tone="dark" surface="mesh-light">
      <Container variant="editorial" className="py-24 md:py-28">
        <SectionHeading align="center" eyebrow="Client voices" title="What clients say" />

        {hasTestimonials ? (
          <TestimonialCarousel />
        ) : (
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
            <div className="border-gradient glass rounded-[2rem] p-10 text-center">
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-magenta text-white shadow-lg">
                <Quote className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <p className="text-xl font-semibold tracking-tight text-ink">
                Great work speaks — soon our clients will too.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                We&apos;re gathering genuine feedback from the brands we work with. Real testimonials will appear
                here — no fabricated reviews, ever.
              </p>
              <a
                href={getWhatsAppUrl('Hi Inkelse! I worked with you and would like to share feedback.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Worked with us? Share your feedback
              </a>
            </div>
          </Reveal>
        )}
      </Container>
    </SectionDrop>
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
      className="glass relative mt-12 min-h-[260px] rounded-[2rem] p-8 md:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Quote aria-hidden="true" className="absolute left-8 top-8 h-16 w-16 text-cyan/15" strokeWidth={1} />
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.5 }}
          className="relative text-center"
          aria-live="polite"
        >
          <blockquote className="font-serif text-xl italic leading-relaxed text-ink md:text-2xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-sm font-bold text-ink">{current.author}</p>
            <p className="text-xs text-ink/60">
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
                i === index ? 'w-8 bg-gradient-to-r from-cyan to-magenta' : 'w-1.5 bg-ink/30 hover:bg-ink/60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
