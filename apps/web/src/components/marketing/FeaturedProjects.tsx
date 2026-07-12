'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

/**
 * Section 4 — Featured Projects
 * Case-study cards (not a plain gallery). Each opens /projects/[slug].
 */
export function FeaturedProjects() {
  return (
    <SectionDrop bgKey="projects" bg="#1A1A1A" bgFrom="#F7F4EE" tone="light">
      <Container className="py-24 md:py-32" id="projects">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-cyan">Featured work</p>
            <h2 className="font-display text-display-lg uppercase tracking-tightest text-paper text-balance">
              Projects that <span className="text-yellow">speak for us.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-paper/60">
            Real branding projects, delivered end-to-end. Click any project to read the full case study.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-ink-800 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual band with accent gradient */}
                <div
                  className={`relative flex items-center justify-center overflow-hidden ${i === 0 ? 'h-64 md:h-80' : 'h-56'}`}
                  style={{
                    background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accent}99 40%, #1A1A1A 100%)`,
                  }}
                >
                  {/* Halftone overlay */}
                  <div className="absolute inset-0 bg-halftone opacity-20" />
                  {/* Big index number */}
                  <span className="pointer-events-none absolute right-6 top-4 font-display text-8xl font-black text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Industry tag */}
                  <span className="absolute left-6 top-6 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    {project.industry}
                  </span>
                  {/* Title */}
                  <h3 className="relative z-10 px-8 text-center font-display text-3xl font-black uppercase tracking-tightest text-white md:text-4xl">
                    {project.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-paper/80">{project.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span key={s} className="rounded-pill bg-paper/10 px-3 py-1 text-xs text-paper/70">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan">
                    <span>Read case study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-pill bg-paper text-ink hover:bg-paper-grey group">
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </SectionDrop>
  );
}
