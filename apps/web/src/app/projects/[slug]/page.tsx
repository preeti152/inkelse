import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PROJECTS, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/marketing/CtaBand';

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
      <main id="main" className="bg-sand">
        <PageHero
          back={{ href: '/projects', label: 'All projects' }}
          label={`${project.industry}  ·  Case study ${String(idx + 1).padStart(2, '0')}`}
          lines={[project.title]}
          lead={project.summary}
        >
          <p className="text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em] text-mute">
            {project.services.join('  ·  ')}
          </p>
        </PageHero>

        <section className="grid border-b border-coal/10 lg:grid-cols-12">
          {/* Narrative */}
          <div className="divide-y divide-coal/10 lg:col-span-8 lg:border-r lg:border-coal/10">
            <CaseBlock n="01" label="The challenge" body={project.challenge} />
            <CaseBlock n="02" label="Our approach" body={project.approach} />
            <CaseBlock n="03" label="The outcome" body={project.outcome} />
          </div>

          {/* Fact sheet */}
          <aside className="bg-sand-100 px-6 py-14 md:px-10 lg:col-span-4 lg:px-12">
            <div className="lg:sticky lg:top-28">
              <p className="label text-mute">Client</p>
              <p className="mt-3 text-xl font-light text-coal">{project.client}</p>
              <p className="label mt-10 text-mute">Delivered</p>
              <ul className="mt-4 divide-y divide-coal/10 border-y border-coal/10">
                {project.deliverables.map((d) => (
                  <li key={d} className="py-3 text-[15px] text-coal">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <CtaBand
          lines={['Want work like this', 'for your brand?']}
          whatsappMessage={`Hi ${BRAND.nameDisplay}! I saw the "${project.title}" case study and want something similar.`}
        />

        <Link href={`/projects/${next.slug}`} className="group block bg-sand">
          <div className="mx-auto max-w-[90rem] px-6 py-14 md:px-10 lg:px-14">
            <p className="label text-mute">Next case study</p>
            <p className="mt-4 flex items-center gap-5 text-[length:clamp(2rem,4vw,3.5rem)] font-normal tracking-[-0.02em] text-coal">
              <span className="link-u pb-1 group-hover:[background-size:100%_2px]">{next.title}</span>
              <ArrowRight className="arrow-nudge h-8 w-8 shrink-0" strokeWidth={1} />
            </p>
          </div>
        </Link>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}

function CaseBlock({ n, label, body }: { n: string; label: string; body: string }) {
  return (
    <div className="grid gap-4 px-6 py-14 md:grid-cols-12 md:px-10 lg:px-14 xl:pl-20">
      <div className="md:col-span-3">
        <p className="text-[11px] font-medium tracking-[0.2em] text-mute">{n}</p>
        <h2 className="label mt-2 text-coal">{label}</h2>
      </div>
      <p className="text-xl font-light leading-relaxed text-coal md:col-span-9 md:text-2xl md:leading-relaxed">{body}</p>
    </div>
  );
}
