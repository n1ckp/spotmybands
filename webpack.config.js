var webpack = require('webpack')
var path = require('path')
var env = process.env.NODE_ENV || 'development'
var prod = env === 'production'
var mode = process.env.NODE_ENV || 'development'
var TerserPlugin = require('terser-webpack-plugin')

var config = {
  cache: true,
  entry: {
    'main-app': './static/js/app.js',
  },
  mode:    mode,
  devtool: 'source-map',
  output:  {
    path:       path.join(__dirname, 'static/built'),
    publicPath: '/static/built/',
    filename:   '[name].chunk.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'static/sass'),
      path.join(__dirname, 'static/images'),
      path.join(__dirname, 'static/js'),
      'node_modules',
    ],
    extensions: ['*', '.js'],
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        include: path.join(__dirname, 'static/js'),
        use:     {
          loader:  'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
          },
        },
      },
      {
        test:    /\.s?css$/,
        include: path.join(__dirname, 'static'),
        use:     [
          {loader: 'style-loader?sourceMap'},
          {loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'},
          {
            loader:  'sass-loader?sourceMap',
            options: {includePaths: [path.join(__dirname, 'static', 'sass')]},
          },
        ],
      },
      {
        test:    /\.svg/,
        include: path.join(__dirname, 'static/images'),
        loader:  'react-svg-loader',
      },
      {
        test:    /\.(png|gif|jpg|ttf|woff|eot)/,
        include: path.join(__dirname, 'static/images'),
        loader:  'url-loader',
      },
      {
        test:    /\.json$/,
        include: path.join(__dirname, 'static/js'),
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
