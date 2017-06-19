const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const commonConfig = merge([
  {
    // Entries have to resolve to files! They rely on Node
    // convention by default so if a directory contains *index.js*,
    // it resolves to that.
    watch: true,
    watchOptions: {
      ignored: '/node_modules/'
    },
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new SpriteLoaderPlugin()
    ]
  },
  parts.lintCSS({include: PATHS.app}),
  parts.lintJavaScript({include: PATHS.app}),
  parts.loadJavaScript({include: [PATHS.app, PATHS.src]}),
  parts.loadSVG({include: PATHS.src}),
  parts.generateSourceMaps({type: 'source-map'})

]);

function isVendor({resource}) {
  return resource &&
      resource.indexOf('node_modules') >= 0 &&
      resource.match(/\.js$/);
}

const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000 // in bytes
    },
    recordsPath: path.join(__dirname, 'records.json')
  },
  parts.clean(PATHS.build),
  parts.extractCSS({
    use: [
      'css-loader',
      parts.autoprefix()
    ]
  }),
  parts.setFreeVariable(
      'process.env.NODE_ENV',
      'production'
  ),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  }),
  parts.attachRevision()
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    }
  },
  parts.generateSourceMaps({type: 'cheap-module-eval-source-map'}),
  parts.loadCSS(),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  })
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
