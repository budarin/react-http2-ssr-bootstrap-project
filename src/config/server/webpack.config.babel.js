import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelLoaderConfig.json';
import nodeExternals from 'webpack-node-externals';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
    mode: 'development',
    target: 'node',
    watch: true,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    entry: ['webpack/hot/poll?1000', './src/server/index.js'],
    output: {
        path: path.resolve('./dist'),
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
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
    externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
};

export default config;
