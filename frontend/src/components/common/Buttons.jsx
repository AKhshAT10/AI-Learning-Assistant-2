import React from 'react';

const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = '',
    variant = "primary",
    size = "md",
}) => {
    const variantStyles = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        danger: 'btn-danger',
    };

    const sizeStyles = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[
                'btn',
                variantStyles[variant] || variantStyles.primary,
                sizeStyles[size] || sizeStyles.md,
                className,
            ].join(' ')}
        >
            {children}
        </button>
    );
};

export default Button;
