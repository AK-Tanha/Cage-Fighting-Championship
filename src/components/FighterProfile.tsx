"use client";

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getFighterById } from '../lib/api';
import { Fighter } from '../types';
import CircularLoader from './CircularLoader';

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="border-l-4 border-[#FE0002] pl-4 py-3 bg-gray-50 rounded-r-none border-b border-gray-100">
        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="text-xl font-display font-black uppercase italic text-black leading-none">{value}</p>
    </div>
);

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
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <CircularLoader isLoader={true} size="w-32 h-32" />
            <p className="mt-8 text-gray-400 font-display font-black uppercase tracking-[0.3em] animate-pulse">Syncing Fight-Data Interface...</p>
        </div>
    );

    if (error || !fighter) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
            <h1 className="text-5xl text-[#FE0002] font-display font-black italic mb-4 uppercase tracking-tighter">Profile Offline</h1>
            <p className="text-gray-400 mb-8 font-bold tracking-wide uppercase text-sm">{error || 'The fighter ID provided does not exist in our database.'}</p>
            <button
                onClick={() => router.push('/fighters')}
                className="px-8 py-3 bg-black text-white font-black uppercase tracking-widest hover:bg-[#FE0002] transition-all skew-x-[-10deg]"
            >
                <div className="skew-x-[10deg]">Return to Roster</div>
            </button>
        </div>
    );

    const record = typeof fighter.record === 'string'
        ? fighter.record
        : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;

    return (
        <div className="min-h-screen bg-white text-black selection:bg-[#FE0002] selection:text-white pt-24 md:pt-32">
            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-16 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b-4 border-black/5 pb-10 md:pb-12">
                    <div>
                        <div className="flex items-center gap-3 md:gap-4 mb-4">
                            <span className="bg-[#FE0002] text-white px-3 md:px-4 py-1 text-xs md:text-sm font-black italic skew-x-[-15deg] shadow-lg">
                                <span className="inline-block skew-x-[15deg]">{fighter.weight_class}</span>
                            </span>
                            {fighter.rank && (
                                <span className="bg-black text-white border border-black/10 px-3 md:px-4 py-1 text-xs md:text-sm font-black italic skew-x-[-15deg]">
                                    <span className="inline-block skew-x-[15deg]">RANK #{fighter.rank}</span>
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-[0.85] mb-2 text-black break-words drop-shadow-sm">
                            {fighter.name}
                        </h1>
                        <p className="text-xl md:text-3xl text-[#FE0002] font-display font-black italic uppercase opacity-90 tracking-tight">
                            "{fighter.nickname || 'Unknown Identity'}"
                        </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                        <p className="text-6xl sm:text-7xl md:text-9xl font-display font-black italic text-black tracking-tighter leading-none opacity-10">
                            {record}
                        </p>
                        <p className="text-[#FE0002] uppercase font-black tracking-[0.4em] -mt-4 md:-mt-6 text-sm md:text-base bg-white px-2">Professional Record</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Stats & Info */}
                    <div className="lg:col-span-1 space-y-12">
                        <section className="relative group">
                            <div className="absolute inset-0 border-2 border-black/5 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                            <Image
                                src={fighter.image_url || fighter.image || `https://picsum.photos/seed/${fighter.name}/350/350`}
                                alt={fighter.name}
                                className="w-full h-full object-cover object-top relative z-10 shadow-lg"
                                width={350}
                                height={350}
                                loading="lazy"
                            />
                        </section>
                        <section>
                            <h2 className="text-3xl font-display font-black uppercase italic mb-8 border-l-8 border-[#FE0002] pl-4 text-black">
                                Attributes
                            </h2>
                            <div className="grid grid-cols-1 gap-y-2">
                                <DetailItem label="Division" value={fighter.weight_class} />
                                <DetailItem label="Style" value={fighter.fightingStyle || 'All-Rounder'} />
                                <DetailItem label="Status" value="Active" />
                                <DetailItem label="Hometown" value="Unknown" />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-black uppercase italic mb-8 border-l-8 border-[#FE0002] pl-4 text-black">
                                Combat Ratings
                            </h2>
                            <div className="grid grid-cols-2 gap-y-10 bg-gray-50 p-6 rounded-none border border-black/5">
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
                            <h2 className="text-3xl font-display font-black uppercase italic mb-8 border-l-8 border-[#FE0002] pl-4 text-black">
                                Biography
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                    {fighter.bio || "No biography available for this fighter. Legend has it they prefer to let their performances inside the cage speak for themselves."}
                                </p>
                            </div>
                        </section>

                        <section className="bg-black text-white p-10 rounded-none relative overflow-hidden group shadow-2xl skew-y-1">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE0002] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity" />
                            <div className="-skew-y-1">
                                <h2 className="text-2xl font-display font-black uppercase italic mb-6 tracking-tight">Upcoming Bout</h2>
                                <div className="flex items-center gap-8">
                                    <div className="w-20 h-20 bg-white/10 flex items-center justify-center font-display font-black text-4xl italic text-[#FE0002]">?</div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase font-black tracking-[0.2em] mb-1">Next Event</p>
                                        <p className="text-3xl font-display font-black uppercase italic leading-none">CFC Championship Night</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="pt-8 flex justify-end">
                            <button
                                onClick={() => router.push('/fighters')}
                                className="group flex items-center gap-4 text-black hover:text-[#FE0002] transition-colors uppercase font-black tracking-widest text-sm"
                            >
                                <span className="w-12 h-1 bg-black group-hover:w-20 group-hover:bg-[#FE0002] transition-all" />
                                Back to Roster
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Background Pattern */}
            <div className="h-24 bg-gradient-to-t from-gray-100 to-transparent mt-12" />
        </div>
    );
};

export default FighterProfile;
