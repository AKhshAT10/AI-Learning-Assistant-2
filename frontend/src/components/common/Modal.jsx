import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-screen items-center justify-center px-4 py-8'>
                <div
                    className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm'
                    onClick={onClose}
                    aria-hidden='true'
                />
                <div
                    className='card relative z-10 w-full max-w-lg p-8'
                    style={{ animation: 'rise 0.3s var(--ease-soft) both' }}
                    role='dialog'
                    aria-modal='true'
                >
                    <button
                        onClick={onClose}
                        aria-label='Close'
                        className='absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700'
                    >
                        <X className='h-5 w-5' strokeWidth={2} />
                    </button>
                    {title && (
                        <div className='mb-6 pr-10'>
                            <h3 className='text-xl font-semibold tracking-tight text-slate-900'>
                                {title}
                            </h3>
                        </div>
                    )}
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
