import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TrendingUp, Activity, Clock, CheckCircle, DollarSign, AlertTriangle, Layers, Target } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Skeleton } from '@/components/ui';
import { useQuery } from '@/hooks/useQuery';
import { getBudgetData } from '@/data/kpi';

const kpiCards = [
  { label: 'משימות באיחור', value: 4, icon: Clock, colorScheme: 'warning' as const, subtext: 'מתוך 8 משימות' },
  { label: 'התקדמות ממוצעת', value: '25%', icon: TrendingUp, colorScheme: 'success' as const, subtext: 'כל הפרויקטים' },
  { label: 'פרויקטים באיחור', value: '0', icon: AlertTriangle, colorScheme: 'danger' as const, subtext: '0% מהפעילים' },
  { label: 'פרויקטים פעילים', value: 2, icon: Activity, colorScheme: 'info' as const, subtext: 'מתוך 27' },
  { label: 'השפעת Change Orders', value: '₪0', icon: Layers, colorScheme: 'neutral' as const, subtext: 'סה"כ השפעה' },
  { label: 'חריגה תקציבית', value: '₪0', icon: Target, colorScheme: 'success' as const, subtext: 'בגבולות התקציב' },
  { label: 'הוצאות בפועל', value: '₪0', icon: DollarSign, colorScheme: 'neutral' as const, subtext: 'סה"כ הוצאות' },
  { label: 'תקציב כולל', value: '₪0', icon: DollarSign, colorScheme: 'neutral' as const, subtext: 'כל הפרויקטים' },
];

export default function KPI() {
  const { data, loading } = useQuery(getBudgetData);
  const items = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="KPI Dashboard מתקדם"
        subtitle="מדדי ביצוע מפורטים לכל הפרויקטים"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={<card.icon className="w-5 h-5" />}
            colorScheme={card.colorScheme}
            subtext={card.subtext}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ניצול תקציב לפי פרויקט (%)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[300px]" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={items}
                layout="vertical"
                margin={{ top: 4, right: 32, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} reversed />
                <YAxis type="category" dataKey="name" width={160} orientation="right" />
                <Tooltip formatter={(value: number) => [`${value}%`, 'ניצול תקציב']} />
                <Bar dataKey="budget" fill="hsl(var(--primary))" maxBarSize={20}>
                  <LabelList dataKey="budget" position="left" formatter={(v: number) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
