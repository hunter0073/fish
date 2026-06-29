import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SkeletonGrid } from '@/components/ui';
import { useQuery } from '@/hooks/useQuery';
import { getTasks, type Task } from '@/data/tasks';
import { Plus, Search, Edit2, Flag, Clock, AlertTriangle } from 'lucide-react';

function priorityToBadgeVariant(priority: Task['priority']) {
  switch (priority) {
    case 'קריטית':
      return 'critical' as const;
    case 'גבוהה':
      return 'high' as const;
    case 'בינונית':
      return 'medium' as const;
    case 'נמוכה':
      return 'low' as const;
  }
}

function statusToBadgeVariant(status: Task['status']) {
  switch (status) {
    case 'פתוחה':
      return 'default' as const;
    case 'בביצוע':
      return 'in-progress' as const;
    case 'ממתינה לאישור':
      return 'pending' as const;
    case 'הושלמה':
      return 'completed' as const;
  }
}

function TaskRow({ task }: { task: Task }) {
  return (
    <Card
      variant={task.isOverdue ? 'alert' : 'default'}
      alertSeverity={
        task.isOverdue
          ? task.priority === 'קריטית'
            ? 'critical'
            : task.priority === 'גבוהה'
            ? 'high'
            : task.priority === 'בינונית'
            ? 'medium'
            : 'low'
          : undefined
      }
      className="p-3"
    >
      <div className="flex items-center gap-3" dir="rtl">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-body-sm font-medium text-foreground truncate">
              {task.name}
            </span>
            {task.isMilestone && (
              <Flag className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-caption flex items-center gap-1 ${
                task.isOverdue ? 'text-danger' : 'text-muted-foreground'
              }`}
            >
              <Clock className="w-3 h-3" />
              {task.dueDate}
            </span>
            <Badge variant={priorityToBadgeVariant(task.priority)}>
              {task.priority}
            </Badge>
            <Badge variant={statusToBadgeVariant(task.status)}>
              {task.status}
            </Badge>
          </div>
          <div className="text-caption text-muted-foreground mt-0.5">
            {task.project}
          </div>
        </div>

        {/* Edit button */}
        <Button variant="ghost" size="sm" className="flex-shrink-0 p-1.5">
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  const { data, loading } = useQuery(getTasks);
  const items = data ?? [];

  const overdueTasks = items.filter((t) => t.isOverdue);
  const upcomingTasks = items.filter((t) => !t.isOverdue);

  const projects = Array.from(new Set(items.map((t) => t.project)));
  const statuses: Task['status'][] = ['פתוחה', 'בביצוע', 'ממתינה לאישור', 'הושלמה'];

  function filterTasks(tasks: Task[]) {
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === '' ||
        task.name.includes(searchQuery) ||
        task.project.includes(searchQuery);
      const matchesStatus =
        statusFilter === '' || task.status === statusFilter;
      const matchesProject =
        projectFilter === '' || task.project === projectFilter;
      return matchesSearch && matchesStatus && matchesProject;
    });
  }

  const filteredOverdue = filterTasks(overdueTasks);
  const filteredUpcoming = filterTasks(upcomingTasks);

  return (
    <div dir="rtl">
      <PageHeader
        title="משימות ואבני דרך"
        count={items.length}
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            + משימה חדשה
          </Button>
        }
      />

      {loading ? (
        <div className="p-4 md:p-6">
          <SkeletonGrid count={4} />
        </div>
      ) : (
      <div className="p-4 md:p-6 space-y-6">
        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="חיפוש משימה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 text-body-sm bg-background border border-border rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-background border border-border rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="">כל הסטטוסים</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 py-2 text-body-sm bg-background border border-border rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            >
              <option value="">כל הפרויקטים</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Overdue group */}
        {filteredOverdue.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-danger" />
              <h2 className="text-body-sm font-semibold text-danger">
                ⚠️ באיחור ({filteredOverdue.length})
              </h2>
            </div>
            <div className="space-y-2">
              {filteredOverdue.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming group */}
        {filteredUpcoming.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-body-sm font-semibold text-foreground">
                קרובות ({filteredUpcoming.length})
              </h2>
            </div>
            <div className="space-y-2">
              {filteredUpcoming.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          </section>
        )}

        {filteredOverdue.length === 0 && filteredUpcoming.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-body-sm">
            לא נמצאו משימות התואמות את החיפוש
          </div>
        )}
      </div>
      )}
    </div>
  );
}
