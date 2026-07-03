import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Menu, User } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle.jsx';

const Header = ({ toggleSidebar }) => {
    const { user } = useAuth();
    return (
        <header className='sticky top-0 z-40 h-16 w-full border-b border-slate-200/70 bg-white/75 backdrop-blur-xl'>
            <div className='flex h-full items-center justify-between px-5 md:px-6'>
                <button
                    onClick={toggleSidebar}
                    className='inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 md:hidden'
                    aria-label='Toggle sidebar'
                >
                    <Menu size={22} />
                </button>

                <div className='hidden md:block' />

                <div className='flex items-center gap-2 sm:gap-3'>
                    <ThemeToggle />
                    <div className='flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-slate-100/70'>
                        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-teal text-white shadow-md shadow-brand-500/20'>
                            <User size={18} strokeWidth={2.4} />
                        </div>
                        <div className='hidden sm:block'>
                            <p className='text-sm font-semibold leading-tight text-slate-900'>
                                {user?.username || 'User'}
                            </p>
                            <p className='text-xs leading-tight text-slate-500'>
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
