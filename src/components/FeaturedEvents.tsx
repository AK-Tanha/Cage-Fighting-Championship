"use client";

import { getAllEvents } from "@/lib/api";
import { FightEvent } from "@/types";
import { EVENTS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const EventCard: React.FC<{ event: FightEvent }> = ({ event }) => (
    <Link
        href={`/events/${event._id}`}
        className="group relative bg-white border border-black/5 hover:border-[#FE0002]/30 transition-all overflow-hidden flex flex-col shadow-sm hover:shadow-lg"
    >
        <div className="aspect-[16/9] relative overflow-hidden">
            <Image
                src={event.image_url || "/og-fighter-default.jpg"}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                    {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
            <h3 className="font-display font-black uppercase text-sm md:text-base tracking-tighter leading-tight mb-2 group-hover:text-[#FE0002] transition-colors">
                {event.name}
            </h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-auto">
                <i className="fa-solid fa-location-dot text-[#FE0002]"></i>
                {event.location}
            </p>
        </div>
    </Link>
);

const FeaturedEvents: React.FC = () => {
    const { data: events, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            try {
                const data = await getAllEvents();
                return Array.isArray(data) ? data : [];
            } catch {
                return EVENTS;
            }
        },
    });

    const [tab, setTab] = React.useState<'upcoming' | 'past'>('upcoming');

    const upcomingEvents = useMemo(
        () => (events ?? []).filter((e) => new Date(e.date) >= new Date()).slice(0, 3),
        [events],
    );
    const pastEvents = useMemo(
        () => (events ?? []).filter((e) => new Date(e.date) < new Date()).slice(0, 3),
        [events],
    );

    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [scrollIndex, setScrollIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);
    const timerRef = React.useRef<ReturnType<typeof setInterval>>(undefined);
    const list = tab === 'upcoming' ? upcomingEvents : pastEvents;

    React.useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const idx = Math.round(el.scrollLeft / el.clientWidth);
            setScrollIndex(idx);
        };
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
        setScrollIndex(0);
        if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, [tab]);

    React.useEffect(() => {
        if (list.length <= 1 || paused) return;
        timerRef.current = setInterval(() => {
            const next = (scrollIndex + 1) % list.length;
            scrollRef.current?.scrollTo({ left: next * (scrollRef.current?.clientWidth || 0), behavior: 'smooth' });
        }, 4000);
        return () => clearInterval(timerRef.current);
    }, [list.length, scrollIndex, paused]);

    const scrollTo = (index: number) => {
        setPaused(true);
        scrollRef.current?.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
        setTimeout(() => setPaused(false), 8000);
    };

    return (
        <section className="py-20 md:py-28 bg-white border-t border-black/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
                    <div>
                        <span className="text-[#FE0002] text-[10px] font-black uppercase tracking-[0.3em] block mb-3">
                            UPCOMING BATTLES
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block">
                            NEXT <span className="text-[#FE0002]">EVENTS</span>
                        </h2>
                    </div>
                    <Link
                        href="/events"
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-black hover:text-[#FE0002] transition-colors flex items-center gap-2 group"
                    >
                        View All Events
                        <i className="fa-solid fa-arrow-right text-[#FE0002] group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 border-b border-black/5">
                    {(['upcoming', 'past'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`pb-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                                tab === t ? 'text-black' : 'text-gray-400 hover:text-black'
                            }`}
                        >
                            {t === 'upcoming' ? 'Upcoming' : 'Past Events'}
                            {tab === t && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FE0002]" />
                            )}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <>
                        {/* Mobile skeleton */}
                        <div className="md:hidden">
                            <div className="flex gap-4 overflow-hidden">
                                <div className="shrink-0 w-[80vw] max-w-[360px] animate-pulse">
                                    <div className="aspect-[16/9] bg-gray-200 rounded-sm" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded-sm w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded-sm w-1/2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Desktop skeleton */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[16/9] bg-gray-200 rounded-sm" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded-sm w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded-sm w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : list.length > 0 ? (
                    <>
                        {/* Mobile: snap carousel */}
                        <div className="relative md:hidden">
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 -mx-4 px-4 no-scrollbar"
                            >
                                {list.map((event) => (
                                    <div key={event._id} className="snap-center shrink-0 w-[80vw] max-w-[360px]">
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>

                            {list.length > 1 && (
                                <>
                                    <button
                                        onClick={() => scrollTo((scrollIndex - 1 + list.length) % list.length)}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-black/10 shadow-md rounded-full flex items-center justify-center text-black hover:bg-[#FE0002] hover:text-white transition-all"
                                    >
                                        <i className="fa-solid fa-chevron-left text-xs"></i>
                                    </button>
                                    <button
                                        onClick={() => scrollTo((scrollIndex + 1) % list.length)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-black/10 shadow-md rounded-full flex items-center justify-center text-black hover:bg-[#FE0002] hover:text-white transition-all"
                                    >
                                        <i className="fa-solid fa-chevron-right text-xs"></i>
                                    </button>
                                    <div className="flex justify-center gap-2 mt-6">
                                        {list.map((_: FightEvent, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => scrollTo(i)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === scrollIndex ? 'bg-[#FE0002] w-5' : 'bg-black/20 hover:bg-black/40'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Desktop: grid */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {list.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 text-gray-400 font-display italic uppercase text-sm tracking-widest">
                        {tab === 'upcoming' ? 'No upcoming events scheduled' : 'No past events'}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedEvents;
