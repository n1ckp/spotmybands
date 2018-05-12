var webpack = require("webpack");
var path = require("path");
var env = process.env.NODE_ENV || 'dev'
var prod = env === 'prod'
var mode = process.env.NODE_ENV || 'development'

var entry = {
  'main-app':  './static/js/app.js',
}

var plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
]

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: true,
    mangle: true,
    sourceMap: true,
  }))
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }))

  Object.keys(entry).map(function(appName) {
    entry[appName] = [
      'babel-polyfill',
      entry[appName],
    ]
  })
}
else {
  plugins.push(new webpack.HotModuleReplacementPlugin())

  Object.keys(entry).map(function(appName) {
    entry[appName] = [
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      entry[appName],
    ]
  })
}

module.exports = {
  cache: true,
  entry: entry,
  mode: mode,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'static/built'),
    publicPath: '/static/built/',
    filename: '[name].chunk.js',
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.join(__dirname, 'static/sass'),
      path.join(__dirname, 'static/images'),
      path.join(__dirname, 'static/js'),
      'node_modules'
    ],
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'static/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-1']
          }
        }
      },
      {
        test: /\.s?css$/,
        include: path.join(__dirname, 'static/sass'),
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.svg/,
        include: path.join(__dirname, 'static/images'),
        loader: 'react-svg-loader'
      },
      {
        test: /\.(png|gif|jpg|ttf|woff|eot)/,
        include: path.join(__dirname, 'static/images'),
        loader: 'url-loader'
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'static/js'),
        loader: 'json-loader'
      }
    ]
  }
};
