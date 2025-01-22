import React from 'react'
import { ButtonProps } from '../Types/ButtonProps';

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;