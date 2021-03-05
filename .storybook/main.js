const webpackFinal = require('./webpack.storybook.config');

module.exports = {
  stories: ['../src/**/*.stories.@(js)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal,
}
