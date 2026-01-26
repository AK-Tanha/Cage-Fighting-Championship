"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getFighterById } from '../lib/api';
import { Fighter } from '../types';

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="border-l-2 border-[#FE0002] pl-4 py-2 bg-white/5 rounded-r-lg">
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{label}</p>
        <p className="text-md font-display font-bold uppercase italic text-white">{value}</p>
    </div>
);

import CircularLoader from './CircularLoader';

const FighterProfile: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [fighter, setFighter] = useState<Fighter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFighter = async () => {
            if (!params?.id) return;
            try {
                const data = await getFighterById(params.id as string);
                setFighter(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load fighter profile');
            } finally {
                setLoading(false);
            }
        };
        loadFighter();
    }, [params?.id]);

    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
            <CircularLoader isLoader={true} size="w-32 h-32" />
            <p className="mt-8 text-gray-500 font-display uppercase tracking-[0.3em] animate-pulse">Syncing Fight-Data Interface...</p>
        </div>
    );

    if (error || !fighter) return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
            <h1 className="text-4xl text-[#FE0002] font-display font-black italic mb-4">PROFILE NOT FOUND</h1>
            <p className="text-gray-400 mb-8">{error || 'The fighter ID provided does not exist in our database.'}</p>
            <button
                onClick={() => router.push('/fighters')}
                className="px-8 py-3 bg-[#FE0002] text-white font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-all"
            >
                Return to Roster
            </button>
        </div>
    );

    const record = typeof fighter.record === 'string'
        ? fighter.record
        : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FE0002] pt-24 md:pt-32">
            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-16 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b-2 border-white/5 pb-10 md:pb-12">
                    <div>
                        <div className="flex items-center gap-3 md:gap-4 mb-4">
                            <span className="bg-[#FE0002] px-3 md:px-4 py-1 text-xs md:text-sm font-bold skew-x-[-15deg]">
                                <span className="inline-block skew-x-[15deg]">{fighter.weight_class}</span>
                            </span>
                            {fighter.rank && (
                                <span className="border border-white/30 px-3 md:px-4 py-1 text-xs md:text-sm font-bold">
                                    RANK #{fighter.rank}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-2 text-shadow-red break-words">
                            {fighter.name}
                        </h1>
                        <p className="text-lg md:text-3xl text-[#FE0002] font-display font-bold italic uppercase opacity-80">
                            "{fighter.nickname || 'Unknown Identity'}"
                        </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                        <p className="text-4xl sm:text-5xl md:text-7xl font-display font-black italic text-white tracking-widest leading-none">
                            {record}
                        </p>
                        <p className="text-gray-500 uppercase font-bold tracking-[0.3em] mt-2 text-[10px] md:text-xs">Professional Record</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Stats & Info */}
                    <div className="lg:col-span-1 space-y-12">
                        <section>
                            <img
                                //src={fighter.image || 'https://via.placeholder.com/1200x800?text=Fighter+Profile'}
                                src='https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/3022677.png&w=350&h=254'
                                alt={fighter.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </section>
                        <section>
                            <h2 className="text-2xl font-display font-black uppercase italic mb-8 border-b border-white/10 pb-4">
                                Attributes
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Division" value={fighter.weight_class} />
                                <DetailItem label="Style" value={fighter.fightingStyle || 'All-Rounder'} />
                                <DetailItem label="Status" value="Active" />
                                <DetailItem label="Hometown" value="Unknown" />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-black uppercase italic mb-8 border-b border-white/10 pb-4">
                                Combat Ratings
                            </h2>
                            <div className="grid grid-cols-2 gap-y-10">
                                <CircularLoader label="Striking" value={fighter.stats?.striking ?? 0} />
                                <CircularLoader label="Grappling" value={fighter.stats?.grappling ?? 0} />
                                <CircularLoader label="Stamina" value={fighter.stats?.stamina ?? 0} />
                                <CircularLoader label="Power" value={fighter.stats?.power ?? 0} />
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Bio & More */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-display font-black uppercase italic mb-8 border-b border-white/10 pb-4">
                                Biography
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-gray-400 leading-relaxed italic">
                                    {fighter.bio || "No biography available for this fighter. Legend has it they prefer to let their performances inside the cage speak for themselves."}
                                </p>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-white/10 p-8 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE0002]/10 blur-3xl -mr-16 -mt-16 group-hover:bg-[#FE0002]/20 transition-colors" />
                            <h2 className="text-xl font-display font-bold uppercase italic mb-6">Upcoming Bout</h2>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white/10 flex items-center justify-center font-display font-black text-3xl">?</div>
                                <div>
                                    <p className="text-gray-400 text-sm uppercase font-bold tracking-widest">Next Event</p>
                                    <p className="text-xl font-display font-bold uppercase italic">CFC Championship Night</p>
                                </div>
                            </div>
                        </section>

                        <div className="pt-8">
                            <button
                                onClick={() => router.push('/fighters')}
                                className="group flex items-center gap-4 text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest text-sm"
                            >
                                <span className="w-10 h-px bg-gray-500 group-hover:w-16 group-hover:bg-white transition-all" />
                                Back to Roster
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Background Pattern */}
            <div className="h-20 bg-gradient-to-t from-[#FE0002]/5 to-transparent" />
        </div>
    );
};

export default FighterProfile;
