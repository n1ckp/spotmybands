const webpack = require('webpack')
const path = require('path')
const ENV = process.env.NODE_ENV || 'development'
const IS_PROD = ENV === 'production'
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CLIENT_PATH = __dirname
const BUILD_PATH = path.join(__dirname, '../../built/client')

module.exports = {
  cache: true,
  entry: {
    'main-app': [path.join(CLIENT_PATH, 'js', 'app.tsx')],
  },
  mode:    process.env.NODE_ENV || 'development',
  devtool: !IS_PROD && 'source-map',
  output:  {
    path:       BUILD_PATH,
    publicPath: '/assets',
    filename:   '[name].chunk.js',
  },
  optimization: IS_PROD
    ? {
      minimizer: [new TerserPlugin()],
    }
    : {
      moduleIds:    'named',
      emitOnErrors: false,
    },
  resolve: {
    modules: ['node_modules'],
    alias:   {
      '@types':      path.resolve(__dirname, '..', '@types'),
      '@utils':      path.resolve(CLIENT_PATH, 'js', 'utils'),
      '@images':     path.resolve(CLIENT_PATH, 'images'),
      '@styles':     path.resolve(CLIENT_PATH, 'sass'),
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
            configFile: path.resolve(
              __dirname,
              IS_PROD ? 'tsconfig.webpack.json' : 'tsconfig.webpack.dev.json'
            ),
          },
        },
      },
      {
        test: /\.s?css$/,
        use:  [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader:  'css-loader',
            options: {
              modules:   true,
              sourceMap: !IS_PROD,
            },
          },
          {
            loader:  'sass-loader', // Fixed at v10 because v11 not working with Storybook
            options: {
              sassOptions: {
                includePaths: [path.join(CLIENT_PATH, 'sass')],
              },
              sourceMap: !IS_PROD,
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
  plugins: IS_PROD
    ? [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
    ]
    : [new webpack.HotModuleReplacementPlugin()],
  devServer: !IS_PROD
    ? {
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
    : undefined,
}
