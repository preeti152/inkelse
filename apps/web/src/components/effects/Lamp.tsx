'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE_OUT } from '@/components/motion/Reveal';

/**
 * Lamp — a "torch above the headline".
 *
 * A glowing filament line with two conic light cones spilling downward,
 * a soft bloom, and a dark mask that shapes the beam. The filament and cones
 * widen from the centre when the lamp scrolls into view (or on mount).
 *
 * Place it absolutely at the top of a relative, overflow-hidden parent and put
 * the content underneath; the beam falls onto whatever sits below it.
 */
export function Lamp({
  className,
  color = 'cyan',
  width = 30,
  immediate = false,
}: {
  className?: string;
  /** Beam tint. */
  color?: 'cyan' | 'magenta' | 'white';
  /** Final half-width of each cone, in rem. */
  width?: number;
  /** Light up on mount instead of when scrolled into view. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();

  const tint = {
    cyan: { core: '#38C8F5', glow: 'rgba(56,200,245,0.55)', soft: 'rgba(56,200,245,0.35)' },
    magenta: { core: '#F0458A', glow: 'rgba(240,69,138,0.55)', soft: 'rgba(240,69,138,0.35)' },
    white: { core: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.25)' },
  }[color];

  const from = reduce ? false : { opacity: 0.4, width: `${width * 0.45}rem` };
  const to = { opacity: 1, width: `${width}rem` };
  const trigger = immediate
    ? { animate: to }
    : { whileInView: to, viewport: { once: true, margin: '-40px' } };
  const transition = { duration: 1.2, delay: 0.2, ease: EASE_OUT };

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[28rem] justify-center overflow-hidden', className)}
    >
      <div className="relative flex w-full scale-y-125 items-start justify-center">
        {/* Left cone */}
        <motion.div
          initial={from}
          {...trigger}
          transition={transition}
          className="absolute right-1/2 top-0 h-56"
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${tint.soft}, transparent 50%, transparent)`,
            maskImage: 'linear-gradient(to bottom, #000 20%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 20%, transparent)',
          }}
        />
        {/* Right cone */}
        <motion.div
          initial={from}
          {...trigger}
          transition={transition}
          className="absolute left-1/2 top-0 h-56"
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent 50%, ${tint.soft})`,
            maskImage: 'linear-gradient(to bottom, #000 20%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 20%, transparent)',
          }}
        />

        {/* Bloom under the filament */}
        <motion.div
          initial={reduce ? false : { opacity: 0, width: `${width * 0.3}rem` }}
          {...(immediate
            ? { animate: { opacity: 1, width: `${width * 0.9}rem` } }
            : { whileInView: { opacity: 1, width: `${width * 0.9}rem` }, viewport: { once: true, margin: '-40px' } })}
          transition={transition}
          className="lamp-pulse absolute top-0 h-28 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: tint.glow }}
        />

        {/* Filament */}
        <motion.div
          initial={reduce ? false : { width: `${width * 0.35}rem` }}
          {...(immediate
            ? { animate: { width: `${width * 1.1}rem` } }
            : { whileInView: { width: `${width * 1.1}rem` }, viewport: { once: true, margin: '-40px' } })}
          transition={transition}
          className="absolute top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${tint.core} 30%, #fff 50%, ${tint.core} 70%, transparent)`,
            boxShadow: `0 0 18px 2px ${tint.glow}`,
          }}
        />
      </div>
    </div>
  );
}
