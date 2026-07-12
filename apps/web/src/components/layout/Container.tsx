import { cn } from '@/lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use the narrower editorial max-width (for long-form text). */
  variant?: 'default' | 'editorial' | 'wide';
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}

export function Container({
  children,
  className,
  variant = 'default',
  as: Component = 'div',
  id,
}: ContainerProps) {
  const maxWidth = {
    default: 'max-w-7xl',
    editorial: 'max-w-editorial',
    wide: 'max-w-[1440px]',
  }[variant];

  return (
    <Component
      id={id}
      className={cn('mx-auto px-6 md:px-8 lg:px-12', maxWidth, className)}
    >
      {children}
    </Component>
  );
}
