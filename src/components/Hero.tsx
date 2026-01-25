"use client";

import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            {/* Background with pseudo-video feel */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://picsum.photos/seed/mma_fight/1920/1080?grayscale"
                    alt="Octagon"
                    className="w-full h-full object-cover opacity-30 scale-110 animate-[pulse_10s_infinite]"
                />
                <div className="absolute inset-0 hero-gradient"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-6 animate-bounce">
                        <span className="bg-[#FE0002] text-xs font-bold px-2 py-1 rounded">LIVE NOW</span>
                        <span className="text-white/80 font-bold uppercase tracking-widest text-sm">CFC 101: LAS VEGAS</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-oswald font-black leading-[0.85] mb-6 italic tracking-tighter">
                        WHERE <span className="text-[#FE0002]">LEGENDS</span> <br /> ARE FORGED
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed font-light">
                        Experience the world's premier mixed martial arts promotion. Witness the elite athletes as they step into the Octagon to battle for the CFC World Championship titles.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/events"
                            className="bg-white text-black px-10 py-4 font-oswald font-black uppercase tracking-widest border-2 border-white hover:bg-[#FE0002] hover:border-[#FE0002] hover:text-white transition-all transform hover:scale-105 inline-block text-center"
                        >
                            Watch Fight Pass
                        </Link>
                        <Link
                            href="/fighters"
                            className="bg-transparent text-white px-10 py-4 font-oswald font-black uppercase tracking-widest border-2 border-white/20 hover:border-[#FE0002] transition-all transform hover:scale-105 inline-block text-center"
                        >
                            View Roster
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative vertical lines */}
            <div className="absolute right-20 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block"></div>
            <div className="absolute right-40 top-0 bottom-0 w-[1px] bg-white/5 hidden lg:block"></div>
        </section>
    );
};

export default Hero;
