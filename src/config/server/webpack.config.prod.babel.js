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
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: ['node_modules', path.resolve('./src')],
    },
};

export default config;
