'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@inkora/brand';
import { Stage } from '@/components/layout/Stage';
import { ServiceIcon } from '@/components/brand/ServiceIcon';
import { Reveal, SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';
import { SERVICE_IMAGES } from '@/lib/brand-images';

/**
 * Section 3 — Services: a seamless editorial grid. Hairlines instead of gaps,
 * a photograph per service, and a quiet hover (image zoom + underline + arrow).
 */
export function Services() {
  return (
    <Stage id="services" tone="paper">
      {/* Header row */}
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:px-14">
        <SectionHeading className="lg:col-span-7" label="What we do" lines={['One studio.', 'Every brand touchpoint.']} />
        <Reveal delay={0.15} className="flex flex-col justify-end lg:col-span-5">
          <p className="text-lg leading-relaxed text-coal/75">
            Six crafts under one roof — so your cards, gifts, signs and boxes all look like they came from the same
            brand. Because they did.
          </p>
          <Link href="/services" className="group mt-6 inline-flex w-fit items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-coal">
            <span className="link-u pb-1 group-hover:[background-size:100%_1px]">All services</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>

      <ServiceGrid />
    </Stage>
  );
}

/** The six-service photo grid (hairlines, no gaps). Shared by the homepage and /services. */
export function ServiceGrid() {
  return (
    <StaggerGroup className="grid gap-px border-y border-coal/10 bg-coal/10 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => {
        const img = SERVICE_IMAGES[s.slug];
        return (
          <motion.div key={s.id} variants={itemVariants} className="bg-sand-100">
            <Link href={`/services/${s.slug}`} className="group flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-300">
                {img && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                )}
                <span className="absolute left-5 top-5 bg-sand-50/90 px-2.5 py-1 text-[11px] font-medium tracking-[0.2em] text-coal backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <ServiceIcon name={s.icon} className="h-5 w-5 text-coal" strokeWidth={1.25} />
                  <h3 className="text-2xl font-normal tracking-tight text-coal">
                    <span className="link-u pb-0.5 group-hover:[background-size:100%_1px]">{s.name}</span>
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-coal/70">{s.description}</p>
                <p className="mt-5 text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em] text-mute">
                  {s.offerings.slice(0, 3).join('  ·  ')}
                </p>
                <span className="mt-auto flex items-center justify-between pt-8 text-[12px] font-medium uppercase tracking-[0.22em] text-coal">
                  Explore
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-coal/20 transition-colors duration-300 group-hover:border-coal group-hover:bg-coal group-hover:text-sand">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </StaggerGroup>
  );
}
