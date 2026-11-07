'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { PROJECTS, getWhatsAppUrl, type Project } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { SectionHeading } from '@/components/motion/Reveal';
import { lit } from '@/lib/lit';
import { cn } from '@/lib/cn';

/**
 * Section 4 — Featured work.
 *
 * Desktop (≥1024px, motion allowed): the section pins and the case-study cards
 * glide horizontally as you scroll vertically, with a progress rail.
 * Mobile / reduced motion: a native horizontal scroller with snap points.
 */
export function FeaturedProjects() {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  // Pin only on wide screens when motion is allowed.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setPinned(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  return pinned ? <PinnedGallery /> : <SwipeGallery />;
}

function Heading() {
  return (
    <SectionHeading
      eyebrow="Selected work"
      title="Projects that"
      accent="speak for us."
      lead="Real branding work, delivered end-to-end — from the first sketch to the box on the doorstep."
    />
  );
}

function Cards() {
  return (
    <>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
      <NextProjectCard />
    </>
  );
}

/** Desktop: vertical scroll drives horizontal travel while the section is pinned. */
function PinnedGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const t = setTimeout(measure, 400); // re-measure once fonts settle
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <Stage id="work" glow="magenta">
      <div ref={wrapRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <Container className="flex w-full items-end justify-between gap-8">
            <Heading />
            <ProgressRail progress={smooth} />
          </Container>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="mt-12 flex w-max gap-6 pl-[max(3rem,calc((100vw_-_80rem)/2_+_3rem))] pr-12"
          >
            <Cards />
          </motion.div>
        </div>
      </div>
    </Stage>
  );
}

/** Mobile / reduced motion: native horizontal scroller with snap points. */
function SwipeGallery() {
  return (
    <Stage id="work" glow="magenta" className="py-24 md:py-32">
      <Container>
        <Heading />
      </Container>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-6 [scrollbar-width:none] md:gap-6 md:px-8 [&::-webkit-scrollbar]:hidden">
        <Cards />
      </div>
      <Container>
        <Link href="/projects" className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
          View all projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      </Container>
    </Stage>
  );
}

/* ───────────────────────────────────────────────────────────── */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="hidden shrink-0 items-center gap-4 pb-3 lg:flex">
      <span className="text-xs font-medium uppercase tracking-tracked text-white/40">Scroll</span>
      <div className="h-px w-40 overflow-hidden bg-white/10">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-cyan to-magenta" />
      </div>
      <Link href="/projects" className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white">
        All work
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
      </Link>
    </div>
  );
}

/** Case-study card. Pass `className` to override the default carousel widths (e.g. in a grid). */
export function ProjectCard({ project, index, className }: { project: Project; index: number; className?: string }) {
  const accent = lit(project.accent);
  const wide = index === 0 && !className;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-night-800 transition-all duration-500 ease-emphasized hover:-translate-y-1.5 hover:border-white/20',
        className ?? (wide ? 'w-[86vw] sm:w-[34rem] lg:w-[44rem]' : 'w-[78vw] sm:w-[24rem] lg:w-[28rem]'),
      )}
    >
      {/* Visual */}
      <div className="relative m-2 h-64 overflow-hidden rounded-[1.6rem] md:h-80">
        <div
          className="absolute inset-0 transition-transform duration-[1400ms] ease-emphasized group-hover:scale-110"
          style={{
            background: `radial-gradient(120% 100% at 0% 0%, ${accent} 0%, ${accent}99 30%, #121218 80%)`,
          }}
        />
        {/* Halftone dots — a print nod */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.55) 1px, transparent 1.6px)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* Light sweep on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-emphasized group-hover:translate-x-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="absolute right-6 top-3 font-display text-[7rem] font-semibold leading-none tracking-tighter text-white/10">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute left-5 top-5 rounded-pill border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-tracked text-white backdrop-blur-md">
          {project.industry}
        </span>
        <div className="absolute inset-x-6 bottom-5">
          <p className="text-xs font-medium uppercase tracking-tracked text-white/60">{project.client}</p>
          <h3 className={cn('mt-1 font-display font-semibold leading-tight tracking-tight text-white text-balance', wide ? 'text-3xl md:text-4xl' : 'text-2xl')}>
            {project.title}
          </h3>
        </div>
        <span className="absolute right-5 top-5 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white text-night opacity-0 transition-all duration-500 ease-bounce group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
        <p className="line-clamp-3 text-[15px] leading-relaxed text-white/60">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.services.slice(0, 4).map((s) => (
            <span key={s} className="rounded-pill border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/65">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function NextProjectCard() {
  return (
    <div className="border-beam relative flex w-[78vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:w-[24rem] lg:w-[26rem]">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-cyan/30 to-magenta/30 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-tracked text-white/45">Your brand, next</p>
        <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white">
          Let&apos;s make something <span className="font-serif font-normal italic text-gradient-cmyk">people keep.</span>
        </p>
      </div>
      <div className="relative mt-10 flex flex-col gap-3">
        <Link href="/#contact" className="btn-light group">
          Start a project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </Link>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-pill-glass">
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
