import * as React from "react";
import LoadingOverlay from "./LoadingOverlay";

export default {
  title: "Atoms/LoadingOverlay",
  component: LoadingOverlay,
};

const Template = (args) => (
  <LoadingOverlay {...args}>
    <p style={{ padding: "16px" }}>Something being loaded...</p>
  </LoadingOverlay>
);

export const Enabled = Template.bind({});
Enabled.args = {
  active: true,
};
