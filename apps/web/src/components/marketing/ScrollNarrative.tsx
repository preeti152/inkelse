'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * ScrollNarrative — a thin CMYK gradient scroll-progress bar fixed at the top.
 * Simple, stable, no body mutation (which previously caused color flashing).
 */
export function ScrollNarrative() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="cmyk-bar fixed left-0 right-0 top-0 z-[60] h-1 origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
