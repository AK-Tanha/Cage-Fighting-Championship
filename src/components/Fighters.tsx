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

    return (
        <Link
            href={`/fighters/${fighter._id}`}
            className="group relative bg-white overflow-hidden rounded-none border-2 border-black/5 hover:border-[#FE0002] transition-all duration-300 aspect-[9/16] flex flex-col justify-end shadow-sm hover:shadow-xl"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={media.profile_image || `https://picsum.photos/seed/${pi.full_name}/360/640`}
                    alt={pi.full_name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FE0002]/0 via-[#FE0002]/10 to-[#FE0002]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20" />
            </div>

            <div className="relative z-10 px-5 pb-5 pt-12 flex flex-col justify-end h-full">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-1">
                        <span className="inline-block bg-black text-white font-display font-black text-[10px] md:text-xs uppercase tracking-[0.2em] px-2 py-0.5 skew-x-[-10deg]">
                            {pa.weight_class}
                        </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-display font-black uppercase italic leading-[0.85] tracking-tighter text-black mb-2 group-hover:text-[#FE0002] transition-colors duration-200 drop-shadow-sm">
                        {pi.full_name}
                    </h3>

                    <div className="flex items-center gap-3 border-t-2 border-black/10 pt-2 group-hover:border-[#FE0002]/50 transition-colors">
                        <p className="font-display font-black text-2xl text-black tracking-tighter leading-none">
                            {recordStr}
                        </p>
                        <span className="text-[#FE0002] font-bold text-[10px] uppercase tracking-widest">Pro Record</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FE0002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FE0002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            <div className="relative pt-24 pb-4 overflow-hidden border-b border-black/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 pt-12 pb-2">
                    <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block text-black">
                        ELITE <span className="text-[#FE0002]">FIGHTERS</span>
                    </h2>
                </div>
            </div>

            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-2xl border-b border-black/5 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-10 overflow-x-auto no-scrollbar py-3 pointer-events-auto">
                        {weightClasses.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all relative py-2 whitespace-nowrap ${activeFilter === cat ? 'text-black' : 'text-gray-400 hover:text-black'
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

            <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
                {filteredFighters.length === 0 ? (
                    <div className="text-center py-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500 font-display font-black uppercase italic tracking-[0.2em] text-xl">Roster Data Offline</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {fighterCards}
                    </div>
                )}
            </div>
            <div className="h-20 bg-gradient-to-t from-gray-100 to-transparent" />
        </div>
    );
};

export default Fighters;
