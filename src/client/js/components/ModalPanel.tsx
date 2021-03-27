import * as React from "react";

const CloseIcon = require("@images/icons/close.svg").default;

const styles = require("./ModalPanel.scss").default;

type ModalPanelProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalPanel: React.FC<ModalPanelProps> = (props) => {
  const { open, children, onClose } = props;
  let classNames = [];

  if (open) {
    classNames.push(styles.open);
  }

  return (
    <div id={styles.container} className={classNames.join(" ")}>
      <div className={styles.bg} onClick={() => onClose()}></div>
      <div className={styles.inner}>
        <div className={styles.top}></div>
        <div className={styles.main}>
          <CloseIcon className={styles.close} onClick={() => onClose()} />
          {children}
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default ModalPanel;
