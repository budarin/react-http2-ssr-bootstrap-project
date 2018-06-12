/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const browserList = require('../browserList');

const config = {
    babelrc: false,
    presets: [
        [
            'env',
            {
                loose: true,
                debug: false,
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
        'transform-react-jsx-self',
        'transform-react-jsx-source',
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
};

module.exports = require('babel-jest').createTransformer(config);
