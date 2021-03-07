import * as React from 'react'

const styles = require('./Button.scss').default

type ButtonProps = {
  type?: string,
  className?: string,
  onClick?: () => void,
  children?: React.ReactNode,
}

const Button: React.FC<ButtonProps> = props => {
  const { className, type, children, onClick } = props
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

export default Button
