const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.lintJavaScript = ({include, exclude, options}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options
      }
    ]
  }
});

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                autoprefixer({
                  add: true,
                  browsers: 'last 5 versions'
                })
              ])
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer()
    ])
  }
});

exports.purifyCSS = ({paths}) => ({
  plugins: [
    new PurifyCSSPlugin({paths})
  ]
});

exports.lintCSS = ({include, exclude}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            stylelint()
          ])
        }
      }
    ]
  }
});

exports.extractCSS = ({include, exclude, use}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,

          use: plugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader', // translates CSS into CommonJS
              options: {minimize: true}
            }, {
              loader: 'sass-loader' // compiles Sass to CSS
            }]
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.loadJavaScript = ({include, exclude}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  }
});

exports.loadSVG = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: [
          {loader: 'svg-sprite-loader', options: options},
          'svg-fill-loader',
          'svgo-loader'
        ]
      }
    ]
  }
});

exports.generateSourceMaps = ({type}) => ({
  devtool: type
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
      new webpack.optimize.CommonsChunkPlugin(bundle)
  ))
});

exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path])
  ]
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
      exclude: /\.svg$/
    })
  ]
});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin()
  ]
});

exports.minifyCSS = ({options}) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};
