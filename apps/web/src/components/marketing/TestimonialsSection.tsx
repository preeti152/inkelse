'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

/**
 * Section 7 — Testimonials
 * Renders a carousel ONLY when there is genuine client feedback.
 * Until then, shows a tasteful placeholder inviting the first review.
 */
export function TestimonialsSection() {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <SectionDrop bgKey="testimonials" bg="#F0F0F0" bgFrom="#1A1A1A" tone="dark">
      <Container variant="editorial" className="py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="eyebrow mb-3">Client voices</p>
          <h2 className="font-display text-display-md uppercase tracking-tightest text-ink">
            What clients say
          </h2>
        </motion.div>

        {hasTestimonials ? (
          <TestimonialCarousel />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-12 max-w-xl rounded-3xl border-2 border-dashed border-ink/15 bg-paper p-10 text-center"
          >
            <Quote className="mx-auto mb-4 h-8 w-8 text-cyan" strokeWidth={1.5} />
            <p className="text-lg font-medium text-ink">Great work speaks — soon our clients will too.</p>
            <p className="mt-3 text-sm text-quiet">
              We&apos;re gathering genuine feedback from the brands we work with. Real testimonials will appear here — no
              fabricated reviews, ever.
            </p>
          </motion.div>
        )}
      </Container>
    </SectionDrop>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <div className="relative mt-12 min-h-[220px]">
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Quote className="mx-auto mb-6 h-8 w-8 text-cyan" strokeWidth={1.5} />
          <blockquote className="font-serif text-lg italic leading-relaxed text-ink md:text-xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-sm font-bold text-ink">{current.author}</p>
            <p className="text-xs text-quiet">{current.role}{current.company ? ` · ${current.company}` : ''}</p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-ink' : 'w-1.5 bg-ink/30 hover:bg-ink/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
