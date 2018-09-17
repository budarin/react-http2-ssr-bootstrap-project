import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelLoaderConfig';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import env from '../../../src/utils/getEnv';

const { STATIC_URL } = env;
const config = {
    watch: true,
    cache: true,
    target: 'node',
    profile: false,
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: ['./src/server/index.ts'],
    output: {
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules'),
                use: {
                    loader: 'image-size-loader',
                    options: {
                        digest: 'hex',
                        hash: 'sha512',
                        publicPath: STATIC_URL,
                        name: 'img/[name].[hash:8].[ext]',
                        context: path.resolve(__dirname, 'src'),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'fake-style-loader',
                    },
                    {
                        loader: '@budarin/ts-css-loader',
                        options: {
                            modules: true,
                            usable: true,
                            server: true,
                            camelCase: true,
                            importLoaders: 1,
                            minimize: false,
                            localIdentName: '[name].[local]_[hash:7]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        modules: ['node_modules'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: './node_modules/react/umd/react.development.js' },
            { from: './node_modules/react-dom/umd/react-dom.development.js' },
            { from: './node_modules/ress/dist/ress.min.css' },
            { from: './.env.production.json' },

            { from: './src/common/robots.txt' },
            { from: './src/common/default.css' },
            { from: './src/common/manifest.json' },
            { from: './src/common/favicon.ico' },
            { from: './src/common/android-chrome-192x192.png' },
            { from: './src/common/android-chrome-512x512.png' },
        ]),
        new webpack.DefinePlugin({
            'process.env.__DEV__': true,
            'process.env.__PROD__': false,
            'process.env.__SERVER__': true,
            'process.env.__BROWSER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
    ],
};

export default config;
