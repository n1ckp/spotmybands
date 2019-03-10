import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const Button = props => {
  const {className, type, children, onClick} = props
  const classNames = [styles.button]

  if (type) {
    classNames.push(styles[type])
  }
  if (className) {
    classNames.push(className)
  }

  return (
    <button className={classNames.join(' ')} onClick={() => onClick ? onClick() : null}>
      <div className={styles.inner}>{children}</div>
    </button>
  )
}

Button.propTypes = {
  children:  PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  type:      PropTypes.string,
  className: PropTypes.string,
  onClick:   PropTypes.func,
}

export default Button
