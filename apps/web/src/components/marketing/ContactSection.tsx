'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Mail, Phone, MapPin, MessageCircle, Loader2, AlertCircle, Clock } from 'lucide-react';
import { CONTACT, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Stage } from '@/components/layout/Stage';
import { Lamp } from '@/components/effects/Lamp';
import { Reveal, SplitHeadline } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Section 8 — Contact. The closing scene: a magenta lamp lights the headline,
 * then a glass quote form beside direct WhatsApp / email / phone tiles + map.
 * `standalone` (used on /contact) adds header clearance and an <h1>.
 */
export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      company: fd.get('company'),
      message: fd.get('message'),
    };
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMsg(body?.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`;

  return (
    <Stage id="contact" glow="split" className={standalone ? 'pb-28 pt-32 md:pt-40' : 'py-28 md:py-40'}>
      <Lamp color="magenta" width={30} immediate={standalone} className={standalone ? 'top-24 md:top-28' : 'top-0'} />

      <Container className="relative">
        {/* Headline */}
        <div className="mx-auto max-w-3xl pt-16 text-center md:pt-20">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
          </Reveal>
          <SplitHeadline
            as={standalone ? 'h1' : 'h2'}
            inView={!standalone}
            text="Let's make something"
            accent="people keep."
            className="mt-5 font-display text-[length:clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.04em] text-white text-balance"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Tell us what you need and we&apos;ll send a clear, itemised quote. We reply within a few hours.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* ── Form ─────────────────────────────────────── */}
          <Reveal className="lg:col-span-7">
            <div className="border-beam relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-night-800/80 p-6 backdrop-blur-xl md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex min-h-[400px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-magenta shadow-[0_0_40px_6px_rgba(240,69,138,0.35)]"
                    >
                      <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </motion.span>
                    <h3 className="text-2xl font-semibold text-white">Thanks — we&apos;ve got it!</h3>
                    <p className="mt-3 max-w-md text-white/60">
                      A member of the {BRAND.nameDisplay} team will get back to you shortly. For anything urgent, tap
                      the WhatsApp button.
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill mt-6 bg-[#25D366] text-[#05210F] hover:bg-[#3BE07A]"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={2} />
                      WhatsApp us now
                    </a>
                  </motion.div>
                ) : (
                  <motion.form key="form" exit={{ opacity: 0, scale: 0.98 }} onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-lg font-semibold tracking-tight text-white">Request a quote</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                        <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                        Takes under a minute
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" name="name" autoComplete="name" required />
                      <Field label="Email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                      <Field label="Company" name="company" autoComplete="organization" />
                    </div>
                    <Field
                      label="What do you need?"
                      name="message"
                      as="textarea"
                      rows={5}
                      required
                      hint="Quantities, deadline and any reference links help us quote faster."
                    />

                    {status === 'error' && (
                      <p role="alert" className="flex items-start gap-2 rounded-xl border border-[#F87171]/30 bg-[#F87171]/10 px-4 py-3 text-sm text-[#FCA5A5]">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                        <span>
                          {errorMsg}{' '}
                          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline">
                            Or message us on WhatsApp.
                          </a>
                        </span>
                      </p>
                    )}

                    <button type="submit" disabled={status === 'submitting'} className="btn-light btn-shine group w-full !py-3.5 sm:w-auto sm:!px-8">
                      <span className="shine" aria-hidden="true" />
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send request
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* ── Direct channels ───────────────────────────── */}
          <Reveal delay={0.12} className="flex flex-col gap-4 lg:col-span-5">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 p-5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/60 hover:shadow-[0_20px_50px_-20px_rgba(37,211,102,0.6)]"
            >
              <span className="shine" aria-hidden="true" />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#05210F]">
                <MessageCircle className="h-6 w-6" strokeWidth={2} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="block text-sm text-white/60">{CONTACT.phone} · fastest response</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ContactTile href={`mailto:${CONTACT.email}`} icon={Mail} label="Email" value={CONTACT.email} color="#38C8F5" />
              <ContactTile href={`tel:${CONTACT.phoneHref}`} icon={Phone} label="Phone" value={CONTACT.phone} color="#F0458A" />
            </div>

            <div className="flex items-start gap-3 rounded-[1.5rem] border border-white/[0.07] bg-night-800 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FFC53D]" strokeWidth={1.75} />
              <span className="text-sm text-white/70">
                {CONTACT.address.city}, {CONTACT.address.state}, {CONTACT.address.country}
              </span>
            </div>

            <div className="flex-1 overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-night-800 p-1.5">
              <iframe
                title={`${BRAND.nameDisplay} location`}
                src={mapSrc}
                width="100%"
                height="100%"
                className="min-h-[220px] w-full rounded-[1.2rem] opacity-80 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Stage>
  );
}

function ContactTile({
  href,
  icon: Icon,
  label,
  value,
  color,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <SpotlightCard
      color={`${color}22`}
      className="group rounded-[1.5rem] border border-white/[0.07] bg-night-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
    >
      <a href={href} className="relative z-10 flex items-center gap-3 p-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-tracked text-white/45">{label}</span>
          <span className="block truncate text-sm font-medium text-white">{value}</span>
        </span>
      </a>
    </SpotlightCard>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
  autoComplete?: string;
  hint?: string;
}

function Field({ label, name, type = 'text', required, as = 'input', rows = 3, autoComplete, hint }: FieldProps) {
  const id = `f-${name}`;
  const base =
    'mt-2 block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/30 transition-all duration-200 hover:border-white/20 focus:border-cyan/70 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-cyan/15';
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-tracked text-white/55">
        {label}
        {required && <span className="text-magenta-300"> *</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${base} resize-none`}
        />
      ) : (
        <input id={id} type={type} name={name} required={required} autoComplete={autoComplete} className={base} />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-white/45">
          {hint}
        </p>
      )}
    </div>
  );
}
