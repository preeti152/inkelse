'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND, INDUSTRIES } from '@inkora/brand';
import { Reveal, MaskLines } from '@/components/motion/Reveal';

/**
 * Studio statement — full-bleed split: the notebook photograph (slow parallax)
 * beside the brand story and the industries Inkelse serves.
 */
export function StudioStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section ref={ref} aria-label="The studio" className="grid bg-sand lg:grid-cols-2">
      <div className="relative min-h-[26rem] overflow-hidden bg-sand-300 lg:min-h-[44rem]">
        <motion.div style={{ y }} className="absolute inset-[-8%_0]">
          <Image
            src="/images/brand/notebook.jpg"
            alt="Inkelse notebook with wordmark, tagline and an oversized k on stone paper"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="studio-light flex flex-col justify-center px-6 py-20 md:px-10 lg:px-16 xl:px-24">
        <Reveal>
          <p className="label text-mute">The studio</p>
        </Reveal>
        <MaskLines
          lines={['Beyond ink.', 'Beyond the screen.']}
          className="mt-6 text-[length:clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-coal"
        />
        <Reveal delay={0.15}>
          <span className="rule mt-8 text-coal" />
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-coal/75">{BRAND.story}</p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-coal/65">
            Businesses shouldn&apos;t have to juggle five vendors to look put-together. We design, print, pack and
            deliver — so your brand feels the same in every hand it reaches.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-12 border-t border-coal/15 pt-8">
          <p className="label text-mute">Trusted across</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name} className="text-[15px] text-coal">
                {ind.name}
              </li>
            ))}
          </ul>
          <Link href="/about" className="group mt-10 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-coal">
            <span className="link-u pb-1 group-hover:[background-size:100%_1px]">Meet the studio</span>
            <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
