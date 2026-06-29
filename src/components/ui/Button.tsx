import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
  | 'outline'
  | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover border border-primary',
  secondary:
    'bg-surface text-foreground hover:bg-surface-sunken border border-border',
  accent: 'bg-accent text-accent-foreground hover:bg-accent-hover border border-accent',
  ghost: 'bg-transparent text-foreground hover:bg-surface-sunken border border-transparent',
  danger: 'bg-danger text-white hover:bg-danger/90 border border-danger',
  outline: 'bg-transparent text-foreground hover:bg-surface-sunken border border-border',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline border-none p-0 h-auto',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-caption px-3 h-8 gap-1.5',
  md: 'text-body-sm px-4 h-10 gap-2',
  lg: 'text-body-md px-6 h-11 gap-2',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius)] font-medium transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
        variant !== 'link' && sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
