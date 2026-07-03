import React from 'react';

const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-[3px]',
    lg: 'h-9 w-9 border-[3px]',
};

const Spinner = ({ size = 'md', className = '' }) => {
    return (
        <div className={`flex items-center justify-center p-8 ${className}`}>
            <span
                className={`inline-block ${sizes[size] || sizes.md} rounded-full border-brand-500/25 border-t-brand-500 animate-spin`}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};

export default Spinner;
