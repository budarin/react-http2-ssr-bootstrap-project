import env from '../utils/getEnv';

const { PUPPETEER_URL } = env;

describe('Home Page', () => {
    let page;
    let client;

    beforeAll(async () => {
        page = await global.browser.newPage();
        client = await page.target().createCDPSession();

        // set DisableCache in Network pane in CDT
        await client.send('Network.setCacheDisabled', { cacheDisabled: true });
        await page.goto(`${PUPPETEER_URL}`, { waitUntil: 'networkidle0' });
    });

    afterAll(async () => {
        // Clears browser cache.
        await client.send('Network.clearBrowserCache');
        await page.close();
    });

    it('should load without error', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello World');
    });
});
