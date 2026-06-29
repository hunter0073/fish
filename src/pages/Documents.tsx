import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, FileText, File, Upload, Filter } from 'lucide-react';

const DOCUMENT_TYPES = ['חוזה', 'תכניות', 'אישורים', 'חשבוניות', 'כללי'];

const PROJECTS = [
  'היפוקסיה',
  'קפלון - שיפוץ משרדים',
  'בית כנסת - החלפת תקרה',
  'מגדל המשרדים',
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <div dir="rtl" className="flex flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="מסמכים"
        actions={
          <Button variant="primary">
            <span className="flex items-center gap-1.5">
              <Plus size={16} />
              + מסמך חדש
            </span>
          </Button>
        }
      />

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="חיפוש מסמכים..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground"
            />
          </div>

          {/* Project Dropdown */}
          <div className="relative">
            <Filter
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="pr-8 pl-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer text-foreground"
            >
              <option value="">כל הפרויקטים</option>
              {PROJECTS.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
          <div className="relative">
            <File
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pr-8 pl-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer text-foreground"
            >
              <option value="">כל הסוגים</option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center mt-16 gap-4 text-center">
        <FileText
          size={64}
          className="text-muted-foreground/40"
        />
        <h2 className="text-h2 text-muted-foreground font-semibold">
          לא נמצאו מסמכים
        </h2>
        <p className="text-body-sm text-muted-foreground/70 max-w-xs">
          העלה את המסמך הראשון כדי להתחיל לנהל את הפרויקט
        </p>
        <div className="flex gap-3 mt-2">
          <Button variant="primary">
            <span className="flex items-center gap-1.5">
              <Plus size={16} />
              + מסמך חדש
            </span>
          </Button>
          <Button variant="secondary">
            <span className="flex items-center gap-1.5">
              <Upload size={16} />
              ייצוא
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
