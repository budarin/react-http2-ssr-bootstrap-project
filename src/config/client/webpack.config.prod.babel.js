import path from 'path';
import OptimizeJsPlugin from 'optimize-js-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import babelConfig from './babelLoaderConfig.json';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    mode: 'production',
    target: 'web',
    cache: false,
    profile: true,
    devtool: 'none',
    entry: {
        client: './src/client/index.js',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    optimization: {
        minimizer: [new MinifyPlugin(), new OptimizeJsPlugin({ sourceMap: false })],
        occurrenceOrder: true,
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
    plugins: [],
};

export default config;
