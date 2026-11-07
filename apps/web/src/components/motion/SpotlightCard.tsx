'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * A card with a soft radial glow that tracks the pointer.
 * Writes CSS variables directly (no React state) so it never re-renders on move.
 */
export function SpotlightCard({
  children,
  className,
  color = 'rgba(10, 174, 236, 0.16)',
}: {
  children: React.ReactNode;
  className?: string;
  /** Glow colour (any CSS colour, ideally translucent). */
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn('spotlight', className)}
      style={{ ['--spot-color' as string]: color } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
