import { Printer, Gift, PanelsTopLeft, Package, Palette, Tent, type LucideProps } from 'lucide-react';

export const SERVICE_ICONS: Record<string, typeof Printer> = {
  printer: Printer,
  gift: Gift,
  'panels-top-left': PanelsTopLeft,
  package: Package,
  palette: Palette,
  tent: Tent,
};

/** Renders the Lucide icon for a service's `icon` key (SVG — never emoji). */
export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = SERVICE_ICONS[name] ?? Printer;
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}
