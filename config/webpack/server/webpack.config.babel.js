import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelLoaderConfig';
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
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
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: false,
                            importLoaders: 1,
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
        new HardSourceWebpackPlugin({
            cacheDirectory: path.resolve('./node_modules/.cache/server/[confighash]'),
            recordsPath: path.resolve('./node_modules/.cache/server/[confighash]/records.json'),
            configHash: function(webpackConfig) {
                return require('node-object-hash')({ sort: false }).hash(webpackConfig);
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: './src/common/default.css' },
            { from: './src/common/manifest.json' },
            { from: './src/common/favicon.ico' },
            { from: './src/common/android-chrome-192x192.png' },
            { from: './src/common/android-chrome-512x512.png' },
        ]),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            __SERVER__: true,
            __BROWSER__: false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
    ],
};

export default config;
