const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PuppeteerEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();
        const wsEndpoint = fs.readFileSync(path.resolve('.tmp/jest/puppeteer-tests/wsEndpoint'), 'utf8');

        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found');
        }

        this.global.browser = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint,
            ignoreHTTPSErrors: true,
        });
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = PuppeteerEnvironment;
