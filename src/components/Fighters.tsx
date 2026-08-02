"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { getAllFighters } from '../lib/api';
import { Fighter, formatRecord } from '../types';
import { useQuery } from '@tanstack/react-query';
import { FighterCardSkeleton } from './Skeleton';

const FighterCard: React.FC<{ fighter: Fighter }> = ({ fighter }) => {
    const pi = fighter.personal_info || {}
    const pa = fighter.physical_attributes || {}
    const media = fighter.media || {}
    const recordStr = formatRecord(fighter.record)
    const nameParts = (pi.full_name || "Unknown").split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    return (
        <Link
            href={`/fighters/${fighter._id}`}
            className="group relative block bg-white overflow-hidden rounded-xl md:rounded-2xl border border-black/10 hover:border-black/20 shadow-sm hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)] transition-all duration-300 aspect-[4/5]"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={media.profile_image || `https://picsum.photos/seed/${pi.full_name}/360/640`}
                    alt={pi.full_name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90" />
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-b from-[#FE0002]/40 to-[#FE0002]/0 group-hover:translate-x-[100%] transition-transform duration-700 ease-out z-20 mix-blend-overlay" />
            </div>

            {/* Division chip */}
            <div className="absolute top-3 left-3 z-10">
                <span className="inline-block bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">
                    {pa.weight_class}
                </span>
            </div>

            {/* Corner marks */}
            <div className="absolute top-3 right-3 z-10 w-6 h-6 border-t-2 border-r-2 border-[#FE0002] opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 z-10 w-6 h-6 border-b-2 border-r-2 border-white/30 group-hover:border-[#FE0002] transition-colors" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                <p className="text-[#FE0002] text-[9px] md:text-[10px] font-black uppercase tracking-[0.28em] mb-1">
                    {pa.weight_class} · Pro
                </p>
                <h3 className={`font-display font-black uppercase italic leading-[0.9] text-white drop-shadow-lg ${lastName ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} tracking-tighter group-hover:text-[#FE0002] transition-colors`}>
                    {firstName} {lastName && <span className="block">{lastName}</span>}
                </h3>
                <div className="mt-3 flex items-center gap-2.5 border-t border-white/15 pt-3">
                    <p className="font-display font-black text-xl md:text-2xl text-white leading-none tracking-tight">
                        {recordStr}
                    </p>
                    <span className="text-[#FE0002] font-bold text-[9px] uppercase tracking-widest leading-tight">
                        Pro<br />Record
                    </span>
                </div>
            </div>
        </Link>
    );
};

const Fighters: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const { data: fighters = [], isLoading } = useQuery({
        queryKey: ["fighters"],
        queryFn: async () => {
            const data = await getAllFighters();
            const fightersToShow = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray(data.data) ? data.data : []);
            return fightersToShow.map((f: any, index: number) => ({
                ...f,
                rank: f.rank ?? (index + 1)
            }));
        },
    });

    const weightClasses = useMemo<string[]>(() => [
        "ALL",
        ...Array.from(new Set(fighters.map((f: Fighter) => f.physical_attributes?.weight_class?.toUpperCase()).filter(Boolean))) as string[]
    ], [fighters]);

    const filteredFighters = useMemo(() => activeFilter === 'ALL'
        ? fighters
        : fighters.filter((f: Fighter) => f.physical_attributes?.weight_class?.toUpperCase() === activeFilter), [fighters, activeFilter]);

    const fighterCards = useMemo(() => filteredFighters.map((fighter: Fighter) => (
        <FighterCard key={fighter._id} fighter={fighter} />
    )), [filteredFighters]);

    if (isLoading) return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-24 pb-4 border-b border-black/5">
                <div className="max-w-7xl mx-auto px-4 pt-12 pb-2">
                    <div className="h-12 w-64 bg-gray-200 animate-pulse rounded-sm" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {[...Array(8)].map((_, i) => (
                        <FighterCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-black selection:bg-[#FE0002] selection:text-white">
            {/* Editorial masthead */}
            <header className="relative pt-[calc(3.5rem+env(safe-area-inset-top))] lg:pt-[calc(5rem+env(safe-area-inset-top))] pb-6 overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-[#FE0002] rounded-full blur-[130px] opacity-25" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-12 md:py-16">
                    <p className="text-[#FE0002] text-[11px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                        <span className="inline-block w-8 h-[2px] bg-[#FE0002]" />
                        The Roster
                    </p>
                    <h1 className="font-display font-black italic uppercase leading-[0.85] tracking-tighter text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                        Elite <span className="text-[#FE0002]">Fighters</span>
                    </h1>

                    <div className="mt-10 grid grid-cols-3 max-w-md gap-6 divide-x divide-white/10">
                        <div>
                            <p className="font-display font-black text-3xl md:text-4xl text-white leading-none">{fighters.length}</p>
                            <p className="text-white/50 text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1.5">Combatants</p>
                        </div>
                        <div className="pl-6">
                            <p className="font-display font-black text-3xl md:text-4xl text-white leading-none">{weightClasses.length - 1}</p>
                            <p className="text-white/50 text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1.5">Divisions</p>
                        </div>
                        <div className="pl-6">
                            <p className="font-display font-black text-3xl md:text-4xl text-[#FE0002] leading-none">
                                <span className="relative flex h-3 w-3 md:h-4 md:w-4 items-center justify-center ml-4 mb-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE0002] opacity-60"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FE0002]"></span>
                                </span>
                                Live
                            </p>
                            <p className="text-white/50 text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1.5">Season</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filter / category bar */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-black/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-10 overflow-x-auto no-scrollbar py-3 pointer-events-auto">
                        {weightClasses.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase transition-all relative py-2 whitespace-nowrap ${activeFilter === cat ? 'text-black' : 'text-gray-400 hover:text-black'
                                    }`}
                            >
                                {cat}
                                {activeFilter === cat && (
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FE0002] rounded-full shadow-[0_0_15px_rgba(254,0,2,0.8)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                {filteredFighters.length === 0 ? (
                    <div className="text-center py-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500 font-display font-black uppercase italic tracking-[0.2em] text-xl">Roster Data Offline</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
                        {fighterCards}
                    </div>
                )}
            </div>
            <div className="h-20 bg-gradient-to-t from-gray-100 to-transparent" />
        </div>
    );
};

export default Fighters;
