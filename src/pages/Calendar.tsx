import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge, statusToBadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Expand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui';
import { useQuery } from '@/hooks/useQuery';
import { getGanttProjects, type Project } from '@/data/gantt';

const MONTHS_HE = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'];

const STATUS_OPTIONS = ['הכל', 'תכנון', 'בביצוע', 'ממתין לאישור', 'באיחור', 'הושלם', 'מושהה'];

function statusToBarColor(status: string): string {
  switch (status) {
    case 'תכנון':
      return 'bg-info/70';
    case 'בביצוע':
      return 'bg-success/70';
    case 'ממתין לאישור':
      return 'bg-warning/70';
    case 'באיחור':
      return 'bg-danger/70';
    case 'הושלם':
      return 'bg-muted-foreground/50';
    case 'מושהה':
      return 'bg-muted-foreground/30';
    default:
      return 'bg-primary/50';
  }
}

function statusToTaskBarColor(status: string): string {
  switch (status) {
    case 'תכנון':
      return 'bg-info/40';
    case 'בביצוע':
      return 'bg-success/40';
    case 'ממתין לאישור':
      return 'bg-warning/40';
    case 'באיחור':
      return 'bg-danger/40';
    default:
      return 'bg-primary/30';
  }
}

interface GanttBarProps {
  startMonth: number;
  endMonth: number;
  colorClass: string;
}

function GanttBar({ startMonth, endMonth, colorClass }: GanttBarProps) {
  const rightPercent = ((12 - endMonth) / 12) * 100;
  const widthPercent = ((endMonth - startMonth + 1) / 12) * 100;

  return (
    <div
      className={cn('absolute inset-y-1 rounded-sm', colorClass)}
      style={{
        right: `${rightPercent}%`,
        width: `${widthPercent}%`,
      }}
    />
  );
}

interface CurrentMonthIndicatorProps {
  month: number; // 1-based
}

function CurrentMonthLine({ month }: CurrentMonthIndicatorProps) {
  // Position at center of current month column
  // Each column = 1/12 of total width
  // right of center of month column:
  const rightPercent = ((12 - month + 0.5) / 12) * 100;

  return (
    <div
      className="absolute inset-y-0 w-0.5 bg-danger/60 z-10 pointer-events-none"
      style={{ right: `${rightPercent}%` }}
    />
  );
}

