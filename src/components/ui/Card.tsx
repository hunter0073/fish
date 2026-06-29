import React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'interactive' | 'alert' | 'stat';
type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

interface CardProps {
  variant?: CardVariant;
  alertSeverity?: AlertSeverity;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const alertSeverityClasses: Record<AlertSeverity, string> = {
  critical: 'border-r-4 border-danger bg-danger-subtle',
  high: 'border-r-4 border-warning bg-warning-subtle',
  medium: 'border-r-4 border-info bg-info-subtle',
  low: 'border-r-4 border-border bg-surface',
};

export function Card({
  variant = 'default',
  alertSeverity,
  className,
  children,
  onClick,
}: CardProps) {
  const baseClasses =
    'bg-card text-card-foreground rounded-[var(--radius-lg)] border border-border shadow-sm animate-fade-in';

  const variantClasses: Record<CardVariant, string> = {
    default: '',
    interactive:
      'hover:shadow-md hover:border-primary/30 cursor-pointer transition-shadow',
    alert:
      alertSeverity != null
        ? alertSeverityClasses[alertSeverity]
        : '',
    stat: 'border-r-4 border-primary',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between p-4 pb-2', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3 className={cn('text-h3 text-foreground', className)}>{children}</h3>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={cn('p-4 pt-2', className)}>{children}</div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={cn(
        'p-4 pt-0 flex items-center justify-between text-caption text-muted-foreground border-t border-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
