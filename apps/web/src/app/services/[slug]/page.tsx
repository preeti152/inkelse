import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SERVICES, BRAND } from '@inkora/brand';
import { Header } from '@/components/layout/Header';
import { FooterCMYK } from '@/components/layout/FooterCMYK';
import { WhatsAppBubble } from '@/components/chat/WhatsAppBubble';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { CtaBand } from '@/components/marketing/CtaBand';
import { SERVICE_IMAGES } from '@/lib/brand-images';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service not found' };
  return { title: service.name, description: service.description };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const img = SERVICE_IMAGES[service.slug];
  const nextImg = SERVICE_IMAGES[next.slug];

  return (
    <>
      <Header />
      <main id="main" className="bg-sand">
        <PageHero
          back={{ href: '/services', label: 'All services' }}
          label={`Service ${String(idx + 1).padStart(2, '0')}`}
          lines={[service.name]}
          lead={service.description}
          image={img}
        />

        {/* Overview + offerings */}
        <section className="grid border-b border-coal/10 lg:grid-cols-12">
          <div className="px-6 py-16 md:px-10 md:py-20 lg:col-span-7 lg:border-r lg:border-coal/10 lg:px-14 xl:pl-20">
            <div className="flex items-center gap-3">
              <ServiceIcon name={service.icon} className="h-6 w-6 text-coal" strokeWidth={1.25} />
              <p className="label text-mute">Overview</p>
            </div>
            <p className="mt-8 text-2xl font-light leading-relaxed text-coal md:text-[1.9rem] md:leading-relaxed">
              {service.intro}
            </p>
          </div>
          <div className="bg-sand-100 px-6 py-16 md:px-10 md:py-20 lg:col-span-5 lg:px-12">
            <p className="label text-mute">What we offer</p>
            <ul className="mt-6 divide-y divide-coal/10 border-y border-coal/10">
              {service.offerings.map((o, i) => (
                <li key={o} className="flex items-baseline gap-5 py-4">
                  <span className="w-6 text-[11px] font-medium tracking-[0.2em] text-mute">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-light text-coal">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          lines={[`Need ${service.name.toLowerCase()}?`, 'Let’s talk.']}
          whatsappMessage={`Hi ${BRAND.nameDisplay}! I'm interested in your ${service.name} service.`}
        />

        {/* Next service */}
        <Link href={`/services/${next.slug}`} className="group grid border-t border-sand/10 bg-sand md:grid-cols-12">
          <div className="flex flex-col justify-center px-6 py-14 md:col-span-8 md:px-10 lg:px-14 xl:pl-20">
            <p className="label text-mute">Next service</p>
            <p className="mt-4 flex items-center gap-5 text-[length:clamp(2rem,4vw,3.5rem)] font-normal tracking-[-0.02em] text-coal">
              <span className="link-u pb-1 group-hover:[background-size:100%_2px]">{next.name}</span>
              <ArrowRight className="arrow-nudge h-8 w-8" strokeWidth={1} />
            </p>
          </div>
          {nextImg && (
            <div className="relative hidden min-h-[14rem] overflow-hidden bg-sand-300 md:col-span-4 md:block">
              <Image
                src={nextImg.src}
                alt={nextImg.alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            </div>
          )}
        </Link>
      </main>
      <FooterCMYK />
      <WhatsAppBubble />
    </>
  );
}
