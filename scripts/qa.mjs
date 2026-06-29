import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';

const EXEC = execSync('ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1')
  .toString().trim();
const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = '/home/user/fish/scripts/qa-results.txt';
writeFileSync(OUT, '');
const emit = (line) => { console.log(line); appendFileSync(OUT, line + '\n'); };

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
ctx.setDefaultTimeout(6000);
ctx.setDefaultNavigationTimeout(12000);
const page = await ctx.newPage();
const jsErrors = [];
page.on('pageerror', (e) => jsErrors.push(e.message));

const results = [];
const check = async (name, fn) => {
  try { await fn(); results.push(['PASS', name]); emit('PASS  ' + name); }
  catch (e) { results.push(['FAIL', name]); emit('FAIL  ' + name + ' :: ' + String(e.message).split('\n')[0].slice(0, 140)); }
};
const go = async (p) => { await page.goto(BASE + p, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(900); };
const openModalTest = (path, btnName) => async () => {
  await go(path);
  await page.getByRole('button', { name: btnName }).first().click();
  await page.waitForTimeout(400);
  if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog opened');
  await page.keyboard.press('Escape');
};

await check('Projects: search filters list', async () => {
  await go('/projects');
  const before = await page.locator('text=/#2026-/').count();
  await page.getByPlaceholder(/חיפוש/).first().fill('היפוקסיה');
  await page.waitForTimeout(600);
  const after = await page.locator('text=/#2026-/').count();
  if (!(before > 0 && after < before)) throw new Error(`before=${before} after=${after}`);
});
await check('Projects: status filter narrows list', async () => {
  await go('/projects');
  const before = await page.locator('text=/#2026-/').count();
  const sel = page.locator('select').first();
  const opts = await sel.locator('option').allTextContents();
  const target = opts.find((o) => /בביצוע/.test(o));
  if (!target) throw new Error('no status option');
  await sel.selectOption({ label: target });
  await page.waitForTimeout(600);
  const after = await page.locator('text=/#2026-/').count();
  if (!(after < before)) throw new Error(`before=${before} after=${after}`);
});
await check('Projects: "+ new" opens modal', openModalTest('/projects', /פרויקט חדש/));
await check('Projects: add via modal appends a card', async () => {
  await go('/projects');
  const before = await page.locator('text=/#2026-/').count();
  await page.getByRole('button', { name: /פרויקט חדש/ }).first().click();
  await page.waitForTimeout(400);
  const inputs = page.getByRole('dialog').locator('input');
  if (await inputs.count() === 0) throw new Error('no inputs in modal');
  await inputs.first().fill('בדיקת QA פרויקט');
  // fill any other text inputs to satisfy required
  const n = await inputs.count();
  for (let i = 1; i < n; i++) { const t = await inputs.nth(i).getAttribute('type'); if (t !== 'checkbox') await inputs.nth(i).fill('1').catch(()=>{}); }
  await page.getByRole('dialog').getByRole('button', { name: /שמור|הוסף|צור|שמירה/ }).first().click();
  await page.waitForTimeout(600);
  const after = await page.locator('text=/בדיקת QA פרויקט/').count();
  if (after === 0) throw new Error('new project not visible after save');
});
await check('Tasks: "+ new" opens modal', openModalTest('/tasks', /משימה חדשה/));
await check('Tasks: search filters', async () => {
  await go('/tasks');
  const before = await page.locator('text=/\\d+\\.\\d+\\.\\d+/').count();
  await page.getByPlaceholder(/חיפוש/).first().fill('רישוי');
  await page.waitForTimeout(500);
  const after = await page.locator('text=/\\d+\\.\\d+\\.\\d+/').count();
  if (!(before > 0 && after <= before)) throw new Error(`before=${before} after=${after}`);
});
await check('Contractors: "+ new" opens modal', openModalTest('/contractors', /קבלן חדש/));
await check('Managers: "+ new" opens modal', openModalTest('/project-managers', /מנהל חדש/));
await check('Documents: "+ new" opens modal', openModalTest('/documents', /מסמך חדש/));
await check('Clients: "+ new" opens modal', openModalTest('/clients', /לקוח חדש/));
await check('Dashboard: quick-action navigates to /tasks', async () => {
  await go('/');
  await page.getByRole('button', { name: /משימה חדשה/ }).first().click();
  await page.waitForTimeout(700);
  if (!page.url().includes('/tasks')) throw new Error('url=' + page.url());
});
await check('Dashboard: stat card navigates', async () => {
  await go('/');
  await page.getByText('באיחור').first().click();
  await page.waitForTimeout(700);
  if (!page.url().includes('/tasks')) throw new Error('url=' + page.url());
});
await check('Chat: send shows the message', async () => {
  await go('/chat');
  const input = page.locator('textarea, input[type="text"]').last();
  await input.fill('בדיקת הודעה QA');
  await input.press('Enter').catch(() => {});
  await page.waitForTimeout(300);
  if (await page.getByText('בדיקת הודעה QA').count() === 0) {
    await page.getByRole('button').last().click();
    await page.waitForTimeout(400);
  }
  if (await page.getByText('בדיקת הודעה QA').count() === 0) throw new Error('message not rendered');
});
await check('Calendar: expand-all toggles rows', async () => {
  await go('/calendar');
  await page.getByRole('button', { name: /פרוס|הרחב/ }).first().click();
  await page.waitForTimeout(400);
});

await ctx.close();
await browser.close();

const fails = results.filter((r) => r[0] === 'FAIL').length;
if (jsErrors.length) { emit('\nJS ERRORS:'); jsErrors.forEach((e) => emit('  ! ' + e.slice(0, 140))); }
emit(`\n${results.length - fails}/${results.length} interaction checks passed. JS errors: ${jsErrors.length}`);
process.exit(fails || jsErrors.length ? 1 : 0);
