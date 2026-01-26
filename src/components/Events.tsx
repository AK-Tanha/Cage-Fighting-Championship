"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../lib/api';
import { FightEvent } from '../types';
import CircularLoader from './CircularLoader';

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

    if (loading) return (
        <div className="pt-32 pb-20 flex flex-col justify-center items-center min-h-[60vh]">
            <CircularLoader isLoader={true} size="w-24 h-24" />
            <p className="mt-8 text-2xl font-display font-bold uppercase tracking-widest text-gray-500 animate-pulse">
                Accessing Battle Schedule...
            </p>
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
                    {events.map((event) => (
                        <div key={event._id} className="group relative bg-[#171715] rounded-lg overflow-hidden flex flex-col lg:flex-row hover:shadow-[0_0_30px_rgba(254,0,2,0.15)] transition-all border border-white/5">
                            <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                                <img
                                    //src={event.image || '/images/event-placeholder.jpg'}
                                    src='https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/495306403_122132819954673115_9051019909933529578_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=75d36f&_nc_ohc=rJUIfSC6tCcQ7kNvwHIMlcz&_nc_oc=AdnaoQpIle1jPEK_I-I71qiSIYKmXUI43jWF5rznxKzl7GeSoszysP5NMbqS4nZYBKU&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=WPcp4z6oaKQgtvaSw8TMfw&oh=00_Afr0eJ0Hfp5WsIhPTpx0NKHhMTW6mcrvCjapV5YXIY0DiA&oe=697D401A'
                                    alt={event.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                {event.isLive && (
                                    <div className="absolute top-4 left-4 bg-[#FE0002] text-white px-3 py-1 text-xs font-bold uppercase animate-pulse rounded-full flex items-center gap-2">
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                        LIVE NOW
                                    </div>
                                )}
                            </div>

                            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                                <p className="text-[#FE0002] font-bold text-sm tracking-widest mb-2 uppercase">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <h3 className="text-3xl md:text-4xl font-display font-black uppercase mb-4 group-hover:text-[#FE0002] transition-colors">{event.name}</h3>
                                <div className="flex items-center gap-6 mb-8 text-gray-400 font-medium">
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-[#FE0002]"></i> {event.location}</span>
                                    {event.fights && event.fights.length > 0 && (
                                        <span className="flex items-center gap-2"><i className="fa-solid fa-trophy text-[#FE0002]"></i> {event.fights.length} Fights Card</span>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <button className="bg-[#FE0002] text-white px-8 py-3 font-display font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                        Get Tickets
                                    </button>
                                    <Link
                                        href={`/events/${event._id}`}
                                        className="border border-white/20 text-center text-white px-8 py-3 font-display font-bold uppercase tracking-widest hover:border-[#FE0002] transition-all"
                                    >
                                        Fight Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
