module.exports = {
    rootDir: 'src',
    name: 'unit-tests',
    displayName: 'unit-tests',
    cacheDirectory: '../.tmp/jest/unit-tests',
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
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '../../config/jest/mocks/fileMock.js',
        '\\.(css)$': '../../config/jest/mocks/styleMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jest-environment-jsdom',
    globals: {
        __DEV__: true,
        __PROD__: false,
        __BROWSER__: true,
        __SERVER__: false,
    },
    notify: true,
    notifyMode: 'failure',
};
