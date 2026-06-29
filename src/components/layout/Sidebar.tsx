import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  BarChart2,
  FolderOpen,
  CheckSquare,
  Calendar,
  UserCog,
  Users,
  HardHat,
  FileText,
  ClipboardList,
  MessageSquare,
  Network,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "neutral" | "danger" | "unread";
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    groupLabel: "ניטור",
    items: [
      { label: "דשבורד", path: "/", icon: LayoutDashboard },
      { label: "KPI Dashboard", path: "/kpi", icon: TrendingUp },
      { label: "מדדי ביצוע", path: "/performance", icon: LineChart },
      { label: "ניתוח והמלצות", path: "/analytics", icon: BarChart2 },
    ],
  },
  {
    groupLabel: "ניהול",
    items: [
      { label: "פרויקטים", path: "/projects", icon: FolderOpen, badge: "27", badgeVariant: "neutral" },
      { label: "משימות ואבני דרך", path: "/tasks", icon: CheckSquare, badge: "4", badgeVariant: "danger" },
      { label: "לוח שנה / גאנט", path: "/calendar", icon: Calendar },
    ],
  },
  {
    groupLabel: "אנשים",
    items: [
      { label: "מנהלי פרויקטים", path: "/project-managers", icon: UserCog },
      { label: "לקוחות ויחידות", path: "/clients", icon: Users },
      { label: "קבלנים", path: "/contractors", icon: HardHat },
    ],
  },
  {
    groupLabel: "כלים",
    items: [
      { label: "מסמכים", path: "/documents", icon: FileText },
      { label: "סדר פעולות", path: "/action-checklist", icon: ClipboardList },
      { label: "צ'אט פנימי", path: "/chat", icon: MessageSquare, badge: "1", badgeVariant: "unread" },
      { label: "תרשים ארגוני", path: "/org-chart", icon: Network },
    ],
  },
];

function Badge({ value, variant }: { value: string; variant?: "neutral" | "danger" | "unread" }) {
  const base = "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium leading-none";
  const variantClass =
    variant === "danger"
      ? "bg-red-500/20 text-red-400"
      : variant === "unread"
      ? "bg-amber-500/20 text-amber-400"
      : "bg-sidebar-hover text-sidebar-muted";

  return <span className={`${base} ${variantClass}`}>{value}</span>;
}

const NFDLogo: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="NFD Logo"
  >
    <polygon
      points="16,2 28,9 28,23 16,30 4,23 4,9"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="2"
    />
    <circle cx="16" cy="16" r="4" fill="#f59e0b" />
    <line x1="16" y1="8" x2="16" y2="12" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="16" y1="20" x2="16" y2="24" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="8" y1="12" x2="11.5" y2="14" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="20.5" y1="18" x2="24" y2="20" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="8" y1="20" x2="11.5" y2="18" stroke="#f59e0b" strokeWidth="1.5" />
    <line x1="20.5" y1="14" x2="24" y2="12" stroke="#f59e0b" strokeWidth="1.5" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={[
          "fixed top-0 right-0 h-screen w-64 z-40",
          "bg-sidebar-bg text-sidebar-fg",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          // Mobile: hidden by default, show when isOpen
          isOpen ? "translate-x-0" : "translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex flex-col gap-1 px-4 pt-5 pb-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NFDLogo />
              <div className="flex flex-col">
                <span className="font-bold text-sidebar-fg text-sm leading-tight">Project Manager</span>
                <span className="text-xs text-sidebar-muted leading-tight mt-0.5">אוניברסיטת תל אביב</span>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-hover transition-colors"
              aria-label="סגור תפריט"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.groupLabel}>
              <p className="px-5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-muted">
                {group.groupLabel}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={[
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg mx-2 text-sm transition-colors",
                          active
                            ? "bg-sidebar-active text-sidebar-fg font-medium border-r-2 border-sidebar-accent"
                            : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg",
                        ].join(" ")}
                      >
                        <Icon size={18} className="shrink-0" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <Badge value={item.badge} variant={item.badgeVariant} />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] text-sidebar-muted text-center">
            Powered by NirFisherDesign
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
