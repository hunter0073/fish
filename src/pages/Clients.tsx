import React, { useMemo, useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal, Field, TextInput, Select } from '@/components/ui';
import { exportToCsv } from '@/lib/download';
import { Plus, Search, Users, Building2, Download } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  code: string;
  faculty: string;
  campus: string;
  type: string;
  status: string;
}

const TYPE_LABELS: Record<string, string> = {
  faculty: 'פקולטה',
  department: 'מחלקה',
  unit: 'יחידה',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'פעיל',
  inactive: 'לא פעיל',
};

const emptyForm: Omit<Client, 'id'> = {
  name: '',
  code: '',
  faculty: '',
  campus: '',
  type: 'faculty',
  status: 'active',
};

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [clients, setClients] = useState<Client[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Client, 'id'>>(emptyForm);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return clients.filter((c) => {
      const matchesSearch =
        q === '' ||
        [c.name, c.code, c.faculty, c.campus].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchesStatus = statusFilter === '' || c.status === statusFilter;
      const matchesType = typeFilter === '' || c.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [clients, searchQuery, statusFilter, typeFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditingId(client.id);
    const { id, ...rest } = client;
    void id;
    setForm(rest);
    setModalOpen(true);
  };

  const canSave = form.name.trim() !== '' && form.code.trim() !== '';

  const handleSave = () => {
    if (!canSave) return;
    if (editingId) {
      setClients((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)),
      );
    } else {
      setClients((prev) => [
        ...prev,
        { id: `client-${Date.now()}`, ...form },
      ]);
    }
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('למחוק את הלקוח?')) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleExport = () => {
    exportToCsv<Client & Record<string, unknown>>('clients.csv', filtered as (Client & Record<string, unknown>)[], [
      { key: 'name', label: 'שם' },
      { key: 'code', label: 'קוד' },
      { key: 'faculty', label: 'פקולטה' },
      { key: 'campus', label: 'קמפוס' },
      { key: 'type', label: 'סוג' },
      { key: 'status', label: 'סטטוס' },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="לקוחות ויחידות"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleExport} disabled={filtered.length === 0}>
              <Download className="w-4 h-4" />
              ייצוא
            </Button>
            <Button variant="primary" onClick={openCreate}>
              <Plus className="w-4 h-4" />
              + לקוח חדש
            </Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש לפי שם, קוד, פקולטה, קמפוס..."
              className="w-full pr-9 pl-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">כל הסטטוסים</option>
            <option value="active">פעיל</option>
            <option value="inactive">לא פעיל</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">כל הסוגים</option>
            <option value="faculty">פקולטה</option>
            <option value="department">מחלקה</option>
            <option value="unit">יחידה</option>
          </select>
        </div>
      </Card>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <Card key={client.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-body font-medium text-foreground">{client.name}</p>
                    <p className="text-caption text-muted-foreground">{client.code}</p>
                  </div>
                </div>
                <Badge variant={client.status === 'active' ? 'success' : 'default'}>
                  {STATUS_LABELS[client.status] ?? client.status}
                </Badge>
              </div>
              <div className="text-body-sm text-muted-foreground flex flex-col gap-0.5">
                {client.faculty && <span>פקולטה: {client.faculty}</span>}
                {client.campus && <span>קמפוס: {client.campus}</span>}
                <span>סוג: {TYPE_LABELS[client.type] ?? client.type}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button variant="ghost" size="sm" onClick={() => openEdit(client)}>
                  עריכה
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)}>
                  מחיקה
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 gap-4 text-center">
          <Users className="w-16 h-16 text-muted-foreground/40" />
          <p className="text-h2 text-muted-foreground">לא נמצאו לקוחות</p>
          <p className="text-body-sm text-muted-foreground/70">
            הוסף לקוח ראשון כדי להתחיל לעקוב אחרי יחידות האוניברסיטה
          </p>
          <Button variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" />
            + לקוח חדש
          </Button>
        </div>
      )}

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? 'עריכת לקוח' : 'לקוח חדש'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              ביטול
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!canSave}>
              שמירה
            </Button>
          </>
        }
      >
        <Field label="שם">
          <TextInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="קוד">
          <TextInput
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        </Field>
        <Field label="פקולטה">
          <TextInput
            value={form.faculty}
            onChange={(e) => setForm({ ...form, faculty: e.target.value })}
          />
        </Field>
        <Field label="קמפוס">
          <TextInput
            value={form.campus}
            onChange={(e) => setForm({ ...form, campus: e.target.value })}
          />
        </Field>
        <Field label="סוג">
          <Select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="faculty">פקולטה</option>
            <option value="department">מחלקה</option>
            <option value="unit">יחידה</option>
          </Select>
        </Field>
        <Field label="סטטוס">
          <Select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">פעיל</option>
            <option value="inactive">לא פעיל</option>
          </Select>
        </Field>
      </Modal>
    </div>
  );
}
