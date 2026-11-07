'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MaskLines, EASE_OUT } from '@/components/motion/Reveal';

/**
 * PageHero — opening band for inner pages, in the brand-board layout:
 * label, masked headline, rule and lead on the left; a product photograph
 * filling the right half (or a full-width text band when no image is given).
 */
export function PageHero({
  label,
  lines,
  lead,
  back,
  image,
  children,
}: {
  label: string;
  lines: string[];
  lead?: React.ReactNode;
  back?: { href: string; label: string };
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });

  return (
    <div className="bg-sand pt-20">
      <div className={`studio-light paper relative grid border-b border-coal/10 ${image ? 'lg:grid-cols-2' : ''}`}>
        <div
          className={`relative z-10 flex flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:px-14 ${
            image ? 'lg:min-h-[34rem] xl:pl-20' : 'mx-auto w-full max-w-[90rem]'
          }`}
        >
          {back && (
            <motion.div {...fade(0)}>
              <Link href={back.href} className="group mb-10 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-coal/70 hover:text-coal">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
                {back.label}
              </Link>
            </motion.div>
          )}
          <motion.p {...fade(0.05)} className="label text-mute">
            {label}
          </motion.p>
          <MaskLines
            as="h1"
            inView={false}
            delay={0.12}
            lines={lines}
            className="mt-6 max-w-4xl text-[length:clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.025em] text-coal"
          />
          <motion.span {...fade(0.45)} className="rule mt-8 text-coal" />
          {lead && (
            <motion.p {...fade(0.55)} className="mt-8 max-w-xl text-lg leading-relaxed text-coal/75 md:text-xl">
              {lead}
            </motion.p>
          )}
          {children && <motion.div {...fade(0.65)} className="mt-8">{children}</motion.div>}
        </div>

        {image && (
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            transition={{ duration: 1.3, delay: 0.1, ease: EASE_OUT }}
            className="relative min-h-[20rem] overflow-hidden bg-sand-300 lg:min-h-0"
          >
            <motion.div
              initial={reduce ? false : { scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, delay: 0.1, ease: EASE_OUT }}
              className="absolute inset-0"
            >
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
