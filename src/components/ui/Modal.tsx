import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** RTL-aware modal dialog built on Radix. */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 animate-fade-in" />
        <Dialog.Content
          dir="rtl"
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
            'rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-lg animate-fade-in',
            'max-h-[90vh] overflow-y-auto',
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Dialog.Title className="text-h2 text-foreground">{title}</Dialog.Title>
              {description && (
                <Dialog.Description className="text-body-sm text-muted-foreground mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="סגור"
              className="p-1.5 rounded-md text-muted-foreground hover:bg-surface-sunken transition-colors"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-4">{children}</div>

          {footer && (
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
