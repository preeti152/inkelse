import { INDUSTRIES } from '@inkora/brand';
import { Logo } from '@/components/brand/Logo';

/**
 * Industries — a slim coal marquee band: tracked industry names separated by
 * the k seal. Pauses on hover; static under reduced motion.
 */
export function Industries() {
  const items = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section aria-label="Industries we serve" className="group overflow-hidden border-y border-sand/10 bg-coal py-6 text-sand-50">
      <ul className="marquee-track items-center group-hover:[animation-play-state:paused]">
        {items.map((ind, i) => (
          <li
            key={`${ind.name}-${i}`}
            aria-hidden={i >= INDUSTRIES.length || undefined}
            className="flex shrink-0 items-center"
          >
            <span className="px-8 text-[13px] font-medium uppercase tracking-[0.3em] text-sand-50/85">{ind.name}</span>
            <Logo variant="monogram" className="h-5 w-5 text-sand/40" />
          </li>
        ))}
      </ul>
    </section>
  );
}
