const path = require('path');
const WORKSPACE = path.resolve(__dirname, '../../');

function resolve (dir) {
    return path.join(WORKSPACE, dir);
}

const alias = function() {
    return {
        reactApp: resolve('src/app'),
        vendor: resolve('static/vendor'),
        '@constants': resolve('src/constants'),
        '@common': resolve('src/common'),
        '@static': resolve('static'),
        '@widgets': resolve('src/widgets'),
        '@scss': resolve('src/scss'),
    };
};

module.exports = alias();
