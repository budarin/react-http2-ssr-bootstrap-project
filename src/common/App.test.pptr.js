import puppeteer from 'puppeteer';
import env from '../utils/getEnv';

const width = 1024;
const height = 768;
const { PUPPETEER_URL } = env;

const launchProps = {
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
};

jest.setTimeout(10000);

describe('Home Page', () => {
    let page;
    let browser;

    beforeAll(async () => {
        browser = await puppeteer.launch(launchProps);

        const context = await browser.createIncognitoBrowserContext();

        page = await context.newPage();
        await page.goto(`${PUPPETEER_URL}`);
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should load without error', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello World!');
    });
});
