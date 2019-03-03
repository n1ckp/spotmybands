import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/widgets/Button.scss'

const Button = props => {
  const {className, type, text, onClick} = props
  const classNames = [styles.button]

  if (type) {
    classNames.push(styles[type])
  }
  if (className) {
    classNames.push(className)
  }

  return (
    <button className={classNames.join(' ')} onClick={() => onClick ? onClick() : null}>
      <span className={styles.text}>{text}</span>
    </button>
  )
}

Button.propTypes = {
  text:      PropTypes.string,
  type:      PropTypes.string,
  className: PropTypes.string,
  onClick:   PropTypes.func,
}

export default Button
