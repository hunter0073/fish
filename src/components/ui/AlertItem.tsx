import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

type AlertSeverity = 'high' | 'medium' | 'low' | 'critical';

interface AlertItemProps {
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp?: string;
  projectName?: string;
}

const severityConfig: Record<AlertSeverity, { icon: React.ReactNode; classes: string; label: string }> = {
  critical: {
    icon: <AlertCircle className="w-4 h-4" />,
    classes: 'border-r-4 border-danger bg-danger-subtle text-danger-foreground',
    label: 'קריטי',
  },
  high: {
    icon: <AlertTriangle className="w-4 h-4" />,
    classes: 'border-r-4 border-warning bg-warning-subtle text-warning-foreground',
    label: 'גבוה',
  },
  medium: {
    icon: <Info className="w-4 h-4" />,
    classes: 'border-r-4 border-info bg-info-subtle text-info-foreground',
    label: 'בינוני',
  },
  low: {
    icon: <Info className="w-4 h-4" />,
    classes: 'border-r-4 border-border bg-surface text-muted-foreground',
    label: 'נמוך',
  },
};

export function AlertItem({ title, description, severity, timestamp, projectName }: AlertItemProps) {
  const config = severityConfig[severity] ?? severityConfig.medium;
  return (
    <div className={`flex items-start gap-3 rounded-lg p-3 mb-2 ${config.classes}`}>
      <span className="mt-0.5 flex-shrink-0">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{title}</span>
          {projectName && (
            <span className="text-xs opacity-75">{projectName}</span>
          )}
        </div>
        <p className="text-xs opacity-80 mt-0.5">{description}</p>
      </div>
      {timestamp && (
        <span className="text-xs opacity-60 flex-shrink-0 mt-0.5">{timestamp}</span>
      )}
    </div>
  );
}
