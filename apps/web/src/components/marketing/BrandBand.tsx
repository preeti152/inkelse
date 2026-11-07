'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { StaggerGroup, itemVariants } from '@/components/motion/Reveal';

const PILLARS = [
  { title: 'Branding', line: 'Identity that defines.' },
  { title: 'Printing', line: 'Quality that speaks.' },
  { title: 'Packaging', line: 'Design that protects.' },
  { title: 'Corporate gifting', line: 'Relationships that last.' },
];

/** The black information band from the brand board — four pillars and the seal. */
export function BrandBand() {
  return (
    <section aria-label="What Inkelse does" className="bg-coal text-sand-50">
      <div className="mx-auto flex max-w-[90rem] items-stretch px-6 md:px-10 lg:px-14">
        <StaggerGroup className="grid flex-1 grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={itemVariants}
              className={[
                'py-8 pr-6 md:py-10',
                i % 2 === 1 ? 'border-l border-sand/15 pl-6' : '',
                i >= 2 ? 'border-t border-sand/15 lg:border-t-0' : '',
                i === 2 ? 'lg:border-l lg:pl-6' : '',
              ].join(' ')}
            >
              <p className="label text-sand-50">{p.title}</p>
              <p className="mt-2 text-[15px] font-light text-sand/70">{p.line}</p>
            </motion.div>
          ))}
        </StaggerGroup>
        <div className="hidden items-center border-l border-sand/15 pl-10 md:flex">
          <Logo variant="monogram" className="h-12 w-12 text-sand-50" />
        </div>
      </div>
    </section>
  );
}
