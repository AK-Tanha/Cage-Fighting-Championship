"use client";

import { getAllHeroSlides } from "@/lib/api";
import { HeroSlide } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

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
                absolute inset-0 w-full h-full object-cover
                transition-all duration-1000 ease-in-out
                ${index === currentSlideIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}
            `}
            width={1920}
            height={1080}
            priority={index === 0 || index === currentSlideIndex}
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
        return (
            <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-[#FE0002] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-display font-black uppercase tracking-widest text-xs text-gray-400">Loading Cage Fight...</p>
                </div>
            </section>
        );
    }

    // Default content if no slides are found
    if (slides.length === 0) {
        return (
            <section className="relative min-h-screen overflow-hidden flex items-center bg-black">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="/og-fighter-default.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                        fill
                        priority
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
        <section className="relative min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center">
            {/* Background Images */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {backgroundImages}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6 animate-fade-in">
                        <span className="bg-[#FE0002] text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-sm">
                            FEATURED
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mb-8 uppercase tracking-[-0.04em] italic text-black transition-all duration-700">
                        {currentSlide.title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {i === 1 ? <span className="text-[#FE0002]">{word} </span> : word + ' '}
                            </React.Fragment>
                        ))}
                    </h1>

                    <p className="text-base md:text-lg text-gray-700 mb-10 max-w-lg leading-relaxed font-medium">
                        {currentSlide.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-6 mt-12">
                        {currentSlide.link && (
                            <Link
                                href={currentSlide.link}
                                className="bg-[#FE0002] text-white px-10 py-5 font-display font-black uppercase tracking-[0.2em]
                                    hover:bg-black hover:text-white transition-all border-2 border-[#FE0002]
                                    hover:border-black transform hover:-translate-y-1"
                            >
                                Learn More
                            </Link>
                        )}

                        <Link
                            href="/events"
                            className="border-2 border-black/30 text-black px-10 py-5 font-display font-bold uppercase tracking-[0.2em]
                                hover:border-black transition-all transform hover:-translate-y-1"
                        >
                            Get Tickets
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
