import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const summaryCards = [
  {
    label: 'תחזית איחור',
    value: 0,
    subtext: 'מעל 7 ימי איחור',
    colorScheme: 'success' as const,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    label: 'חריגת תקציב',
    value: 0,
    subtext: 'פרויקטים חורגים',
    colorScheme: 'success' as const,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    label: 'על המסלול',
    value: 27,
    subtext: 'בזמן ובתקציב',
    colorScheme: 'success' as const,
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    label: 'התקדמות ממוצעת',
    value: '4%',
    subtext: '27 פרויקטים פעילים',
    colorScheme: 'info' as const,
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const progressData = [
  { name: 'היפוקסיה', taskProgress: 2, manualProgress: 0 },
  { name: 'קפלון - שיפוץ משרדים', taskProgress: 0, manualProgress: 0 },
  { name: 'סילבן אדמס - צביעת חזית', taskProgress: 3, manualProgress: 0 },
  { name: 'אורנשטיין - שיפוץ מסדרון', taskProgress: 20, manualProgress: 25 },
  { name: 'שרייבר - שיפוץ משרדי הנהלה', taskProgress: 0, manualProgress: 0 },
  { name: 'בית כנסת - החלפת תקרה', taskProgress: 1, manualProgress: 0 },
  { name: 'מעבדת ביוכימיה - שיפוץ', taskProgress: 18, manualProgress: 15 },
  { name: 'ספריה מרכזית - חידוש גג', taskProgress: 5, manualProgress: 5 },
  { name: 'בריכת שחיה - שיקום אריחים', taskProgress: 22, manualProgress: 20 },
  { name: 'אולם ספורט - ריצוף', taskProgress: 10, manualProgress: 8 },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Performance() {
  return (
    <div className="flex flex-col gap-6 p-6" dir="rtl">
      <PageHeader
        title="דשבורד מדדי ביצוע"
        subtitle="קצב התקדמות · ביצוע תקציבי · תחזית סיום לפי שטח"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            subtext={card.subtext}
            colorScheme={card.colorScheme}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>קצב התקדמות לפי פרויקט</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={progressData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={160}
                tick={{ fontSize: 12, textAnchor: 'start', dx: -160 }}
              />
              <Tooltip formatter={(value: number) => [`${value}%`]} />
              <Legend verticalAlign="bottom" height={36} />
              <Bar
                dataKey="taskProgress"
                name="התקדמות ממשימות"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="manualProgress"
                name="התקדמות ידנית שדווחה"
                fill="hsl(var(--foreground-muted))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
