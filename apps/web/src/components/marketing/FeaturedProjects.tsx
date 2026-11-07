'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { cn } from '@/lib/cn';
import { SectionDrop } from './SectionDrop';

/**
 * Section 4 — Featured Projects
 * Dark aurora canvas, bento case-study cards. Each opens /projects/[slug].
 */
export function FeaturedProjects() {
  return (
    <SectionDrop bgKey="projects" bg="#0B0B0F" bgFrom="#F4F1EA" tone="light" surface="aurora">
      <Container className="py-24 md:py-32" id="projects">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="light"
            eyebrow="Featured work"
            title={
              <>
                Projects that <span className="text-gradient-cmyk">speak for us.</span>
              </>
            }
          />
          <p className="max-w-sm text-sm leading-relaxed text-paper/60">
            Real branding projects, delivered end-to-end. Open any project to read the full case study.
          </p>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const lead = i === 0;
            return (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className={cn(lead && 'md:col-span-2 lg:row-span-2', i === 3 && 'lg:col-span-2')}
              >
                <SpotlightCard
                  color={`${project.accent}33`}
                  className="glass-dark group h-full rounded-[1.75rem] transition-transform duration-500 ease-emphasized hover:-translate-y-1.5"
                >
                  <Link href={`/projects/${project.slug}`} className="relative z-10 flex h-full flex-col">
                    {/* Visual */}
                    <div
                      className={cn(
                        'relative m-2 overflow-hidden rounded-[1.4rem]',
                        lead ? 'min-h-[18rem] flex-1 md:min-h-[22rem]' : 'h-48',
                      )}
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-[1200ms] ease-emphasized group-hover:scale-110"
                        style={{
                          background: `radial-gradient(120% 90% at 0% 0%, ${project.accent} 0%, ${project.accent}AA 35%, #141418 85%)`,
                        }}
                      />
                      <div className="bg-halftone absolute inset-0 opacity-25 mix-blend-overlay" />
                      {/* Bottom scrim guarantees title contrast on any accent (incl. yellow) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      <span className="pointer-events-none absolute right-5 top-2 font-display text-8xl font-black text-white/10">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span className="glass-dark absolute left-4 top-4 rounded-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-tracked text-white">
                        {project.industry}
                      </span>

                      <h3
                        className={cn(
                          'absolute inset-x-5 bottom-4 font-display font-extrabold tracking-tightest text-white text-balance',
                          lead ? 'text-3xl md:text-5xl' : 'text-2xl',
                        )}
                      >
                        {project.title}
                      </h3>

                      <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </div>

                    {/* Body */}
                    <div className="px-6 pb-6 pt-4">
                      <p className={cn('leading-relaxed text-paper/70', lead ? 'text-base' : 'line-clamp-2 text-sm')}>
                        {project.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.services.slice(0, lead ? 6 : 3).map((s) => (
                          <span key={s} className="rounded-pill border border-white/10 bg-white/5 px-3 py-1 text-xs text-paper/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </StaggerGroup>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-pill-glass group !px-7 !py-3.5">
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </SectionDrop>
  );
}
