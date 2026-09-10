import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\olive\\.gemini\\antigravity-ide\\brain\\aa4b5ba4-a7e7-42de-ac59-57e1bdd863b1\\qa_screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'laptop_1280', width: 1280, height: 800 },
  { name: 'tablet_landscape_1024', width: 1024, height: 768 },
  { name: 'tablet_portrait_768', width: 768, height: 1024 },
  { name: 'mobile_390', width: 390, height: 844 },
];

const ROUTES = [
  '/',
  '/work',
  '/work/live-f1-intelligence',
  '/work/f1-lap-time-simulator',
  '/work/racemind-ai',
  '/work/f1-race-manager',
  '/work/ea-fc-intelligence',
  '/work/vyaparpulse',
  '/experience',
  '/about',
  '/contact',
];

async function runQA() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const consoleErrors = [];
  const report = {
    timestamp: new Date().toISOString(),
    viewportsTested: VIEWPORTS.map(v => `${v.name} (${v.width}x${v.height})`),
    routesTested: ROUTES,
    errors: [],
    screenshots: [],
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          console.error(`[CONSOLE ERROR] [${vp.name}] ${msg.text()}`);
          consoleErrors.push({ viewport: vp.name, url: page.url(), text: msg.text() });
        }
      });

      page.on('pageerror', (err) => {
        console.error(`[PAGE ERROR] [${vp.name}] ${err.message}`);
        consoleErrors.push({ viewport: vp.name, url: page.url(), text: err.message });
      });

      // Special homepage test
      console.log(`Navigating to http://localhost:3000 at ${vp.name}`);
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      // Wait for system boot animation to complete (it runs for ~2.4s)
      await page.waitForTimeout(3000);

      // Scroll through page to trigger reveals
      await page.evaluate(async () => {
        const totalHeight = document.body.scrollHeight;
        const step = 600;
        for (let pos = 0; pos < totalHeight; pos += step) {
          window.scrollTo(0, pos);
          await new Promise(r => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));
      });

      const homeScreenshotPath = path.join(OUTPUT_DIR, `home_${vp.name}.png`);
      await page.screenshot({ path: homeScreenshotPath, fullPage: true });
      report.screenshots.push(homeScreenshotPath);
      console.log(`Captured: home_${vp.name}.png`);

      // If mobile, test menu opening
      if (vp.width < 768) {
        const menuButton = await page.$('button[aria-label="Open menu"]');
        if (menuButton && await menuButton.isVisible()) {
          await menuButton.click();
          await page.waitForTimeout(300);
          const menuOpenPath = path.join(OUTPUT_DIR, `home_${vp.name}_menu_open.png`);
          await page.screenshot({ path: menuOpenPath });
          report.screenshots.push(menuOpenPath);
          console.log(`Captured mobile menu open: ${menuOpenPath}`);

          // Close it again
          const closeButton = await page.$('button[aria-label="Close menu"]');
          if (closeButton) {
            await closeButton.click();
            await page.waitForTimeout(200);
          }
        }
      }

      // For desktop (1440x900), test all routes
      if (vp.name === 'desktop_1440' || vp.name === 'mobile_390') {
        for (const route of ROUTES) {
          if (route === '/') continue;
          const routeSlug = route.replace(/\//g, '_').replace(/^_/, '');
          console.log(`Testing route: ${route} at ${vp.name}`);
          await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
          await page.waitForTimeout(1000);
          const routeScreenshotPath = path.join(OUTPUT_DIR, `${routeSlug}_${vp.name}.png`);
          await page.screenshot({ path: routeScreenshotPath, fullPage: true });
          report.screenshots.push(routeScreenshotPath);
          console.log(`Captured: ${routeSlug}_${vp.name}.png`);
        }
      }

      await context.close();
    }

    report.errors = consoleErrors;
    const reportPath = path.join(OUTPUT_DIR, 'qa_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nQA Complete. Summary written to ${reportPath}`);
    console.log(`Total console errors: ${consoleErrors.length}`);
  } finally {
    await browser.close();
  }
}

runQA().catch((err) => {
  console.error('QA script failed:', err);
  process.exit(1);
});
