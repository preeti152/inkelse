'use client';

import { cn } from '@/lib/cn';

/**
 * SectionDrop — a solid, reliable section wrapper.
 *
 * Each section has its own solid background color. The "color changes as you
 * scroll" effect comes naturally from stacking sections of alternating colors
 * (white → cream → black → white …) plus a soft diagonal "cascade" edge at the
 * top of each section so one color visually flows into the next.
 *
 * NOTE: The previous version used a scroll-driven sliding overlay which caused
 * flashing / broken color rendering. This version is deterministic and stable.
 */
interface SectionDropProps {
  children: React.ReactNode;
  id?: string;
  bgKey: string;
  /** Final background color of this section. */
  bg: string;
  /** Previous section's color — used for the cascade edge at the top. */
  bgFrom?: string;
  tone?: 'light' | 'dark';
  minHeight?: string;
  className?: string;
  /** Show the diagonal cascade edge at the top (default true). */
  cascade?: boolean;
}

export function SectionDrop({
  children,
  id,
  bgKey,
  bg,
  bgFrom,
  tone = 'dark',
  minHeight = 'auto',
  className,
  cascade = true,
}: SectionDropProps) {
  return (
    <section
      id={id}
      data-bg={bgKey}
      className={cn(
        'relative w-full',
        tone === 'light' ? 'text-paper' : 'text-ink',
        className,
      )}
      style={{ backgroundColor: bg, minHeight }}
    >
      {/* Cascade edge — a thin band of the previous color that angles into this
          section, creating a smooth "color drop" without any JS/scroll jank. */}
      {cascade && bgFrom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-24"
          style={{
            backgroundColor: bgFrom,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)',
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
