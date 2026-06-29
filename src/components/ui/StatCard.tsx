import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorScheme = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type Trend = 'up' | 'down' | 'neutral';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: Trend;
  trendValue?: string;
  colorScheme?: ColorScheme;
  className?: string;
  onClick?: () => void;
}

const iconBgClasses: Record<ColorScheme, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success-subtle text-success-foreground',
  warning: 'bg-warning-subtle text-warning-foreground',
  danger: 'bg-danger-subtle text-danger-foreground',
  info: 'bg-info-subtle text-info-foreground',
  neutral: 'bg-muted text-muted-foreground',
};

const trendColorClasses: Record<Trend, string> = {
  up: 'text-success-foreground',
  down: 'text-danger-foreground',
  neutral: 'text-muted-foreground',
};

export function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendValue,
  colorScheme = 'neutral',
  className,
  onClick,
}: StatCardProps) {
  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-[var(--radius-lg)] border shadow-sm p-4 flex flex-col gap-1 bg-card',
        onClick && 'hover:shadow-md cursor-pointer transition-shadow',
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-caption text-muted-foreground">{label}</span>
        {icon && (
          <span
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0',
              iconBgClasses[colorScheme],
            )}
          >
            {icon}
          </span>
        )}
      </div>

      <span className="text-display text-foreground leading-none">{value}</span>

      {subtext && (
        <span className="text-caption text-muted-foreground">{subtext}</span>
      )}

      {trendValue && trend && (
        <div className={cn('flex items-center gap-1 mt-0.5', trendColorClasses[trend])}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span className="text-caption">{trendValue}</span>
        </div>
      )}
    </div>
  );
}
