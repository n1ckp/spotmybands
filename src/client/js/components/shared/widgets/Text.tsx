import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./Text.scss').default

export const TextIcon = props => {
  let component = null

  const { icon, focused } = props

  if (typeof icon === 'string') {
    component = <span className={styles.icon} style={{ backgroundImage: `url(${icon})` }}></span>
  }
  else {
    const iconClassName = classnames(styles.icon, { [styles.focused]: focused })

    component = React.cloneElement(icon, { className: iconClassName })
  }

  return component
}

type TextProps = {
  placeholder: string,
  icon: string | JSX.Element,
  initialValue?: string,
  onChange?: (val: string) => any,
}

type RefType = {
  focus: () => void
} | null;

export const Text = React.forwardRef<RefType, TextProps>((props, ref) => {
  const { initialValue, placeholder, icon, onChange } = props
  const [value, setValue] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const inputEl = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputEl.current?.focus()
    },
  }))


  const containerClassName = classnames({
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

  React.useEffect(() => {
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
});

export default Text;
