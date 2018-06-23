const RUN_PUPPETEER_TESTS = process.env.RUN_PUPPETEER_TESTS;
const RUN_ONLY_PUPPETEER_TESTS = process.env.RUN_ONLY_PUPPETEER_TESTS;

const config = {
    rootDir: 'src',
    preset: 'jest-puppeteer',
    cacheDirectory: '../.tmp/jest',
    coverageDirectory: '../.tmp/coverage',
    transform: {
        '^.+\\.(js|ts|jsx|tsx)$': '../config/jest/transformer.js',
    },
    testMatch: [
        '**/__tests__/**/*.js?(x)',
        '**/__tests__/**/*.ts?(x)',
        '**/?(*.)+(spec|test).js?(x)',
        '**/?(*.)+(spec|test).ts?(x)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
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
    notify: false,
    notifyMode: 'failure',
};

// run also puppeteer tests
if (RUN_PUPPETEER_TESTS && RUN_PUPPETEER_TESTS.trim() === 'true') {
    config.testMatch.push('**/?(*.)+(test).pptr.js?(x)');
}

// run only puppeteer tests
if (RUN_ONLY_PUPPETEER_TESTS && RUN_ONLY_PUPPETEER_TESTS.trim() === 'true') {
    config.testMatch = ['**/?(*.)+(test).pptr.js?(x)'];
}

module.exports = config;
