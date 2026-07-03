import React from 'react';

const PageHeader = ({ title, subtitle, children }) => {
    return (
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8'>
            <div>
                <h1 className='text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight'>
                    {title}
                </h1>
                {subtitle && (
                    <p className='text-slate-500 text-sm mt-1.5'>
                        {subtitle}
                    </p>
                )}
            </div>
            {children && <div className='shrink-0'>{children}</div>}
        </div>
    );
};

export default PageHeader;
