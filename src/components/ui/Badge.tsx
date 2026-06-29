import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'planning'
  | 'in-progress'
  | 'pending'
  | 'overdue'
  | 'completed'
  | 'suspended'
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-muted text-foreground border-border',
  planning: 'bg-info-subtle text-info-foreground border-info/20',
  'in-progress': 'bg-success-subtle text-success-foreground border-success/20',
  pending: 'bg-warning-subtle text-warning-foreground border-warning/20',
  overdue: 'bg-danger-subtle text-danger-foreground border-danger/20',
  completed: 'bg-muted text-muted-foreground border-border',
  suspended: 'bg-muted text-muted-foreground border-border',
  critical: 'bg-danger text-white border-danger',
  high: 'bg-warning-subtle text-warning-foreground border-warning/20',
  medium: 'bg-info-subtle text-info-foreground border-info/20',
  low: 'bg-muted text-muted-foreground border-border',
  info: 'bg-info-subtle text-info-foreground border-info/20',
  success: 'bg-success-subtle text-success-foreground border-success/20',
  warning: 'bg-warning-subtle text-warning-foreground border-warning/20',
  danger: 'bg-danger-subtle text-danger-foreground border-danger/20',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[0.65rem] px-2 py-0.5',
  md: 'text-body-sm px-2.5 py-1',
};

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusToBadgeVariant(status: string): BadgeVariant {
  switch (status) {
    case 'תכנון':
      return 'planning';
    case 'בביצוע':
      return 'in-progress';
    case 'ממתין לאישור':
      return 'pending';
    case 'באיחור':
      return 'overdue';
    case 'הושלם':
      return 'completed';
    case 'מושהה':
      return 'suspended';
    default:
      return 'default';
  }
}
