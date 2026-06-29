import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Network, Phone, Mail, Edit2, Briefcase, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface ManagerStats {
  overdue: number;
  active: number;
  budget: number;
  completed: number;
}

interface Manager {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  stats: ManagerStats;
}

const managers: Manager[] = [
  { id: 1, name: 'אורין לוי', role: 'מנהל יחידת תחזוקה', phone: '0543287195', email: 'oryanlevy@tauex.tau.ac.il', stats: { overdue: 0, active: 4, budget: 0, completed: 0 } },
  { id: 2, name: 'אלדר קצביץ', role: 'סמנכ"ל הנדסה ותחזוקה', phone: '0524775323', email: 'eldark@tauex.tau.ac.il', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 3, name: 'אלכסיי זאייזדני', role: 'מנהל פרויקטים בכיר', phone: '', email: '', stats: { overdue: 2, active: 8, budget: 0, completed: 0 } },
  { id: 4, name: 'עידו ברשן', role: 'מנהל תפעול', phone: '', email: '', stats: { overdue: 0, active: 6, budget: 0, completed: 0 } },
  { id: 5, name: 'יהודה שושני', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 3, budget: 0, completed: 0 } },
  { id: 6, name: 'חמי בן רמתי', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 7, name: 'ארז שורצה', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 8, name: 'אלון כהן', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 0, budget: 0, completed: 0 } },
];

export default function ProjectManagers() {
  return (
    <div dir="rtl" className="flex flex-col gap-4 p-4 md:p-6">
      <PageHeader
        title="מנהלי פרויקטים"
        count={8}
        actions={
          <>
            <Button variant="primary" size="md">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {managers.map((manager) => (
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
                <Button variant="ghost" size="sm" className="p-1.5">
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
    </div>
  );
}
