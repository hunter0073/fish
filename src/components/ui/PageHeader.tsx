import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: string | number;
  actions?: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
}

export function PageHeader({
  title,
  subtitle,
  count,
  actions,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <header
      dir="rtl"
      className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 md:px-6 py-3"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex items-center gap-1 text-caption text-muted-foreground">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>/</span>}
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-h1 text-foreground">{title}</h1>
            {count !== undefined && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
                {count}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-body-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}
