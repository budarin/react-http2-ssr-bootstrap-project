import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelLoaderConfig.json';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

import env from '../../utils/env';

const { STATIC_HOST, STATIC_PORT, STATIC_URL } = env;
const config = {
    mode: 'development',
    target: 'web',
    cache: true,
    profile: false,
    devtool: 'inline-cheap-module-source-map',
    entry: {
        client: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?${STATIC_URL}`,
            'webpack/hot/only-dev-server',
            './src/client/index.js',
        ],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist'),
        publicPath: STATIC_URL,
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
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
                        name: 'img/[name].[hash:7].[ext]',
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
                            modules: true,
                            localIdentName: '[name].[local]_[hash:7]',
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
        extensions: ['*', '.js', '.jsx'],
        modules: ['node_modules', path.resolve('./src')],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __BROWSER__: true,
            __SERVER__: false,
            __DEV__: true,
            __PROD__: false,
        }),
    ],
    devServer: {
        port: STATIC_PORT,
        host: STATIC_HOST,
        hot: true,
        overlay: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchOptions: {
            ignored: /node_modules/,
        },
        https: {
            key: fs.readFileSync('certs/server.key'),
            cert: fs.readFileSync('certs/server.crt'),
            ca: fs.readFileSync('certs/cacert.crt'),
        },
    },
};

export default config;
