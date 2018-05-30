import path from 'path';
import OptimizeJsPlugin from 'optimize-js-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

import babelConfig from './babelLoaderConfig.json';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    mode: 'production',
    target: 'node',
    watch: false,
    cache: false,
    profile: true,
    // devtool: 'hidden-source-map',
    entry: './src/server/index.js',
    output: {
        path: path.resolve('./dist'),
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
        new webpack.DefinePlugin({
            __BROWSER__: false,
            __SERVER__: true,
            __DEV__: false,
            __PROD__: true,
        }),
    ],
};

export default config;
