import React, { JSX } from 'react'
import { InputProps, Variant } from '../../types';
import "../../styles/components/Input.css";

/**
 * 
 * @param {string} param0.placeholder - Input placehoder
 * @param {boolean} param0.disabled - input disabled
 * @returns {JSX.Element}
 */
const Input: React.ComponentType<InputProps> = ({ placeHolder, disabled = false,
    onChange, variant = Variant.primary, type = "button", onMouseEnter, onMouseLeave,
    value,
}): JSX.Element => {

    return (
        <input
            type={type}
            className={`chime-input chime-input-${variant}`}
            disabled={disabled}
            placeholder={placeHolder}
            onChange={onChange}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            value={value}
        />
    )
}

export default Input