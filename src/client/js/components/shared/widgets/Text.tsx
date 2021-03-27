import * as React from "react";
import * as classnames from "classnames";

const styles = require("./Text.scss").default;

interface TextIconProps {
  icon: React.ReactElement;
  focused: boolean;
}

export const TextIcon = ({ icon, focused }: TextIconProps) => {
  const iconClassName = classnames(styles.icon, { [styles.focused]: focused });
  return React.cloneElement(icon, { className: iconClassName });
};

interface TextProps {
  placeholder: string;
  icon: React.ReactElement;
  initialValue?: string;
  onChange?: (val: string) => any;
}

type RefType = {
  focus: () => void;
} | null;

export const Text = React.forwardRef<RefType, TextProps>(
  ({ initialValue, placeholder, icon, onChange }, ref) => {
    const [value, setValue] = React.useState("");
    const [focused, setFocused] = React.useState(false);
    const inputEl = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputEl.current?.focus();
      },
    }));

    const containerClassName = classnames({
      [styles.focused]: focused,
    });

    const handleClick = () => {
      inputEl.current.focus();
    };

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      setFocused(false);
    };

    React.useEffect(() => {
      setValue(initialValue || "");
    }, [initialValue]);

    const handleChange = (val) => {
      setValue(val);
      if (onChange) {
        onChange(val);
      }
    };

    return (
      <div
        tabIndex={0}
        id={styles.container}
        className={containerClassName}
        onClick={handleClick}
      >
        {icon && <TextIcon icon={icon} focused={focused} />}
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputEl}
        />
      </div>
    );
  }
);

export default Text;
