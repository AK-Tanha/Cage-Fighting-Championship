"use client";

import React from 'react';

const AdminTopbar: React.FC = () => {
    return (
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
            <div>
                <h1 className="font-display font-black text-xl uppercase tracking-tighter text-black">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user text-gray-500"></i>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
