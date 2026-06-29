import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  Plus,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  FolderOpen,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, statusToBadgeVariant } from '../components/ui/Badge';
import { AlertItem } from '../components/ui/AlertItem';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const overdueTasksCount = 4;
const thisWeekTasksCount = 0;
const activeProjects = 2;
const totalProjects = 27;
const delayedProjects = 0;
const atRiskProjects = 0;

const alerts = [
  {
    title: 'לא עודכן 14+ יום',
    description: 'הפרויקט לא קיבל עדכון מזה למעלה משבועיים',
    severity: 'high' as const,
    timestamp: 'לפני 16 יום',
    projectName: 'היפוקסיה',
  },
  {
    title: 'משימה באיחור',
    description: 'קיימות משימות שעברו את מועד הסיום',
    severity: 'high' as const,
    timestamp: 'לפני 12 יום',
    projectName: 'לוי - שיפוץ מטבח',
  },
  {
    title: 'ממתין לאישור',
    description: 'הפרויקט ממתין לאישור לקוח כבר זמן רב',
    severity: 'medium' as const,
    timestamp: 'לפני 9 יום',
    projectName: 'כהן - חדר רחצה',
  },
  {
    title: 'לא עודכן 14+ יום',
    description: 'הפרויקט לא קיבל עדכון מזה למעלה משבועיים',
    severity: 'medium' as const,
    timestamp: 'לפני 18 יום',
    projectName: 'גולן - מרפסת',
  },
  {
    title: 'חריגה תקציבית',
    description: 'קיימת חריגה מהתקציב המתוכנן',
    severity: 'high' as const,
    timestamp: 'לפני 3 ימים',
    projectName: 'ברק - סלון',
  },
];

const projectStatusData = [
  { name: 'תכנון', value: 20, color: '#0284C7' },
  { name: 'בביצוע', value: 2, color: '#198754' },
  { name: 'ממתין לאישור', value: 5, color: '#E07B00' },
];

const activeProjectsList = [
  {
    name: 'אורנשטיין - שיפוץ מסדרון',
    status: 'בביצוע',
    progress: 25,
    lastUpdate: 'לא עודכן',
  },
  {
    name: 'קפלון - שיפוץ משרדים קומה 3',
    status: 'תכנון',
    progress: 0,
    lastUpdate: 'לא עודכן',
  },
];

const managerLoadData = [
  { name: 'דוד כ.', projects: 12 },
  { name: 'מיכל ל.', projects: 9 },
  { name: 'יוסי א.', projects: 6 },
];

