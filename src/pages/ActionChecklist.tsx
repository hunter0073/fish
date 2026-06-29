import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { History, ChevronDown, Check, Circle } from 'lucide-react';

const WORK_TYPES = [
  { emoji: '🔍', label: 'סיור ראשוני' },
  { emoji: '💧', label: 'איטום' },
  { emoji: '🪣', label: 'ריצוף / החלפת ריצוף' },
  { emoji: '🔧', label: 'אינסטלציה / צנרת' },
  { emoji: '⚡', label: 'חשמל ותאורה' },
  { emoji: '🏗️', label: 'עבודות בניה' },
  { emoji: '🎨', label: 'צביעה ועיצוב' },
  { emoji: '🌿', label: 'גינון ופיתוח סביבה' },
];

const MOCK_PROJECTS = [
  'ללא קישור לפרויקט',
  'היפוקסיה',
  'קפלון - שיפוץ משרדים קומה 3',
  'אורנשטיין - שיפוץ מסדרון',
  'סילבן אדמס - צביעת חזית',
];

type ChecklistItem = { id: number; text: string };

const CHECKLIST_MAP: Record<string, ChecklistItem[]> = {
  'סיור ראשוני': [
    { id: 1, text: 'האם בוצע תיעוד צילומי של האתר?' },
    { id: 2, text: 'האם זוהו כל הבעיות הקיימות?' },
    { id: 3, text: 'האם הוזמן מפקח מטעם האוניברסיטה?' },
    { id: 4, text: 'האם נבדקו ההיתרים הנדרשים?' },
    { id: 5, text: 'האם הוכן דוח סיור ראשוני?' },
  ],
  'איטום': [
    { id: 1, text: 'האם זוהה מקור הרטיבות המדויק?' },
    { id: 2, text: 'האם נבחרה שיטת האיטום המתאימה?' },
    { id: 3, text: 'האם הופסקה אספקת המים לאזור העבודה?' },
    { id: 4, text: 'האם בוצע ניקוי ועיבוד משטח לפני האיטום?' },
    { id: 5, text: 'האם בוצעה בדיקת איטום לאחר הטיפול?' },
    { id: 6, text: 'האם תועדה העבודה שבוצעה?' },
  ],
  'ריצוף / החלפת ריצוף': [
    { id: 1, text: 'האם הוסר הריצוף הישן במלואו?' },
    { id: 2, text: 'האם הוכנה תשתית הרצפה כראוי?' },
    { id: 3, text: 'האם נבחר ואושר סוג הריצוף החדש?' },
    { id: 4, text: 'האם בוצעה הנחת הריצוף לפי תוכנית?' },
    { id: 5, text: 'האם בוצע מילוי פגות ועיבוד פינות?' },
  ],
  'אינסטלציה / צנרת': [
    { id: 1, text: 'האם הופסק מים לפני תחילת העבודה?' },
    { id: 2, text: 'האם זוהו ומופו כל קווי הצנרת הקיימים?' },
    { id: 3, text: 'האם הוחלפו כל הצינורות הפגומים?' },
    { id: 4, text: 'האם נבדקו חיבורים לדליפות?' },
    { id: 5, text: 'האם הוחזרה אספקת המים ונבדקה לחץ?' },
    { id: 6, text: 'האם עבודת האינסטלציה תועדה ואושרה?' },
  ],
  'חשמל ותאורה': [
    { id: 1, text: 'האם הופסקה חשמל לאזור העבודה?' },
    { id: 2, text: 'האם נבדקה תוכנית החשמל הקיימת?' },
    { id: 3, text: 'האם הוחלפו כבלים וציוד פגומים?' },
    { id: 4, text: 'האם הותקנה תאורה חדשה לפי דרישות?' },
    { id: 5, text: 'האם בוצעה בדיקת חשמלאי מוסמך?' },
  ],
  'עבודות בניה': [
    { id: 1, text: 'האם הוכן תוכנית עבודה מפורטת?' },
    { id: 2, text: 'האם אושרו ההיתרים הנדרשים?' },
    { id: 3, text: 'האם הובאו כל חומרי הבנייה הנדרשים?' },
    { id: 4, text: 'האם בוצעה עבודת הבנייה לפי מפרט?' },
    { id: 5, text: 'האם בוצע ביקורת מפקח בנייה?' },
    { id: 6, text: 'האם הוסדרו פסולת ושאריות חומרים?' },
  ],
  'צביעה ועיצוב': [
    { id: 1, text: 'האם אושר צבע ועיצוב עם הלקוח?' },
    { id: 2, text: 'האם בוצעה הכנת משטחים (שיוף, סתימה)?' },
    { id: 3, text: 'האם הוגנו רצפות וריהוט לפני הצביעה?' },
    { id: 4, text: 'האם הוחל צבע בסיס בהתאם לנדרש?' },
    { id: 5, text: 'האם הושלמו שכבות הצביעה הסופיות?' },
  ],
  'גינון ופיתוח סביבה': [
    { id: 1, text: 'האם הוכן תוכנית גינון מאושרת?' },
    { id: 2, text: 'האם בוצע ניקוז וטיפול קרקע?' },
    { id: 3, text: 'האם הותקנה מערכת השקיה?' },
    { id: 4, text: 'האם נשתלו הצמחים לפי התוכנית?' },
    { id: 5, text: 'האם בוצע ריצוף שבילים ואזורי ישיבה?' },
    { id: 6, text: 'האם הוגדרה תוכנית תחזוקה עתידית?' },
  ],
};

