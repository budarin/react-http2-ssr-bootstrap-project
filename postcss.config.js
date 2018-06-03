/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const browserlist = ['Chrome >= 63', 'Firefox >= 58', 'Safari >= 11', 'iOS >= 10.3', 'Edge >= 41'];

const plugins = [
    require('postcss-cssnext')({
        browsers: browserlist,
    }),
    require('postcss-preset-env')(),
];

module.exports = {
    plugins: plugins,
};
