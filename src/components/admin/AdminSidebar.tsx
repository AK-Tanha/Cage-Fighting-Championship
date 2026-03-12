"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: 'fa-solid fa-chart-line' },
        { name: 'Hero Section', path: '/admin/hero', icon: 'fa-solid fa-images' },
        { name: 'Fighters', path: '/admin/fighters', icon: 'fa-solid fa-user-ninja' },
        { name: 'Events', path: '/admin/events', icon: 'fa-solid fa-calendar-days' },
        { name: 'Settings', path: '/admin/settings', icon: 'fa-solid fa-gear' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-black text-white flex-shrink-0 min-h-screen border-r border-white/10 flex flex-col
                fixed inset-y-0 left-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <div className="h-16 lg:h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/" className="font-display font-black text-xl tracking-tighter uppercase flex items-center gap-2">
                        <span className="bg-[#FE0002] text-white w-8 h-8 flex items-center justify-center rounded-sm text-sm">C</span>
                        CFC <span className="text-[#FE0002]">ADMIN</span>
                    </Link>
                    {/* Close button on mobile */}
                    <button
                        onClick={onClose}
                        className="ml-auto lg:hidden text-gray-400 hover:text-white transition-colors"
                    >
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
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
        </>
    );
};

export default AdminSidebar;
