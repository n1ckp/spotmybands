import React, {useState, useRef, useEffect, useImperativeHandle, forwardRef} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Text.scss'

export const TextIcon = props => {
  let component = null

  const {icon, focused} = props

  if (typeof icon === 'string') {
    component = <span className={styles.icon} style={{backgroundImage: `url(${icon})`}}></span>
  }
  else {
    const iconClassName = classNames(styles.icon, {[styles.focused]: focused})

    component = React.cloneElement(icon, {className: iconClassName})
  }

  return component
}

export let Text = (props, ref) => {
  const {initialValue, placeholder, icon, onChange} = props
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputEl = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputEl.current.focus()
    },
  }))


  const containerClassName = classNames({
    [styles.focused]: focused,
  })

  const handleClick = () => {
    inputEl.current.focus()
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  useEffect(() => {
    setValue(initialValue || '')
  }, [initialValue])

  const handleChange = (val) => {
    setValue(val)
    if (onChange) {
      onChange(val)
    }
  }

  return (
    <div tabIndex={0} id={styles.container} className={containerClassName} onClick={handleClick}>
      {
        icon &&
        <TextIcon icon={icon} focused={focused} />
      }
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => handleChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputEl} />
    </div>
  )
}

Text = forwardRef(Text)

Text.propTypes = {
  placeholder:  PropTypes.string,
  icon:         PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange:     PropTypes.func,
  initialValue: PropTypes.string,
}

export default Text
