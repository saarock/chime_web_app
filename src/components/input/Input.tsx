import React from 'react'
import { InputProps } from '../../types';
import "../../styles/components/Input.css";


const Input: React.FC<InputProps> = ({ placeHolder, disabled, onChange, variant, type }) => {
    return (
        <input
            type={type}
            className={`chime-input chime-input-${variant}`}
            disabled={disabled}
            placeholder={placeHolder}
            onChange={onChange}

        />
    )
}

export default Input