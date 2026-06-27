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

    const upcomingEvents = useMemo(
        () => (events ?? []).filter((e) => new Date(e.date) >= new Date()).slice(0, 3),
        [events],
    );

    return (
        <section className="py-20 md:py-28 bg-white border-t border-black/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
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

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                ) : upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-400 font-display italic uppercase text-sm tracking-widest">
                        No upcoming events scheduled
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedEvents;
