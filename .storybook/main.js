const webpackFinal = require("./webpack.storybook.config");

module.exports = {
  stories: [
    "../src/client/js/components/shared/widgets/Button.stories.tsx", // First story to show
    "../src/**/*.stories.@(tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  webpackFinal,
};
