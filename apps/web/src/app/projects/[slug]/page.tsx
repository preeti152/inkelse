import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { PROJECTS, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/marketing/CtaBand';
import { lit } from '@/lib/lit';

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
  const c = lit(project.accent);

  return (
    <>
      <Header />
      <main id="main" className="bg-night">
        <PageHero
          back={{ href: '/projects', label: 'All projects' }}
          eyebrow={project.industry}
          title={project.title}
          lead={project.summary}
          tint={c}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {project.services.map((s) => (
              <span key={s} className="rounded-pill border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/75">
                {s}
              </span>
            ))}
          </div>
        </PageHero>

        <Container className="py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Case study narrative */}
            <div className="space-y-14 lg:col-span-8">
              <CaseBlock n="01" label="The challenge" body={project.challenge} color={c} />
              <CaseBlock n="02" label="Our approach" body={project.approach} color={c} />
              <CaseBlock n="03" label="The outcome" body={project.outcome} color={c} />
            </div>

            {/* Sticky fact sheet */}
            <aside className="lg:col-span-4">
              <div className="rounded-[1.75rem] border border-white/[0.07] bg-night-800 p-7 lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Client</p>
                <p className="mt-2 text-lg font-semibold text-white">{project.client}</p>
                <div className="hairline my-6" />
                <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">What we delivered</p>
                <ul className="mt-4 space-y-3">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[15px] text-white/80">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ color: c, backgroundColor: `${c}1A` }}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>

        <CtaBand
          title="Want work like this"
          accent="for your brand?"
          whatsappMessage={`Hi ${BRAND.nameDisplay}! I saw the "${project.title}" case study and want something similar.`}
        />

        <Container className="pb-24">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[1.75rem] border border-white/[0.07] bg-night-800 p-8 transition-colors duration-300 hover:border-white/20 md:p-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-tracked text-white/40">Next project</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{next.title}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-night transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </Link>
        </Container>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}

function CaseBlock({ n, label, body, color }: { n: string; label: string; body: string; color: string }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums" style={{ color }}>
          {n}
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-tracked text-white/50">{label}</h2>
      </div>
      <p className="mt-4 text-xl leading-relaxed text-white/80 md:text-2xl md:leading-relaxed">{body}</p>
    </section>
  );
}
