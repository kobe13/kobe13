const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,
    watchOptions: {
        ignored: '/node_modules/'
    },
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: [{
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {minimize: true}
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            })
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
                'image-webpack-loader'
            ]
        }]
    },
    plugins: [
        new UglifyJSPlugin(),
        new ExtractTextPlugin('app.css')
    ]
};