import { cn } from '@/lib/cn';

/**
 * SectionDrop — section wrapper with a "stacked sheets" transition.
 *
 * Each section is a rounded sheet that slides up over the previous one
 * (negative top margin + large top radius + soft shadow), so colour changes
 * read like layered paper stock rather than hard horizontal cuts.
 * Pure CSS — no scroll listeners, no layout jank.
 *
 * `surface` adds an optional background treatment on top of `bg`:
 *  - `solid`      plain colour (default)
 *  - `mesh-light` soft CMYK gradient mesh for light sections
 *  - `mesh-dark`  deep CMYK mesh + fine grid + grain for dark sections
 *  - `aurora`     mesh-dark plus slowly drifting colour blobs
 */
interface SectionDropProps {
  children: React.ReactNode;
  id?: string;
  bgKey: string;
  /** Base background colour of this section. */
  bg: string;
  /** Previous section's colour. When set (and cascade=true) the sheet overlaps it. */
  bgFrom?: string;
  /** `light` = light text (dark section). `dark` = dark text (light section). */
  tone?: 'light' | 'dark';
  minHeight?: string;
  className?: string;
  /** Overlap the previous section with a rounded sheet edge (default true). */
  cascade?: boolean;
  surface?: 'solid' | 'mesh-light' | 'mesh-dark' | 'aurora';
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
  surface = 'solid',
}: SectionDropProps) {
  const sheet = cascade && !!bgFrom;
  const darkSurface = surface === 'mesh-dark' || surface === 'aurora';

  return (
    <section
      id={id}
      data-bg={bgKey}
      className={cn(
        'relative w-full overflow-hidden supports-[overflow:clip]:overflow-clip',
        tone === 'light' ? 'text-paper' : 'text-ink',
        sheet &&
          '-mt-10 rounded-t-[2.5rem] shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.35)] md:-mt-14 md:rounded-t-[3.5rem]',
        surface === 'mesh-light' && 'bg-mesh-light',
        darkSurface && 'bg-mesh-dark bg-grain',
        className,
      )}
      style={{ backgroundColor: bg, minHeight }}
    >
      {darkSurface && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grid-fade absolute inset-0" />
          {surface === 'aurora' && (
            <>
              <div className="aurora-blob -left-24 top-0 h-[28rem] w-[28rem] bg-cyan/40" />
              <div
                className="aurora-blob -right-24 top-1/3 h-[26rem] w-[26rem] bg-magenta/35"
                style={{ animationDelay: '-6s' }}
              />
              <div
                className="aurora-blob bottom-0 left-1/3 h-[22rem] w-[22rem] bg-yellow/20"
                style={{ animationDelay: '-12s' }}
              />
            </>
          )}
        </div>
      )}

      {/* Hairline highlight along the sheet's top edge */}
      {sheet && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-px',
            tone === 'light'
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white to-transparent',
          )}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
