import Image from 'next/image';
import React, { forwardRef } from 'react';
import { Fighter } from '../types';

interface FighterHoverCardProps {
    fighter: Fighter;
    hoverPos: { x: number; y: number };
}

const FighterHoverCard = forwardRef<HTMLDivElement, FighterHoverCardProps>(
    ({ fighter, hoverPos }, ref) => {
        const cardW = 340;
        const cardH = 220;
        const offset = 16;
        
        let x = hoverPos.x + offset;
        let y = hoverPos.y + offset;
        
        if (typeof window !== 'undefined') {
            x = hoverPos.x + offset + cardW > window.innerWidth
                ? hoverPos.x - cardW - offset
                : hoverPos.x + offset;
            y = hoverPos.y + offset + cardH > window.innerHeight
                ? hoverPos.y - cardH - offset
                : hoverPos.y + offset;
        }

        return (
            <div
                ref={ref}
                style={{ left: x, top: y }}
                className="fixed z-[9999] bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] w-[340px] pointer-events-none flex overflow-hidden"
            >
                {/* Left: Photo */}
                <div className="relative w-28 shrink-0 bg-gray-100">
                    <Image
                        src={fighter.image_url || fighter.image || '/og-fighter-default.jpg'}
                        alt={fighter.name || 'Fighter'}
                        fill
                        className="object-cover object-top"
                    />
                </div>

                {/* Right: Info */}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                        <p className="text-[#FE0002] text-[9px] font-bold uppercase tracking-widest italic mb-1">
                            {fighter.weight_class}
                        </p>
                        <h4 className="font-display font-black uppercase text-lg leading-tight tracking-tighter mb-3 truncate">
                            {fighter.name}
                        </h4>

                        <div className="grid grid-cols-2 gap-1.5 mb-3">
                            <div className="bg-gray-50 px-2 py-1.5 border border-black/5">
                                <span className="text-[8px] text-gray-400 uppercase font-bold block">Record</span>
                                <span className="text-xs font-black italic">
                                    {typeof fighter.record === 'string'
                                        ? fighter.record
                                        : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`}
                                </span>
                            </div>
                            <div className="bg-gray-50 px-2 py-1.5 border border-black/5">
                                <span className="text-[8px] text-gray-400 uppercase font-bold block">Nationality</span>
                                <span className="text-xs font-black italic truncate">
                                    {fighter.nationality || "N/A"}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-[10px] line-clamp-2 leading-relaxed border-l-2 border-[#FE0002] pl-2">
                            {fighter.bio || 'No biography available.'}
                        </p>
                    </div>

                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1 mt-3">
                        <i className="fa-solid fa-arrow-pointer text-[8px]"></i> Click to view profile
                    </p>
                </div>
            </div>
        );
    }
);

FighterHoverCard.displayName = 'FighterHoverCard';

export default FighterHoverCard;
