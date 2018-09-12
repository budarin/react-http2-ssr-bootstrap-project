import path from 'path';
import webpack from 'webpack';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import babelConfig from './babelLoaderConfig';

const config = {
    watch: false,
    cache: false,
    profile: true,
    target: 'node',
    mode: 'production',
    devtool: 'none',
    entry: ['./src/server/index.ts'],
    output: {
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('./dist'),
    },
    optimization: {
        minimizer: [new MinifyPlugin()],
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
                        publicPath: '/',
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
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: false,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:8]',
                            sourceMap: true,
                            // cssnano options
                            minimize: {
                                // safe: true,
                                zindex: false,
                                discardComments: { removeAll: true },
                            },
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
        modules: ['node_modules', path.resolve('./src')],
    },
    plugins: [
        new CopyWebpackPlugin([
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
            'process.env.__DEV__': false,
            'process.env.__PROD__': true,
            'process.env.__SERVER__': true,
            'process.env.__BROWSER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
        new webpack.SourceMapDevToolPlugin({
            columns: false,
            filename: 'server.js.map',
        }),
    ],
};

export default config;
