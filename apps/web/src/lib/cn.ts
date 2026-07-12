import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx for conditional classes with tailwind-merge to
 * intelligently resolve Tailwind conflicts (e.g. `px-2 px-4` → `px-4`).
 *
 * Usage:
 *   cn('text-ink', isActive && 'underline', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
