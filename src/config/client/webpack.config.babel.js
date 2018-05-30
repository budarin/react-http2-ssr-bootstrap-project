import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelLoaderConfig.json';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

import env from '../../../.env.json';

const { STATIC_HOST, STATIC_PORT, STATIC_URL } = env;
const config = {
    mode: 'development',
    target: 'web',
    cache: true,
    profile: true,
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
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: ['node_modules', path.resolve('./src')],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
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
            key: fs.readFileSync('src/config/certs/server.key'),
            cert: fs.readFileSync('src/config/certs/server.crt'),
            ca: fs.readFileSync('src/config/certs/cacert.crt'),
        },
    },
};

export default config;
