import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Plus, Phone, Mail, Star, Edit2, HardHat } from 'lucide-react';
import { useQuery } from '@/hooks/useQuery';
import { SkeletonGrid, Modal, Field, TextInput, Select } from '@/components/ui';
import { getContractors, Contractor } from '@/data/contractors';

interface FormState {
  company: string;
  contact: string;
  specialty: string;
  email: string;
  phone: string;
  reliability: string;
  rating: string;
}

const emptyForm: FormState = {
  company: '',
  contact: '',
  specialty: '',
  email: '',
  phone: '',
  reliability: '100',
  rating: '5',
};

export default function Contractors() {
  const { data, loading } = useQuery(getContractors);
  const [items, setItems] = useState<Contractor[]>([]);
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (c: Contractor) => {
    setEditingId(c.id);
    setForm({
      company: c.company,
      contact: c.contact,
      specialty: c.specialty,
      email: c.email,
      phone: c.phone,
      reliability: String(c.reliability),
      rating: String(c.rating),
    });
    setModalOpen(true);
  };

  const setField = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canSave =
    form.company.trim() !== '' &&
    form.contact.trim() !== '' &&
    form.specialty.trim() !== '';

  const handleSave = () => {
    if (!canSave) return;
    const reliability = Number(form.reliability) || 0;
    const rating = Number(form.rating) || 0;
    if (editingId !== null) {
      setItems((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                company: form.company,
                contact: form.contact,
                specialty: form.specialty,
                email: form.email,
                phone: form.phone,
                reliability,
                rating,
              }
            : c
        )
      );
    } else {
      const newId = items.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      const newContractor: Contractor = {
        id: newId,
        company: form.company,
        contact: form.contact,
        specialty: form.specialty,
        email: form.email,
        phone: form.phone,
        reliability,
        rating,
        overdue: 0,
        active: 0,
      };
      setItems((prev) => [...prev, newContractor]);
    }
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div dir="rtl" className="flex flex-col gap-4 p-4 md:p-6">
      <PageHeader
        title="קבלנים"
        count={items.length}
        actions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={openNew}>
            + קבלן חדש
          </Button>
        }
      />

      {loading ? (
        <SkeletonGrid count={4} />
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((c) => (
          <Card key={c.id} variant="interactive">
            <CardContent className="p-4 flex flex-col gap-3">
              {/* Top row: edit button */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <HardHat size={20} />
                  </div>
                  <div>
                    <p className="text-h3 text-foreground">{c.company}</p>
                    <p className="text-body-sm text-muted-foreground">{c.contact}</p>
                  </div>
                </div>
                <button
                  onClick={() => openEdit(c)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Edit2 size={16} />
                </button>
              </div>

              {/* Specialty badge */}
              <div>
                <Badge variant="info">{c.specialty}</Badge>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col gap-0.5">
                  <span className={`text-h3 font-bold ${c.reliability >= 90 ? 'text-success-foreground' : 'text-warning-foreground'}`}>
                    {c.reliability}%
                  </span>
                  <span className="text-caption text-muted-foreground">אמינות</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-h3 font-bold ${c.overdue > 0 ? 'text-danger-foreground' : 'text-foreground'}`}>
                    {c.overdue}
                  </span>
                  <span className="text-caption text-muted-foreground">באיחור</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-h3 font-bold text-foreground">{c.active}</span>
                  <span className="text-caption text-muted-foreground">פעילים</span>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < c.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}
                  />
                ))}
              </div>

              {/* Contact row */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                  <Phone size={14} />
                  <span>{c.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                  <Mail size={14} />
                  <span>{c.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingId !== null ? 'עריכת קבלן' : 'קבלן חדש'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              ביטול
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={!canSave}>
              שמירה
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Field label="חברה">
            <TextInput
              value={form.company}
              onChange={(e) => setField('company', e.target.value)}
            />
          </Field>
          <Field label="איש קשר">
            <TextInput
              value={form.contact}
              onChange={(e) => setField('contact', e.target.value)}
            />
          </Field>
          <Field label="התמחות">
            <TextInput
              value={form.specialty}
              onChange={(e) => setField('specialty', e.target.value)}
            />
          </Field>
          <Field label="אימייל">
            <TextInput
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
            />
          </Field>
          <Field label="טלפון">
            <TextInput
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value)}
            />
          </Field>
          <Field label="אמינות (%)">
            <TextInput
              type="number"
              value={form.reliability}
              onChange={(e) => setField('reliability', e.target.value)}
            />
          </Field>
          <Field label="דירוג (1-5)">
            <Select
              value={form.rating}
              onChange={(e) => setField('rating', e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </Field>
        </div>
      </Modal>
    </div>
  );
}
