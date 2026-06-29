import { mockFetch } from '@/lib/mockApi';

export interface Contractor {
  id: number;
  company: string;
  contact: string;
  specialty: string;
  reliability: number;
  overdue: number;
  active: number;
  email: string;
  phone: string;
  rating: number;
}

export const CONTRACTORS: Contractor[] = [
  { id: 1, company: 'גנרל קונסטרקט', contact: 'ניר אמיר', specialty: 'קבלנות כללית', reliability: 100, overdue: 0, active: 0, email: 'nir@gconstruct.co.il', phone: '08-4445678', rating: 5 },
  { id: 2, company: 'אלבר בניה', contact: 'רוני שלום', specialty: 'עבודות תשתית', reliability: 100, overdue: 0, active: 0, email: 'info@albar.co.il', phone: '03-9876543', rating: 5 },
  { id: 3, company: 'מגדל הנדסה', contact: 'דינה פרץ', specialty: 'הנדסה אזרחית', reliability: 85, overdue: 1, active: 2, email: 'info@migdal-eng.co.il', phone: '03-1234567', rating: 4 },
  { id: 4, company: 'אאורה נדל"ן ובינוי', contact: 'מיכאל אברמוב', specialty: 'בינוי ופיתוח', reliability: 92, overdue: 0, active: 1, email: 'info@aura.co.il', phone: '03-7654321', rating: 4 },
];

export function getContractors(): Promise<Contractor[]> {
  return mockFetch(CONTRACTORS);
}
