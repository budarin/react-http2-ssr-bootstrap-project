import path from 'path';
import OptimizeJsPlugin from 'optimize-js-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

import babelConfig from './babelLoaderConfig.json';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    watch: false,
    cache: false,
    profile: true,
    target: 'node',
    mode: 'production',
    // devtool: 'hidden-source-map',
    entry: './src/server/index.js',
    output: {
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('./dist'),
    },
    optimization: {
        minimizer: [new MinifyPlugin(), new OptimizeJsPlugin({ sourceMap: false })],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
                exclude: path.resolve('node_modules'),
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
                        name: 'img/[name].[hash].[ext]',
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
                            url: false,
                            import: false,
                            // This breaks HMR (CSS Modules change name because their hash changes)
                            modules: true,
                            // importLoaders: 1,
                            localIdentName: '[hash:base64]',
                            // This breaks background-image and other relative paths
                            // Monitor this: https://github.com/webpack/style-loader/pull/124
                            // sourceMap: DEV,
                            sourceMap: false,
                            // CSSNano Options
                            minimize: {
                                safe: true,
                                calc: false,
                                zindex: false,
                                colormin: false,
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
        extensions: ['*', '.js', '.jsx'],
        modules: ['node_modules', path.resolve('./src')],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/common/manifests' },
            { from: './src/common/favicon.ico' },
            { from: './src/common/android-chrome-192x192.png' },
            { from: './src/common/android-chrome-512x512.png' },
        ]),
        new webpack.DefinePlugin({
            __DEV__: false,
            __PROD__: true,
            __SERVER__: true,
            __BROWSER__: false,
        }),
    ],
};

export default config;
