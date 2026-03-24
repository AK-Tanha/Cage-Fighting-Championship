"use client";

import { getAllHeroSlides } from "@/lib/api";
import { HeroSlide } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { HeroSkeleton } from "./Skeleton";

const Hero: React.FC = () => {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await getAllHeroSlides();
                // Filter active slides and sort by order
                const activeSlides = data
                    .filter((slide: HeroSlide) => slide.is_active)
                    .sort((a: HeroSlide, b: HeroSlide) => (a.order || 0) - (b.order || 0));

                setSlides(activeSlides);
            } catch (error) {
                console.error("Error fetching hero slides:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const currentSlide = useMemo(() => slides[currentSlideIndex], [slides, currentSlideIndex]);

    const backgroundImages = useMemo(() => slides.map((slide, index) => (
        <Image
            key={slide._id}
            src={slide.image_url || "/og-fighter-default.jpg"}
            alt={slide.title}
            aria-hidden
            className={`
                absolute inset-0 w-full h-full object-cover object-top origin-top
                transition-all duration-1000 ease-in-out
                ${index === currentSlideIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}
            `}
            fill
            sizes="100vw"
            priority={index === 0}
            quality={90}
        />
    )), [slides, currentSlideIndex]);

    const slideIndicators = useMemo(() => slides.map((_, index) => (
        <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-12 h-1 transition-all duration-300 ${index === currentSlideIndex ? 'bg-[#FE0002] w-16' : 'bg-black/20 hover:bg-black/40'}`}
        />
    )), [slides.length, currentSlideIndex]);

    if (loading) {
        return <HeroSkeleton />;
    }

    // Default content if no slides are found
    if (slides.length === 0) {
        return (
            <section className="relative min-h-screen overflow-hidden flex items-center bg-black mt-24">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="/og-fighter-default.jpg"
                        alt="Background"
                        className="w-full h-full object-cover object-top"
                        fill
                        priority
                        sizes="100vw"
                        quality={90}
                    />
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 text-white">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] mb-8 uppercase tracking-[-0.04em] italic">
                        CAGE <span className="text-[#FE0002]">FIGHTING</span>
                        <br /> CHAMPIONSHIP
                    </h1>
                </div>
            </section>
        );
    }



    return (
        <section className="relative min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center mt-20">
            {/* Background Images */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {backgroundImages}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div 
                key={currentSlideIndex}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 -mt-20"
            >
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-8 animate-[fade-in_0.5s_ease-out_both,slide-in-left_0.5s_ease-out_both]">
                        <span className="bg-[#FE0002] text-white text-[11px] font-black px-4 py-1.5 uppercase tracking-[0.25em] skew-x-[-12deg] shadow-lg shadow-[#FE0002]/20">
                            <span className="inline-block skew-x-[12deg]">FEATURED</span>
                        </span>
                        <div className="h-[2px] w-12 bg-black/10"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] mb-8 uppercase tracking-[-0.05em] italic text-black drop-shadow-sm animate-[fade-in_0.6s_ease-out_0.1s_both,slide-in-left_0.6s_ease-out_0.1s_both]">
                        {currentSlide.title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {i === 1 ? <span className="text-[#FE0002]">{word} </span> : word + ' '}
                            </React.Fragment>
                        ))}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-12 animate-[fade-in_0.6s_ease-out_0.2s_both,slide-in-left_0.6s_ease-out_0.2s_both]">
                        <p className="text-lg md:text-xl text-gray-800 max-w-lg leading-relaxed font-semibold border-l-4 border-[#FE0002] pl-6 py-1">
                            {currentSlide.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-12 animate-[slide-in-bottom_0.6s_ease-out_0.3s_both]">
                        {currentSlide.link && (
                            <Link
                                href={currentSlide.link}
                                className="group relative bg-[#FE0002] text-white px-12 py-5 font-display font-black uppercase tracking-[0.2em]
                                    transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Learn More</span>
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                        )}

                        <Link
                            href="/events"
                            className="group relative border-2 border-black text-black px-12 py-5 font-display font-black uppercase tracking-[0.2em]
                                transition-all duration-300 overflow-hidden hover:text-white"
                        >
                            <span className="relative z-10">Get Tickets</span>
                            <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slide Navigation Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slideIndicators}
            </div>

            {/* Decorative lines */}
            <div className="absolute right-20 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
            <div className="absolute right-40 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
        </section>
    );
};

export default Hero;
