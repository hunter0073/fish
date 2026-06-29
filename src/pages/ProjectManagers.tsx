import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Network, Phone, Mail, Edit2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { SkeletonGrid, Modal, Field, TextInput } from '@/components/ui';
import { useQuery } from '@/hooks/useQuery';
import { getManagers, type Manager } from '@/data/managers';

interface ManagerForm {
  name: string;
  role: string;
  phone: string;
  email: string;
}

const emptyForm: ManagerForm = { name: '', role: '', phone: '', email: '' };

export default function ProjectManagers() {
  const { data, loading } = useQuery(getManagers);
  const [items, setItems] = useState<Manager[]>([]);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ManagerForm>(emptyForm);

  const nextId = useMemo(
    () => (items.length ? Math.max(...items.map((m) => m.id)) + 1 : 1),
    [items]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (manager: Manager) => {
    setEditingId(manager.id);
    setForm({
      name: manager.name,
      role: manager.role,
      phone: manager.phone,
      email: manager.email,
    });
    setModalOpen(true);
  };

  const canSave = form.name.trim() !== '' && form.role.trim() !== '';

  const handleSave = () => {
    if (!canSave) return;
    if (editingId === null) {
      const newManager: Manager = {
        id: nextId,
        name: form.name.trim(),
        role: form.role.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        stats: { overdue: 0, active: 0, budget: 0, completed: 0 },
      };
      setItems((prev) => [...prev, newManager]);
    } else {
      setItems((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? {
                ...m,
                name: form.name.trim(),
                role: form.role.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
              }
            : m
        )
      );
    }
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-4 p-4 md:p-6">
      <PageHeader
        title="מנהלי פרויקטים"
        count={items.length}
        actions={
          <>
            <Button variant="primary" size="md" onClick={openCreate}>
              <Plus className="w-4 h-4" />
              מנהל חדש
            </Button>
            <Link to="/org-chart">
              <Button variant="secondary" size="md">
                <Network className="w-4 h-4" />
                תרשים ארגוני
              </Button>
            </Link>
          </>
        }
      />

      {loading ? (
        <SkeletonGrid count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((manager) => (
            <Card key={manager.id} variant="interactive">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-subtle text-primary text-h2 flex items-center justify-center font-bold shrink-0">
                      {manager.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-h3 font-bold text-foreground">{manager.name}</div>
                      <div className="text-body-sm text-muted-foreground">{manager.role}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1.5" onClick={() => openEdit(manager)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                <hr className="border-border mb-3" />

                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                  <div>
                    <div className="text-caption text-muted-foreground mb-0.5">באיחור</div>
                    <div className={`text-h3 font-bold ${manager.stats.overdue > 0 ? 'text-danger' : 'text-foreground'}`}>
                      {manager.stats.overdue}
                    </div>
                  </div>
                  <div>
                    <div className="text-caption text-muted-foreground mb-0.5">פעילים</div>
                    <div className="text-h3 font-bold text-primary">{manager.stats.active}</div>
                  </div>
                  <div>
                    <div className="text-caption text-muted-foreground mb-0.5">תקציב ₪</div>
                    <div className="text-h3 font-bold text-foreground">{manager.stats.budget}</div>
                  </div>
                  <div>
                    <div className="text-caption text-muted-foreground mb-0.5">הושלמו</div>
                    <div className="text-h3 font-bold text-foreground">{manager.stats.completed}</div>
                  </div>
                </div>

                {(manager.phone || manager.email) && (
                  <div className="flex gap-4 flex-wrap">
                    {manager.phone && (
                      <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{manager.phone}</span>
                      </div>
                    )}
                    {manager.email && (
                      <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground min-w-0">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{manager.email}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId === null ? 'מנהל חדש' : 'עריכת מנהל'}
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              ביטול
            </Button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={!canSave}>
              שמירה
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Field label="שם">
            <TextInput
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Field>
          <Field label="תפקיד">
            <TextInput
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            />
          </Field>
          <Field label="טלפון">
            <TextInput
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </Field>
          <Field label="אימייל">
            <TextInput
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
