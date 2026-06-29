import { mockFetch } from '@/lib/mockApi';

export interface BudgetDatum {
  name: string;
  budget: number;
}

export const budgetData: BudgetDatum[] = [
  { name: 'היפוקסיה', budget: 0 },
  { name: 'קפלון', budget: 0 },
  { name: 'סילבן אדמס', budget: 0 },
  { name: 'אורנשטיין', budget: 0 },
  { name: 'שרייבר', budget: 0 },
  { name: 'בית כנסת', budget: 0 },
  { name: 'לוי', budget: 0 },
  { name: 'כהן', budget: 0 },
  { name: 'גולדברג', budget: 0 },
  { name: 'פרידמן', budget: 0 },
];

export function getBudgetData(): Promise<BudgetDatum[]> {
  return mockFetch(budgetData);
}
