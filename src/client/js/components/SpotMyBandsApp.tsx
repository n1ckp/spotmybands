import * as React from "react";

import NavigationMenu from "@components/NavigationMenu";
import StreetMap from "./StreetMap";

const styles = require("./SpotMyBandsApp.scss").default;

const SpotMyBandsApp = () => {
  return (
    <div id={styles.container}>
      <NavigationMenu />
      <StreetMap />
    </div>
  );
};

export default SpotMyBandsApp;
