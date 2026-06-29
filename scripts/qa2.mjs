import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';

const EXEC = execSync('ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1').toString().trim();
const BASE = 'http://localhost:4173';
const OUT = '/home/user/fish/scripts/qa2-results.txt';
writeFileSync(OUT, '');
const emit = (l) => { console.log(l); appendFileSync(OUT, l + '\n'); };

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
ctx.setDefaultTimeout(5000); ctx.setDefaultNavigationTimeout(10000);
const page = await ctx.newPage();
const jsErrors = []; page.on('pageerror', (e) => jsErrors.push(e.message));
const results = [];
const check = async (n, fn) => { try { await fn(); results.push('PASS'); emit('PASS  ' + n); } catch (e) { results.push('FAIL'); emit('FAIL  ' + n + ' :: ' + String(e.message).split('\n')[0].slice(0, 120)); } };
const go = async (p) => { await page.goto(BASE + p, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(700); };
const modal = (path, name) => async () => { await go(path); await page.getByRole('button', { name }).first().click(); await page.waitForTimeout(300); if (await page.getByRole('dialog').count() === 0) throw new Error('no dialog'); await page.keyboard.press('Escape'); };

await check('Contractors: "+ new" modal', modal('/contractors', /קבלן חדש/));
await check('Managers: "+ new" modal', modal('/project-managers', /מנהל חדש/));
await check('Documents: "+ new" modal', modal('/documents', /מסמך חדש/));
await check('Clients: "+ new" modal', modal('/clients', /לקוח חדש/));
await check('Dashboard: quick action navigates to /tasks', async () => { await go('/'); await page.getByRole('button', { name: /משימה חדשה/ }).first().click(); await page.waitForTimeout(600); if (!page.url().includes('/tasks')) throw new Error('url=' + page.url()); });
await check('Chat: send shows message', async () => { await go('/chat'); const i = page.locator('textarea, input[type="text"]').last(); await i.fill('QA הודעה'); await i.press('Enter').catch(()=>{}); await page.waitForTimeout(250); if (await page.getByText('QA הודעה').count() === 0) { await page.getByRole('button').last().click(); await page.waitForTimeout(300); } if (await page.getByText('QA הודעה').count() === 0) throw new Error('no message'); });
await check('Calendar: expand-all toggles', async () => { await go('/calendar'); await page.getByRole('button', { name: /פרוס|הרחב/ }).first().click(); await page.waitForTimeout(300); });

await ctx.close(); await browser.close();
const fails = results.filter((r) => r === 'FAIL').length;
emit(`\n${results.length - fails}/${results.length} passed. JS errors: ${jsErrors.length}`);
process.exit(fails || jsErrors.length ? 1 : 0);
