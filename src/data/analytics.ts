import { mockFetch } from '@/lib/mockApi';

export type Severity = 'high' | 'medium' | 'low';

export interface ManagerLoad {
  name: string;
  projects: number;
}

export interface Recommendation {
  title: string;
  description: string;
  severity: Severity;
  actionLabel: string;
}

export interface AnalyticsData {
  managerLoad: ManagerLoad[];
  recommendations: Recommendation[];
}

export const MANAGER_LOAD: ManagerLoad[] = [
  { name: 'אלכסיי זאייזדני', projects: 8 },
  { name: 'עידו ברשן', projects: 6 },
  { name: 'אורין לוי', projects: 4 },
  { name: 'יהודה שושני', projects: 3 },
  { name: 'חמי בן רמתי', projects: 2 },
  { name: 'ארז שורצה', projects: 2 },
];

export const RECOMMENDATIONS: Recommendation[] = [
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

export function getAnalytics(): Promise<AnalyticsData> {
  return mockFetch({ managerLoad: MANAGER_LOAD, recommendations: RECOMMENDATIONS });
}
