
import React from 'react';
import { FIGHTERS } from '../constants';
import { Fighter } from '../types';

const StatBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 bg-white/10 overflow-hidden">
      <div 
        className="h-full bg-[#FE0002] transition-all duration-1000" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const FighterCard: React.FC<{ fighter: Fighter }> = ({ fighter }) => (
  <div className="group relative bg-[#171715] border border-white/5 hover:border-[#FE0002]/50 transition-all duration-500 overflow-hidden">
    <div className="aspect-[4/5] overflow-hidden">
      <img 
        src={fighter.image} 
        alt={fighter.name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
      />
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:-translate-y-2 transition-transform">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-[#FE0002] font-bold text-sm uppercase tracking-tighter">#{fighter.rank} {fighter.weightClass}</p>
          <h3 className="text-3xl font-oswald font-black uppercase tracking-tighter italic">{fighter.name}</h3>
          <p className="text-gray-400 text-xs italic">"{fighter.nickname}"</p>
        </div>
        <div className="text-right">
          <p className="font-oswald font-bold text-lg leading-none">{fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</p>
          <p className="text-[10px] text-gray-500 uppercase">Pro Record</p>
        </div>
      </div>

      <div className="mt-4 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
        <div className="grid grid-cols-2 gap-x-4">
          <StatBar label="Striking" value={fighter.stats.striking} />
          <StatBar label="Grappling" value={fighter.stats.grappling} />
          <StatBar label="Stamina" value={fighter.stats.stamina} />
          <StatBar label="Power" value={fighter.stats.power} />
        </div>
        <p className="text-[10px] text-white/60 mt-2 italic uppercase">Style: {fighter.fightingStyle}</p>
      </div>
    </div>
  </div>
);

const Fighters: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <div className="flex items-end justify-between mb-12 border-b-4 border-[#FE0002] pb-4">
        <h2 className="text-6xl font-oswald font-black italic uppercase tracking-tighter">
          ELITE <span className="text-[#FE0002]">ROSTER</span>
        </h2>
        <div className="flex gap-4 mb-2">
          {['ALL', 'LIGHTWEIGHT', 'WELTERWEIGHT', 'HEAVYWEIGHT'].map(f => (
            <button key={f} className="text-xs font-bold tracking-widest text-gray-500 hover:text-white transition-colors">{f}</button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FIGHTERS.map(fighter => (
          <FighterCard key={fighter.id} fighter={fighter} />
        ))}
      </div>
    </div>
  );
};

export default Fighters;
