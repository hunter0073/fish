import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SkeletonGrid, Modal, Field, TextInput, Select } from '@/components/ui';
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

function TaskRow({ task, onEdit }: { task: Task; onEdit: (task: Task) => void }) {
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
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 p-1.5"
          onClick={() => onEdit(task)}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

const PRIORITIES: Task['priority'][] = ['קריטית', 'גבוהה', 'בינונית', 'נמוכה'];
const STATUSES: Task['status'][] = ['פתוחה', 'בביצוע', 'ממתינה לאישור', 'הושלמה'];

interface TaskFormState {
  name: string;
  dueDate: string;
  priority: Task['priority'];
  status: Task['status'];
  project: string;
  isMilestone: boolean;
}

const emptyForm: TaskFormState = {
  name: '',
  dueDate: '',
  priority: 'בינונית',
  status: 'פתוחה',
  project: '',
  isMilestone: false,
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  const { data, loading } = useQuery(getTasks);
  const [items, setItems] = useState<Task[]>([]);
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<TaskFormState>(emptyForm);

  const projects = useMemo(
    () => Array.from(new Set(items.map((t) => t.project))),
    [items]
  );

  const filterTasks = (tasks: Task[]) =>
    tasks.filter((task) => {
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

  const filteredOverdue = useMemo(
    () => filterTasks(items.filter((t) => t.isOverdue)),
    [items, searchQuery, statusFilter, projectFilter]
  );
  const filteredUpcoming = useMemo(
    () => filterTasks(items.filter((t) => !t.isOverdue)),
    [items, searchQuery, statusFilter, projectFilter]
  );

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditingId(task.id);
    setForm({
      name: task.name,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      project: task.project,
      isMilestone: task.isMilestone,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  const canSave = form.name.trim() !== '' && form.dueDate.trim() !== '';

  function handleSave() {
    if (!canSave) return;
    if (editingId !== null) {
      setItems((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: form.name,
                dueDate: form.dueDate,
                priority: form.priority,
                status: form.status,
                project: form.project,
                isMilestone: form.isMilestone,
              }
            : t
        )
      );
    } else {
      const newId =
        items.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      const newTask: Task = {
        id: newId,
        name: form.name,
        dueDate: form.dueDate,
        priority: form.priority,
        status: form.status,
        project: form.project,
        isMilestone: form.isMilestone,
        isOverdue: false,
      };
      setItems((prev) => [...prev, newTask]);
    }
    closeModal();
  }

  return (
    <div dir="rtl">
      <PageHeader
        title="משימות ואבני דרך"
        count={items.length}
        actions={
          <Button variant="primary" onClick={openCreate}>
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
              {STATUSES.map((s) => (
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
                <TaskRow key={task.id} task={task} onEdit={openEdit} />
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
                <TaskRow key={task.id} task={task} onEdit={openEdit} />
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

      <Modal
        open={modalOpen}
        onOpenChange={(o) => (o ? setModalOpen(true) : closeModal())}
        title={editingId !== null ? 'עריכת משימה' : 'משימה חדשה'}
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={closeModal}>
              ביטול
            </Button>
            <Button variant="primary" disabled={!canSave} onClick={handleSave}>
              שמירה
            </Button>
          </div>
        }
      >
        <div className="space-y-3" dir="rtl">
          <Field label="שם המשימה">
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="תאריך יעד">
            <TextInput
              value={form.dueDate}
              placeholder="01.01.2026"
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </Field>
          <Field label="עדיפות">
            <Select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Task['priority'] })
              }
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="סטטוס">
            <Select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as Task['status'] })
              }
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="פרויקט">
            <TextInput
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-body-sm text-foreground">
            <input
              type="checkbox"
              checked={form.isMilestone}
              onChange={(e) =>
                setForm({ ...form, isMilestone: e.target.checked })
              }
            />
            אבן דרך
          </label>
        </div>
      </Modal>
    </div>
  );
}
