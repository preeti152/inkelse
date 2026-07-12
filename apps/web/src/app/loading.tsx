import { Logo } from '@/components/brand/Logo';

/**
 * Global loading state. Shown during route transitions.
 * Uses the monogram with a subtle pulse animation — on-brand and minimal.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper">
      <div className="animate-pulse-soft">
        <Logo variant="monogram" className="h-12 w-12 text-ink" />
      </div>
    </div>
  );
}
