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
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#FE0002] text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-sm">LIVE NOW</span>
                        <span className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">CFC 101: LAS VEGAS</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] mb-8 uppercase tracking-[-0.04em] text-glow-red italic">
                        WHERE <span className="text-[#FE0002]">LEGENDS</span> <br /> ARE FORGED
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-light tracking-wide">
                        Experience the world's premier mixed martial arts promotion. Witness the elite athletes as they step into the Octagon to battle for championship titles.
                    </p>
                    <div className="flex flex-wrap gap-6 mt-12">
                        <Link
                            href="/events"
                            className="bg-[#FE0002] text-white px-10 py-5 font-display font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all inline-block text-center border-2 border-[#FE0002] hover:border-white shadow-[0_0_30px_rgba(254,0,2,0.5)] transform hover:-translate-y-1"
                        >
                            Get Tickets
                        </Link>
                        <Link
                            href="/fighters"
                            className="bg-transparent text-white px-10 py-5 font-display font-bold uppercase tracking-[0.2em] border-2 border-white/20 hover:border-white transition-all inline-block text-center transform hover:-translate-y-1"
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
