import env from '../utils/getEnv';

// its imported only for testing purpose when App.js changed
import App from './App';

const { PUPPETEER_URL } = env;

jest.setTimeout(10000);

describe('Home Page', () => {
    let page;
    let context;
    const browser = global.browser;

    beforeAll(async () => {
        context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();

        await page.goto(`${PUPPETEER_URL}`);
        await page.waitForSelector('body.interactive');
    });

    afterAll(async () => {
        await context.close();
    });

    it('should load without error', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello World!');
    });

    it('should display mouse position', async () => {
        await page.mouse.move(100, 100);
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello World!Mouse coordinates:x = 100   y = 100');
    });

    it('should use fake timers', async () => {
        await page.addScriptTag({
            url: 'https://cdn.jsdelivr.net/npm/lolex@2.7.1/src/lolex-src.min.js',
            // path: './node_modules/lolex/src/lolex-src.js',
            type: 'module',
        });

        await page.evaluate(() => {
            const clock = lolex.install();

            setTimeout(() => {
                console.log('Hello, world!');
            }, 500);

            clock.tick(500);
            clock.uninstall();
        });
    });
});
