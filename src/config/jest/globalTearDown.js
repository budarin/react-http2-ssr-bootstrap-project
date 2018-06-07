// @flow

module.exports = async (): Promise<*> => {
    await global.browser.close();
};
