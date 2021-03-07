var webpack = require('webpack')
var path = require('path')
var env = process.env.NODE_ENV || 'development'
var prod = env === 'production'
var mode = process.env.NODE_ENV || 'development'
var TerserPlugin = require('terser-webpack-plugin')

var CLIENT_PATH = __dirname
var BUILD_PATH = path.join(__dirname, '../../built/client')

var config = {
  cache: true,
  entry: {
    'main-app': [
      path.join(CLIENT_PATH, 'js', 'app.tsx'),
    ],
  },
  mode:   mode,
  output: {
    path:       BUILD_PATH,
    publicPath: '/assets',
    filename:   '[name].chunk.js',
  },
  optimization: {
    moduleIds:    'named',
    emitOnErrors: false,
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      '@types':      path.resolve(__dirname, '..', '@types'),
      '@utils':      path.resolve(CLIENT_PATH, 'js', 'utils'),
      '@images':     path.resolve(CLIENT_PATH, 'images'),
      '@styles':     path.resolve(CLIENT_PATH, 'sass'),
      '@redux':      path.resolve(CLIENT_PATH, 'js', 'redux'),
      '@components': path.resolve(CLIENT_PATH, 'js', 'components'),
    },
    extensions: ['*', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test:    /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use:     {
          loader:  'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.webpack.json'),
          },
        },
      },
      {
        test: /\.s?css$/,
        use:  [
          'style-loader',
          {
            loader:  'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader:  'sass-loader', // Fixed at v10 because v11 not working with Storybook
            options: {
              sassOptions: {
                includePaths: [path.join(CLIENT_PATH, 'sass')],
              },
            },
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
  plugins: [],
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
  config.module.rules[1].use[1].options.sourceMap = true
  config.module.rules[1].use[2].options.sourceMap = true
}

module.exports = config
