import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className='flex h-screen bg-canvas text-slate-900'>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header toggleSidebar={toggleSidebar} />
        <main className='relative flex-1 overflow-y-auto overflow-x-hidden'>
          <div className='pointer-events-none absolute inset-0 dot-grid opacity-30' />
          <div className='relative mx-auto max-w-7xl px-5 py-8 md:px-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
