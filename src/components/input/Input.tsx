import React from 'react'
import { InputProps, Variant } from '../../types';
import "../../styles/components/Input.css";


const Input: React.FC<InputProps> = ({ placeHolder, disabled=false, 
    onChange, variant=Variant.primary, type="button", onMouseEnter,onMouseLeave,
    value,
}) => {

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