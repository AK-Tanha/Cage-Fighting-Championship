"use client";

import { getAllFighters } from "@/lib/api";
import { Fighter } from "@/types";
import { FIGHTERS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FighterCard: React.FC<{ fighter: Fighter }> = ({ fighter }) => {
    const record = fighter.record || "0-0";

    return (
        <Link
            href={`/fighters/${fighter._id}`}
            className="group relative bg-white overflow-hidden border-2 border-black/5 hover:border-[#FE0002] transition-all duration-300 aspect-[3/4] flex flex-col justify-end shadow-sm hover:shadow-xl"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={fighter.image_url || `https://picsum.photos/seed/${fighter.name}/350/254`}
                    alt={fighter.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FE0002]/0 via-[#FE0002]/10 to-[#FE0002]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-20" />
            </div>

            <div className="relative z-10 px-5 pb-5 pt-12 flex flex-col justify-end h-full">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-1">
                        <span className="inline-block bg-black text-white font-display font-black text-[10px] md:text-xs uppercase tracking-[0.2em] px-2 py-0.5 skew-x-[-10deg]">
                            {fighter.weight_class}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-black uppercase italic leading-[0.85] tracking-tighter text-black mb-2 group-hover:text-[#FE0002] transition-colors duration-200 drop-shadow-sm">
                        {fighter.name}
                    </h3>
                    <div className="flex items-center gap-3 border-t-2 border-black/10 pt-2 group-hover:border-[#FE0002]/50 transition-colors">
                        <p className="font-display font-black text-xl text-black tracking-tighter leading-none">
                            {record}
                        </p>
                        <span className="text-[#FE0002] font-bold text-[9px] uppercase tracking-widest">Pro Record</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-[#FE0002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-[#FE0002] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
    );
};

const FeaturedFighters: React.FC = () => {
    const { data: fighters, isLoading } = useQuery({
        queryKey: ["fighters"],
        queryFn: async () => {
            try {
                const data = await getAllFighters();
                const list = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray(data.data) ? data.data : []);
                return list.slice(0, 4);
            } catch {
                return FIGHTERS.slice(0, 4);
            }
        },
    });

    return (
        <section className="py-20 md:py-28 bg-gray-50 border-t border-black/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <span className="text-[#FE0002] text-[10px] font-black uppercase tracking-[0.3em] block mb-3">
                            ELITE COMBATANTS
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block">
                            TOP <span className="text-[#FE0002]">FIGHTERS</span>
                        </h2>
                    </div>
                    <Link
                        href="/fighters"
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-black hover:text-[#FE0002] transition-colors flex items-center gap-2 group"
                    >
                        View All Fighters
                        <i className="fa-solid fa-arrow-right text-[#FE0002] group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse aspect-[3/4] bg-gray-200 rounded-sm" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {(fighters ?? []).map((fighter: Fighter) => (
                            <FighterCard key={fighter._id} fighter={fighter} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedFighters;
