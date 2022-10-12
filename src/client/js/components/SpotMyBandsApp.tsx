import * as React from "react";

import NavigationMenu from "@components/NavigationMenu";
import StreetMap from "./StreetMap";
import ErrorModal from "./ErrorModal";

const styles = require("./SpotMyBandsApp.scss").default;

const SpotMyBandsApp = () => {
  return (
    <div id={styles.container}>
      <NavigationMenu />
      <StreetMap />
      <ErrorModal />
    </div>
  );
};

export default SpotMyBandsApp;
