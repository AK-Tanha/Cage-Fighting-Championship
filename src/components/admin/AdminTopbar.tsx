"use client";

import React from 'react';

interface AdminTopbarProps {
    onMenuOpen: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuOpen }) => {
    return (
        <header className="h-16 lg:h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-3">
                {/* Hamburger - mobile only */}
                <button
                    onClick={onMenuOpen}
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-sm hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                >
                    <i className="fa-solid fa-bars text-black"></i>
                </button>
                <h1 className="font-display font-black text-lg lg:text-xl uppercase tracking-tighter text-black">
                    Admin Dashboard
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user text-gray-500 text-sm"></i>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
