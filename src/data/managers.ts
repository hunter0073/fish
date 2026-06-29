import { mockFetch } from '@/lib/mockApi';

export interface ManagerStats {
  overdue: number;
  active: number;
  budget: number;
  completed: number;
}

export interface Manager {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  stats: ManagerStats;
}

export const managers: Manager[] = [
  { id: 1, name: 'אורין לוי', role: 'מנהל יחידת תחזוקה', phone: '0543287195', email: 'oryanlevy@tauex.tau.ac.il', stats: { overdue: 0, active: 4, budget: 0, completed: 0 } },
  { id: 2, name: 'אלדר קצביץ', role: 'סמנכ"ל הנדסה ותחזוקה', phone: '0524775323', email: 'eldark@tauex.tau.ac.il', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 3, name: 'אלכסיי זאייזדני', role: 'מנהל פרויקטים בכיר', phone: '', email: '', stats: { overdue: 2, active: 8, budget: 0, completed: 0 } },
  { id: 4, name: 'עידו ברשן', role: 'מנהל תפעול', phone: '', email: '', stats: { overdue: 0, active: 6, budget: 0, completed: 0 } },
  { id: 5, name: 'יהודה שושני', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 3, budget: 0, completed: 0 } },
  { id: 6, name: 'חמי בן רמתי', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 7, name: 'ארז שורצה', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 2, budget: 0, completed: 0 } },
  { id: 8, name: 'אלון כהן', role: 'מנהל פרויקטים', phone: '', email: '', stats: { overdue: 0, active: 0, budget: 0, completed: 0 } },
];

export function getManagers(): Promise<Manager[]> {
  return mockFetch(managers);
}
