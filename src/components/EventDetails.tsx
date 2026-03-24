"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { getAllFighters, getAllReferees, getEventById } from '../lib/api';
import { FightEvent, Fighter } from '../types';
import CircularLoader from './CircularLoader';
import FighterHoverCard from './FighterHoverCard';

const FightRow: React.FC<{
    fight: any;
    fighters: Record<string, Fighter>;
    referees: Record<string, any>;
    index: number;
    setFighterHoverCard?: (f: Fighter | null) => void;
    setHoverPos?: (pos: { x: number, y: number }) => void;
}> = ({ fight, fighters, referees, index, setFighterHoverCard, setHoverPos }) => {
    const f1 = fighters[fight.fighter1];
    const f2 = fighters[fight.fighter2];

    return (
        <div className="group relative bg-white border border-black/5 hover:border-[#FE0002]/30 transition-all rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md">
            {/* Fighter 1 */}
            <div 
                className="flex-1 flex items-center gap-4 md:gap-6 w-full md:w-auto min-w-0"
                onMouseEnter={() => setFighterHoverCard && f1 && setFighterHoverCard(f1)}
                onMouseMove={(e) => setHoverPos && setHoverPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setFighterHoverCard && setFighterHoverCard(null)}
            >
                <div className="text-3xl md:text-4xl font-display font-black text-black/10 group-hover:text-[#FE0002]/20 transition-colors shrink-0">
                    {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 text-right min-w-0">
                    <p className="text-xs text-[#FE0002] font-bold uppercase tracking-widest mb-1 italic">Red Corner</p>
                    <h4 className="text-xl md:text-2xl font-display font-black uppercase italic truncate">
                        <Link href={`/fighters/${f1?._id}`} className="hover:text-[#FE0002] transition-colors">
                            {f1?.name || "Unknown Fighter"}
                        </Link>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">
                            {f1?.record ? (typeof f1.record === 'string' ? f1.record : `${f1.record.wins ?? 0}-${f1.record.losses ?? 0}`) : "0-0"}
                        </p>
                    </h4>
                </div>
                <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-black/10 group-hover:border-[#FE0002]/50 transition-all bg-gray-100">
                    <Image src={f1?.image_url || `https://picsum.photos/seed/${f1?._id}/800/500`} alt={f1?.name || "Fighter Image"} className="w-full h-full object-cover" width={800} height={500} loading="lazy" />
                </div>
            </div>

            {/* VS */}
            <div className="relative flex flex-col items-center justify-center shrink-0 min-w-[120px]">
                <div className="text-4xl font-display font-black italic text-[#FE0002] relative z-10 bg-white px-4">VS</div>
                <div className="absolute h-full w-px bg-black/10 top-0 left-1/2 -translate-x-1/2 hidden md:block" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-2">{fight.weight_class}</p>
                
                <div className="mt-2 text-center bg-white z-10 px-2 py-1 border border-black/5 rounded">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Referee</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black">
                        {fight.referee && referees[fight.referee] ? referees[fight.referee].name : "N/A"}
                    </p>
                </div>

                {fight.title_fight && (
                    <span className="bg-[#FE0002] text-white text-[9px] font-black px-2 py-0.5 rounded mt-2 animate-pulse">TITLE FIGHT</span>
                )}
            </div>

            {/* Fighter 2 */}
            <div 
                className="flex-1 flex flex-row-reverse items-center gap-4 md:gap-6 w-full md:w-auto min-w-0"
                onMouseEnter={() => setFighterHoverCard && f2 && setFighterHoverCard(f2)}
                onMouseMove={(e) => setHoverPos && setHoverPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setFighterHoverCard && setFighterHoverCard(null)}
            >
                <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-black/10 group-hover:border-[#FE0002]/50 transition-all bg-gray-100">
                    <Image src={f2?.image_url || `https://picsum.photos/seed/${f2?._id}/800/500`} alt={f2?.name || "Fighter Image"} className="w-full h-full object-cover" width={800} height={500} loading="lazy" />
                </div>
                <div className="flex-1 text-left min-w-0">
                    <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1 italic">Blue Corner</p>
                    <h4 className="text-xl md:text-2xl font-display font-black uppercase italic truncate">
                        <Link href={`/fighters/${f2?._id}`} className="hover:text-blue-500 transition-colors">
                            {f2?.name || "Unknown Fighter"}
                        </Link>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">
                            {f2?.record ? (typeof f2.record === 'string' ? f2.record : `${f2.record.wins ?? 0}-${f2.record.losses ?? 0}`) : "0-0"}
                        </p>
                    </h4>
                </div>
                <div className="w-8 shrink-0 hidden md:block" /> {/* Spacer to balance the index number on the left */}
            </div>
        </div>
    );
};

const EventDetails: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<FightEvent | null>(null);
    const [fighters, setFighters] = useState<Record<string, Fighter>>({});
    const [referees, setReferees] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fighterHoverCard, setFighterHoverCard] = useState<Fighter | null>(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const hoverCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadPageData = async () => {
            if (!params?.id) return;
            try {
                // Fetch event and all fighters in parallel for matching
                const [eventData, fightersData, refereesData] = await Promise.all([
                    getEventById(params.id as string),
                    getAllFighters(),
                    getAllReferees()
                ]);

                setEvent(eventData);

                // Index fighters by ID for easy lookup
                const fighterMap: Record<string, Fighter> = {};
                fightersData.forEach((f: Fighter) => {
                    fighterMap[f._id] = f;
                });
                setFighters(fighterMap);

                // Index referees by ID
                const refereeMap: Record<string, any> = {};
                refereesData.forEach((r: any) => {
                    refereeMap[r._id] = r;
                });
                setReferees(refereeMap);

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
            <p className="text-gray-500 mb-8">{error || 'Event data corrupted or missing from the grid.'}</p>
            <button onClick={() => router.push('/events')} className="bg-[#FE0002] text-white px-8 py-3 font-display font-black uppercase tracking-widest hover:bg-black transition-all italic">
                Back to Schedule
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-black pb-24">
            {/* Fighter Hover Card */}
            {fighterHoverCard && <FighterHoverCard ref={hoverCardRef} fighter={fighterHoverCard} hoverPos={hoverPos} />}
            
            {/* Header Banner Image */}
            <div className="w-full pt-20">
                <Image
                    src={event.image_url || `/api/proxy/events/${event._id}/image/`}
                    className="w-full h-auto max-h-[80vh] object-cover object-center bg-white border-b border-black/5"
                    alt={event.name}
                    width={1920}
                    height={1080}
                    loading="lazy"
                />
            </div>

            {/* Event Name & Info Section */}
            <div className="max-w-7xl mx-auto w-full px-8 py-16">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b-2 border-black/5 pb-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#FE0002] text-white px-4 py-1 text-sm font-black italic uppercase skew-x-[-15deg]">
                                <span className="inline-block skew-x-[15deg]">Confirmed Card</span>
                            </span>
                            <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                                {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-tight drop-shadow-sm text-black">
                            {event.name}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-500">
                            <i className="fa-solid fa-location-dot text-[#FE0002]"></i>
                            <span className="font-display font-bold uppercase tracking-wide">{event.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fights Section */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 relative">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-transparent via-gray-100/50 to-transparent -z-10 pointer-events-none blur-3xl" />
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b-2 border-black/10 pb-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-12 bg-[#FE0002] skew-x-[-15deg]"></div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-black drop-shadow-sm">
                                OFFICIAL <span className="text-[#FE0002]">FIGHT CARD</span>
                            </h2>
                            <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mt-2">
                                Main Card & Prelims
                            </p>
                        </div>
                    </div>
                    <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg shadow-black/20 flex items-center gap-3 transform hover:scale-105 transition-transform cursor-default">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE0002] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FE0002]"></span>
                        </span>
                        <p className="font-bold text-sm uppercase tracking-widest">
                            {event.fights?.length || 0} MATCHUPS
                        </p>
                    </div>
                </div>

                {!event.fights || event.fights.length === 0 ? (
                    <div className="relative overflow-hidden group text-center py-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-black/5 shadow-inner">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <i className="fa-solid fa-lock text-5xl text-gray-300 group-hover:text-[#FE0002] transition-colors duration-500"></i>
                            <h3 className="text-2xl font-display uppercase italic font-black text-gray-400">Card Locked</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-sm mx-auto">Fight card pending final commission approval. Check back soon.</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 md:space-y-10 relative">
                        {/* Connecting line for aesthetic */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 via-black/5 to-transparent -z-10 hidden md:block"></div>
                        
                        {event.fights.map((fight, idx) => (
                            <div key={idx} className="relative group/row transform hover:-translate-y-1 transition-all duration-300">
                                {/* Optional decorative index indicator */}
                                <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 opacity-0 md:group-hover/row:opacity-100 transition-opacity duration-300 font-display font-black text-[#FE0002] text-xl italic flex items-center justify-center">
                                    <span className="bg-white border-2 border-black/5 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transform -skew-x-12">
                                        #{idx + 1}
                                    </span>
                                </div>
                                <FightRow
                                    fight={fight}
                                    fighters={fighters}
                                    referees={referees}
                                    index={idx}
                                    setFighterHoverCard={setFighterHoverCard}
                                    setHoverPos={setHoverPos}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-xl font-display font-black uppercase italic mb-2 text-black">Want to witness history?</h3>
                        <p className="text-gray-600">Tickets are selling fast. Secure your seat at the arena now.</p>
                    </div>
                    <button className="bg-[#FE0002] hover:bg-black text-white px-12 py-4 font-display font-black uppercase italic tracking-widest transition-all">
                        Buy Live Tickets
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/events" className="text-gray-500 hover:text-black transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group">
                        <span className="w-10 h-px bg-gray-500 group-hover:bg-black group-hover:w-16 transition-all" />
                        Back to Events
                        <span className="w-10 h-px bg-gray-500 group-hover:bg-black group-hover:w-16 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
