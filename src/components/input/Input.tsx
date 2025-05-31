import  { forwardRef, JSX } from "react";
import { InputProps, Variant } from "../../types";
import "../../styles/components/Input.css";

/**
 * A reusable and customizable Input component that supports
 * different types, variants (styles), and event handlers.
 * This component uses React.forwardRef to expose the input's ref
 * to parent components, which is useful for libraries like react-hook-form.
 *
 * @component
 * 
 * @param {Object} props - Props passed to the Input component.
 * @param {string} props.placeholder - Placeholder text displayed inside the input field.
 * @param {boolean} [props.disabled=false] - If true, disables the input (non-interactive).
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Callback fired when input value changes.
 * @param {Variant} [props.variant=Variant.primary] - Visual style variant of the input (e.g., primary, secondary).
 * @param {string} [props.type="text"] - The input's type attribute (e.g., text, password, number).
 * @param {(event: React.MouseEvent<HTMLInputElement>) => void} [props.onMouseEnter] - Mouse enter event handler.
 * @param {(event: React.MouseEvent<HTMLInputElement>) => void} [props.onMouseLeave] - Mouse leave event handler.
 * @param {string | number | readonly string[]} [props.value] - Controlled input value.
 * @param {string} [props.className] - Additional CSS class names for the input.
 * @param {string} [props.id] - HTML id attribute for the input element.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to access the underlying input element.
 * 
 * @returns {JSX.Element} The rendered input element with all passed props and ref attached.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder,
  disabled = false,
  onChange,
  variant = Variant.primary,
  type = "text",
  onMouseEnter,
  onMouseLeave,
  value,
  className = "",
  id,
  ...rest
}, ref): JSX.Element => {
  return (
    <input
      id={id}
      type={type}
      className={`chime-input chime-input-${variant} ${className}`}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      value={value}
      ref={ref}
      {...rest} // Spread any additional props (e.g., min, max, name)
    />
  );
});

// Set display name for easier debugging in React DevTools
Input.displayName = "Input";

export default Input;
