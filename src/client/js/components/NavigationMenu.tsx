import * as React from "react";

import SavedArtists from "@components/SavedArtists";
import InfoPanel from "@components/InfoPanel";

const ArtistsImage = require("@images/icons/nav/list-items.svg").default;
const InfoImage = require("@images/icons/nav/info.svg").default;

const styles = require("./NavigationMenu.scss").default;

export const NavigationMenu: React.FC = () => {
  const [panelOpen, setPanelOpen] = React.useState(true);
  const [selected, setSelected] = React.useState("artists");

  let classNames = [styles.panel];
  let selectedPanel;

  if (panelOpen) {
    classNames.push(styles.open);
  }

  if (selected === "artists") {
    selectedPanel = <SavedArtists />;
  } else if (selected === "info") {
    selectedPanel = <InfoPanel />;
  }

  return (
    <div id={styles.container}>
      <div className={styles.inner}>
        <div className={styles.gutter}>
          <div className={styles.navOptions}>
            <div
              className={selected === "artists" ? styles.selected : null}
              onClick={() => setSelected("artists")}
            >
              <ArtistsImage />
            </div>
            <div
              className={selected === "info" ? styles.selected : null}
              onClick={() => setSelected("info")}
            >
              <InfoImage />
            </div>
          </div>
        </div>
        <div className={classNames.join(" ")}>{selectedPanel}</div>
      </div>
    </div>
  );
};

export default NavigationMenu;
