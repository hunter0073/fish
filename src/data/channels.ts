import { mockFetch } from "@/lib/mockApi";

export interface Channel {
  id: string;
  name: string;
  type: "channel" | "project";
  unread?: number;
}

export interface ChannelData {
  general: Channel[];
  projects: Channel[];
}

export const GENERAL_CHANNELS: Channel[] = [
  { id: "general", name: "כללי", type: "channel", unread: 0 },
];

export const PROJECT_CHANNELS: Channel[] = [
  { id: "p1", name: "אורנשטיין - שיפוץ מסדרון", type: "project" },
  { id: "p2", name: "לוי - בניית תוספת", type: "project" },
  { id: "p3", name: "כהן - שיפוץ מטבח", type: "project" },
  { id: "p4", name: "גולדברג - חידוש חדר אמבטיה", type: "project" },
  { id: "p5", name: "פרידמן - בניית גדר", type: "project" },
  { id: "p6", name: "רוזנברג - צביעת דירה", type: "project" },
  { id: "p7", name: "שפירו - התקנת ריצוף", type: "project" },
  { id: "p8", name: "ויס - שיפוץ סלון", type: "project" },
  { id: "p9", name: "מזרחי - בניית מרפסת", type: "project" },
  { id: "p10", name: "אברמוביץ - שיפוץ כללי", type: "project" },
  { id: "p11", name: "שטיין - התקנת חלונות", type: "project" },
  { id: "p12", name: "כץ - שיפוץ חדר שינה", type: "project" },
  { id: "p13", name: "הורוביץ - בניית מחסן", type: "project" },
  { id: "p14", name: "בלום - שיפוץ חדר ילדים", type: "project" },
  { id: "p15", name: "גרינברג - התקנת מזגן", type: "project" },
  { id: "p16", name: "שוורץ - שיפוץ גג", type: "project" },
  { id: "p17", name: "קליין - בניית מדרגות", type: "project" },
  { id: "p18", name: "ברקוביץ - שיפוץ חצר", type: "project" },
  { id: "p19", name: "זילברמן - חידוש פרקט", type: "project" },
  { id: "p20", name: "רוט - התקנת תאורה", type: "project" },
  { id: "p21", name: "אדלר - שיפוץ מרתף", type: "project" },
  { id: "p22", name: "נוימן - בניית גינה", type: "project" },
  { id: "p23", name: "פולק - שיפוץ עליית גג", type: "project" },
  { id: "p24", name: "הרמן - התקנת אינסטלציה", type: "project" },
  { id: "p25", name: "ברנשטיין - שיפוץ חנות", type: "project" },
  { id: "p26", name: "זוסמן - בניית קיר גבס", type: "project" },
  { id: "p27", name: "לנדאו - שיפוץ משרד", type: "project" },
];

export function getChannels(): Promise<ChannelData> {
  return mockFetch({ general: GENERAL_CHANNELS, projects: PROJECT_CHANNELS });
}
