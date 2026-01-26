"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar: React.FC = () => {
    const pathname = usePathname();

    // Helper to determine active state. Simplified logic: check if pathname starts with the section, or exact match for home.
    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-[#FE0002] p-2 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-300">
                        <i className="fa-solid fa-hand-fist text-white -rotate-45 group-hover:rotate-0 transition-transform"></i>
                    </div>
                    <span className="font-display text-lg md:text-xl font-black tracking-tighter text-white whitespace-nowrap uppercase">
                        CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10 font-display font-medium text-xs tracking-[0.2em] uppercase">
                    {[
                        { path: '/', label: 'Home' },
                        { path: '/events', label: 'Events' },
                        { path: '/fighters', label: 'Fighters' }
                    ].map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`hover:text-[#FE0002] transition-colors relative pb-1 ${isActive(item.path) ? 'text-[#FE0002]' : 'text-gray-400'
                                }`}
                        >
                            {item.label}
                            {isActive(item.path) && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FE0002]"></span>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-white text-black px-6 py-2 font-display font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FE0002] hover:text-white transition-all shadow-lg active:scale-95">
                        Buy Tickets
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
