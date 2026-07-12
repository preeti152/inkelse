'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CONTACT, BRAND, getWhatsAppUrl } from '@inkora/brand';
import { cn } from '@/lib/cn';

const QUICK_REPLIES = [
  {
    label: 'Get a quote',
    message: `Hi ${BRAND.nameDisplay}! I'd like to get a quote for my branding / printing requirement.`,
  },
  {
    label: 'Corporate gifting enquiry',
    message: `Hi ${BRAND.nameDisplay}! I'm interested in corporate gifting. Can you share options?`,
  },
  {
    label: 'Talk about a project',
    message: `Hi ${BRAND.nameDisplay}! I'd like to discuss a project. Here are the details: `,
  },
];

/**
 * Floating WhatsApp chat bubble → wa.me/918920468955 with a predefined message.
 */
export function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-24 right-5 z-50 w-80 max-w-[calc(100vw-2.5rem)]',
            'rounded-2xl border border-edge bg-paper shadow-2xl',
            'animate-fade-in-up overflow-hidden',
          )}
        >
          <div className="flex items-center justify-between border-b border-edge bg-[#25D366] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <WhatsAppIcon className="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">Chat with {BRAND.nameDisplay}</p>
                <p className="text-xs opacity-90">{CONTACT.hours}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat panel"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="p-4">
            <p className="mb-3 text-xs text-quiet">Start a conversation</p>
            <div className="space-y-2">
              {QUICK_REPLIES.map((reply) => (
                <a
                  key={reply.label}
                  href={getWhatsAppUrl(reply.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block rounded-lg border border-edge bg-paper-grey px-4 py-3',
                    'text-sm text-ink hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
                    'transition-colors duration-150 ease-standard',
                  )}
                >
                  {reply.label}
                </a>
              ))}
            </div>
            <div className="mt-4 border-t border-edge pt-4 text-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-quiet hover:text-ink transition-colors"
              >
                Message us directly → {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center',
          'rounded-full bg-[#25D366] text-white shadow-lg',
          'hover:bg-[#1EBE57] hover:scale-105',
          'transition-all duration-200 ease-standard',
          !isOpen && 'animate-pulse-soft',
        )}
      >
        {isOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}
