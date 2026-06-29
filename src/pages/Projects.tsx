import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge, statusToBadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Plus,
  Download,
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  FolderOpen,
  Calendar,
  User,
  TrendingUp,
} from 'lucide-react';

type ProjectStatus = 'תכנון' | 'בביצוע' | 'ממתין לאישור' | 'הושלם' | 'מושהה';

interface Project {
  id: string;
  name: string;
  number: string;
  status: ProjectStatus;
  manager: string;
  startDate: string;
  endDate: string;
  progress: number;
  type: string[];
  year: number;
}

const ALL_STATUSES: ProjectStatus[] = ['תכנון', 'בביצוע', 'ממתין לאישור', 'הושלם', 'מושהה'];

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'היפוקסיה',
    number: '#2026-001',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/01/2026',
    endDate: '31/12/2026',
    progress: 0,
    type: ['תחזוקה'],
    year: 2026,
  },
  {
    id: '2',
    name: 'קפלון - שיפוץ משרדים קומה 3',
    number: '#2026-002',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/01/2026',
    endDate: '30/06/2026',
    progress: 0,
    type: ['שיפוץ', 'בינונית'],
    year: 2026,
  },
  {
    id: '3',
    name: 'סילבן אדמס - צביעת חזית',
    number: '#2026-003',
    status: 'תכנון',
    manager: 'עידו ברשן',
    startDate: '01/03/2026',
    endDate: '31/08/2026',
    progress: 0,
    type: ['צביעה', 'חזית'],
    year: 2026,
  },
  {
    id: '4',
    name: 'אורנשטיין - שיפוץ מסדרון',
    number: '#2026-004',
    status: 'בביצוע',
    manager: 'אורין לוי',
    startDate: '01/01/2026',
    endDate: '31/03/2026',
    progress: 25,
    type: ['שיפוץ'],
    year: 2026,
  },
  {
    id: '5',
    name: 'שרייבר - שיפוץ משרדי הנהלה',
    number: '#2026-005',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/06/2026',
    endDate: '31/12/2026',
    progress: 0,
    type: ['שיפוץ', 'גדולה'],
    year: 2026,
  },
  {
    id: '6',
    name: 'בית כנסת - החלפת תקרה',
    number: '#2026-006',
    status: 'תכנון',
    manager: 'עידו ברשן',
    startDate: '01/04/2026',
    endDate: '30/09/2026',
    progress: 0,
    type: ['תחזוקה', 'תקרה'],
    year: 2026,
  },
  {
    id: '7',
    name: 'מעבדת ביוכימיה - שיפוץ כללי',
    number: '#2026-007',
    status: 'בביצוע',
    manager: 'אורין לוי',
    startDate: '15/01/2026',
    endDate: '15/06/2026',
    progress: 40,
    type: ['שיפוץ', 'מעבדה'],
    year: 2026,
  },
  {
    id: '8',
    name: 'ספריה מרכזית - חידוש גג',
    number: '#2026-008',
    status: 'ממתין לאישור',
    manager: 'עידו ברשן',
    startDate: '01/05/2026',
    endDate: '31/10/2026',
    progress: 5,
    type: ['גג', 'תחזוקה'],
    year: 2026,
  },
  {
    id: '9',
    name: 'בריכת שחיה - שיקום אריחים',
    number: '#2026-009',
    status: 'בביצוע',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/02/2026',
    endDate: '30/04/2026',
    progress: 60,
    type: ['שיקום', 'בריכה'],
    year: 2026,
  },
  {
    id: '10',
    name: 'אולם ספורט - החלפת ריצוף',
    number: '#2026-010',
    status: 'הושלם',
    manager: 'אורין לוי',
    startDate: '01/01/2026',
    endDate: '28/02/2026',
    progress: 100,
    type: ['ריצוף', 'ספורט'],
    year: 2026,
  },
  {
    id: '11',
    name: 'בניין הנדסה - חיזוק מבני',
    number: '#2026-011',
    status: 'תכנון',
    manager: 'עידו ברשן',
    startDate: '01/07/2026',
    endDate: '31/12/2026',
    progress: 0,
    type: ['חיזוק', 'גדולה'],
    year: 2026,
  },
  {
    id: '12',
    name: 'כיכר הכניסה הראשית - שדרוג',
    number: '#2026-012',
    status: 'ממתין לאישור',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/04/2026',
    endDate: '30/06/2026',
    progress: 10,
    type: ['שדרוג', 'חוץ'],
    year: 2026,
  },
  {
    id: '13',
    name: 'מסלול הליכה - סלילה מחדש',
    number: '#2026-013',
    status: 'בביצוע',
    manager: 'אורין לוי',
    startDate: '01/03/2026',
    endDate: '31/05/2026',
    progress: 70,
    type: ['תשתית', 'חוץ'],
    year: 2026,
  },
  {
    id: '14',
    name: 'דקאנט - שיפוץ חדר ישיבות',
    number: '#2026-014',
    status: 'הושלם',
    manager: 'עידו ברשן',
    startDate: '01/01/2026',
    endDate: '15/02/2026',
    progress: 100,
    type: ['שיפוץ', 'קטנה'],
    year: 2026,
  },
  {
    id: '15',
    name: 'מעונות סטודנטים - צביעה חיצונית',
    number: '#2026-015',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/08/2026',
    endDate: '30/11/2026',
    progress: 0,
    type: ['צביעה', 'חזית'],
    year: 2026,
  },
  {
    id: '16',
    name: 'פקולטה למשפטים - פריסת כבלים',
    number: '#2026-016',
    status: 'בביצוע',
    manager: 'אורין לוי',
    startDate: '01/02/2026',
    endDate: '30/04/2026',
    progress: 85,
    type: ['תשתית', 'חשמל'],
    year: 2026,
  },
  {
    id: '17',
    name: 'אולם הרצאות 200 - אקוסטיקה',
    number: '#2026-017',
    status: 'ממתין לאישור',
    manager: 'עידו ברשן',
    startDate: '01/06/2026',
    endDate: '31/08/2026',
    progress: 0,
    type: ['אקוסטיקה', 'בינונית'],
    year: 2026,
  },
  {
    id: '18',
    name: 'מגדל מנהלה - שיפוץ לובי',
    number: '#2026-018',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/09/2026',
    endDate: '31/12/2026',
    progress: 0,
    type: ['שיפוץ', 'לובי'],
    year: 2026,
  },
  {
    id: '19',
    name: 'חניון צפון - תיקוני אספלט',
    number: '#2026-019',
    status: 'הושלם',
    manager: 'אורין לוי',
    startDate: '10/01/2026',
    endDate: '10/02/2026',
    progress: 100,
    type: ['תשתית', 'חוץ'],
    year: 2026,
  },
  {
    id: '20',
    name: 'מכון מחקר - הקמת חממה',
    number: '#2026-020',
    status: 'בביצוע',
    manager: 'עידו ברשן',
    startDate: '01/03/2026',
    endDate: '30/09/2026',
    progress: 30,
    type: ['הקמה', 'גדולה'],
    year: 2026,
  },
  {
    id: '21',
    name: 'בניין רקטוראט - החלפת חלונות',
    number: '#2026-021',
    status: 'מושהה',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/04/2026',
    endDate: '30/06/2026',
    progress: 15,
    type: ['תחזוקה', 'חלונות'],
    year: 2026,
  },
  {
    id: '22',
    name: 'גן בוטני - שבילי גישה',
    number: '#2026-022',
    status: 'תכנון',
    manager: 'אורין לוי',
    startDate: '01/05/2026',
    endDate: '30/10/2026',
    progress: 0,
    type: ['נוף', 'חוץ'],
    year: 2026,
  },
  {
    id: '23',
    name: 'פקולטה למדעים - מערכת מיזוג',
    number: '#2026-023',
    status: 'בביצוע',
    manager: 'עידו ברשן',
    startDate: '01/02/2026',
    endDate: '31/05/2026',
    progress: 55,
    type: ['מיזוג', 'תשתית'],
    year: 2026,
  },
  {
    id: '24',
    name: 'אמפיתיאטרון - שיפוץ ספסלים',
    number: '#2026-024',
    status: 'ממתין לאישור',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/07/2026',
    endDate: '31/08/2026',
    progress: 0,
    type: ['שיפוץ', 'חוץ'],
    year: 2026,
  },
  {
    id: '25',
    name: 'מעבדת מחשבים - רצפה מוגבהת',
    number: '#2026-025',
    status: 'הושלם',
    manager: 'אורין לוי',
    startDate: '01/01/2026',
    endDate: '20/03/2026',
    progress: 100,
    type: ['ריצוף', 'מעבדה'],
    year: 2026,
  },
  {
    id: '26',
    name: 'מרכז סטודנטים - הרחבת לאונות',
    number: '#2026-026',
    status: 'מושהה',
    manager: 'עידו ברשן',
    startDate: '01/03/2026',
    endDate: '30/09/2026',
    progress: 5,
    type: ['הרחבה', 'גדולה'],
    year: 2026,
  },
  {
    id: '27',
    name: 'שער הכניסה הדרומי - שדרוג תאורה',
    number: '#2026-027',
    status: 'תכנון',
    manager: 'אלכסיי זאייזדני',
    startDate: '01/06/2026',
    endDate: '31/08/2026',
    progress: 0,
    type: ['חשמל', 'חוץ'],
    year: 2026,
  },
];

