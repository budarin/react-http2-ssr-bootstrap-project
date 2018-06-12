/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const width = 1024;
const height = 768;
const launchProps =
    process.env.SHOW_BROWSER && process.env.SHOW_BROWSER.trim() === 'true'
        ? {
              headless: false,
              slowMo: 200,
              args: [`--window-size=${width},${height}`],
          }
        : {};

module.exports = async function() {
    const browser = await puppeteer.launch(launchProps);

    global.browser = browser;
    jest.setTimeout(10000);
    fs.writeFileSync(path.resolve('.tmp/jest/wsEndpoint'), browser.wsEndpoint());
};
