"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastY = React.useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 80 && y > lastY.current) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

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
        <>
            <nav className={`
            fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/5 bg-white/90
            transition-all duration-300
            pt-[env(safe-area-inset-top)]
            ${hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'}
        `}>
            <div className="max-w-7xl mx-auto px-4 h-14 lg:h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 cursor-pointer group shrink-0 min-w-0">
                    <div className="bg-[#FE0002] rounded-sm transition-transform duration-300 shadow-sm shrink-0">
                        <Image
                            src="/favicon.ico"
                            alt="Logo"
                            width={34}
                            height={34}
                            priority
                            className="lg:w-12 lg:h-12"
                        />
                    </div>
                    <span className="font-display text-sm lg:text-xl font-black tracking-tighter whitespace-nowrap uppercase text-black truncate">
                        <span className="lg:hidden">CFC</span>
                        <span className="hidden lg:inline">CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span></span>
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
                    <Link
                        href="/events"
                        className="hidden md:inline-block px-6 py-2 font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg skew-x-[-15deg] active:scale-95 bg-black text-white hover:bg-[#FE0002] hover:text-white"
                    >
                        <span className="inline-block skew-x-[15deg]">Buy Tickets</span>
                    </Link>

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
        </nav>

        {/* Mobile full-screen menu (sibling of <nav>: backdrop-filter on <nav> becomes the
            containing block for fixed children, collapsing height; render outside the nav) */}
        <div className={`
            md:hidden fixed top-[calc(3.5rem+env(safe-area-inset-top))] left-0 right-0 bottom-0 z-30 bg-white
            transition-all duration-300
            ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
            <div className="px-6 py-8 space-y-2 min-h-full overflow-y-auto">
                {navLinks.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-4 font-display font-black text-2xl tracking-tight uppercase transition-colors rounded-sm ${isActive(item.path)
                            ? 'text-[#FE0002] bg-black/5'
                            : 'text-black hover:text-[#FE0002] hover:bg-black/5'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
                <div className="pt-2">
                    <Link
                        href="/events"
                        onClick={() => setMobileOpen(false)}
                        className="block text-center w-full px-6 py-4 font-display font-black text-sm uppercase tracking-[0.2em] transition-all bg-[#FE0002] text-white hover:bg-black"
                    >
                        Buy Tickets
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default Navbar;
