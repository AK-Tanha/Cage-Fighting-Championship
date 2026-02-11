"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllFighters } from '../lib/api';
import { Fighter } from '../types';
import CircularLoader from './CircularLoader';
import Image from 'next/image';

const FighterCard: React.FC<{ fighter: Fighter }> = ({ fighter }) => {
    const record = typeof fighter.record === 'string'
        ? fighter.record
        : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;

    return (
        <Link
            href={`/fighters/${fighter._id}`}
            className="group relative bg-[#0D0D0D] overflow-hidden rounded-sm border border-white/5 hover:border-[#FE0002]/40 transition-all duration-700 aspect-[4/5] flex flex-col justify-end shadow-2xl"
        >
            {/* Fighter Portrait */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={fighter.image_url || `https://picsum.photos/seed/${fighter.name}/350/254`}
                    alt={fighter.name}
                    className="w-full h-full object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                    width={350}
                    height={254}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Fighter Info Overlay */}
            <div className="relative z-10 p-6 md:p-8 transform transition-all duration-500 group-hover:pb-12">
                <div className="space-y-0.5">
                    {/* Rank & Weightclass */}
                    <div className="flex items-center gap-2 mb-1">
                        {fighter.rank !== undefined && (
                            <span className="text-[#FE0002] font-display font-black text-xs md:text-sm italic">
                                #{fighter.rank}
                            </span>
                        )}
                        <span className="text-white/50 font-display font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                            {fighter.weight_class}
                        </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl md:text-2xl font-display font-black uppercase italic leading-none tracking-tighter text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-lg">
                        {fighter.name}
                    </h3>

                    {/* Record */}
                    <div className="pt-2">
                        <p className="font-display font-black text-lg md:text-xl tracking-tighter text-white leading-none">
                            {record}
                        </p>
                    </div>

                    {/* Pro Label */}
                    <p className="text-[9px] text-[#FE0002] uppercase font-black tracking-[0.3em] pt-0.5">
                        PRO
                    </p>
                </div>
            </div>

            {/* Decorative Grid Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(rgba(254,0,2,0.1)_1px,transparent_1px)] [background-size:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
};

const Fighters: React.FC = () => {
    const [fighters, setFighters] = useState<Fighter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('ALL');

    useEffect(() => {
        let isMounted = true;
        const loadFighters = async () => {
            try {
                const data = await getAllFighters();
                if (isMounted) {
                    const fightersToShow = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray(data.data) ? data.data : []);
                    const rankedData = fightersToShow.map((f: any, index: number) => ({
                        ...f,
                        rank: f.rank ?? (index + 1)
                    }));
                    setFighters(rankedData);
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || 'Failed to load the roster');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadFighters();
        return () => { isMounted = false; };
    }, []);

    const filteredFighters = activeFilter === 'ALL'
        ? fighters
        : fighters.filter(f => f.weight_class?.toUpperCase() === activeFilter);
    const weightClasses = [
        "ALL",
        ...Array.from(new Set(fighters.map(f => f.weight_class?.toUpperCase()).filter(Boolean)))
    ];

    if (loading) return (
        <div className="pt-40 pb-20 flex flex-col justify-center items-center min-h-[80vh] bg-black">
            <CircularLoader isLoader={true} size="w-32 h-32" />
            <div className="mt-12 text-sm text-gray-500 font-display font-black uppercase tracking-[0.5em] animate-pulse">
                Establishing Neural Connection to Roster
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FE0002]">
            {/* High-Impact Hero Section */}
            <div className="relative pt-24 pb-4 overflow-hidden border-b border-white/5">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(254,0,2,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
                </div>

                {/* HEADER CONTENT */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 pt-12 pb-2">
                    <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block text-white">
                        ELITE <span className="text-[#FE0002]">FIGHTERS</span>
                    </h2>
                </div>
            </div>


            {/* Premium Category Filter - Sticky and Scrollable */}
            <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-10 overflow-x-auto no-scrollbar py-3 pointer-events-auto">
                        {weightClasses.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all relative py-2 whitespace-nowrap ${activeFilter === cat ? 'text-white' : 'text-gray-600 hover:text-white'
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

            {/* Roster Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
                {filteredFighters.length === 0 ? (
                    <div className="text-center py-40 bg-white/5 border border-dashed border-white/10 rounded-sm">
                        <p className="text-gray-500 font-display font-black uppercase italic tracking-[0.2em] text-xl">Roster Data Offline</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredFighters.map((fighter) => (
                            <FighterCard key={fighter._id} fighter={fighter} />
                        ))}
                    </div>
                )}

                
            </div>
        </div>
    );
};

export default Fighters;
