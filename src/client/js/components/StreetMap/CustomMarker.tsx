import * as React from 'react'

const CloseIcon = require("@images/icons/close.svg").default;
const MarkerIcon = require("@images/icons/map-marker.svg").default;

const styles = require("./StreetMap.scss").default;

type CustomMarkerBaseProps = {
  top?: number;
  left?: number;
  open: boolean;
  children: React.ReactNode;
  onClick: (...args: any) => void;
  onCloseInfoBox: (...args: any) => void;
};


type CustomMarkerProps = CustomMarkerBaseProps & {
  payload: number;
  anchor: [number, number];
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
  anchor,
  payload,
  top = 0,
  left = 0,
  open,
  children,
  onClick,
  onCloseInfoBox,
}) => (
  <div
    className={styles.marker}
    style={{ position: "absolute", top: top - 12, left: left - 12 }}
    onClick={onClick}
  >
    <MarkerIcon className={styles.icon} />
    {open && (
      <div className={styles.infoBox}>
        <button className={styles.close} onClick={onCloseInfoBox}>
          <CloseIcon />
        </button>
        {children}
      </div>
    )}
  </div>
);

export default CustomMarker