export default function ActionChecklist() {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedWorkType, setSelectedWorkType] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const checklistItems: ChecklistItem[] = selectedWorkType
    ? (CHECKLIST_MAP[selectedWorkType] ?? [])
    : [];

  const completedCount = checklistItems.filter((item) =>
    checkedItems.has(item.id),
  ).length;

  function handleWorkTypeSelect(label: string) {
    if (selectedWorkType === label) return;
    setSelectedWorkType(label);
    setCheckedItems(new Set());
  }

  function isItemDisabled(index: number): boolean {
    if (index === 0) return false;
    const prevItem = checklistItems[index - 1];
    return !checkedItems.has(prevItem.id);
  }

  function toggleItem(id: number, index: number) {
    if (isItemDisabled(index)) return;
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Uncheck this and all subsequent items
        checklistItems.forEach((item, i) => {
          if (i >= index) next.delete(item.id);
        });
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const progressPercent =
    checklistItems.length > 0
      ? Math.round((completedCount / checklistItems.length) * 100)
      : 0;

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-background">
      <PageHeader
        title="סדר פעולות"
        actions={
          <Button variant="secondary" className="gap-2">
            <History className="w-4 h-4" />
            היסטוריה
          </Button>
        }
      />

      <main className="flex-1 px-4 md:px-6 py-6 max-w-4xl mx-auto w-full flex flex-col gap-4">
        {/* Subtitle */}
        <Card>
          <div className="p-4">
            <p className="text-body text-muted-foreground">
              ענה על השאלות לפי הסדר כדי לוודא שכל שלב נבדק לפני שממשיכים
            </p>
          </div>
        </Card>

        {/* Step 1 */}
        <Card>
          <CardHeader>
            <CardTitle>שלב 1: בחר פרויקט וסוג עבודה</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Project select */}
            <div className="relative w-full">
              <select
                className="w-full appearance-none bg-background border border-border rounded-[var(--radius)] px-4 py-2 pr-10 text-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="" disabled>
                  בחר פרויקט...
                </option>
                {MOCK_PROJECTS.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Work type grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {WORK_TYPES.map(({ emoji, label }) => {
                const isSelected = selectedWorkType === label;
                return (
                  <button
                    key={label}
                    onClick={() => handleWorkTypeSelect(label)}
                    className={[
                      'inline-flex flex-col items-center justify-center h-24 gap-2 rounded-[var(--radius)] border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted',
                    ].join(' ')}
                  >
                    <span className="text-2xl leading-none">{emoji}</span>
                    <span className="text-body-sm text-center leading-tight px-1">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        {selectedWorkType && (
          <Card>
            <CardHeader>
              <CardTitle>
                שלב 2: רשימת פעולות — {selectedWorkType}
              </CardTitle>
              <Badge variant="default">
                {completedCount}/{checklistItems.length}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {checklistItems.map((item, index) => {
                  const isChecked = checkedItems.has(item.id);
                  const disabled = isItemDisabled(index);
                  return (
                    <div
                      key={item.id}
                      className={[
                        'flex items-center gap-3 p-3 rounded-[var(--radius)] border transition-colors',
                        disabled
                          ? 'opacity-40 cursor-not-allowed border-border bg-muted/30'
                          : 'cursor-pointer border-border hover:bg-muted/50',
                        isChecked ? 'bg-primary/5 border-primary/30' : '',
                      ].join(' ')}
                      onClick={() => !disabled && toggleItem(item.id, index)}
                    >
                      {/* Checkbox */}
                      <div
                        className={[
                          'flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors',
                          isChecked
                            ? 'bg-primary border-primary'
                            : 'bg-background border-border',
                        ].join(' ')}
                      >
                        {isChecked && (
                          <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                        )}
                      </div>
                      {/* Text */}
                      <span
                        className={[
                          'text-body flex-1',
                          isChecked
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground',
                        ].join(' ')}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-body-sm text-muted-foreground">
                    התקדמות
                  </span>
                  <span className="text-body-sm font-medium text-foreground">
                    {completedCount}/{checklistItems.length} הושלמו
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {completedCount === checklistItems.length && checklistItems.length > 0 && (
                  <p className="mt-2 text-body-sm text-primary font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    כל הפעולות הושלמו בהצלחה!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
