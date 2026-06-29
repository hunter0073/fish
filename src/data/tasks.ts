import { mockFetch } from '@/lib/mockApi';

export interface Task {
  id: number;
  name: string;
  dueDate: string;
  priority: 'קריטית' | 'גבוהה' | 'בינונית' | 'נמוכה';
  status: 'פתוחה' | 'בביצוע' | 'ממתינה לאישור' | 'הושלמה';
  project: string;
  isMilestone: boolean;
  isOverdue: boolean;
}

export const TASKS: Task[] = [
  {
    id: 1,
    name: 'פתיחת המעבדות לסטודנטים',
    dueDate: '01.10.2025',
    priority: 'גבוהה',
    status: 'פתוחה',
    project: 'היפוקסיה',
    isMilestone: false,
    isOverdue: true,
  },
  {
    id: 2,
    name: 'קבלת אישור רישוי בנייה',
    dueDate: '01.07.2025',
    priority: 'קריטית',
    status: 'ממתינה לאישור',
    project: 'קפלון - שיפוץ משרדים',
    isMilestone: true,
    isOverdue: true,
  },
  {
    id: 3,
    name: 'סיום עבודות איטום גג',
    dueDate: '15.08.2025',
    priority: 'גבוהה',
    status: 'פתוחה',
    project: 'בית כנסת - החלפת תקרה',
    isMilestone: false,
    isOverdue: true,
  },
  {
    id: 4,
    name: 'בדיקת תשתיות חשמל',
    dueDate: '01.09.2025',
    priority: 'בינונית',
    status: 'פתוחה',
    project: 'אורנשטיין - שיפוץ מסדרון',
    isMilestone: false,
    isOverdue: true,
  },
  {
    id: 5,
    name: 'הגשת דו"ח ביניים למממן',
    dueDate: '15.02.2026',
    priority: 'גבוהה',
    status: 'בביצוע',
    project: 'היפוקסיה',
    isMilestone: true,
    isOverdue: false,
  },
  {
    id: 6,
    name: 'בחירת קבלן ביצוע לשלב ב׳',
    dueDate: '01.03.2026',
    priority: 'בינונית',
    status: 'פתוחה',
    project: 'קפלון - שיפוץ משרדים',
    isMilestone: false,
    isOverdue: false,
  },
  {
    id: 7,
    name: 'סיום עבודות צנרת מים',
    dueDate: '20.04.2026',
    priority: 'נמוכה',
    status: 'פתוחה',
    project: 'בית כנסת - החלפת תקרה',
    isMilestone: false,
    isOverdue: false,
  },
  {
    id: 8,
    name: 'אישור תוכניות אדריכליות',
    dueDate: '10.05.2026',
    priority: 'קריטית',
    status: 'ממתינה לאישור',
    project: 'אורנשטיין - שיפוץ מסדרון',
    isMilestone: true,
    isOverdue: false,
  },
];

export function getTasks(): Promise<Task[]> {
  return mockFetch(TASKS);
}
