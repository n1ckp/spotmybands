import React from 'react'
import PropTypes from 'prop-types'

import styles from './LoadingOverlay.scss'

const LoadingOverlay = props => {
  const {children, active} = props

  return (
    <div id={styles.container} className={active ? styles.active : null}>
      {children}
      <div className={styles.overlay}></div>
    </div>
  )
}

LoadingOverlay.propTypes = {
  active:   PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default LoadingOverlay