export default function Calendar() {
  const [year, setYear] = useState(2026);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState('הכל');

  const { data, loading } = useQuery(getGanttProjects);
  const [items, setItems] = useState<Project[]>([]);
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const currentMonth = year === 2026 ? 6 : -1; // only highlight for 2026

  const filteredProjects = useMemo(
    () =>
      statusFilter === 'הכל'
        ? items
        : items.filter((p) => p.status === statusFilter),
    [items, statusFilter],
  );

  function toggleExpand(id: string) {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function expandAll() {
    const allWithTasks = items.filter((p) => p.tasks.length > 0).map((p) => p.id);
    setExpandedProjects(new Set(allWithTasks));
  }

  function collapseAll() {
    setExpandedProjects(new Set());
  }

  const allExpanded =
    items.filter((p) => p.tasks.length > 0).every((p) => expandedProjects.has(p.id));

  return (
    <div className="flex flex-col gap-6 p-6" dir="rtl">
      <PageHeader
        title="גאנט פרויקטים"
        subtitle="27 פרויקטים | 5 משימות | 3 אבני דרך"
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={allExpanded ? collapseAll : expandAll}
              className="flex items-center gap-1"
            >
              <Expand size={14} />
              {allExpanded ? 'כווץ הכל' : 'הרחב הכל'}
            </Button>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-body-sm border border-border rounded-md px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setYear((y) => y - 1)}
                className="px-2 py-1.5 hover:bg-muted transition-colors"
                aria-label="שנה קודמת"
              >
                <ChevronRight size={16} />
              </button>
              <span className="px-3 text-body-sm font-medium select-none">{year}</span>
              <button
                onClick={() => setYear((y) => y + 1)}
                className="px-2 py-1.5 hover:bg-muted transition-colors"
                aria-label="שנה הבאה"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        }
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div style={{ minWidth: '960px' }}>
            {/* Header row */}
            <div className="flex border-b border-border bg-muted/40">
              {/* Project name column header */}
              <div className="w-64 min-w-64 sticky right-0 bg-muted/40 z-20 flex items-center px-4 py-2 border-l border-border">
                <span className="text-caption font-semibold text-muted-foreground">פרויקט</span>
              </div>
              {/* Month columns - RTL: months displayed right to left visually */}
              <div className="flex flex-1">
                {MONTHS_HE.map((month, index) => {
                  const monthNumber = index + 1;
                  const isCurrent = monthNumber === currentMonth;
                  return (
                    <div
                      key={index}
                      className={cn(
                        'w-16 min-w-16 text-center text-caption font-medium py-2 border-r border-border/50',
                        isCurrent
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-muted-foreground',
                      )}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project rows */}
            {loading && (
              <div className="flex flex-col gap-2 p-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
            )}

            {!loading && filteredProjects.map((project, projectIndex) => {
              const isExpanded = expandedProjects.has(project.id);
              const hasTasks = project.tasks.length > 0;

              return (
                <React.Fragment key={project.id}>
                  {/* Project row */}
                  <div
                    className={cn(
                      'flex border-b border-border/60 hover:bg-muted/20 transition-colors',
                      projectIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10',
                    )}
                  >
                    {/* Project name cell */}
                    <div
                      className={cn(
                        'w-64 min-w-64 sticky right-0 z-10 flex items-center gap-2 px-3 py-1.5 border-l border-border',
                        projectIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10',
                      )}
                    >
                      <button
                        onClick={() => hasTasks && toggleExpand(project.id)}
                        className={cn(
                          'flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-muted-foreground',
                          hasTasks
                            ? 'hover:bg-muted hover:text-foreground cursor-pointer'
                            : 'invisible',
                        )}
                        aria-label={isExpanded ? 'כווץ' : 'הרחב'}
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      <span className="text-body-sm font-medium truncate flex-1">{project.name}</span>
                      <Badge variant={statusToBadgeVariant(project.status)} size="sm">
                        {project.status}
                      </Badge>
                    </div>

                    {/* Gantt cells */}
                    <div className="flex flex-1 relative">
                      {MONTHS_HE.map((_, index) => (
                        <div
                          key={index}
                          className="w-16 min-w-16 h-10 relative border-r border-border/50"
                        />
                      ))}
                      {/* Gantt bar overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <GanttBar
                          startMonth={project.startMonth}
                          endMonth={project.endMonth}
                          colorClass={statusToBarColor(project.status)}
                        />
                        {currentMonth > 0 && (
                          <CurrentMonthLine month={currentMonth} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Task sub-rows */}
                  {isExpanded &&
                    project.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className={cn(
                          'flex border-b border-border/40',
                          projectIndex % 2 === 0 ? 'bg-info-subtle/20' : 'bg-info-subtle/10',
                        )}
                      >
                        {/* Task name cell */}
                        <div
                          className={cn(
                            'w-64 min-w-64 sticky right-0 z-10 flex items-center gap-2 px-3 py-1 border-l border-border',
                            projectIndex % 2 === 0 ? 'bg-info-subtle/20' : 'bg-info-subtle/10',
                          )}
                        >
                          <div className="w-5 flex-shrink-0" />
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                          <span className="text-caption text-muted-foreground truncate flex-1">
                            {task.name}
                          </span>
                        </div>

                        {/* Task gantt cells */}
                        <div className="flex flex-1 relative">
                          {MONTHS_HE.map((_, index) => (
                            <div
                              key={index}
                              className="w-16 min-w-16 h-8 relative border-r border-border/30"
                            />
                          ))}
                          <div className="absolute inset-0 pointer-events-none">
                            <GanttBar
                              startMonth={task.startMonth}
                              endMonth={task.endMonth}
                              colorClass={statusToTaskBarColor(project.status)}
                            />
                            {currentMonth > 0 && (
                              <CurrentMonthLine month={currentMonth} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              );
            })}

            {!loading && filteredProjects.length === 0 && (
              <div className="flex items-center justify-center py-16 text-muted-foreground text-body-sm">
                לא נמצאו פרויקטים עבור הסינון שנבחר
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
