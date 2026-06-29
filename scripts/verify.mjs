import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const EXEC = execSync('ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1')
  .toString().trim();

const ROUTES = [
  ['/', 'dashboard'],
  ['/projects', 'projects'],
  ['/tasks', 'tasks'],
  ['/calendar', 'calendar'],
  ['/documents', 'documents'],
  ['/analytics', 'analytics'],
  ['/org-chart', 'org-chart'],
  ['/action-checklist', 'action-checklist'],
  ['/kpi', 'kpi'],
  ['/performance', 'performance'],
  ['/chat', 'chat'],
  ['/project-managers', 'project-managers'],
  ['/clients', 'clients'],
  ['/contractors', 'contractors'],
];

const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = '/home/user/fish/scripts/shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC });
const results = [];

for (const [route, name] of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800); // let mock data resolve
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    const textLen = (await page.locator('body').innerText()).length;
    results.push({ route, errors, textLen });
  } catch (e) {
    results.push({ route, errors: [...errors, 'NAV_FAIL: ' + e.message], textLen: 0 });
  }
  await ctx.close();
}

// Mobile screenshot of dashboard to check bottom nav
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
const mpage = await mctx.newPage();
await mpage.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
await mpage.waitForTimeout(800);
await mpage.screenshot({ path: `${OUT}/mobile-dashboard.png`, fullPage: false });
await mctx.close();

await browser.close();

let bad = 0;
for (const r of results) {
  const status = r.errors.length === 0 && r.textLen > 50 ? 'OK ' : 'FAIL';
  if (status === 'FAIL') bad++;
  console.log(`${status} ${r.route}  (text=${r.textLen}${r.errors.length ? ', errors=' + r.errors.length : ''})`);
  for (const e of r.errors) console.log('     ! ' + e.slice(0, 200));
}
console.log(`\n${results.length - bad}/${results.length} routes clean. Mobile shot saved.`);
process.exit(bad > 0 ? 1 : 0);
