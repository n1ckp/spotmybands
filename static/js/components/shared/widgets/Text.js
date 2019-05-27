import React from 'react'
import PropTypes from 'prop-types'

import styles from './Text.scss'

export default class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  handleClick() {
    this.inputEl.focus()
  }

  onChange(value) {
    this.setState({value})
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  onFocus() {
    this.setState({focused: true})
  }

  onBlur() {
    this.setState({focused: false})
  }

  renderIcon() {
    let icon

    if (this.props.icon) {
      if (typeof this.props.icon === 'string') {
        icon = <span className={styles.icon} style={{backgroundImage: `url(${this.props.icon})`}}></span>
      }
      else {
        let props = {
          className: styles.icon,
        }

        if (this.state.focused) {
          props.className += ' ' + styles.focused
        }

        icon = React.cloneElement(this.props.icon, props)
      }
    }

    return icon
  }

  render() {
    let classNames = []

    if (this.state.focused) {
      classNames.push(styles.focused)
    }

    return (
      <div id={styles.container} className={classNames.join(' ')} onClick={() => this.handleClick()}>
        {this.renderIcon()}
        <input
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={e => this.onChange(e.target.value)}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          ref={el => this.inputEl = el} />
      </div>
    )
  }
}

Text.propTypes = {
  placeholder: PropTypes.string,
  icon:        PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange:    PropTypes.func,
}
