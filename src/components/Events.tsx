"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { getAllEvents } from '../lib/api';
import { FightEvent } from '../types';
import { HorizontalEventSkeleton } from './Skeleton';

const Events: React.FC = () => {
    const [events, setEvents] = useState<FightEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load fight schedule');
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const eventItems = useMemo(() => events.map((event) => (
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
            </div>
        </div>
    )), [events]);

    if (loading) return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
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
        <div className="pt-32 pb-20 text-center min-h-[60vh]">
            <h2 className="text-4xl text-[#FE0002] font-display font-black italic mb-4 uppercase">System Error</h2>
            <p className="text-gray-400">{error}</p>
        </div>
    );

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block">
                    SCHEDULED <span className="text-[#FE0002]">WARS</span>
                </h2>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-500 font-display italic uppercase">
                    No confirmed dates in the chamber. Check back soon for the next war.
                </div>
            ) : (
                <div className="space-y-12">
                    {eventItems}
                </div>
            )}
        </div>
    );
};

export default Events;
