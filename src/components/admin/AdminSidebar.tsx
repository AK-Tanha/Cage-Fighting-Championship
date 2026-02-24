"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: 'fa-solid fa-chart-line' },
        { name: 'Fighters', path: '/admin/fighters', icon: 'fa-solid fa-user-ninja' },
        { name: 'Events', path: '/admin/events', icon: 'fa-solid fa-calendar-days' },
        { name: 'Settings', path: '/admin/settings', icon: 'fa-solid fa-gear' },
    ];

    return (
        <aside className="w-64 bg-black text-white flex-shrink-0 min-h-screen border-r border-white/10 flex flex-col fixed inset-y-0 left-0 z-50">
            <div className="h-20 flex items-center px-6 border-b border-white/10">
                <Link href="/" className="font-display font-black text-xl tracking-tighter uppercase flex items-center gap-2">
                    <span className="bg-[#FE0002] text-white w-8 h-8 flex items-center justify-center rounded-sm text-sm">C</span>
                    CFC <span className="text-[#FE0002]">ADMIN</span>
                </Link>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${isActive ? 'bg-[#FE0002] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <i className={`${item.icon} w-5 text-center`}></i>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' });
                        window.location.href = '/';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                >
                    <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
                    Exit Admin
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
