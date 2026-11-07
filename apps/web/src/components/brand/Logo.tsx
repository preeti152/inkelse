import { BRAND, getBrandName } from '@inkora/brand';
import { cn } from '@/lib/cn';

/**
 * The Inkelse logo system (matches the brand board).
 *
 * Variants:
 *  - `primary`  — the thin, widely tracked lowercase wordmark (default)
 *  - `wordmark` — alias of primary
 *  - `stacked`  — wordmark above the tracked tagline "DESIGN TO PRINT, BEYOND THE SCREEN."
 *  - `monogram` — lowercase `k` inside a thin circle (seals, favicons, loaders)
 *  - `symbol`   — alias of monogram
 */
type LogoVariant = 'primary' | 'wordmark' | 'symbol' | 'monogram' | 'stacked';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Override the brand name (for staging/preview). Defaults to brand config. */
  name?: string;
  /** Colour of mark + text. Defaults to currentColor. */
  color?: string;
  /** Accessible label. Defaults to brand name. */
  label?: string;
}

export function Logo({ variant = 'primary', className, name, color = 'currentColor', label }: LogoProps) {
  const brandName = name ?? getBrandName();
  const accessibleLabel = label ?? brandName;

  if (variant === 'monogram' || variant === 'symbol') {
    return <Monogram color={color} className={className} aria-label={accessibleLabel} />;
  }

  if (variant === 'stacked') {
    return (
      <span className={cn('inline-flex flex-col gap-[0.55em]', className)} style={{ color }} aria-label={accessibleLabel}>
        <span className="text-[1.75em] font-light lowercase leading-none tracking-wordmark">{brandName}</span>
        <span className="whitespace-nowrap text-[length:max(9px,0.42em)] font-medium uppercase tracking-label opacity-75">{BRAND.description}</span>
      </span>
    );
  }

  return (
    <span
      className={cn('inline-block text-[1.5em] font-light lowercase leading-none tracking-wordmark', className)}
      style={{ color }}
      aria-label={accessibleLabel}
    >
      {brandName}
    </span>
  );
}

/** Lowercase `k` in a thin circle — drawn as paths so it never depends on a font. */
function Monogram({ color, className, 'aria-label': ariaLabel }: { color: string; className?: string; 'aria-label'?: string }) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={ariaLabel} className={className} fill="none">
      <circle cx="32" cy="32" r="29.5" stroke={color} strokeWidth="1.6" />
      {/* k: stem + arm + leg */}
      <path d="M26 17.5V46.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 28L26.5 38.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M31.5 34.5L40.5 46.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
