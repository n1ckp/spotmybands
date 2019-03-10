import React from 'react'
import PropTypes from 'prop-types'

import CloseIcon from 'icons/close.svg'

import styles from './styles.scss'

const ModalPanel = props => {
  const {open, children, onClose} = props
  let classNames = []

  if (open) {
    classNames.push(styles.open)
  }

  return (
    <div id={styles.container} className={classNames.join(' ')}>
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
  )
}

ModalPanel.propTypes = {
  open:     PropTypes.bool.isRequired,
  onClose:  PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default ModalPanel
