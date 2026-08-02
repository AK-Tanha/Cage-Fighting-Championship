"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="bg-black text-white py-10 lg:py-16 border-t border-black/10">
            <div className="max-w-7xl mx-auto px-5 lg:px-6 pb-2 lg:pb-0">
                {/* Compact brand bar for mobile */}
                <div className="flex items-center justify-between mb-8 lg:hidden">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#FE0002] rounded-sm">
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={28}
                                height={28}
                            />
                        </div>
                        <span className="font-display text-base font-black tracking-tight uppercase">
                            CFC
                        </span>
                    </div>
                    <Link
                        href="/events"
                        className="px-5 py-2.5 bg-[#FE0002] text-white font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-sm"
                    >
                        Buy Tickets
                    </Link>
                </div>

                <div className="hidden lg:grid grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-[#FE0002] rounded-sm">
                                <Image
                                    src="/favicon.ico"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <span className="font-display text-xl font-black tracking-tighter uppercase">
                                CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                            The global leader in elite MMA competition. Based in the shadows of the cage, built on the blood of champions. Join the revolution.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-display font-bold uppercase mb-4 tracking-widest text-[#FE0002]">Navigation</h4>
                        <ul className="text-gray-400 text-sm space-y-3">
                            <li className="hover:text-white cursor-pointer transition-colors">
                                <Link href="/events">Fight Schedule</Link>
                            </li>
                            <li className="hover:text-white cursor-pointer transition-colors">
                                <Link href="/fighters">Fighter Rankings</Link>
                            </li>
                            <li className="hover:text-white cursor-pointer transition-colors">Fight Pass</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold uppercase mb-4 tracking-widest text-[#FE0002]">Socials</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/profile.php?id=61569594516700" className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-sm">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-sm">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-sm">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile nav + socials */}
                <div className="lg:hidden space-y-8">
                    <div className="flex items-center justify-around py-4 border-y border-white/10">
                        {[
                            { label: 'Events', path: '/events' },
                            { label: 'Fighters', path: '/fighters' },
                            { label: 'Fight Pass', path: '/' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center gap-3">
                        <a href="https://www.facebook.com/profile.php?id=61569594516700" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-full">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-full">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#" className="w-11 h-11 flex items-center justify-center bg-white/10 text-white hover:bg-[#FE0002] transition-all rounded-full">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <p>&copy; 2024 CFC Global Promotions. All Rights Reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
