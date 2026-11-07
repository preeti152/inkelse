'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

type Glow = 'none' | 'cyan' | 'magenta' | 'split' | 'amber';

/**
 * Stage — the section shell for the dark "studio" theme.
 *
 * - `glow`   ambient pool(s) of coloured light behind the content
 * - `grid`   faint blueprint grid fading out from the top
 * - `torch`  a soft white spotlight that follows the cursor across the section
 * - `divider` hairline at the top edge to separate it from the section above
 *
 * Uses `overflow-clip` (not hidden) so sticky children keep working.
 */
export function Stage({
  children,
  id,
  className,
  glow = 'none',
  grid = false,
  torch = false,
  divider = true,
  ariaLabel,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glow?: Glow;
  grid?: boolean;
  torch?: boolean;
  divider?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!torch || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--torch-x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--torch-y', `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      onPointerMove={torch ? onMove : undefined}
      className={cn('group/stage relative w-full overflow-hidden bg-night text-white supports-[overflow:clip]:overflow-clip', className)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {divider && <div className="hairline absolute inset-x-0 top-0" />}
        {grid && <div className="bg-grid-fade absolute inset-0" />}

        {(glow === 'cyan' || glow === 'split') && (
          <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-cyan/[0.13] blur-[120px]" />
        )}
        {(glow === 'magenta' || glow === 'split') && (
          <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-magenta/[0.12] blur-[120px]" />
        )}
        {glow === 'amber' && (
          <div className="absolute left-1/2 top-1/4 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-yellow/[0.07] blur-[120px]" />
        )}

        {torch && (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/stage:opacity-100"
            style={{
              background:
                'radial-gradient(520px circle at var(--torch-x, 50%) var(--torch-y, 0px), rgba(255,255,255,0.06), transparent 60%)',
            }}
          />
        )}
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}
