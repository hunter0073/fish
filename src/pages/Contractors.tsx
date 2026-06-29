import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Plus, Phone, Mail, Star, Edit2, HardHat } from 'lucide-react';
import { useQuery } from '@/hooks/useQuery';
import { SkeletonGrid } from '@/components/ui';
import { getContractors } from '@/data/contractors';

export default function Contractors() {
  const { data, loading } = useQuery(getContractors);
  const items = data ?? [];

  return (
    <div dir="rtl" className="flex flex-col gap-4 p-4 md:p-6">
      <PageHeader
        title="קבלנים"
        count={4}
        actions={
          <Button variant="primary" icon={<Plus size={16} />}>
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
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
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
    </div>
  );
}