const ALL_TYPES = Array.from(new Set(PROJECTS.flatMap((p) => p.type))).sort();
const ALL_YEARS = Array.from(new Set(PROJECTS.map((p) => p.year))).sort();

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card variant="interactive" className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Badge variant={statusToBadgeVariant(project.status)}>{project.status}</Badge>
        <span className="text-caption text-muted-foreground font-mono">{project.number}</span>
      </div>

      <h3 className="text-h3 font-bold mt-1 text-foreground">{project.name}</h3>

      <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
        <User className="w-3.5 h-3.5 shrink-0" />
        <span>{project.manager}</span>
      </div>

      <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span>
          {project.startDate} | {project.endDate}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-body-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>התקדמות</span>
          </div>
          <span className="font-medium text-foreground">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} />
      </div>

      {project.type.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {project.type.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border text-[0.6rem] px-2 py-0.5 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

function KanbanColumn({ status, projects }: { status: ProjectStatus; projects: Project[] }) {
  return (
    <div className="flex flex-col gap-3 min-w-[220px]">
      <div className="flex items-center justify-between">
        <Badge variant={statusToBadgeVariant(status)} size="md">
          {status}
        </Badge>
        <span className="text-caption text-muted-foreground">{projects.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
        {projects.length === 0 && (
          <div className="rounded-[var(--radius-lg)] border border-dashed border-border p-4 text-center text-caption text-muted-foreground">
            אין פרויקטים
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearCollapsed, setYearCollapsed] = useState(false);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (yearFilter && p.year !== Number(yearFilter)) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (typeFilter && !p.type.includes(typeFilter)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.number.toLowerCase().includes(q) &&
          !p.manager.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [statusFilter, typeFilter, yearFilter, searchQuery]);

  const byYear = useMemo(() => {
    const map = new Map<number, Project[]>();
    for (const p of filtered) {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    }
    return map;
  }, [filtered]);

  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  const headerActions = (
    <>
      <Button variant="primary" size="sm">
        <Plus className="w-4 h-4" />
        פרויקט חדש
      </Button>
      <Button variant="secondary" size="sm">
        <Download className="w-4 h-4" />
        ייצוא
      </Button>
      <div className="flex items-center border border-border rounded-[var(--radius)] overflow-hidden">
        <button
          onClick={() => setViewMode('list')}
          className={`p-1.5 transition-colors ${
            viewMode === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
          title="תצוגת רשימה"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('kanban')}
          className={`p-1.5 transition-colors ${
            viewMode === 'kanban'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
          title="תצוגת לוח"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </>
  );

  return (
    <div dir="rtl" className="flex flex-col gap-0">
      <PageHeader title="פרויקטים" count={27} actions={headerActions} />

      <div className="p-4 md:p-6 flex flex-col gap-6">
        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="חיפוש פרויקט..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-[var(--radius)] pr-9 pl-3 py-2 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-background border border-border rounded-[var(--radius)] px-3 py-2 pr-8 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="">כל הסטטוסים</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Type filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-background border border-border rounded-[var(--radius)] px-3 py-2 pr-8 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="">כל הסוגים</option>
                {ALL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Year filter */}
            <div className="relative">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="appearance-none bg-background border border-border rounded-[var(--radius)] px-3 py-2 pr-8 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="">כל השנים</option>
                {ALL_YEARS.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {filtered.length !== PROJECTS.length && (
              <span className="text-body-sm text-muted-foreground">
                {filtered.length} מתוך {PROJECTS.length} פרויקטים
              </span>
            )}
          </div>
        </Card>

        {/* Projects grouped by year */}
        {years.map((year) => {
          const yearProjects = byYear.get(year) ?? [];
          return (
            <div key={year} className="flex flex-col gap-4">
              {/* Section header */}
              <button
                onClick={() => setYearCollapsed((c) => !c)}
                className="flex items-center gap-2 text-right group w-full"
              >
                <FolderOpen className="w-5 h-5 text-primary shrink-0" />
                <span className="text-h3 font-bold text-foreground">
                  שנת {year} &mdash; {yearProjects.length} פרויקטים
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ml-auto ${
                    yearCollapsed ? '-rotate-90' : ''
                  }`}
                />
              </button>

              {!yearCollapsed && (
                <>
                  {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {yearProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {ALL_STATUSES.map((status) => (
                        <KanbanColumn
                          key={status}
                          status={status}
                          projects={yearProjects.filter((p) => p.status === status)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <Search className="w-10 h-10 opacity-30" />
            <p className="text-body">לא נמצאו פרויקטים התואמים את החיפוש</p>
          </div>
        )}
      </div>
    </div>
  );
}
