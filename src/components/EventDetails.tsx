"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getAllFighters, getEventById } from '../lib/api';
import { FightEvent, Fighter } from '../types';
import CircularLoader from './CircularLoader';

const FightRow: React.FC<{
    fight: any;
    fighters: Record<string, Fighter>;
    index: number;
}> = ({ fight, fighters, index }) => {
    const f1 = fighters[fight.fighter1];
    const f2 = fighters[fight.fighter2];

    return (
        <div className="group relative bg-[#171715] border border-white/5 hover:border-[#FE0002]/30 transition-all rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Fighter 1 */}
            <div className="flex-1 flex items-center gap-6 w-full md:w-auto">
                <div className="text-4xl font-display font-black text-white/10 group-hover:text-[#FE0002]/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 text-right">
                    <p className="text-xs text-[#FE0002] font-bold uppercase tracking-widest mb-1 italic">Red Corner</p>
                    <h4 className="text-xl md:text-2xl font-display font-black uppercase italic whitespace-nowrap overflow-hidden text-ellipsis">
                        {f1?.name || "Unknown Fighter"}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                        {f1?.record ? (typeof f1.record === 'string' ? f1.record : `${f1.record.wins}-${f1.record.losses}`) : "0-0"}
                    </p>
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#FE0002]/50 transition-all">
                    <img src={f1?.image || 'https://via.placeholder.com/100'} alt={f1?.name} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* VS */}
            <div className="relative flex flex-col items-center justify-center shrink-0">
                <div className="text-4xl font-display font-black italic text-[#FE0002] relative z-10 bg-[#171715] px-4">VS</div>
                <div className="absolute h-full w-px bg-white/10 top-0 left-1/2 -translate-x-1/2 hidden md:block" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-2">{fight.weight_class}</p>
                {fight.title_fight && (
                    <span className="bg-[#FE0002] text-white text-[9px] font-black px-2 py-0.5 rounded mt-2 animate-pulse">TITLE FIGHT</span>
                )}
            </div>

            {/* Fighter 2 */}
            <div className="flex-1 flex flex-row-reverse items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#FE0002]/50 transition-all">
                    <img src={f2?.image || 'https://via.placeholder.com/100'} alt={f2?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                    <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1 italic">Blue Corner</p>
                    <h4 className="text-xl md:text-2xl font-display font-black uppercase italic whitespace-nowrap overflow-hidden text-ellipsis">
                        {f2?.name || "Unknown Fighter"}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                        {f2?.record ? (typeof f2.record === 'string' ? f2.record : `${f2.record.wins}-${f2.record.losses}`) : "0-0"}
                    </p>
                </div>
                <div className="w-8" /> {/* Spacer to balance the index number on the left */}
            </div>
        </div>
    );
};

const EventDetails: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<FightEvent | null>(null);
    const [fighters, setFighters] = useState<Record<string, Fighter>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPageData = async () => {
            if (!params?.id) return;
            try {
                // Fetch event and all fighters in parallel for matching
                const [eventData, fightersData] = await Promise.all([
                    getEventById(params.id as string),
                    getAllFighters()
                ]);

                setEvent(eventData);

                // Index fighters by ID for easy lookup
                const fighterMap: Record<string, Fighter> = {};
                fightersData.forEach((f: Fighter) => {
                    fighterMap[f._id] = f;
                });
                setFighters(fighterMap);

            } catch (err: any) {
                setError(err.message || 'Failed to retrieve event data');
            } finally {
                setLoading(false);
            }
        };
        loadPageData();
    }, [params?.id]);

    if (loading) return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center h-full pt-20">
            <CircularLoader isLoader size="w-24 h-24" />
            <p className="mt-8 text-gray-500 font-display uppercase font-bold tracking-widest italic animate-pulse">Updating Fight Card...</p>
        </div>
    );

    if (error || !event) return (
        <div className="min-h-screen pt-32 px-4 flex flex-col items-center">
            <h1 className="text-6xl font-display font-black uppercase text-[#FE0002] italic mb-4">Event Nullified</h1>
            <p className="text-gray-400 mb-8">{error || 'Event data corrupted or missing from the grid.'}</p>
            <button onClick={() => router.push('/events')} className="bg-[#FE0002] text-white px-8 py-3 font-display font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all italic">
                Back to Schedule
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
            {/* Header Banner Image */}
            <div className="w-full pt-20">
                <img
                    src="https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/495306403_122132819954673115_9051019909933529578_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=75d36f&_nc_ohc=rJUIfSC6tCcQ7kNvwHIMlcz&_nc_oc=AdnaoQpIle1jPEK_I-I71qiSIYKmXUI43jWF5rznxKzl7GeSoszysP5NMbqS4nZYBKU&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=WPcp4z6oaKQgtvaSw8TMfw&oh=00_Afr0eJ0Hfp5WsIhPTpx0NKHhMTW6mcrvCjapV5YXIY0DiA&oe=697D401A"
                    className="w-full h-auto max-h-[80vh] object-cover object-center bg-black"
                    alt={event.name}
                />
            </div>

            {/* Event Name & Info Section */}
            <div className="max-w-7xl mx-auto w-full px-8 py-16">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b-2 border-white/5 pb-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#FE0002] text-white px-4 py-1 text-sm font-black italic uppercase skew-x-[-15deg]">
                                <span className="inline-block skew-x-[15deg]">Confirmed Card</span>
                            </span>
                            <span className="text-white/50 font-bold uppercase tracking-widest text-xs">
                                {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-tight drop-shadow-lg">
                            {event.name}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-400">
                            <i className="fa-solid fa-location-dot text-[#FE0002]"></i>
                            <span className="font-display font-bold uppercase tracking-wide">{event.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fights Section */}
            <div className="max-w-5xl mx-auto px-8 py-12">
                <div className="flex items-center justify-between mb-12 border-b-2 border-white/5 pb-6">
                    <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter">
                        OFFICIAL <span className="text-[#FE0002]">FIGHT CARD</span>
                    </h2>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                        {event.fights?.length || 0} Matchups
                    </p>
                </div>

                {!event.fights || event.fights.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-gray-500 font-display uppercase italic font-bold">Fight card pending final commission approval.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {event.fights.map((fight, idx) => (
                            <FightRow
                                key={idx}
                                fight={fight}
                                fighters={fighters}
                                index={idx}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-xl font-display font-black uppercase italic mb-2">Want to witness history?</h3>
                        <p className="text-gray-500">Tickets are selling fast. Secure your seat at the arena now.</p>
                    </div>
                    <button className="bg-[#FE0002] hover:bg-white hover:text-black text-white px-12 py-4 font-display font-black uppercase italic tracking-widest transition-all">
                        Buy Live Tickets
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/events" className="text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group">
                        <span className="w-10 h-px bg-gray-500 group-hover:w-16 transition-all" />
                        Back to Events
                        <span className="w-10 h-px bg-gray-500 group-hover:w-16 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
