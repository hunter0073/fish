import React from 'react';
import { PageHeader, Card } from '../components/ui';
import { User, Mail, Phone } from 'lucide-react';

interface OrgNodeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  children?: OrgNodeData[];
}

const orgData: OrgNodeData = {
  name: 'אלדר קצביץ',
  role: 'סמנכ"ל הנדסה ותחזוקה',
  email: 'eldark@tauex.tau.ac.il',
  phone: '0524775323',
  children: [
    {
      name: 'אורין לוי',
      role: 'מנהל יחידת תחזוקה',
      email: 'oryanlevy@tauex.tau.ac.il',
      phone: '0543287195',
      children: [
        {
          name: 'עידו ברשן',
          role: 'מנהל תפעול',
          email: '',
          phone: '',
          children: [
            { name: 'יהודה שושני', role: 'מנהל פרויקטים', email: '', phone: '' },
            { name: 'חמי בן רמתי', role: 'מנהל פרויקטים', email: '', phone: '' },
            { name: 'ארז שורצה', role: 'מנהל פרויקטים', email: '', phone: '' },
            { name: 'אלכסיי זאייזדני', role: 'מנהל פרויקטים בכיר', email: '', phone: '' },
          ],
        },
      ],
    },
  ],
};

interface OrgNodeProps {
  node: OrgNodeData;
}

function OrgNode({ node }: OrgNodeProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <Card className="bg-white rounded-xl shadow-sm w-52 p-4 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <User size={20} />
        </div>
        <div className="text-center">
          <p className="text-base font-bold leading-tight">{node.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{node.role}</p>
        </div>
        {(node.email || node.phone) && (
          <div className="flex flex-col gap-1 w-full mt-1">
            {node.email && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Mail size={12} className="shrink-0" />
                <span className="text-[11px] truncate">{node.email}</span>
              </div>
            )}
            {node.phone && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Phone size={12} className="shrink-0" />
                <span className="text-[11px]">{node.phone}</span>
              </div>
            )}
          </div>
        )}
      </Card>

      {hasChildren && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="relative flex items-start justify-center">
            <div
              className="absolute top-0 border-t border-border"
              style={{
                left: node.children!.length > 1 ? '50%' : '50%',
                right: node.children!.length > 1 ? '50%' : '50%',
                transform: 'none',
                width: node.children!.length > 1 ? undefined : '0',
              }}
            />
            {node.children!.length > 1 && (
              <div className="absolute top-0 left-0 right-0 border-t border-border" />
            )}
            <div className="flex gap-4 items-start justify-center">
              {node.children!.map((child, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-border" />
                  <OrgNode node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function OrgChart() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="תרשים ארגוני" subtitle="8 אנשים במערכת" />
      <div className="overflow-x-auto pb-8">
        <div className="flex justify-center min-w-max px-8 pt-4">
          <OrgNode node={orgData} />
        </div>
      </div>
    </div>
  );
}
