import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className='w-full'>
            <div className='relative border-b border-slate-200'>
                <nav className='flex gap-1 overflow-x-auto'>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.name;
                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`relative shrink-0 px-3 md:px-5 pb-3.5 pt-1 text-sm font-semibold transition-colors duration-200 ${
                                    isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className='absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-teal' />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className='py-6'>
                {tabs.map((tab) =>
                    tab.name === activeTab ? (
                        <div key={tab.name} className='reveal'>
                            {tab.content}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default Tabs;
