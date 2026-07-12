'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { SectionDrop } from './SectionDrop';

/**
 * Section 8 — Contact
 * Quote form + WhatsApp button + email + phone + Google Map.
 */
export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
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
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`;

  return (
    <SectionDrop bgKey="contact" bg="#FFFFFF" bgFrom="#F0F0F0" tone="dark">
      <Container className="py-24 md:py-32" id="contact">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-3">Get in touch</p>
          <h2 className="font-display text-display-lg uppercase tracking-tightest text-ink text-balance">
            Let&apos;s get <span className="text-magenta">started.</span>
          </h2>
          <p className="mt-4 text-lg text-quiet">
            Tell us what you need and we&apos;ll send a quick, itemised quote. We reply within a few hours.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl bg-paper-grey p-10 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan">
                  <ArrowRight className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-ink">Thanks — we&apos;ve got it!</h3>
                <p className="mt-3 max-w-md text-quiet">
                  A member of the {BRAND.nameDisplay} team will get back to you shortly. For anything urgent, tap the
                  WhatsApp button.
                </p>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1EBE57]">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  WhatsApp us now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-paper-grey p-6 md:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" />
                  <Field label="Company" name="company" />
                </div>
                <Field label="Tell us what you need" name="message" as="textarea" rows={4} required />
                <button type="submit" disabled={submitting} className="btn-pill-dark group w-full sm:w-auto">
                  {submitting ? 'Sending…' : 'Get a quote'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — contact details + WhatsApp + map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-sm font-semibold">Chat on WhatsApp</span>
                <span className="block text-xs opacity-90">{CONTACT.phone} · fastest response</span>
              </span>
            </a>

            {/* Email + phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-2xl border border-edge p-5 transition-colors hover:border-cyan">
                <Mail className="h-5 w-5 text-cyan" strokeWidth={1.75} />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-tracked text-quiet">Email</span>
                  <span className="block truncate text-sm font-medium text-ink">{CONTACT.email}</span>
                </span>
              </a>
              <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-3 rounded-2xl border border-edge p-5 transition-colors hover:border-magenta">
                <Phone className="h-5 w-5 text-magenta" strokeWidth={1.75} />
                <span>
                  <span className="block text-xs uppercase tracking-tracked text-quiet">Phone</span>
                  <span className="block text-sm font-medium text-ink">{CONTACT.phone}</span>
                </span>
              </a>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 rounded-2xl border border-edge p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-yellow" strokeWidth={1.75} />
              <span className="text-sm text-ink/80">
                {CONTACT.address.city}, {CONTACT.address.state}, {CONTACT.address.country}
              </span>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-2xl border border-edge">
              <iframe
                title="Inkelse location"
                src={mapSrc}
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </SectionDrop>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
}

function Field({ label, name, type = 'text', required, as = 'input', rows = 3 }: FieldProps) {
  const base =
    'mt-1 block w-full rounded-lg border border-edge bg-paper px-4 py-3 text-base text-ink placeholder:text-quiet focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 transition-colors duration-200';
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-tracked text-quiet">{label}{required && ' *'}</span>
      {as === 'textarea' ? (
        <textarea name={name} rows={rows} required={required} className={`${base} resize-none`} />
      ) : (
        <input type={type} name={name} required={required} className={base} />
      )}
    </label>
  );
}
