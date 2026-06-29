import { useState, useEffect } from "react";
import { Menu, Search, Bell, Moon, Sun, Upload } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      dir="rtl"
      className="fixed top-0 right-0 left-0 lg:left-64 h-14 z-30 flex items-center justify-between px-4 bg-[hsl(var(--surface))] border-b border-border"
    >
      {/* Left side (RTL: visually left = logical end) */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-md hover:bg-surface-sunken transition-colors"
        aria-label="תפריט"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Right side (RTL: visually right = logical start) */}
      <div className="flex items-center gap-2 mr-auto lg:mr-0">
        {/* Search input */}
        <div className="relative hidden sm:block">
          <input
            dir="rtl"
            type="text"
            placeholder="חיפוש גלובלי..."
            className="bg-surface-sunken border border-border rounded-lg px-3 py-1.5 text-sm pr-9 w-40 lg:w-64 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-border" />

        {/* Bell with notification dot */}
        <button
          type="button"
          className="relative p-2 rounded-md hover:bg-surface-sunken transition-colors"
          aria-label="התראות"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-surface-sunken transition-colors"
          aria-label={isDark ? "מצב בהיר" : "מצב כהה"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Export button — hidden on mobile */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-sunken hover:bg-surface-sunken/80 transition-colors text-sm font-medium"
          aria-label="ייצוא"
        >
          <Upload className="w-4 h-4" />
          <span>ייצוא</span>
        </button>
      </div>
    </header>
  );
}
