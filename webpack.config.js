const path = require('path');
const webpack = require('webpack');
const HtmlWebpack = require('html-webpack-plugin');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackPreBuildPlugin = require('pre-build-webpack');
const del = require('del');

const rootDir = path.resolve(__dirname);
const buildFolder = path.resolve(__dirname, 'dist');

const config = {
    devtool: 'inline-source-map',
    /*
     * app.ts represents the entry point to your web application. Webpack will
     * recursively go through every "require" statement in app.ts and
     * efficiently build out the application's dependency tree.
     */
    entry: {
        app: path.resolve(rootDir, 'src', 'app'),
        style: path.resolve(rootDir, 'src/Styles', 'app')
    },
    /*
     * The combination of path and filename tells Webpack what name to give to
     * the final bundled JavaScript file and where to store this file.
     */
    output: {
        filename: 'js/[name].bundle.js',
        path: buildFolder
    },

    /*
     * resolve lets Webpack now in advance what file extensions you plan on
     * "require"ing into the web application, and allows you to drop them
     * in your code.
     */
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", ".less"]
    },

    module: {
        /*
         * Each loader needs an associated Regex test that goes through each
         * of the files you've included (or in this case, all files but the
         * ones in the excluded directories) and finds all files that pass
         * the test. Then it will apply the loader to that file. I haven't
         * installed ts-loader yet, but will do that shortly.
         */
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                loader: 'raw-loader',
                test: /\.(css|html)$/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&minetype=application/font-woff" }, 
            { test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/, loader: "file-loader" },
            { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
        ]
    },
    plugins: [
        new WebpackPreBuildPlugin(function (stats) {
            del([buildFolder]);
        }),
        new ChunkWebpack({
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'index.html')
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css"
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;