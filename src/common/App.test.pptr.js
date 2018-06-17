import env from '../utils/getEnv';

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
    });

    afterAll(async () => {
        await context.close();
    });

    it('should load without error', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello World!');
    });
});
