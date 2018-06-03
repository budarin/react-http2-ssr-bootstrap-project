import path from 'path';
import OptimizeJsPlugin from 'optimize-js-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import babelConfig from './babelLoaderConfig.json';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    cache: false,
    target: 'web',
    profile: true,
    devtool: 'none',
    mode: 'production',
    entry: {
        client: ['./src/common/babelHelpers.js', './src/client/index.js'],
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
                        loader: 'style-loader/useable',
                        options: {
                            hmr: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // This breaks background-image and other relative paths
                            // Monitor this: https://github.com/webpack/style-loader/pull/124
                            // sourceMap: DEV,
                            url: false,
                            import: false,
                            sourceMap: false,
                            // This breaks HMR (CSS Modules change name because their hash changes)
                            modules: true,
                            // importLoaders: 1,
                            localIdentName: '[hash:base64]',
                            // CSSNano Options
                            minimize: {
                                // safe: true,
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
            __DEV__: false,
            __PROD__: true,
            __BROWSER__: true,
            __SERVER__: false,
        }),
    ],
};

export default config;
