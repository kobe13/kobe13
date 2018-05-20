const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
  watch: true,
  watchOptions: {
    ignored: '/node_modules/',
  },
  entry: ['babel-polyfill', path.join(paths.JS, 'app.js')],
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  // Plugins
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css'), // CSS will be extracted to this bundle file -> ADDED IN THIS STEP
  ],
  // Loaders configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader', 'eslint-loader',
        ],
      },
      // CSS loader for CSS files
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: { minimize: true },
          }, {
            loader: 'sass-loader', // compiles Sass to CSS
          }],
        }),
      },
      // File loader for image assets
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
