/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const width = 1024;
const height = 768;
const launchProps =
    process.env.SHOW_BROWSER === 'true'
        ? {
              headless: false,
              slowMo: 80,
              args: [`--window-size=${width},${height}`],
          }
        : {};

module.exports = async function() {
    const browser = await puppeteer.launch(launchProps);

    global.browser = browser;
    fs.writeFileSync(path.resolve('.tmp/jest/wsEndpoint'), browser.wsEndpoint());
};
