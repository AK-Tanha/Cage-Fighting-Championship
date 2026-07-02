"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api';

interface AdminTopbarProps {
    onMenuOpen: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin';
    };

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
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                {currentUser?.username && <div className="text-sm text-gray-600">Hello {currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</div>}
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label="User menu"
                >
                    <i className="fa-solid fa-user text-gray-500 text-sm"></i>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/10 rounded-sm shadow-lg py-1">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket text-gray-400"></i>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default AdminTopbar;
