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
        extensions: [".ts", ".tsx", ".js", ".scss"]
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
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png&name=fonts/[name].png" },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name]" }, 
            { test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].ttf" },
            { test: /\.eot$/, loader: "file-loader?name=fonts/[name].eot" },
            { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].svg" },
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
        })
        //new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;