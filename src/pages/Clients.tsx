import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Search, Users, Building2 } from 'lucide-react';

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const clients: unknown[] = [];

  const filtered = clients.filter(() => true);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="לקוחות ויחידות"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            + לקוח חדש
          </Button>
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

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 gap-4 text-center">
          <Users className="w-16 h-16 text-muted-foreground/40" />
          <p className="text-h2 text-muted-foreground">לא נמצאו לקוחות</p>
          <p className="text-body-sm text-muted-foreground/70">
            הוסף לקוח ראשון כדי להתחיל לעקוב אחרי יחידות האוניברסיטה
          </p>
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            + לקוח חדש
          </Button>
        </div>
      )}
    </div>
  );
}
