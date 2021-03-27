const mainConfig = require("../src/client/webpack.config.js");

module.exports = async (config, _) => ({
  ...config,
  resolve: mainConfig.resolve,
  module: {
    ...config.module,
    rules: [...mainConfig.module.rules],
  },
});
