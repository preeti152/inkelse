import { cn } from '@/lib/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Background tone. */
  tone?: 'paper' | 'ink' | 'cream' | 'transparent';
  id?: string;
}

export function Section({
  children,
  className,
  size = 'md',
  tone = 'transparent',
  id,
}: SectionProps) {
  const padding = {
    sm: 'py-section-sm',
    md: 'py-section',
    lg: 'py-section-lg',
  }[size];

  const background = {
    paper: 'bg-paper text-ink',
    ink: 'bg-ink text-paper',
    cream: 'bg-paper-200 text-ink',
    transparent: '',
  }[tone];

  return (
    <section id={id} className={cn(padding, background, className)}>
      {children}
    </section>
  );
}
