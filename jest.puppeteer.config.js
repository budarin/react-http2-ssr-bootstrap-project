module.exports = {
    rootDir: 'src',
    name: 'puppeteer-tests',
    displayName: 'puppeteer-tests',
    preset: 'jest-puppeteer',
    cacheDirectory: '../.tmp/jest/puppeteer-tests',
    transform: {
        '^.+\\.(js|ts|jsx|tsx)$': '../config/jest/transformer.js',
    },
    testMatch: ['**/?(*.)+(test).pptr.js?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', '.json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '../../config/jest/mocks/fileMock.js',
        '\\.(css)$': '../../config/jest/mocks/styleMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    globalSetup: '../config/jest/globalSetup.js',
    globalTeardown: '../config/jest/globalTearDown.js',
    testEnvironment: '../config/jest/puppeteer_environment.js',
    globals: {
        __DEV__: true,
        __PROD__: false,
        __BROWSER__: true,
        __SERVER__: false,
    },
    notify: true,
    notifyMode: 'failure',
};
