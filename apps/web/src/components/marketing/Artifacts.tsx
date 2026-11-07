/**
 * Artifacts — pure-SVG illustrations of the things Inkelse prints and makes.
 * Vector only (no external images): crisp at any size, nothing to break, tiny.
 * Each accepts className for sizing; all are decorative (aria-hidden).
 */

type P = { className?: string };

export function BusinessCards({ className }: P) {
  return (
    <svg viewBox="0 0 320 220" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bc-band" x1="0" x2="1">
          <stop stopColor="#0AAEEC" />
          <stop offset="1" stopColor="#E91E63" />
        </linearGradient>
        <linearGradient id="bc-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* back card (dark, foil) */}
      <g transform="rotate(-9 160 110)">
        <rect x="62" y="40" width="200" height="120" rx="10" fill="#15151C" stroke="#2A2A36" />
        <circle cx="96" cy="74" r="12" stroke="url(#bc-band)" strokeWidth="2.5" />
        <rect x="80" y="128" width="70" height="5" rx="2.5" fill="#3A3A48" />
        <rect x="80" y="139" width="48" height="4" rx="2" fill="#2E2E3A" />
      </g>
      {/* front card (paper) */}
      <g transform="rotate(5 160 120)">
        <rect x="70" y="62" width="200" height="120" rx="10" fill="#FAFAF7" />
        <rect x="70" y="62" width="200" height="30" rx="10" fill="url(#bc-band)" />
        <rect x="70" y="80" width="200" height="12" fill="url(#bc-band)" />
        <rect x="88" y="110" width="84" height="6" rx="3" fill="#1A1A1A" />
        <rect x="88" y="124" width="120" height="4" rx="2" fill="#B9B9C2" />
        <rect x="88" y="133" width="96" height="4" rx="2" fill="#B9B9C2" />
        <rect x="88" y="156" width="44" height="4" rx="2" fill="#E91E63" />
        <rect x="70" y="62" width="200" height="120" rx="10" fill="url(#bc-sheen)" />
      </g>
    </svg>
  );
}

export function Letterhead({ className }: P) {
  return (
    <svg viewBox="0 0 200 260" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="10" width="180" height="240" rx="8" fill="#FAFAF7" />
      <rect x="28" y="30" width="22" height="22" rx="11" fill="none" stroke="#0AAEEC" strokeWidth="3" />
      <rect x="58" y="36" width="60" height="5" rx="2.5" fill="#1A1A1A" />
      <rect x="58" y="45" width="40" height="3" rx="1.5" fill="#B9B9C2" />
      {[78, 90, 102, 114, 126, 138, 150].map((y, i) => (
        <rect key={y} x="28" y={y} width={i % 3 === 2 ? 100 : 144} height="3.5" rx="1.75" fill="#D6D6DC" />
      ))}
      <rect x="28" y="196" width="50" height="4" rx="2" fill="#E91E63" />
      <rect x="10" y="236" width="180" height="14" rx="0" fill="#0AAEEC" opacity="0.9" />
      <rect x="100" y="236" width="90" height="14" fill="#E91E63" opacity="0.9" />
    </svg>
  );
}

export function GiftBox({ className }: P) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gb-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F0458A" />
          <stop offset="1" stopColor="#B0124F" />
        </linearGradient>
        <linearGradient id="gb-lid" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FF6BA6" />
          <stop offset="1" stopColor="#D81B60" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="182" rx="70" ry="8" fill="#000" opacity="0.35" />
      <rect x="38" y="84" width="124" height="94" rx="8" fill="url(#gb-body)" />
      <rect x="30" y="66" width="140" height="30" rx="8" fill="url(#gb-lid)" />
      <rect x="90" y="66" width="20" height="112" fill="#FFD600" />
      <rect x="90" y="66" width="20" height="112" fill="#fff" opacity="0.15" />
      <path d="M100 66 C 84 34, 52 36, 62 56 C 68 66, 100 66, 100 66 Z" fill="#FFD600" />
      <path d="M100 66 C 116 34, 148 36, 138 56 C 132 66, 100 66, 100 66 Z" fill="#FFC53D" />
      <circle cx="100" cy="64" r="7" fill="#FFB300" />
    </svg>
  );
}

export function PackBox({ className }: P) {
  return (
    <svg viewBox="0 0 220 200" fill="none" className={className} aria-hidden="true">
      <ellipse cx="110" cy="184" rx="78" ry="8" fill="#000" opacity="0.35" />
      {/* top */}
      <path d="M110 30 L190 66 L110 100 L30 66 Z" fill="#2B2B37" />
      {/* left */}
      <path d="M30 66 L110 100 L110 176 L30 142 Z" fill="#1A1A22" />
      {/* right */}
      <path d="M190 66 L110 100 L110 176 L190 142 Z" fill="#22222C" />
      {/* label band */}
      <path d="M142 86 L180 70 L180 98 L142 114 Z" fill="#0AAEEC" />
      <path d="M48 92 L92 110 L92 128 L48 110 Z" fill="#FAFAF7" opacity="0.92" />
      <path d="M54 100 L84 112" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 108 L76 117" stroke="#E91E63" strokeWidth="3" strokeLinecap="round" />
      {/* rim light */}
      <path d="M30 66 L110 30 L190 66" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
    </svg>
  );
}

export function Standee({ className }: P) {
  return (
    <svg viewBox="0 0 140 240" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="st-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0AAEEC" />
          <stop offset="0.55" stopColor="#6C7BF2" />
          <stop offset="1" stopColor="#E91E63" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="228" rx="46" ry="6" fill="#000" opacity="0.35" />
      <rect x="22" y="14" width="96" height="196" rx="6" fill="url(#st-face)" />
      <rect x="22" y="14" width="96" height="196" rx="6" fill="#fff" opacity="0.06" />
      <circle cx="70" cy="70" r="22" stroke="#fff" strokeWidth="3" />
      <rect x="40" y="112" width="60" height="7" rx="3.5" fill="#fff" />
      <rect x="46" y="126" width="48" height="4" rx="2" fill="#fff" opacity="0.7" />
      <rect x="50" y="168" width="40" height="14" rx="7" fill="#FFD600" />
      <rect x="30" y="210" width="80" height="10" rx="3" fill="#2A2A36" />
    </svg>
  );
}

export function Tag({ className }: P) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
      <path d="M10 20 L 80 20 L 110 45 L 80 70 L 10 70 Z" fill="#FFD600" />
      <circle cx="26" cy="45" r="7" fill="#1A1A1A" />
      <rect x="40" y="38" width="40" height="4" rx="2" fill="#1A1A1A" />
      <rect x="40" y="48" width="28" height="4" rx="2" fill="#1A1A1A" opacity="0.6" />
    </svg>
  );
}

export function Tote({ className }: P) {
  return (
    <svg viewBox="0 0 180 200" fill="none" className={className} aria-hidden="true">
      <ellipse cx="90" cy="188" rx="62" ry="7" fill="#000" opacity="0.35" />
      <path d="M62 62 C 62 22, 118 22, 118 62" stroke="#E8E2D4" strokeWidth="7" fill="none" />
      <path d="M36 60 L144 60 L154 180 L26 180 Z" fill="#EFE9DC" />
      <path d="M36 60 L144 60 L146 80 L34 80 Z" fill="#000" opacity="0.06" />
      <circle cx="90" cy="120" r="24" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="90" cy="120" r="6" fill="#E91E63" />
      <rect x="62" y="154" width="56" height="5" rx="2.5" fill="#1A1A1A" />
    </svg>
  );
}
