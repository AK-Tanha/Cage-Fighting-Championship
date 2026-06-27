"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { getAllEvents } from '../lib/api';
import { FightEvent } from '../types';
import { useQuery } from '@tanstack/react-query';
import { HorizontalEventSkeleton } from './Skeleton';

const now = new Date();

const isUpcoming = (event: FightEvent) => new Date(event.date) >= now;
const isPast = (event: FightEvent) => new Date(event.date) < now;

const Events: React.FC = () => {
    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const data = await getAllEvents();
            return Array.isArray(data) ? data : [];
        },
    });

    const upcomingEvents = useMemo(() => events.filter(isUpcoming), [events]);
    const pastEvents = useMemo(() => events.filter(isPast), [events]);

    const renderEventCard = (event: FightEvent) => (
        <div key={event._id} className="group relative bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] transition-all border border-black/5">
            <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                <Image
                    src={event.image_url || `/api/proxy/events/${event._id}/image/`}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={90}
                />
            </div>

            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                {isPast(event) && (
                    <p className="text-gray-400 font-bold text-[10px] tracking-widest mb-2 uppercase">Past Event</p>
                )}
                <p className="text-[#FE0002] font-bold text-sm tracking-widest mb-2 uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-3xl md:text-4xl font-display font-black uppercase mb-4 group-hover:text-[#FE0002] transition-colors">{event.name}</h3>
                <div className="flex items-center gap-6 mb-8 text-gray-500 font-medium">
                    <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-[#FE0002]"></i> {event.location}</span>
                    {event.fights && event.fights.length > 0 && (
                        <span className="flex items-center gap-2"><i className="fa-solid fa-trophy text-[#FE0002]"></i> {event.fights.length} Fights Card</span>
                    )}
                </div>
                {isUpcoming(event) && (
                    <div className="flex gap-4">
                        <button className="bg-[#FE0002] text-white px-8 py-3 font-display font-bold uppercase tracking-widest hover:bg-black transition-all">
                            Get Tickets
                        </button>
                        <Link
                            href={`/events/${event._id}`}
                            className="border border-black/20 text-center text-black px-8 py-3 font-display font-bold uppercase tracking-widest hover:border-[#FE0002] transition-all"
                        >
                            Fight Details
                        </Link>
                    </div>
                )}
                {isPast(event) && (
                    <div className="flex gap-4">
                        <Link
                            href={`/events/${event._id}`}
                            className="border border-black/20 text-center text-black px-8 py-3 font-display font-bold uppercase tracking-widest hover:border-[#FE0002] transition-all"
                        >
                            Results & Details
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );

    if (isLoading) return (
        <div className="pt-20 md:pt-28 pb-20 max-w-7xl mx-auto px-4">
            <div className="mb-16">
                <div className="h-14 w-80 bg-gray-200 animate-pulse rounded-sm" />
            </div>
            <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                    <HorizontalEventSkeleton key={i} />
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="pt-20 md:pt-28 pb-20 text-center min-h-[60vh]">
            <h2 className="text-4xl text-[#FE0002] font-display font-black italic mb-4 uppercase">System Error</h2>
            <p className="text-gray-400">{error instanceof Error ? error.message : 'Failed to load events'}</p>
        </div>
    );

    const hasAnyEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

    return (
        <div className="pt-20 md:pt-28 pb-20 max-w-7xl mx-auto px-4">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block">
                    SCHEDULED <span className="text-[#FE0002]">WARS</span>
                </h2>
            </div>

            {!hasAnyEvents ? (
                <div className="text-center py-20 text-xl text-gray-500 font-display italic uppercase">
                    No confirmed dates in the chamber. Check back soon for the next war.
                </div>
            ) : (
                <div className="space-y-20">
                    {upcomingEvents.length > 0 && (
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#FE0002] mb-8">
                                Upcoming Events
                            </h3>
                            <div className="space-y-8">
                                {upcomingEvents.map(renderEventCard)}
                            </div>
                        </div>
                    )}
                    {pastEvents.length > 0 && (
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
                                Past Events
                            </h3>
                            <div className="space-y-8 opacity-70">
                                {pastEvents.map(renderEventCard)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Events;
