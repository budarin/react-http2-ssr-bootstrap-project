const browserList = require('../browserList');

module.exports = {
    babelrc: false,
    cacheDirectory: '.tmp/client',
    presets: [
        [
            'env',
            {
                loose: true,
                debug: true,
                modules: false,
                useBuiltIns: true,
                targets: {
                    browsers: browserList,
                },
            },
        ],
        'react',
        'flow',
    ],
    plugins: [
        'syntax-dynamic-import',
        'transform-class-properties',
        'syntax-trailing-function-commas',
        [
            'lodash',
            {
                id: ['lodash', 'recompose'],
            },
        ],
        [
            'transform-object-rest-spread',
            {
                useBuiltIns: true,
            },
        ],
    ],
    env: {
        production: {
            plugins: ['external-helpers', 'transform-react-inline-elements', 'transform-react-constant-elements'],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
        development: {
            plugins: ['transform-react-jsx-self', 'transform-react-jsx-source'],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
    },
};
