/**
 * Brand inks are tuned for paper. On the dark theme they read better as
 * slightly brighter "lit" tints — use these for icons, glows and accents on black.
 */
const LIT: Record<string, string> = {
  '#0AAEEC': '#38C8F5', // cyan
  '#E91E63': '#F0458A', // magenta
  '#FFD600': '#FFC53D', // yellow → warm amber
  '#1A1A1A': '#E5E5EA', // ink → near-white
  '#22C55E': '#4ADE80', // green
};

export const lit = (hex: string): string => LIT[hex.toUpperCase()] ?? hex;
