const browserList = require('../browserList');

const config = {
    babelrc: false,
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
