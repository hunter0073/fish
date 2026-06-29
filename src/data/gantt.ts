import { mockFetch } from '@/lib/mockApi';

export interface Task {
  name: string;
  startMonth: number;
  endMonth: number;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  startMonth: number;
  endMonth: number;
  tasks: Task[];
}

export const GANTT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'היפוקסיה',
    status: 'תכנון',
    startMonth: 1,
    endMonth: 12,
    tasks: [],
  },
  {
    id: '2',
    name: 'קפלון-שיפוץ',
    status: 'תכנון',
    startMonth: 1,
    endMonth: 6,
    tasks: [],
  },
  {
    id: '3',
    name: 'סילבן אדמס',
    status: 'תכנון',
    startMonth: 3,
    endMonth: 8,
    tasks: [],
  },
  {
    id: '4',
    name: 'אורנשטיין',
    status: 'בביצוע',
    startMonth: 1,
    endMonth: 3,
    tasks: [{ name: 'בדיקת יסודות', startMonth: 1, endMonth: 2 }],
  },
  {
    id: '5',
    name: 'שרייבר',
    status: 'תכנון',
    startMonth: 6,
    endMonth: 12,
    tasks: [],
  },
  {
    id: '6',
    name: 'בית כנסת',
    status: 'תכנון',
    startMonth: 4,
    endMonth: 9,
    tasks: [],
  },
  {
    id: '7',
    name: 'פרויקט לוי',
    status: 'בביצוע',
    startMonth: 2,
    endMonth: 7,
    tasks: [],
  },
  {
    id: '8',
    name: 'מרכז קהילתי',
    status: 'ממתין לאישור',
    startMonth: 5,
    endMonth: 11,
    tasks: [],
  },
  {
    id: '9',
    name: 'גן ילדים צפון',
    status: 'תכנון',
    startMonth: 3,
    endMonth: 10,
    tasks: [],
  },
  {
    id: '10',
    name: 'מגדל עופר',
    status: 'באיחור',
    startMonth: 1,
    endMonth: 8,
    tasks: [],
  },
];

export function getGanttProjects(): Promise<Project[]> {
  return mockFetch(GANTT_PROJECTS);
}
