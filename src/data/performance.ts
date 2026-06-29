import { mockFetch } from '@/lib/mockApi';

export interface ProgressDatum {
  name: string;
  taskProgress: number;
  manualProgress: number;
}

export const progressData: ProgressDatum[] = [
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

export function getProgressData(): Promise<ProgressDatum[]> {
  return mockFetch(progressData);
}
