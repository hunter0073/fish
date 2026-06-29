import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, RefreshCcw, Users, BarChart2, Lightbulb } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const budgetOverruns = 0;
const notUpdated14Days = 2;
const problematicContractors = 0;
const overloadedManagers = 0;

const managerLoadData = [
  { name: 'אלכסיי זאייזדני', projects: 8 },
  { name: 'עידו ברשן', projects: 6 },
  { name: 'אורין לוי', projects: 4 },
  { name: 'יהודה שושני', projects: 3 },
  { name: 'חמי בן רמתי', projects: 2 },
  { name: 'ארז שורצה', projects: 2 },
];

type Severity = 'high' | 'medium' | 'low';

interface Recommendation {
  title: string;
  description: string;
  severity: Severity;
  actionLabel: string;
}

const recommendations: Recommendation[] = [
  {
    title: 'פרויקטים לא מעודכנים',
    description: '2 פרויקטים לא עודכנו מעל 14 יום',
    severity: 'high',
    actionLabel: 'עדכן עכשיו',
  },
  {
    title: 'בדוק עומס מנהלים',
    description: 'אלכסיי זאייזדני מנהל 8 פרויקטים במקביל',
    severity: 'medium',
    actionLabel: 'צפה',
  },
  {
    title: 'אין חריגות תקציב',
    description: 'כל הפרויקטים בגבולות התקציב',
    severity: 'low',
    actionLabel: '',
  },
];

const severityIcon: Record<Severity, React.ReactNode> = {
  high: <AlertTriangle className="w-4 h-4 text-warning-foreground" />,
  medium: <Lightbulb className="w-4 h-4 text-info-foreground" />,
  low: <RefreshCcw className="w-4 h-4 text-muted-foreground" />,
};

const severityBadgeVariant: Record<Severity, 'high' | 'medium' | 'low'> = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

const severityLabel: Record<Severity, string> = {
  high: 'גבוה',
  medium: 'בינוני',
  low: 'נמוך',
};

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6 p-6" dir="rtl">
      <PageHeader
        title="ניתוח נתונים והמלצות"
        subtitle="3 המלצות פעולה"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="חריגות תקציב"
          value={budgetOverruns}
          icon={<BarChart2 className="w-5 h-5" />}
          colorScheme="success"
        />
        <StatCard
          label="לא מעודכנים 14 יום"
          value={notUpdated14Days}
          icon={<RefreshCcw className="w-5 h-5" />}
          colorScheme="warning"
        />
        <StatCard
          label="קבלנים בעייתיים"
          value={problematicContractors}
          icon={<AlertTriangle className="w-5 h-5" />}
          colorScheme="success"
        />
        <StatCard
          label="מנהלים עמוסים"
          value={overloadedManagers}
          icon={<Users className="w-5 h-5" />}
          colorScheme="success"
        />
      </div>

      {/* Recommendations Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-h2 text-foreground">המלצות פעולה</h2>
        <div className="flex flex-col gap-3">
          {recommendations.map((rec, index) => (
            <Card key={index} variant="alert" alertSeverity={rec.severity}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="mt-0.5 flex-shrink-0">
                      {severityIcon[rec.severity]}
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-body font-medium text-foreground">
                          {rec.title}
                        </span>
                        <Badge variant={severityBadgeVariant[rec.severity]}>
                          {severityLabel[rec.severity]}
                        </Badge>
                      </div>
                      <span className="text-body-sm text-muted-foreground">
                        {rec.description}
                      </span>
                    </div>
                  </div>
                  {rec.actionLabel && (
                    <button className="text-body-sm text-primary hover:underline flex-shrink-0 mt-0.5">
                      {rec.actionLabel}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>עומס מנהלי פרויקטים</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={managerLoadData}
              margin={{ top: 8, right: 8, left: 8, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                angle={-25}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                formatter={(value: number) => [value, 'פרויקטים']}
                contentStyle={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid hsl(var(--border))',
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Bar
                dataKey="projects"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
