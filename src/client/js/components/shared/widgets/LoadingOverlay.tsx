import * as React from "react";

const styles = require("./LoadingOverlay.scss").default;

type LoadingOverlayProps = {
  active: boolean;
  children: React.ReactNode;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = (props) => {
  const { children, active } = props;

  return (
    <div id={styles.container} className={active ? styles.active : null}>
      {children}
      <div className={styles.overlay}></div>
    </div>
  );
};

export default LoadingOverlay;
