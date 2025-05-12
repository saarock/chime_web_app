// components/Button.jsx
// All the necessary dependencies goes here
import React from "react";
import { ButtonProps } from "../../types";
import "../../styles/components/Button.css";


const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', variant = 'primary', disabled = false }) => {
    return (
        <button
            type={type}
            className={`chime-btn chime-btn-${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};


export default Button;
