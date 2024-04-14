const path = require('path');

const outputConfig = {
    destPath: "./dist"
};

const entryConfig = [
    "./src/index.tsx",
    "./src/assets/scss/app.scss",
];

const copyPluginPatterns = {
    patterns: [
        { from: "./src/assets/images", to: "images", noErrorOnMissing: true },
        { from: "./src/assets/fonts", to: "fonts", noErrorOnMissing: true },
        { from: "./src/assets/vendor", to: "js", noErrorOnMissing: true },
    ],
    
};

const devServer = {
    static: {
        directory: path.join(__dirname, outputConfig.destPath),
    },
    historyApiFallback: true,
    // https: true,
    port: 7070,
    // host: "0.0.0.0",
    // disableHostCheck: true
};

const scssConfig = {
    destFileName: "css/app.min.css"
};

const terserPluginConfig = {
    extractComments: false,
    terserOptions: {
        compress: {
            drop_console: true,
        },
    }
};

module.exports.copyPluginPatterns = copyPluginPatterns;
module.exports.entryConfig = entryConfig;
module.exports.scssConfig = scssConfig;
module.exports.devServer = devServer;
module.exports.terserPluginConfig = terserPluginConfig;
module.exports.outputConfig = outputConfig;