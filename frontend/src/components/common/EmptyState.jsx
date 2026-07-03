import React from 'react';
import { FileText, Plus } from 'lucide-react';

const EmptyState = ({ onActionClick, title, description, buttonText, icon: Icon = FileText }) => {
    return (
        <div className='flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/50 py-16 px-6 text-center'>
            <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/60'>
                <Icon className='h-8 w-8 text-slate-400' strokeWidth={1.75} />
            </div>
            <h3 className='mb-2 text-lg font-semibold text-slate-900'>{title}</h3>
            <p className='mb-8 max-w-sm text-sm leading-relaxed text-slate-500'>{description}</p>
            {buttonText && onActionClick && (
                <button onClick={onActionClick} className='btn btn-primary btn-md px-6'>
                    <Plus className='h-4 w-4' strokeWidth={2.5} />
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
