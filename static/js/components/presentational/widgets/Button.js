import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/widgets/Button.scss'


export default class Button extends React.Component {
  onClick() {
    this.props.onClick()
  }

  render() {
    let classNames = [styles.button]

    if (this.props.type) {
      classNames.push(styles[this.props.type])
    }

    return (
      <button className={classNames.join(' ')} onClick={() => this.onClick()}>
        <span className={styles.text}>{this.props.text}</span>
      </button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
}