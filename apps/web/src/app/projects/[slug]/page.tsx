import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { PROJECTS, getWhatsAppUrl, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        {/* Hero band */}
        <div
          className="relative flex min-h-[60vh] items-end overflow-hidden pt-24"
          style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}99 40%, #1A1A1A)` }}
        >
          <div className="absolute inset-0 bg-halftone opacity-20" />
          <Container className="relative z-10 pb-16">
            <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              All projects
            </Link>
            <p className="text-xs font-bold uppercase tracking-tracked-wide text-white/80">{project.industry}</p>
            <h1 className="mt-3 font-display text-display-xl uppercase tracking-tightest text-white text-balance">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="rounded-pill bg-white/20 px-3 py-1 text-xs font-medium text-white">{s}</span>
              ))}
            </div>
          </Container>
        </div>

        {/* Body */}
        <Container variant="editorial" className="py-20">
          <div className="space-y-14">
            <CaseBlock label="The challenge" body={project.challenge} accent={project.accent} />
            <CaseBlock label="Our approach" body={project.approach} accent={project.accent} />
            <CaseBlock label="The outcome" body={project.outcome} accent={project.accent} />

            {/* Deliverables */}
            <div>
              <p className="eyebrow mb-5" style={{ color: project.accent }}>What we delivered</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3 rounded-xl border border-edge p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ backgroundColor: project.accent }}>
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-medium text-ink">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client */}
            <div className="rounded-2xl bg-paper-grey p-6 text-sm text-quiet">
              <span className="font-semibold text-ink">Client:</span> {project.client}
            </div>
          </div>
        </Container>

        {/* CTA */}
        <div className="bg-ink py-16 text-center text-paper">
          <Container variant="editorial">
            <h2 className="font-display text-display-md uppercase tracking-tightest">
              Want work like this for <span className="text-cyan">your brand?</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#contact" className="btn-pill-cyan group">
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <a href={getWhatsAppUrl(`Hi ${BRAND.nameDisplay}! I saw the "${project.title}" case study and want something similar.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1EBE57]">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp us
              </a>
            </div>
          </Container>
        </div>

        {/* Next project */}
        <Container className="py-16">
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between rounded-2xl border border-edge p-8 transition-colors hover:border-ink">
            <div>
              <p className="text-xs uppercase tracking-tracked text-quiet">Next project</p>
              <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tightest text-ink">{next.title}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-ink transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}

function CaseBlock({ label, body, accent }: { label: string; body: string; accent: string }) {
  return (
    <div>
      <p className="eyebrow mb-3" style={{ color: accent }}>{label}</p>
      <p className="text-lg leading-relaxed text-ink/80">{body}</p>
    </div>
  );
}
