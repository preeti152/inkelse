'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Gem, Headset, Truck, Layers, Sparkles } from 'lucide-react';
import { WHY_INKELSE, BRAND, SERVICES } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { lit } from '@/lib/lit';
import { cn } from '@/lib/cn';

const ICON_MAP: Record<string, typeof Zap> = {
  zap: Zap,
  gem: Gem,
  headset: Headset,
  truck: Truck,
  layers: Layers,
  sparkles: Sparkles,
};

/** Bento placement + micro-visual per reason (keyed by the reason's icon). */
const LAYOUT: Record<string, { span: string; Visual: () => React.ReactElement }> = {
  layers: { span: 'md:col-span-7', Visual: OrbitVisual },
  gem: { span: 'md:col-span-5', Visual: StockVisual },
  zap: { span: 'md:col-span-4', Visual: SpeedVisual },
  headset: { span: 'md:col-span-4', Visual: ChatVisual },
  truck: { span: 'md:col-span-4', Visual: MapVisual },
  sparkles: { span: 'md:col-span-12', Visual: TypeVisual },
};

/** Section 5 — Why Inkelse: a bento where every tile has its own living visual. */
export function WhyInkelse() {
  return (
    <Stage id="why" glow="cyan" className="py-24 md:py-36">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why Inkelse"
          title="Why brands choose"
          accent="Inkelse."
          lead={BRAND.story}
        />

        <StaggerGroup className="mt-16 grid gap-4 md:grid-cols-12 md:gap-5">
          {WHY_INKELSE.map((reason) => {
            const Icon = ICON_MAP[reason.icon] ?? Zap;
            const { span, Visual } = LAYOUT[reason.icon] ?? { span: 'md:col-span-4', Visual: SpeedVisual };
            const color = lit(reason.color);
            const wideRow = reason.icon === 'sparkles';
            return (
              <motion.div key={reason.title} variants={itemVariants} className={span}>
                <SpotlightCard
                  color={`${color}22`}
                  className="group h-full rounded-[1.75rem] border border-white/[0.07] bg-night-800 transition-colors duration-500 hover:border-white/15"
                >
                  <div className={cn('relative z-10 flex h-full flex-col', wideRow && 'md:flex-row md:items-center')}>
                    <div className={cn('relative h-48 overflow-hidden md:h-56', wideRow && 'md:order-2 md:h-44 md:flex-1')}>
                      <Visual />
                    </div>
                    <div className={cn('p-7 pt-2', wideRow && 'md:max-w-md md:p-10')}>
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ color, backgroundColor: `${color}1A`, boxShadow: `0 0 20px -6px ${color}` }}
                        >
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                        </span>
                        <h3 className="text-lg font-semibold tracking-tight text-white">{reason.title}</h3>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/55">{reason.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </Container>
    </Stage>
  );
}

/* ── Micro-visuals ─────────────────────────────────────────────── */

/** One partner: the six services orbiting a lit core. */
function OrbitVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute h-40 w-40 rounded-full border border-white/[0.07]" />
      <div className="absolute h-64 w-64 rounded-full border border-dashed border-white/[0.06]" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-night shadow-[0_0_40px_6px_rgba(56,200,245,0.35)]">
        i
      </div>
      <motion.div
        className="absolute h-40 w-40"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {SERVICES.map((s, i) => {
          const angle = (i / SERVICES.length) * Math.PI * 2;
          const c = lit(s.accent);
          return (
            <motion.span
              key={s.id}
              className="absolute flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-night-700"
              style={{
                left: `calc(50% + ${Math.cos(angle) * 80}px - 20px)`,
                top: `calc(50% + ${Math.sin(angle) * 80}px - 20px)`,
                color: c,
              }}
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <ServiceIcon name={s.icon} className="h-[18px] w-[18px]" />
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

/** Premium quality: fanned paper stocks with a foil sheen. */
function StockVisual() {
  const stocks = [
    { bg: '#F5F1E8', rot: -16 },
    { bg: '#E9E4D8', rot: -6 },
    { bg: '#1C1C24', rot: 4 },
    { bg: 'linear-gradient(135deg,#F0458A,#8B7CF6)', rot: 14 },
  ];
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-2">
      {stocks.map((s, i) => (
        <div
          key={i}
          className="absolute bottom-6 h-36 w-28 origin-bottom rounded-lg border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-emphasized"
          style={{ background: s.bg, transform: `rotate(${s.rot}deg)` }}
        />
      ))}
      <div className="absolute bottom-6 h-36 w-28 overflow-hidden rounded-lg" style={{ transform: 'rotate(14deg)' }}>
        <div className="text-shimmer absolute inset-0 !bg-clip-border opacity-40" />
      </div>
      <span className="absolute right-6 top-6 rounded-pill border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60">
        Premium stocks · Foil · Emboss
      </span>
    </div>
  );
}

/** Fast delivery: an express timeline that fills when seen. */
function SpeedVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-5 px-8">
      {[
        { label: 'Quote', w: '30%', c: 'from-cyan to-cyan' },
        { label: 'Approval', w: '55%', c: 'from-cyan to-[#8B7CF6]' },
        { label: 'Dispatch', w: '86%', c: 'from-cyan via-[#8B7CF6] to-magenta' },
      ].map((row, i) => (
        <div key={row.label}>
          <div className="mb-1.5 flex justify-between text-[11px] font-medium text-white/45">
            <span>{row.label}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${row.c}`}
              initial={reduce ? false : { width: '0%' }}
              whileInView={{ width: row.w }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={reduce ? { width: row.w } : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Dedicated support: a short, real-feeling WhatsApp-style exchange. */
function ChatVisual() {
  const reduce = useReducedMotion();
  const msgs = [
    { me: true, t: 'Need 200 onboarding kits by Friday?' },
    { me: false, t: 'Absolutely — sharing options shortly.' },
    { me: true, t: 'Perfect, thank you!' },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.45, duration: 0.4 }}
          className={cn(
            'max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug',
            m.me
              ? 'self-end rounded-br-md bg-[#1F6F5C] text-white'
              : 'self-start rounded-bl-md border border-white/10 bg-white/[0.06] text-white/85',
          )}
        >
          {m.t}
        </motion.div>
      ))}
    </div>
  );
}

/** Nationwide shipping: pulsing delivery pins joined by a route. */
function MapVisual() {
  const pins = [
    { x: 30, y: 28 },
    { x: 62, y: 40 },
    { x: 44, y: 62 },
    { x: 74, y: 70 },
    { x: 22, y: 74 },
  ];
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1.5px)',
          backgroundSize: '12px 12px',
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, #000 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, #000 40%, transparent 80%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M30 28 Q 48 30 62 40 T 44 62 T 74 70"
          fill="none"
          stroke="url(#route)"
          strokeWidth="0.6"
          strokeDasharray="2 1.5"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop stopColor="#38C8F5" />
            <stop offset="1" stopColor="#F0458A" />
          </linearGradient>
        </defs>
      </svg>
      {pins.map((p, i) => (
        <span key={i} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span
            className="absolute -left-2 -top-2 h-4 w-4 animate-ping rounded-full bg-cyan/40 motion-reduce:hidden"
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2.4s' }}
          />
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(56,200,245,0.8)]" />
        </span>
      ))}
    </div>
  );
}

/** Design expertise: a type specimen + CMYK swatches. */
function TypeVisual() {
  const swatches = [
    { name: 'Cyan', hex: '#0AAEEC' },
    { name: 'Magenta', hex: '#E91E63' },
    { name: 'Yellow', hex: '#FFD600' },
    { name: 'Key', hex: '#1A1A1A' },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 px-8 md:justify-end md:gap-10 md:pr-12">
      <span className="font-serif text-7xl italic leading-none text-white/90 md:text-8xl">Aa</span>
      <div className="flex gap-2">
        {swatches.map((s, i) => (
          <div
            key={s.name}
            className="flex w-14 flex-col overflow-hidden rounded-xl border border-white/10 bg-night-700 transition-transform duration-500 ease-emphasized group-hover:-translate-y-2 md:w-16"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="h-14 md:h-16" style={{ backgroundColor: s.hex }} />
            <span className="px-2 py-1.5 text-[10px] font-medium text-white/55">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
