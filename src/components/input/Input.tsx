// Import all the necessary dependencies
import React, { JSX } from "react";
import { InputProps, Variant } from "../../types";
import "../../styles/components/Input.css";

/**
 * A customizable and reusable Input component.
 * Supports different variants, types, and interaction handlers.
 *
 * @component
 * @param {string} placeHolder - Placeholder text displayed inside the input.
 * @param {boolean} [disabled=false] - Whether the input is disabled and non-interactive.
 * @param {function} onChange - Function called when the input value changes.
 * @param {Variant} [variant=Variant.primary] - Visual style variant of the input (e.g., 'primary', 'secondary').
 * @param {string} [type="button"] - The type of the input element (e.g., "text", "password", "email", "button").
 * @param {function} onMouseEnter - Event handler for mouse enter interaction.
 * @param {function} onMouseLeave - Event handler for mouse leave interaction.
 * @param {string | number | readonly string[]} value - The current value of the input.
 * @param {string | readonly string[]} value - The className for the input.
 *
 * @returns {JSX.Element} Rendered Input element with provided properties.
 */
const Input: React.ComponentType<InputProps> = ({
  placeHolder,
  disabled = false,
  onChange,
  variant = Variant.primary,
  type = "button",
  onMouseEnter,
  onMouseLeave,
  value,
  className,
}): JSX.Element => {
  return (
    <input
      type={type}
      className={`chime-input chime-input-${variant} ${className}`}
      disabled={disabled}
      placeholder={placeHolder}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      value={value}
    />
  );
};

export default Input;
