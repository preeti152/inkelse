import { Logo } from '@/components/brand/Logo';

/**
 * Global loading state. Shown during route transitions.
 * Uses the monogram with a subtle pulse animation — on-brand and minimal.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night">
      <div className="animate-pulse-soft drop-shadow-[0_0_24px_rgba(56,200,245,0.5)]">
        <Logo variant="monogram" className="h-12 w-12 text-white" />
      </div>
    </div>
  );
}
