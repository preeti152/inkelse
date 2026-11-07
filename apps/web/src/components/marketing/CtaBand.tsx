import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@inkora/brand';
import { Logo } from '@/components/brand/Logo';
import { MaskLines, Reveal } from '@/components/motion/Reveal';

/**
 * CtaBand — closing call-to-action for inner pages: a coal band with a
 * masked headline on the left and the two actions + seal on the right.
 */
export function CtaBand({
  lines = ['Ready when', 'you are.'],
  lead = 'Tell us what you need — we’ll reply with a clear, itemised quote within a few hours.',
  whatsappMessage,
}: {
  lines?: string[];
  lead?: string;
  whatsappMessage?: string;
}) {
  return (
    <section aria-label="Get a quote" className="bg-coal text-sand-50">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label text-sand/55">Start a project</p>
          </Reveal>
          <MaskLines
            lines={lines}
            className="mt-6 text-[length:clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.03] tracking-[-0.025em]"
          />
        </div>
        <Reveal delay={0.15} className="flex flex-col justify-end lg:col-span-5">
          <p className="text-lg leading-relaxed text-sand/70">{lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-light group">
              Get a quote
              <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-line-light">
              WhatsApp us
            </a>
            <Logo variant="monogram" className="ml-auto hidden h-11 w-11 text-sand/60 sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
