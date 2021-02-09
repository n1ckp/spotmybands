const path = require('path');
// your app's webpack.config.js
const custom = require('../src/client/webpack.config.js');

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    resolve: custom.resolve,
    module: {
      ...config.module,
      rules: [
        ...custom.module.rules,
        ...config.module.rules,
      ],
    }
  };
};
