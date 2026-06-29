/** Client-side data export helpers — no backend required. */

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export an array of objects to a CSV file and trigger a download.
 * Adds a UTF-8 BOM so Hebrew renders correctly in Excel.
 */
export function exportToCsv<T extends Record<string, unknown>>(
  filename: string,
  rows: T[],
  headers?: { key: keyof T; label: string }[],
) {
  if (rows.length === 0) {
    triggerDownload(new Blob(['﻿'], { type: 'text/csv;charset=utf-8;' }), filename);
    return;
  }

  const cols =
    headers ?? (Object.keys(rows[0]) as (keyof T)[]).map((key) => ({ key, label: String(key) }));

  const escape = (val: unknown) => {
    const s = Array.isArray(val) ? val.join(' | ') : val == null ? '' : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const csv = [
    cols.map((c) => escape(c.label)).join(','),
    ...rows.map((row) => cols.map((c) => escape(row[c.key])).join(',')),
  ].join('\n');

  triggerDownload(
    new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }),
    filename,
  );
}
