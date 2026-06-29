import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Plus, Phone, Mail, Star, Edit2, HardHat } from 'lucide-react';

interface Contractor {
  id: number;
  company: string;
  contact: string;
  specialty: string;
  reliability: number;
  overdue: number;
  active: number;
  email: string;
  phone: string;
  rating: number;
}

const CONTRACTORS: Contractor[] = [
  { id: 1, company: 'גנרל קונסטרקט', contact: 'ניר אמיר', specialty: 'קבלנות כללית', reliability: 100, overdue: 0, active: 0, email: 'nir@gconstruct.co.il', phone: '08-4445678', rating: 5 },
  { id: 2, company: 'אלבר בניה', contact: 'רוני שלום', specialty: 'עבודות תשתית', reliability: 100, overdue: 0, active: 0, email: 'info@albar.co.il', phone: '03-9876543', rating: 5 },
  { id: 3, company: 'מגדל הנדסה', contact: 'דינה פרץ', specialty: 'הנדסה אזרחית', reliability: 85, overdue: 1, active: 2, email: 'info@migdal-eng.co.il', phone: '03-1234567', rating: 4 },
  { id: 4, company: 'אאורה נדל"ן ובינוי', contact: 'מיכאל אברמוב', specialty: 'בינוי ופיתוח', reliability: 92, overdue: 0, active: 1, email: 'info@aura.co.il', phone: '03-7654321', rating: 4 },
];

export default function Contractors() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONTRACTORS.map((c) => (
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
    </div>
  );
}
