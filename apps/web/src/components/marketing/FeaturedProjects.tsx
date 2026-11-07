'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PROJECTS, type Project } from '@inkora/brand';
import { Stage } from '@/components/layout/Stage';
import { Logo } from '@/components/brand/Logo';
import { Reveal, SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

/**
 * Section — Selected work. A typographic bento on coal: the lead case study
 * takes a 2×2 stone tile, the rest are coal tiles that invert on hover,
 * finished with a "your brand next" tile. Hairlines, no gaps, no filler.
 */
export function FeaturedProjects() {
  return (
    <Stage id="work" tone="coal">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:px-14">
        <SectionHeading tone="light" className="lg:col-span-7" label="Selected work" lines={['Projects that', 'speak for us.']} />
        <Reveal delay={0.15} className="flex flex-col justify-end lg:col-span-5">
          <p className="text-lg leading-relaxed text-sand/70">
            Real branding work, delivered end-to-end — from the first sketch to the box on the doorstep.
          </p>
          <Link href="/projects" className="group mt-6 inline-flex w-fit items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-sand-50">
            <span className="link-u pb-1 group-hover:[background-size:100%_1px]">All projects</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>

      <StaggerGroup className="grid gap-px border-y border-sand/10 bg-sand/10 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.slice(0, 5).map((p, i) => (
          <motion.div key={p.slug} variants={itemVariants} className={cn(i === 0 && 'md:col-span-2 lg:row-span-2')}>
            <ProjectCard project={p} index={i} featured={i === 0} />
          </motion.div>
        ))}
        <motion.div variants={itemVariants} className="bg-coal">
          <Link href="/#contact" className="group flex h-full min-h-[18rem] flex-col justify-between p-8 md:p-10">
            <Logo variant="monogram" className="h-10 w-10 text-sand-50" />
            <div>
              <p className="label text-sand/50">Your brand, next</p>
              <p className="mt-3 text-3xl font-light leading-tight text-sand-50">Let&apos;s make something people keep.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-sand-50">
                <span className="link-u pb-1 group-hover:[background-size:100%_1px]">Start a project</span>
                <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        </motion.div>
      </StaggerGroup>
    </Stage>
  );
}

/** Typographic case-study tile. `featured` renders the large stone version. */
export function ProjectCard({
  project,
  index,
  featured = false,
  className,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden p-8 transition-colors duration-500 md:p-10',
        featured ? 'bg-sand text-coal lg:min-h-[38rem]' : 'bg-coal text-sand-50 hover:bg-sand-50 hover:text-coal',
        className,
      )}
    >
      {/* Oversized index numeral */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-2 -top-6 select-none font-light leading-none tracking-tighter opacity-[0.07] transition-transform duration-700 group-hover:-translate-y-1',
          featured ? 'text-[14rem] md:text-[18rem]' : 'text-[9rem]',
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-center justify-between gap-4">
        <span className="label opacity-70">{project.industry}</span>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            featured
              ? 'border-coal/25 group-hover:border-coal group-hover:bg-coal group-hover:text-sand'
              : 'border-sand/25 group-hover:border-coal/40',
          )}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>

      <div className="relative">
        <p className="text-[13px] opacity-60">{project.client}</p>
        <h3
          className={cn(
            'mt-2 font-normal leading-[1.08] tracking-[-0.015em] text-balance',
            featured ? 'text-[length:clamp(2rem,3.8vw,3.5rem)]' : 'text-2xl md:text-[1.75rem]',
          )}
        >
          {project.title}
        </h3>
        <p className={cn('mt-4 leading-relaxed opacity-70', featured ? 'max-w-lg text-lg' : 'line-clamp-2 text-[15px]')}>
          {project.summary}
        </p>
        <p className="mt-6 text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em] opacity-60">
          {project.services.slice(0, featured ? 5 : 3).join('  ·  ')}
        </p>
      </div>
    </Link>
  );
}
