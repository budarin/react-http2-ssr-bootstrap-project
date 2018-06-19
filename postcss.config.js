/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const browserlist = require('./config/browserList');

const plugins = [
    require('postcss-cssnext')({
        browsers: browserlist,
    }),
    require('postcss-preset-env')(),
];

module.exports = {
    plugins: plugins,
};
