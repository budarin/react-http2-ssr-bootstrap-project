import path from 'path';
import webpack from 'webpack';
import OptimizeJsPlugin from 'optimize-js-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

import babelConfig from './babelLoaderConfig.js';

const config = {
    watch: false,
    // cache: false,
    target: 'web',
    profile: true,
    devtool: 'none',
    mode: 'production',
    entry: {
        client: ['./src/client/index.tsx'],
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist'),
    },
    optimization: {
        occurrenceOrder: true,
        minimizer: [new MinifyPlugin(), new OptimizeJsPlugin({ sourceMap: false })],
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
                        name: 'img/[name].[hash:8].[ext]',
                        context: path.resolve(__dirname, 'src'),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable',
                        options: {
                            hmr: true,
                        },
                    },
                    {
                        loader: '@budarin/ts-css-loader',
                        options: {
                            modules: true,
                            usable: true,
                            server: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:8]',
                            sourceMap: false,
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
        new webpack.DefinePlugin({
            'process.env.__DEV__': false,
            'process.env.__PROD__': true,
            'process.env.__BROWSER__': true,
            'process.env.__SERVER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new webpack.SourceMapDevToolPlugin({
            columns: false,
            filename: '[file].map',
            publicPath: 'https://localhost:4430/',
            // append: false
        }),
    ],
};

export default config;
