import type { Metadata } from 'next';
import { PROJECTS } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectCard } from '@/components/marketing/FeaturedProjects';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Featured branding, printing, and packaging projects delivered by Inkelse.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-night">
        <PageHero
          eyebrow="Our work"
          title="Work that"
          accent="speaks for us."
          lead="A selection of branding projects we’ve delivered end-to-end — design, print and delivery."
        />

        <Container className="py-20 md:py-28">
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                className={i === 0 ? 'w-full md:col-span-2' : 'w-full'}
              />
            ))}
          </div>
        </Container>

        <CtaBand title="Want work like this" accent="for your brand?" />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
