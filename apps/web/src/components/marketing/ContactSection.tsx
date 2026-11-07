'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { CONTACT, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Logo } from '@/components/brand/Logo';
import { Reveal, MaskLines } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact — full-bleed split. Coal panel: headline + direct channels.
 * Sand panel: the quote form with underline fields.
 * `standalone` (on /contact) adds header clearance and uses an <h1>.
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

  const channels = [
    { label: 'WhatsApp', value: CONTACT.phone, href: getWhatsAppUrl(), external: true },
    { label: 'Call', value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}`, external: false },
    { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false },
  ];

  return (
    <section id="contact" aria-label="Contact" className={cn('grid scroll-mt-20 lg:grid-cols-2', standalone && 'pt-20')}>
      {/* ── Coal panel ─────────────────────────────────── */}
      <div className="relative flex flex-col justify-between bg-coal px-6 py-20 text-sand-50 md:px-10 lg:px-14 lg:py-24 xl:pl-20">
        <div>
          <Reveal>
            <p className="label text-sand/55">Get in touch</p>
          </Reveal>
          <MaskLines
            as={standalone ? 'h1' : 'h2'}
            inView={!standalone}
            lines={["Let's build", 'your brand.']}
            className="mt-6 text-[length:clamp(2.75rem,5.4vw,5rem)] font-normal leading-[1.02] tracking-[-0.025em]"
          />
          <Reveal delay={0.15}>
            <span className="rule mt-8 text-sand" />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-sand/70">
              Tell us what you need and we&apos;ll send a clear, itemised quote. We reply within a few hours.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-14">
          <ul className="divide-y divide-sand/15 border-y border-sand/15">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4"
                >
                  <span className="label w-24 shrink-0 text-sand/50">{c.label}</span>
                  <span className="min-w-0 flex-1 truncate text-lg font-light text-sand-50">{c.value}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-sand/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sand-50"
                    strokeWidth={1.25}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-end justify-between gap-6">
            <p className="text-sm leading-relaxed text-sand/55">
              {CONTACT.address.city}, {CONTACT.address.state}
              <br />
              {CONTACT.address.country}
            </p>
            <Logo variant="monogram" className="h-12 w-12 text-sand-50" />
          </div>
        </Reveal>
      </div>

      {/* ── Sand panel: form ───────────────────────────── */}
      <div className="studio-light relative flex flex-col justify-center bg-sand-100 px-6 py-20 md:px-10 lg:px-14 lg:py-24 xl:pr-20">
        <AnimatePresence mode="wait" initial={false}>
          {status === 'success' ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              role="status"
              className="max-w-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-coal">
                <Check className="h-6 w-6 text-coal" strokeWidth={1.5} />
              </span>
              <h3 className="mt-8 text-4xl font-light text-coal">Thank you.</h3>
              <p className="mt-4 text-lg leading-relaxed text-coal/70">
                A member of the {BRAND.nameDisplay} team will be in touch shortly. For anything urgent, message us on
                WhatsApp.
              </p>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">
                WhatsApp us now
              </a>
            </motion.div>
          ) : (
            <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="w-full max-w-xl">
              <p className="label text-mute">Request a quote</p>
              <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                <Field label="Company" name="company" autoComplete="organization" />
                <div className="sm:col-span-2">
                  <Field
                    label="What do you need?"
                    name="message"
                    as="textarea"
                    rows={4}
                    required
                    hint="Quantities, deadline and any reference links help us quote faster."
                  />
                </div>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-6 flex items-start gap-2 border-l-2 border-[#9B1C1C] bg-[#9B1C1C]/[0.06] px-4 py-3 text-sm text-[#7F1D1D]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span>
                    {errorMsg}{' '}
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                      Or message us on WhatsApp.
                    </a>
                  </span>
                </p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-dark group mt-10 w-full sm:w-auto">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Sending…
                  </>
                ) : (
                  <>
                    Send request
                    <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
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
    'mt-2 block w-full border-0 border-b border-coal/25 bg-transparent px-0 py-3 text-lg font-light text-coal placeholder:text-coal/35 transition-colors duration-300 hover:border-coal/50 focus:border-coal focus:outline-none focus:ring-0';
  return (
    <div>
      <label htmlFor={id} className="label text-coal/70">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
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
        <p id={`${id}-hint`} className="mt-2 text-xs text-mute">
          {hint}
        </p>
      )}
    </div>
  );
}
