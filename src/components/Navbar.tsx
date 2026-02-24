"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar: React.FC = () => {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    // Helper to determine active state. Simplified logic: check if pathname starts with the section, or exact match for home.
    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/5 bg-white/90 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-[#FE0002] rounded-sm transition-transform duration-300 shadow-sm">
                        <Image
                            src="/favicon.ico"
                            alt="Logo"
                            width={48}
                            height={48}
                            priority
                        />
                    </div>
                    <span className="font-display text-lg md:text-xl font-black tracking-tighter whitespace-nowrap uppercase text-black">
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
                            className={`transition-colors relative pb-1 ${isActive(item.path)
                                ? 'text-[#FE0002]'
                                : 'text-gray-500 hover:text-black'
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
                    <button className="px-6 py-2 font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 bg-black text-white hover:bg-[#FE0002] hover:text-white">
                        Buy Tickets
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
