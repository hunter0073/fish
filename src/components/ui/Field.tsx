import React from 'react';
import { cn } from '@/lib/utils';

const baseControl =
  'w-full rounded-[var(--radius)] border border-border bg-surface-sunken px-3 py-2 text-body-sm text-foreground placeholder:text-foreground-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors';

interface FieldProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

/** Labeled form-control wrapper. */
export function Field({ label, htmlFor, children, className }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-caption text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input dir="rtl" {...props} className={cn(baseControl, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea dir="rtl" {...props} className={cn(baseControl, 'min-h-24 resize-y', props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select dir="rtl" {...props} className={cn(baseControl, 'cursor-pointer', props.className)} />;
}
