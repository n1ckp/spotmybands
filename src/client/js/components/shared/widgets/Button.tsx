import * as React from 'react'

const styles = require('./Button.scss').default

export const DEFAULT_BUTTON_TYPE = undefined
export const BUTTON_TYPES = [DEFAULT_BUTTON_TYPE, "primary"] as const;
type ButtonType = typeof BUTTON_TYPES[number];

interface ButtonProps {
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  className,
  type,
  children,
  onClick
}: ButtonProps) => {
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
