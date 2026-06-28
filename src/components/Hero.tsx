"use client";

import { getAllHeroSlides } from "@/lib/api";
import { HeroSlide } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HeroSkeleton } from "./Skeleton";

const Hero: React.FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const { data: slides = [], isLoading } = useQuery({
        queryKey: ["hero-slides"],
        queryFn: async () => {
            const data = await getAllHeroSlides();
            return (data || [])
                .filter((slide: HeroSlide) => slide.is_active)
                .sort((a: HeroSlide, b: HeroSlide) => (a.order || 0) - (b.order || 0));
        },
    });

    React.useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const currentSlide = useMemo(() => slides[currentSlideIndex], [slides, currentSlideIndex]);

    const backgroundImages = useMemo(() => slides.map((slide: HeroSlide, index: number) => (
        <Image
            key={slide._id}
            src={slide.image_url || "/og-fighter-default.jpg"}
            alt={slide.title || "Hero Slide"}
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

    const slideIndicators = useMemo(() => slides.map((_: HeroSlide, index: number) => (
        <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-12 h-1 transition-all duration-300 ${index === currentSlideIndex ? 'bg-[#FE0002] w-16' : 'bg-black/20 hover:bg-black/40'}`}
        />
    )), [slides.length, currentSlideIndex]);

    if (isLoading) {
        return <HeroSkeleton />;
    }

    if (slides.length === 0) {
        return (
            <section className="relative min-h-[80vh] md:min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center mt-20">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/og-fighter-default.jpg"
                        alt="Background"
                        className="w-full h-full object-cover object-top"
                        fill
                        priority
                        sizes="100vw"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 -mt-20">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <span className="bg-[#FE0002] text-white text-[10px] md:text-[11px] font-black px-3 md:px-4 py-1.5 uppercase tracking-[0.25em] skew-x-[-12deg] shadow-lg shadow-[#FE0002]/20">
                                <span className="inline-block skew-x-[12deg]">CFC</span>
                            </span>
                            <div className="h-[2px] w-8 md:w-12 bg-black/10"></div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] mb-6 md:mb-8 uppercase tracking-[-0.05em] italic text-black drop-shadow-sm">
                            CAGE <span className="text-[#FE0002]">FIGHTING</span>
                            <br /> CHAMPIONSHIP
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mb-8 md:mb-12">
                            <p className="text-base md:text-xl text-gray-800 max-w-lg leading-relaxed font-semibold border-l-4 border-[#FE0002] pl-4 md:pl-6 py-1">
                                The global leader in elite MMA competition.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mt-8 md:mt-12">
                            <Link
                                href="/events"
                                className="group relative bg-[#FE0002] text-white px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden text-center text-sm md:text-base"
                            >
                                <span className="relative z-10">Get Tickets</span>
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                            <Link
                                href="/fighters"
                                className="group relative border-2 border-black text-black px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden hover:text-white text-center text-sm md:text-base"
                            >
                                <span className="relative z-10">View Fighters</span>
                                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-[80vh] md:min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center mt-20">
            <div className="absolute inset-0 z-0 pointer-events-none">
                {backgroundImages}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
            </div>

            <div
                key={currentSlideIndex}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 -mt-20"
            >
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6 md:mb-8 animate-[fade-in_0.5s_ease-out_both,slide-in-left_0.5s_ease-out_both]">
                        <span className="bg-[#FE0002] text-white text-[10px] md:text-[11px] font-black px-3 md:px-4 py-1.5 uppercase tracking-[0.25em] skew-x-[-12deg] shadow-lg shadow-[#FE0002]/20">
                            <span className="inline-block skew-x-[12deg]">FEATURED</span>
                        </span>
                        <div className="h-[2px] w-8 md:w-12 bg-black/10"></div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] mb-6 md:mb-8 uppercase tracking-[-0.05em] italic text-black drop-shadow-sm animate-[fade-in_0.6s_ease-out_0.1s_both,slide-in-left_0.6s_ease-out_0.1s_both]">
                        {currentSlide?.title?.split(' ').map((word: string, i: number, arr: string[]) => (
                            <React.Fragment key={i}>
                                {i === 1 ? <span className="text-[#FE0002]">{word}</span> : word}
                                {i < arr.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mb-8 md:mb-12 animate-[fade-in_0.6s_ease-out_0.2s_both,slide-in-left_0.6s_ease-out_0.2s_both]">
                        <p className="text-base md:text-xl text-gray-800 max-w-lg leading-relaxed font-semibold border-l-4 border-[#FE0002] pl-4 md:pl-6 py-1">
                            {currentSlide?.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mt-8 md:mt-12 animate-[slide-in-bottom_0.6s_ease-out_0.3s_both]">
                        {currentSlide.link && (
                            <Link
                                href={currentSlide.link}
                                className="group relative bg-[#FE0002] text-white px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden text-center text-sm md:text-base"
                            >
                                <span className="relative z-10">Learn More</span>
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                        )}

                        <Link
                            href="/events"
                            className="group relative border-2 border-black text-black px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden hover:text-white text-center text-sm md:text-base"
                        >
                            <span className="relative z-10">Get Tickets</span>
                            <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
                {slideIndicators}
            </div>

            <div className="absolute right-20 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
            <div className="absolute right-40 inset-y-0 w-px bg-black/5 hidden lg:block"></div>
        </section>
    );
};

export default Hero;
