const browserlist = require('./config/browserList');

const plugins = [require('postcss-preset-env')()];

module.exports = {
    plugins: plugins,
};
