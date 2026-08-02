"use client";

import { getAllHeroSlides } from "@/lib/api";
import { HeroSlide } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HeroSkeleton } from "./Skeleton";

const Kicker: React.FC<{ label: string }> = ({ label }) => (
    <div className="inline-flex items-center gap-3">
        <span className="inline-flex items-center gap-2 bg-[#FE0002] text-white font-display font-black text-[10px] md:text-[11px] uppercase tracking-[0.25em] px-3 md:px-4 py-2 skew-x-[-12deg] shadow-lg shadow-[#FE0002]/30">
            <span className="inline-block w-1.5 h-1.5 bg-white/90 rotate-45" />
            <span className="inline-block skew-x-[12deg]">{label}</span>
        </span>
        <span className="h-px w-10 md:w-16 bg-gradient-to-r from-white/70 to-transparent" />
    </div>
);

const HeroCTA: React.FC<{
    href: string;
    children: React.ReactNode;
    variant?: "solid" | "outline";
}> = ({ href, children, variant = "solid" }) =>
    variant === "solid" ? (
        <Link
            href={href}
            className="group relative inline-flex items-center justify-center gap-2 bg-[#FE0002] text-white px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.18em] text-sm md:text-base transition-all duration-300 overflow-hidden shadow-xl shadow-[#FE0002]/20 active:scale-[0.98]"
        >
            <span className="relative z-10">{children}</span>
            <span className="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1">
                →</span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
    ) : (
        <Link
            href={href}
            className="group relative inline-flex items-center justify-center gap-3 border-2 border-white/90 text-white px-8 md:px-12 py-4 md:py-5 font-display font-black uppercase tracking-[0.2em] text-sm md:text-base transition-all duration-300 overflow-hidden backdrop-blur-[2px] bg-white/5 active:scale-[0.98]"
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-[#FE0002] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </Link>
    );

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

    const slideIndicators = useMemo(() => slides.map((_: HeroSlide, index: number) => (
        <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-[3px] rounded-full transition-all duration-500 ${
                index === currentSlideIndex
                    ? "w-10 bg-[#FE0002]"
                    : "w-5 bg-white/50 hover:bg-white/80"
            }`}
        />
    )), [slides.length, currentSlideIndex]);

    const renderContent = (c: { label: string; title: string; subtitle?: string; link?: string }) => (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6">
            <div className="relative max-w-3xl">
                <div className="mb-6 md:mb-9 animate-[fade-in_0.5s_ease-out_both,slide-in-left_0.5s_ease-out_both]">
                    <Kicker label={c.label} />
                </div>

                <h1 className="font-display font-black italic leading-[0.92] mb-7 md:mb-10 uppercase tracking-[-0.03em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] animate-[fade-in_0.6s_ease-out_0.1s_both,slide-in-left_0.6s_ease-out_0.1s_both]">
                    <span className="block text-[26px] sm:text-5xl md:text-6xl lg:text-7xl">
                        {c.title.split(' ').map((word, i, arr) => (
                            <React.Fragment key={i}>
                                {i === 1 ? (
                                    <span className="text-[#FE0002]">{word}</span>
                                ) : (
                                    word
                                )}
                                {i < arr.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </span>
                </h1>

                {c.subtitle && (
                    <div className="mb-9 md:mb-12 max-w-xl animate-[fade-in_0.6s_ease-out_0.2s_both,slide-in-left_0.6s_ease-out_0.2s_both]">
                        <p className="text-sm md:text-lg text-white/90 leading-relaxed font-medium border-l-[3px] border-[#FE0002] pl-4 md:pl-6 py-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                            {c.subtitle}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-[slide-in-bottom_0.6s_ease-out_0.3s_both]">
                    {c.link && <HeroCTA href={c.link} variant="solid">Learn More</HeroCTA>}
                    <HeroCTA href="/events" variant="outline">Get Tickets</HeroCTA>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return <HeroSkeleton />;
    }

    return (
        <section className="relative min-h-[80vh] md:min-h-screen max-h-[900px] 2xl:max-h-[1000px] overflow-hidden flex items-center mt-14 lg:mt-20">
            {/* Background image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={currentSlide?.image_url || "/og-fighter-default.jpg"}
                    alt={currentSlide?.title || "Hero"}
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover object-top origin-center scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 1600px"
                    priority
                    quality={80}
                />

                {/* Cinematic darkening — directional, keeps the right/top image visible */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-l from-black/25 to-transparent md:to-black/0" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Fine decorative geometry */}
                <svg
                    className="absolute right-0 top-0 h-full w-[38%] max-w-[560px] hidden md:block text-white/10"
                    viewBox="0 0 200 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <polygon
                        points="100,20 180,80 180,200 100,260 20,200 20,80"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                    />
                    <polygon
                        points="100,80 150,110 150,170 100,200 50,170 50,110"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    <line x1="100" y1="20" x2="100" y2="260" stroke="currentColor" strokeWidth="1" />
                    <line x1="20" y1="140" x2="180" y2="140" stroke="currentColor" strokeWidth="1" />
                </svg>

                <svg
                    className="absolute right-6 bottom-12 w-32 md:w-44 text-[#FE0002]/20"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" />
                </svg>
            </div>

            {/* Content */}
            {renderContent({
                label: "Featured",
                title: slides.length
                    ? currentSlide?.title || "Cage Fighting"
                    : "Cage Fighting",
                subtitle: currentSlide?.subtitle,
                link: currentSlide?.link || undefined,
            })}

            {/* Slide indicators */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
                {slideIndicators}
            </div>
        </section>
    );
};

export default Hero;