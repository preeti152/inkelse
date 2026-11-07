import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { Lamp } from '@/components/effects/Lamp';
import { SplitHeadline, Reveal } from '@/components/motion/Reveal';

/**
 * CtaBand — reusable closing call-to-action for inner pages.
 * Lamp-lit headline with a primary "quote" button and a WhatsApp option.
 */
export function CtaBand({
  title = 'Ready when',
  accent = 'you are.',
  lead = 'Tell us what you need — we’ll reply with a clear, itemised quote within a few hours.',
  whatsappMessage,
}: {
  title?: string;
  accent?: string;
  lead?: string;
  whatsappMessage?: string;
}) {
  return (
    <Stage className="py-28 md:py-36">
      <Lamp color="cyan" width={28} />
      <Container className="relative">
        <div className="mx-auto max-w-3xl pt-12 text-center">
          <SplitHeadline
            text={title}
            accent={accent}
            className="font-display text-[length:clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white text-balance"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">{lead}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-light btn-shine group !px-7 !py-3.5">
                <span className="shine" aria-hidden="true" />
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} />
              </Link>
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-glass !px-7 !py-3.5"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Stage>
  );
}
