import React from 'react'
import PropTypes from 'prop-types'

import CloseIcon from 'icons/close.svg'

import styles from './styles.scss'

export default class ModalPanel extends React.Component {
  render() {
    let classNames = []

    if (this.props.open) {
      classNames.push(styles.open)
    }

    return (
      <div id={styles.container} className={classNames.join(' ')}>
        <div className={styles.bg} onClick={() => this.props.onClose()}></div>
        <div className={styles.inner}>
          <div className={styles.top}></div>
          <div className={styles.main}>
            <CloseIcon className={styles.close} onClick={() => this.props.onClose()} />
            {this.props.children}
          </div>
          <div className={styles.bottom}></div>
        </div>
      </div>
    )
  }
}

ModalPanel.propTypes = {
  open:    PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