// ─── Dashboard Component ──────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [alertsOpen, setAlertsOpen] = useState(true);
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const criticalAlerts = alerts.filter((a) => a.severity === 'high');
  const visibleAlerts = showAllAlerts ? alerts.slice(0, 5) : alerts.slice(0, 3);

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-background">
      <PageHeader
        title="לוח בקרה"
        subtitle="ניהול פרויקטים ומשימות"
        actions={
          <Button variant="primary" size="sm" onClick={() => navigate('/projects')}>
            <Plus className="w-4 h-4" />
            פרויקט חדש
          </Button>
        }
      />

      <div className="flex-1 p-4 md:p-6">
        <Tabs.Root defaultValue="today" className="flex flex-col gap-6">
          {/* Tab List */}
          <Tabs.List className="flex gap-1 border-b border-border">
            <Tabs.Trigger
              value="today"
              className="px-4 py-2 text-body font-medium text-muted-foreground border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors focus-visible:outline-none"
            >
              היום
            </Tabs.Trigger>
            <Tabs.Trigger
              value="overview"
              className="px-4 py-2 text-body font-medium text-muted-foreground border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors focus-visible:outline-none"
            >
              סקירה
            </Tabs.Trigger>
          </Tabs.List>

          {/* ─── TODAY TAB ─────────────────────────────────────────────────── */}
          <Tabs.Content value="today" className="flex flex-col gap-6 focus-visible:outline-none">

            {/* Alert Panel */}
            <Collapsible.Root open={alertsOpen} onOpenChange={setAlertsOpen}>
              <div className="rounded-[var(--radius-lg)] border border-border bg-card shadow-sm overflow-hidden">
                <Collapsible.Trigger asChild>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors focus-visible:outline-none">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-danger-foreground" />
                      <span className="text-h3 text-foreground">דורש טיפול עכשיו</span>
                      <span className="inline-flex items-center justify-center rounded-full bg-danger text-white text-xs font-bold w-5 h-5">
                        {criticalAlerts.length}
                      </span>
                    </div>
                    {alertsOpen ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <div className="px-4 pb-4">
                    {visibleAlerts.map((alert, idx) => (
                      <AlertItem key={idx} {...alert} />
                    ))}
                    {alerts.length > 3 && !showAllAlerts && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllAlerts(true)}
                        className="mt-1 w-full"
                      >
                        הצג עוד ({alerts.length - 3})
                      </Button>
                    )}
                  </div>
                </Collapsible.Content>
              </div>
            </Collapsible.Root>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="באיחור"
                value={overdueTasksCount}
                subtext="משימות שעברו את הדדליין"
                icon={<Clock className="w-5 h-5" />}
                colorScheme="danger"
                onClick={() => navigate('/tasks')}
              />
              <StatCard
                label="השבוע"
                value={thisWeekTasksCount}
                subtext="משימות לשבוע הנוכחי"
                icon={<Calendar className="w-5 h-5" />}
                colorScheme="info"
                onClick={() => navigate('/tasks')}
              />
              <StatCard
                label="קבלנים"
                value={0}
                subtext="הזמנות פתוחות"
                icon={<Users className="w-5 h-5" />}
                colorScheme="neutral"
                onClick={() => navigate('/contractors')}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 text-foreground">פעולות מהירות</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm" onClick={() => navigate('/tasks')}>
                  <Plus className="w-4 h-4" />
                  משימה חדשה
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/tasks')}>
                  <Clock className="w-4 h-4" />
                  משימות השבוע
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-danger-foreground border-danger/40 hover:bg-danger-subtle"
                  onClick={() => navigate('/tasks')}
                >
                  <Clock className="w-4 h-4" />
                  משימות באיחור
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/documents')}>
                  <FileText className="w-4 h-4" />
                  מסמכים
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/projects')}>
                  <FolderOpen className="w-4 h-4" />
                  פרויקטים
                </Button>
              </div>
            </div>

            {/* Active Projects */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-h2 text-foreground">פרויקטים פעילים</h2>
                <span className="text-body-sm text-muted-foreground">{activeProjects} פרויקטים</span>
              </div>
              <div className="flex flex-col gap-3">
                {activeProjectsList.map((project, idx) => (
                  <Card key={idx} variant="interactive" onClick={() => navigate('/projects')} className="cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-h3 text-foreground">{project.name}</h3>
                        <Badge variant={statusToBadgeVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full bg-surface-sunken rounded-full h-2" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-caption text-muted-foreground">
                            התקדמות {project.progress}%
                          </span>
                          <span className="text-caption text-muted-foreground">
                            {project.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs.Content>

          {/* ─── OVERVIEW TAB ──────────────────────────────────────────────── */}
          <Tabs.Content value="overview" className="flex flex-col gap-6 focus-visible:outline-none">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <StatCard label="פרויקטים פעילים" value={activeProjects} colorScheme="primary" />
              <StatCard label="הושלמו השנה" value={0} colorScheme="success" />
              <StatCard label="בביצוע" value={2} colorScheme="info" />
              <StatCard label="באיחור" value={delayedProjects} colorScheme="danger" />
              <StatCard label="בסיכון" value={atRiskProjects} colorScheme="warning" />
              <StatCard label="תקציב" value="₪0" colorScheme="neutral" />
              <StatCard label="חריגה" value="₪0" colorScheme="danger" />
              <StatCard label={'סה"כ'} value={totalProjects} colorScheme="neutral" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>פרויקטים לפי סטטוס</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [value, name]}
                        contentStyle={{ direction: 'rtl', borderRadius: 8 }}
                      />
                      <Legend
                        formatter={(value) => (
                          <span style={{ fontSize: 13 }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>עומס מנהלי פרויקטים</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={managerLoadData}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                      <Tooltip
                        formatter={(value: number) => [value, 'פרויקטים']}
                        contentStyle={{ direction: 'rtl', borderRadius: 8 }}
                      />
                      <Bar dataKey="projects" fill="#0284C7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Section */}
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 text-foreground">התראות</h2>
              <div>
                {alerts.slice(0, 5).map((alert, idx) => (
                  <AlertItem key={idx} {...alert} severity="medium" />
                ))}
              </div>
              <Button variant="secondary" size="sm" className="self-start" onClick={() => navigate('/projects')}>
                <CheckSquare className="w-4 h-4" />
                טען עוד 22 נוספים
              </Button>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
