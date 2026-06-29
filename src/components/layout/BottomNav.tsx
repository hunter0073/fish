import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Calendar,
  MoreHorizontal,
  X,
  TrendingUp,
  LineChart,
  BarChart2,
  UserCog,
  Users,
  HardHat,
  FileText,
  ClipboardList,
  MessageSquare,
  Network,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

/** 5 primary destinations surfaced as a mobile tab bar. */
const PRIMARY: NavLink[] = [
  { to: '/', label: 'דשבורד', icon: LayoutDashboard },
  { to: '/projects', label: 'פרויקטים', icon: FolderOpen },
  { to: '/tasks', label: 'משימות', icon: CheckSquare },
  { to: '/calendar', label: 'לוח שנה', icon: Calendar },
];

/** Everything else, shown in the "עוד" bottom sheet. */
const MORE: NavLink[] = [
  { to: '/kpi', label: 'KPI', icon: TrendingUp },
  { to: '/performance', label: 'מדדי ביצוע', icon: LineChart },
  { to: '/analytics', label: 'ניתוח והמלצות', icon: BarChart2 },
  { to: '/project-managers', label: 'מנהלי פרויקטים', icon: UserCog },
  { to: '/clients', label: 'לקוחות ויחידות', icon: Users },
  { to: '/contractors', label: 'קבלנים', icon: HardHat },
  { to: '/documents', label: 'מסמכים', icon: FileText },
  { to: '/action-checklist', label: 'סדר פעולות', icon: ClipboardList },
  { to: '/chat', label: 'צ\'אט פנימי', icon: MessageSquare },
  { to: '/org-chart', label: 'תרשים ארגוני', icon: Network },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const moreActive = MORE.some((l) => isActive(l.to));

  return (
    <>
      {/* Bottom sheet with the remaining routes */}
      {moreOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />
          <div
            dir="rtl"
            role="dialog"
            aria-label="ניווט נוסף"
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-[var(--radius-xl)] border-t border-border bg-surface p-4 pb-6 lg:hidden animate-fade-in"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-h3 text-foreground">עוד</h2>
              <button
                onClick={() => setMoreOpen(false)}
                aria-label="סגור"
                className="p-1.5 rounded-md text-muted-foreground hover:bg-surface-sunken"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MORE.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-[var(--radius)] p-3 text-center text-caption transition-colors',
                    isActive(to)
                      ? 'bg-primary-subtle text-primary'
                      : 'text-muted-foreground hover:bg-surface-sunken',
                  )}
                >
                  <Icon size={20} />
                  <span className="leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Fixed bottom tab bar — mobile only */}
      <nav
        dir="rtl"
        aria-label="ניווט ראשי"
        className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-stretch border-t border-border bg-surface lg:hidden"
      >
        {PRIMARY.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-1 text-caption transition-colors',
                active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />
              )}
              <Icon size={20} />
              <span className="leading-none">{label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen((o) => !o)}
          aria-label="עוד"
          aria-expanded={moreOpen}
          className={cn(
            'relative flex flex-1 flex-col items-center justify-center gap-1 text-caption transition-colors',
            moreActive || moreOpen ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {moreActive && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />}
          <MoreHorizontal size={20} />
          <span className="leading-none">עוד</span>
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
