import { BRAND, getBrandName } from '@inkora/brand';
import { cn } from '@/lib/cn';

/**
 * The inkora logo system.
 *
 * Variants:
 *  - `primary`  — Symbol + wordmark side by side (default for header)
 *  - `wordmark` — Wordmark only (when symbol would be redundant)
 *  - `symbol`   — The ink-drop-on-page mark only (favicon, social avatar)
 *  - `monogram` — Lowercase `i` inside a thin circle (loaders, watermarks)
 *  - `stacked`  — Wordmark above the tagline (footer, business cards)
 *
 * The symbol is a geometric ink-drop that doubles as a folded page
 * and reads as a lowercase `i` — see plans/inkora-website-architecture.md §1.2
 */

type LogoVariant = 'primary' | 'wordmark' | 'symbol' | 'monogram' | 'stacked';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Override the brand name (for staging/preview). Defaults to brand config. */
  name?: string;
  /** Color of the mark + text. Defaults to currentColor (inherits from parent). */
  color?: string;
  /** Accessible label. Defaults to brand name. */
  label?: string;
}

export function Logo({
  variant = 'primary',
  className,
  name,
  color = 'currentColor',
  label,
}: LogoProps) {
  const brandName = name ?? getBrandName();
  const accessibleLabel = label ?? brandName;

  if (variant === 'symbol') {
    return (
      <LogoSymbol
        color={color}
        className={className}
        aria-label={accessibleLabel}
      />
    );
  }

  if (variant === 'monogram') {
    return (
      <LogoMonogram
        color={color}
        letter={brandName.charAt(0)}
        className={className}
        aria-label={accessibleLabel}
      />
    );
  }

  if (variant === 'wordmark') {
    return (
      <span
        className={cn(
          'inline-block font-sans font-light tracking-tightest text-[1.5em] leading-none lowercase',
          className
        )}
        style={{ color }}
        aria-label={accessibleLabel}
      >
        {brandName}
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span
        className={cn('inline-flex flex-col items-center gap-2 text-center', className)}
        style={{ color }}
        aria-label={accessibleLabel}
      >
        <span className="font-sans font-light tracking-tightest text-[2em] leading-none lowercase">
          {brandName}
        </span>
        <span className="text-[0.55em] uppercase tracking-tracked-wide font-medium opacity-70">
          {BRAND.tagline}
        </span>
      </span>
    );
  }

  // primary (default): symbol + wordmark
  return (
    <span
      className={cn('inline-flex items-center gap-2.5', className)}
      style={{ color }}
      aria-label={accessibleLabel}
    >
      <LogoSymbol color={color} className="h-[1.2em] w-[1.2em] shrink-0" />
      <span className="font-sans font-light tracking-tightest text-[1.5em] leading-none lowercase">
        {brandName}
      </span>
    </span>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

interface SymbolProps {
  color: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * The symbol: a circle with a smaller circle subtracted from the upper-right.
 * Reads as: an ink drop catching light → a folded page → a lowercase `i`.
 *
 * Constructed on a 64×64 viewBox grid. Single color, no effects.
 */
function LogoSymbol({ color, className, 'aria-label': ariaLabel }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
      fill="none"
    >
      <defs>
        {/* Mask: full disc, with a smaller disc cut out at upper-right */}
        <mask id="inkora-mark-cut" maskUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="white" />
          {/* The cut — a smaller circle creating the "catching light / page fold" */}
          <circle cx="48" cy="16" r="10" fill="black" />
        </mask>
      </defs>

      {/* The main filled disc with the cut applied */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill={color}
        mask="url(#inkora-mark-cut)"
      />

      {/* The "drop" — a small filled circle that sits where the cut opens,
          completing the lowercase `i` reading */}
      <circle cx="48" cy="14" r="3.2" fill={color} />
    </svg>
  );
}

interface MonogramProps {
  color: string;
  letter: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * The monogram: a single lowercase letter inside a thin circle.
 * Used for favicons, loading spinners, watermarks, small-space branding.
 */
function LogoMonogram({ color, letter, className, 'aria-label': ariaLabel }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
      fill="none"
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="300"
        fontSize="32"
        style={{ letterSpacing: '-0.02em' }}
      >
        {letter.toLowerCase()}
      </text>
    </svg>
  );
}
