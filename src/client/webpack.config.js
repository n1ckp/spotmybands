var webpack = require('webpack')
var path = require('path')
var env = process.env.NODE_ENV || 'development'
var prod = env === 'production'
var mode = process.env.NODE_ENV || 'development'
var TerserPlugin = require('terser-webpack-plugin')

var CLIENT_PATH = __dirname
var BUILD_PATH = path.join(__dirname, 'build')

var config = {
  cache: true,
  entry: {
    'main-app': [
      path.join(CLIENT_PATH, 'js', 'app.js'),
    ],
  },
  mode:   mode,
  output: {
    path:       BUILD_PATH,
    publicPath: '/static/built/',
    filename:   '[name].chunk.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    modules: [
      path.join(CLIENT_PATH, 'sass'),
      path.join(CLIENT_PATH, 'images'),
      path.join(CLIENT_PATH, 'js'),
      'node_modules',
    ],
    extensions: ['*', '.js'],
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        include: path.join(CLIENT_PATH, 'js'),
        use:     {
          loader:  'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
          },
        },
      },
      {
        test:    /\.s?css$/,
        include: path.join(CLIENT_PATH),
        use:     [
          'style-loader',
          {
            loader:  'css-loader',
            options: {
              modules:        true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader:  'sass-loader',
            options: {includePaths: [path.join(CLIENT_PATH, 'sass')]},
          },
        ],
      },
      {
        test:    /\.svg/,
        include: path.join(CLIENT_PATH, 'images'),
        loader:  'react-svg-loader',
      },
      {
        test:    /\.(png|gif|jpg|ttf|woff|eot)/,
        include: path.join(CLIENT_PATH, 'images'),
        loader:  'url-loader',
      },
      {
        test:    /\.json$/,
        include: path.join(CLIENT_PATH, 'js'),
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

  config.optimization = {
    minimizer: [new TerserPlugin()],
  }
}
else {
  config.devtool = 'source-map'
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  config.devServer = {
    contentBase: BUILD_PATH,
    port:        3000,
    proxy:       {
      '*': 'http://localhost:8000',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hot:                true,
  }

  config.module.rules[1].use[0] = 'style-loader?sourceMap'
  config.module.rules[1].use[2].options.sourceMap = true
}

module.exports = config
