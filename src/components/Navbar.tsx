"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (pathname?.startsWith('/admin')) return null;

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/events', label: 'Events' },
        { path: '/fighters', label: 'Fighters' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/5 bg-white/90 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer group shrink-0 min-w-0">
                    <div className="bg-[#FE0002] rounded-sm transition-transform duration-300 shadow-sm shrink-0">
                        <Image
                            src="/favicon.ico"
                            alt="Logo"
                            width={40}
                            height={40}
                            priority
                            className="md:w-12 md:h-12"
                        />
                    </div>
                    <span className="font-display text-sm md:text-xl font-black tracking-tighter whitespace-nowrap uppercase text-black truncate">
                        CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-10 font-display font-medium text-xs tracking-[0.2em] uppercase">
                    {navLinks.map((item) => (
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

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="hidden md:inline-block px-6 py-2 font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg skew-x-[-15deg] active:scale-95 bg-black text-white hover:bg-[#FE0002] hover:text-white">
                        <span className="inline-block skew-x-[15deg]">Buy Tickets</span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-sm hover:bg-black/5 transition-colors"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileOpen ? (
                            <i className="fa-solid fa-xmark text-xl text-black"></i>
                        ) : (
                            <i className="fa-solid fa-bars text-xl text-black"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-md">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase transition-colors rounded-sm ${isActive(item.path)
                                    ? 'text-white bg-[#FE0002]'
                                    : 'text-gray-600 hover:text-black hover:bg-black/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-3 pb-1">
                            <button className="w-full px-6 py-3 font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all bg-black text-white hover:bg-[#FE0002]">
                                Buy Tickets
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
