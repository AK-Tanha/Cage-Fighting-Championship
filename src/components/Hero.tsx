"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const eventImages = [
        "https://picsum.photos/1920/1080?random=1",
        "https://picsum.photos/1920/1080?random=2",
        "https://picsum.photos/1920/1080?random=3",
        "https://picsum.photos/1920/1080?random=4",
        "https://picsum.photos/1920/1080?random=5",
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [eventImages.length]);

    return (
        <section className="relative min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {eventImages.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt=""
                        aria-hidden
                        className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              ${index === currentImageIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}
            `}
                        width={1920}
                        height={1080}
                        loading="lazy"
                    />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#FE0002] text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-sm">
                            LIVE NOW
                        </span>
                        <span className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                            CFC 101: LAS VEGAS
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] mb-8 uppercase tracking-[-0.04em] italic text-black">
                        WHERE <span className="text-[#FE0002]">LEGENDS</span>
                        <br /> ARE FORGED
                    </h1>

                    <p className="text-base md:text-lg text-gray-700 mb-10 max-w-lg leading-relaxed font-medium">
                        Experience the world&apos;s premier mixed martial arts promotion.
                        Witness elite athletes collide inside the cage.
                    </p>

                    <div className="flex flex-wrap gap-6 mt-12">
                        <Link
                            href="/events"
                            className="bg-[#FE0002] text-white px-10 py-5 font-display font-black uppercase tracking-[0.2em]
              hover:bg-black hover:text-white transition-all border-2 border-[#FE0002]
              hover:border-black transform hover:-translate-y-1"
                        >
                            Get Tickets
                        </Link>

                        <Link
                            href="/fighters"
                            className="border-2 border-black/30 text-black px-10 py-5 font-display font-bold uppercase tracking-[0.2em]
              hover:border-black transition-all transform hover:-translate-y-1"
                        >
                            View Roster
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute right-20 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
            <div className="absolute right-40 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
        </section>
    );
};

export default Hero;
