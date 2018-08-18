module.exports = {
    babelrc: false,
    cacheDirectory: '.tmp/server',
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: true,
                modules: false,
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
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
    },
};
