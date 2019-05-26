var webpack = require('webpack')
var path = require('path')
var env = process.env.NODE_ENV || 'development'
var prod = env === 'production'
var mode = process.env.NODE_ENV || 'development'
var TerserPlugin = require('terser-webpack-plugin')

var STATIC_PATH = path.join(__dirname, 'static')

var config = {
  cache: true,
  entry: {
    'main-app': './static/js/app.js',
  },
  mode:    mode,
  devtool: 'source-map',
  output:  {
    path:       path.join(STATIC_PATH, 'built'),
    publicPath: '/static/built/',
    filename:   '[name].chunk.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    modules: [
      path.join(STATIC_PATH, 'sass'),
      path.join(STATIC_PATH, 'images'),
      path.join(STATIC_PATH, 'js'),
      'node_modules',
    ],
    extensions: ['*', '.js'],
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        include: path.join(STATIC_PATH, 'js'),
        use:     {
          loader:  'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
          },
        },
      },
      {
        test:    /\.s?css$/,
        include: path.join(STATIC_PATH),
        use:     [
          {loader: 'style-loader?sourceMap'},
          {loader: 'css-loader?modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'},
          {
            loader:  'sass-loader?sourceMap',
            options: {includePaths: [path.join(STATIC_PATH, 'sass')]},
          },
        ],
      },
      {
        test:    /\.svg/,
        include: path.join(STATIC_PATH, 'images'),
        loader:  'react-svg-loader',
      },
      {
        test:    /\.(png|gif|jpg|ttf|woff|eot)/,
        include: path.join(STATIC_PATH, 'images'),
        loader:  'url-loader',
      },
      {
        test:    /\.json$/,
        include: path.join(STATIC_PATH, 'js'),
        loader:  'json-loader',
      },
    ],
  },
}

if (prod) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"',
    },
  }))

  Object.keys(config.entry).map((appName) => {
    config.entry[appName] = [
      'babel-polyfill',
      config.entry[appName],
    ]
  })

  config.optimization = {
    minimizer: [new TerserPlugin()],
  }
}
else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  Object.keys(config.entry).map((appName) => {
    config.entry[appName] = [
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      config.entry[appName],
    ]
  })
}

module.exports = config
