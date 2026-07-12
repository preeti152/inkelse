import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Featured branding, printing, and packaging projects delivered by Inkelse.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        {/* Hero */}
        <div className="bg-ink pt-32 pb-20 text-paper">
          <Container>
            <p className="eyebrow mb-3 text-cyan">Our work</p>
            <h1 className="font-display text-display-xl uppercase tracking-tightest">Projects</h1>
            <p className="mt-4 max-w-2xl text-lg text-paper/70">
              A selection of branding projects we&apos;ve delivered end-to-end — design, print, and delivery.
            </p>
          </Container>
        </div>

        {/* Grid */}
        <Container className="py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-ink-800 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="relative flex h-56 items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}99 40%, #1A1A1A)` }}
                >
                  <div className="absolute inset-0 bg-halftone opacity-20" />
                  <span className="pointer-events-none absolute right-6 top-4 font-display text-8xl font-black text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute left-6 top-6 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    {project.industry}
                  </span>
                  <h2 className="relative z-10 px-8 text-center font-display text-3xl font-black uppercase tracking-tightest text-white">
                    {project.title}
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-sm leading-relaxed text-paper/80">{project.summary}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan">
                    <span>Read case study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
