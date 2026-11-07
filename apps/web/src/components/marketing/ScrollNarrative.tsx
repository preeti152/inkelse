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
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-magenta to-yellow shadow-[0_0_12px_rgba(240,69,138,0.6)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
