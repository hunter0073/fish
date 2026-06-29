import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary',
  secondary:
    'bg-background text-foreground hover:bg-muted border border-border',
  ghost: 'bg-transparent text-foreground hover:bg-muted border border-transparent',
  danger: 'bg-danger text-white hover:bg-danger/90 border border-danger',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-body-sm px-3 py-1.5 gap-1.5',
  md: 'text-body px-4 py-2 gap-2',
  lg: 'text-body px-5 py-2.5 gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
