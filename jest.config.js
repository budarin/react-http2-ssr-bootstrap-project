const RUN_PUPPETEER_TESTS = process.env.RUN_PUPPETEER_TESTS;

const config = {
    rootDir: 'src',
    preset: 'jest-puppeteer',
    cacheDirectory: '../.tmp/jest',
    coverageDirectory: '../.tmp/coverage',
    globalSetup: '<rootDir>/config/jest/globalSetup.js',
    globalTeardown: '<rootDir>/config/jest/globalTearDown.js',
    testEnvironment: '<rootDir>/config/jest/puppeteer_environment.js',
    transform: {
        '^.+\\.js$': '<rootDir>/config/jest/transformer.js',
    },
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/mocks/fileMock.js',
        '\\.(css)$': '<rootDir>/config/jest/mocks/styleMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    globals: {
        __DEV__: true,
        __PROD__: false,
        __BROWSER__: true,
        __SERVER__: false,
    },
    notifyMode: 'failure',
};

if (Boolean(RUN_PUPPETEER_TESTS)) {
    config.testMatch.push('**/?(*.)+test.pptr.js?(x)');
    config.testMatch = config.testMatch.reverse();
}

module.exports = config;
