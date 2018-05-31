const timeout = 10000;

describe(
    '/ (Home Page)',
    () => {
        let page;
        beforeAll(async () => {
            page = await global.browser.newPage();
            await page.goto('https://localhost');
        }, timeout);

        it('should load without error', async () => {
            const text = await page.evaluate(() => document.body.textContent);
            expect(text).toContain('Hello World');
        });
    },
    timeout,
);
