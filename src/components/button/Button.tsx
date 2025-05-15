// Import necessary dependencies
import React, { JSX } from "react"; // React library for JSX syntax and components
import { ButtonProps } from "../../types"; // TypeScript types for props
import "../../styles/components/Button.css"; // Css import
/**
 * Button component that renders a customizable button element.
 * 
 * @param {ButtonProps} param0 - The props for the Button component.
 * @param {string} param0.text - The text to display on the button.
 * @param {Function} param0.onClick - The click handler function for the button.
 * @param {string} [param0.type='button'] - The type of the button, can be 'button', 'submit', or 'reset'.
 * @param {string} [param0.variant='primary'] - The variant of the button, which affects its styling. 
 *        Possible values: 'primary', 'secondary', 'ternary' etc.
 * @param {boolean} [param0.disabled=false] - If true, the button will be disabled and cannot be clicked.
 * 
 * @returns {JSX.Element} The Button component.
 */
const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', variant = 'primary', disabled = false, children, className }): JSX.Element => {
    return (
        <button
            type={type} // The type of the button (e.g., 'button', 'submit', etc.)
            className={`chime-btn chime-btn-${variant} ${className}`} // Dynamically applies styles based on the variant (e.g., 'primary', 'secondary')
            onClick={onClick} // The function to execute when the button is clicked
            disabled={disabled} // Disables the button if true

        >

            {children}
            {text} {/* The text or icon to display on the button */}
        </button>
    );
};

export default Button;
