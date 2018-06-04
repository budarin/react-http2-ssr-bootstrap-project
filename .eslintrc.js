module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:flowtype/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:jest/recommended',
    ],
    plugins: ['prettier', 'react', 'flowtype', 'import', 'jsx-a11y', 'jest'],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
        jasmine: true,
        serviceworker: true,
        'jest/globals': true,
    },
    settings: {
        'import/ignore': ['node_modules'],
    },
    globals: {
        __DEV__: true,
        __PROD__: true,
        __SERVER__: true,
        __BROWSER__: true,
    },
    rules: {
        'prettier/prettier': 'error',
        'react/sort-comp': [
            1,
            {
                order: [
                    'displayName',
                    'static-methods',
                    'contextTypes',
                    'childContextTypes',
                    'defaultProps',
                    'statics',
                    'state',
                    'type-annotations',
                    'instance-variables',
                    'instance-methods',
                    'everything-else',
                    'constructor',
                    'getDefaultProps',
                    'getInitialState',
                    'getDerivedStateFromProps',
                    'getSnapshotBeforeUpdate',
                    'componentDidMount',
                    'shouldComponentUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount',
                    'render',
                ],
            },
        ],

        'import/no-unresolved': [2, { commonjs: true, amd: false }],
        'import/no-commonjs': 1,
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/prefer-default-export': 1,
        'import/newline-after-import': 2,
        'import/unambiguous': 1,
        'import/imports-first': 2,
        'import/no-webpack-loader-syntax': 1,
        'import/extensions': [1, 'always', { js: 'never', jsx: 'always' }],
        'import/first': 1,
        'import/no-dynamic-require': 1,
        'import/no-deprecated': 1,
        'import/no-extraneous-dependencies': 0, // нужно настроить для нас

        'max-len': 0,
    },
};
