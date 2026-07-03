import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FileText, User, LogOut, BookOpen, X, GraduationCap } from 'lucide-react';

const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/documents', icon: FileText, text: 'Documents' },
    { to: '/flashcards', icon: BookOpen, text: 'Flashcards' },
    { to: '/profile', icon: User, text: 'Profile' },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={toggleSidebar}
                aria-hidden='true'
            />

            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-slate-200/70 bg-white/85 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:w-64 md:shrink-0 md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className='flex h-16 items-center justify-between border-b border-slate-200/70 px-5'>
                    <Link to='/dashboard' className='flex items-center gap-2.5' onClick={toggleSidebar}>
                        <span className='brand-tile h-9 w-9'>
                            <GraduationCap className='h-5 w-5' strokeWidth={2.4} />
                        </span>
                        <span className='text-base font-bold tracking-tight text-slate-900'>Preppy</span>
                    </Link>
                    <button onClick={toggleSidebar} className='text-slate-400 hover:text-slate-700 md:hidden'>
                        <X size={22} />
                    </button>
                </div>

                <nav className='flex-1 space-y-1 px-3 py-6'>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-brand-500 to-brand-teal text-white shadow-lg shadow-brand-500/25'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <link.icon
                                        size={18}
                                        strokeWidth={2.4}
                                        className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}
                                    />
                                    {link.text}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className='border-t border-slate-200/70 px-3 py-4'>
                    <button
                        onClick={handleLogout}
                        className='group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600'
                    >
                        <LogOut size={18} strokeWidth={2.4} className='transition-transform duration-200 group-hover:scale-110' />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
