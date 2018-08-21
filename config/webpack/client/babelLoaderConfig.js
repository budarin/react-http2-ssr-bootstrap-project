const browserList = require('../../browserList');

module.exports = {
    babelrc: false,
    cacheDirectory: '.tmp/babel/client',
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: true,
                modules: false, // to properly work HMR https://github.com/webpack/webpack-dev-server/issues/100
                targets: {
                    browsers: browserList,
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        ['babel-plugin-lodash', { id: ['lodash', 'recompose'] }],
    ],
    env: {
        production: {
            plugins: [
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
        development: {
            plugins: ['@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source'],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
        test: {
            plugins: ['@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source'],
        },
    },
};
