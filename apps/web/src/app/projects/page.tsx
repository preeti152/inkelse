import type { Metadata } from 'next';
import { PROJECTS } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
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
      <main id="main" className="bg-coal">
        <PageHero
          label="Our work"
          lines={['Work that', 'speaks for us.']}
          lead="A selection of branding projects we’ve delivered end-to-end — design, print and delivery."
          image={{ src: '/images/brand/tote.jpg', alt: 'Black tote with large Inkelse wordmark' }}
        />

        <div className="grid gap-px bg-sand/10 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <div key={project.slug} className={i === 0 ? 'md:col-span-2' : ''}>
              <ProjectCard project={project} index={i} featured={i === 0} className={i === 0 ? 'lg:!min-h-[26rem]' : undefined} />
            </div>
          ))}
        </div>

        <CtaBand lines={['Want work like this', 'for your brand?']} />
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
