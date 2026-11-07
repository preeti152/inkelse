import { cn } from '@/lib/cn';

type Tone = 'sand' | 'paper' | 'coal';

const TONES: Record<Tone, string> = {
  sand: 'bg-sand text-coal',
  paper: 'bg-sand-100 text-coal',
  coal: 'bg-coal text-sand-50',
};

/**
 * Stage — section shell for the Atelier theme.
 * `tone` picks the surface (warm sand, lighter paper, matte coal);
 * `divider` draws a hairline across the top edge.
 */
export function Stage({
  children,
  id,
  className,
  tone = 'sand',
  divider = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: Tone;
  divider?: boolean;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'relative w-full scroll-mt-20',
        TONES[tone],
        divider && (tone === 'coal' ? 'border-t border-sand/10' : 'border-t border-coal/10'),
        className,
      )}
    >
      {children}
    </section>
  );
}
