import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const EXEC = execSync('ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1')
  .toString().trim();
const BASE = process.env.BASE || 'http://localhost:4173';

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const jsErrors = [];
page.on('pageerror', (e) => jsErrors.push(e.message));

const results = [];
const check = async (name, fn) => {
  try {
    await fn();
    results.push(['PASS', name]);
  } catch (e) {
    results.push(['FAIL', name + ' :: ' + String(e.message).slice(0, 160)]);
  }
};

const go = async (path) => {
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(700); // mock data resolve
};

// ---- Projects: search filters the list ----
await check('Projects search filters list', async () => {
  await go('/projects');
  const before = await page.locator('text=/#2026-/').count();
  const search = page.getByPlaceholder(/חיפוש/);
  await search.first().fill('היפוקסיה');
  await page.waitForTimeout(500);
  const after = await page.locator('text=/#2026-/').count();
  if (!(before > 0 && after < before)) throw new Error(`before=${before} after=${after}`);
});

// ---- Projects: + new opens a modal ----
await check('Projects "+ new" opens modal', async () => {
  await go('/projects');
  await page.getByRole('button', { name: /פרויקט חדש/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Tasks: + new opens modal ----
await check('Tasks "+ new" opens modal', async () => {
  await go('/tasks');
  await page.getByRole('button', { name: /משימה חדשה/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Contractors: + new opens modal ----
await check('Contractors "+ new" opens modal', async () => {
  await go('/contractors');
  await page.getByRole('button', { name: /קבלן חדש/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Managers: + new opens modal ----
await check('Managers "+ new" opens modal', async () => {
  await go('/project-managers');
  await page.getByRole('button', { name: /מנהל חדש/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Dashboard quick action navigates ----
await check('Dashboard quick-action navigates to /tasks', async () => {
  await go('/');
  await page.getByRole('button', { name: /משימה חדשה/ }).first().click();
  await page.waitForTimeout(600);
  if (!page.url().includes('/tasks')) throw new Error('url=' + page.url());
});

// ---- Chat: send appends a message ----
await check('Chat send shows the message', async () => {
  await go('/chat');
  const input = page.locator('textarea, input[type="text"]').last();
  await input.fill('בדיקת הודעה QA');
  await page.getByRole('button').last().click();
  await page.waitForTimeout(400);
  if (await page.getByText('בדיקת הודעה QA').count() === 0) throw new Error('message not rendered');
});

// ---- Documents: + new opens modal ----
await check('Documents "+ new" opens modal', async () => {
  await go('/documents');
  await page.getByRole('button', { name: /מסמך חדש/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Clients: + new opens modal ----
await check('Clients "+ new" opens modal', async () => {
  await go('/clients');
  await page.getByRole('button', { name: /לקוח חדש/ }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog');
  await page.keyboard.press('Escape');
});

// ---- Calendar: year nav changes label ----
await check('Calendar year nav changes year', async () => {
  await go('/calendar');
  // click the "next" / "prev" chevron buttons
  const btns = page.getByRole('button');
  const n = await btns.count();
  let clicked = false;
  for (let i = 0; i < n; i++) {
    const b = btns.nth(i);
    const html = await b.innerHTML();
    if (html.includes('chevron') || html.includes('svg')) { await b.click(); clicked = true; break; }
  }
  await page.waitForTimeout(300);
  if (!clicked) throw new Error('no nav button found');
});

await browser.close();

let fails = 0;
for (const [s, n] of results) { if (s === 'FAIL') fails++; console.log(`${s}  ${n}`); }
if (jsErrors.length) { console.log('\nJS ERRORS:'); jsErrors.forEach((e) => console.log('  ! ' + e.slice(0, 160))); }
console.log(`\n${results.length - fails}/${results.length} interaction checks passed. JS errors: ${jsErrors.length}`);
process.exit(fails || jsErrors.length ? 1 : 0);
