/**
 * Brand photography (crops of the Inkelse flat-lay in /public/images/brand).
 * Kept in a plain module so both server pages and client components can use it.
 */
export const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  printing: { src: '/images/brand/cards.jpg', alt: 'Matte black Inkelse business cards' },
  'corporate-gifting': { src: '/images/brand/box.jpg', alt: 'Black Inkelse rigid gift box with white foil wordmark' },
  signage: { src: '/images/brand/tote.jpg', alt: 'Black tote with large Inkelse wordmark' },
  packaging: { src: '/images/brand/tag.jpg', alt: 'Stone swing tag with Inkelse monogram on black cord' },
  'graphic-design': { src: '/images/brand/notebook.jpg', alt: 'Stone notebook with Inkelse wordmark and oversized k' },
  'event-branding': { src: '/images/brand/cup.jpg', alt: 'Black Inkelse branded coffee cup' },
};
