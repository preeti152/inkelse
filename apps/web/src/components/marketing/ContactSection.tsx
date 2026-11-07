'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, Mail, Phone, MapPin, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { CONTACT, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Reveal, SectionHeading } from '@/components/motion/Reveal';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { SectionDrop } from './SectionDrop';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Section 8 — Contact
 * Glass quote form + WhatsApp / email / phone tiles + map.
 * `standalone` (used on /contact) drops the overlapping sheet edge and adds header clearance.
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
    <SectionDrop
      bgKey="contact"
      bg="#FAFAF7"
      bgFrom={standalone ? undefined : '#F4F1EA'}
      tone="dark"
      surface="mesh-light"
    >
      <Container className={standalone ? 'pb-24 pt-36 md:pb-32 md:pt-44' : 'py-24 md:py-32'} id="contact">
        <SectionHeading
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s get <span className="text-gradient-ink">started.</span>
            </>
          }
          lead="Tell us what you need and we'll send a quick, itemised quote. We reply within a few hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — form */}
          <Reveal className="lg:col-span-7">
            <div className="border-gradient glass relative h-full rounded-[2rem] p-6 md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-magenta shadow-lg"
                    >
                      <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </motion.span>
                    <h3 className="text-2xl font-bold text-ink">Thanks — we&apos;ve got it!</h3>
                    <p className="mt-3 max-w-md text-ink/65">
                      A member of the {BRAND.nameDisplay} team will get back to you shortly. For anything urgent, tap
                      the WhatsApp button.
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EBE57]"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                      WhatsApp us now
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" name="name" autoComplete="name" required />
                      <Field label="Email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                      <Field label="Company" name="company" autoComplete="organization" />
                    </div>
                    <Field
                      label="Tell us what you need"
                      name="message"
                      as="textarea"
                      rows={5}
                      required
                      hint="Quantities, deadline and any reference links help us quote faster."
                    />

                    {status === 'error' && (
                      <p role="alert" className="flex items-start gap-2 rounded-xl bg-stamp/10 px-4 py-3 text-sm text-[#B91C1C]">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                        <span>
                          {errorMsg}{' '}
                          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                            Or message us on WhatsApp.
                          </a>
                        </span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-pill-gradient btn-shine group w-full !py-3.5 sm:w-auto sm:!px-8"
                    >
                      <span className="shine" aria-hidden="true" />
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Get a quote
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Right — contact details + map */}
          <Reveal delay={0.12} className="flex flex-col gap-4 lg:col-span-5">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 text-white shadow-[0_18px_40px_-16px_rgba(18,140,126,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="shine" aria-hidden="true" />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="block text-sm opacity-90">{CONTACT.phone} · fastest response</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </a>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ContactTile href={`mailto:${CONTACT.email}`} icon={Mail} label="Email" value={CONTACT.email} color="#0AAEEC" />
              <ContactTile href={`tel:${CONTACT.phoneHref}`} icon={Phone} label="Phone" value={CONTACT.phone} color="#E91E63" />
            </div>

            <SpotlightCard color="rgba(255,214,0,0.22)" className="glass flex items-start gap-3 rounded-[1.5rem] p-5">
              <MapPin className="relative z-10 mt-0.5 h-5 w-5 shrink-0 text-[#B38F00]" strokeWidth={1.75} />
              <span className="relative z-10 text-sm text-ink/80">
                {CONTACT.address.city}, {CONTACT.address.state}, {CONTACT.address.country}
              </span>
            </SpotlightCard>

            <div className="glass flex-1 overflow-hidden rounded-[1.5rem] p-1.5">
              <iframe
                title={`${BRAND.nameDisplay} location`}
                src={mapSrc}
                width="100%"
                height="100%"
                className="min-h-[220px] w-full rounded-[1.2rem] grayscale-[35%]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionDrop>
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
    <SpotlightCard color={`${color}26`} className="glass group rounded-[1.5rem] transition-transform duration-300 hover:-translate-y-0.5">
      <a href={href} className="relative z-10 flex items-center gap-3 p-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}1F`, color }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-tracked text-ink/55">{label}</span>
          <span className="block truncate text-sm font-medium text-ink">{value}</span>
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
    'mt-1.5 block w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-base text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-ink/40 transition-all duration-200 hover:border-ink/20 focus:border-cyan focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan/15';
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-tracked text-ink/60">
        {label}
        {required && <span className="text-magenta-700"> *</span>}
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
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/55">
          {hint}
        </p>
      )}
    </div>
  );
}
