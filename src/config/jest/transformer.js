/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const browserList = require('../browserList');

const config = {
    babelrc: false,
    cacheDirectory: '.tmp/client',
    presets: [
        [
            'env',
            {
                loose: true,
                debug: true,
                modules: 'commonjs',
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
        ['transform-object-rest-spread', { useBuiltIns: true }],
        ['lodash', { id: ['lodash', 'recompose'] }],
        'transform-react-jsx-self',
        'transform-react-jsx-source',
    ],
};

module.exports = require('babel-jest').createTransformer(config);
