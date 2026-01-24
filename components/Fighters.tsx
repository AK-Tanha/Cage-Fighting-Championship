import React, { useState, useEffect } from 'react';
import { getAllFighters } from '../API/fighters'; // your API file
import { Fighter } from '../types';

const StatBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 bg-white/10 overflow-hidden rounded-full">
      <div
        className="h-full bg-[#FE0002] transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const FighterCard: React.FC<{ fighter: Fighter }> = ({ fighter }) => {
  const record = typeof fighter.record === 'string'
    ? fighter.record
    : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;

  return (
    <div className="group relative bg-[#171715] border border-white/5 hover:border-[#FE0002]/50 transition-all duration-500 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={fighter.image || 'https://via.placeholder.com/400x500?text=Fighter'}
          alt={fighter.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:-translate-y-2 transition-transform duration-500">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[#FE0002] font-bold text-sm uppercase tracking-tighter">
              #{fighter.rank ?? '—'} {fighter.weight_class ?? 'Unknown'}
            </p>
            <h3 className="text-3xl md:text-4xl font-oswald font-black uppercase tracking-tighter italic">
              {fighter.name}
            </h3>
            <p className="text-gray-300 text-sm italic mt-1">
              "{fighter.nickname || 'No nickname'}"
            </p>
          </div>
          <div className="text-right">
            <p className="font-oswald font-bold text-2xl leading-none">
              {record}
            </p>
            <p className="text-[11px] text-gray-500 uppercase mt-1">Pro Record</p>
          </div>
        </div>

        <div className="mt-5 max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <StatBar label="Striking" value={fighter.stats?.striking ?? 0} />
            <StatBar label="Grappling" value={fighter.stats?.grappling ?? 0} />
            <StatBar label="Stamina" value={fighter.stats?.stamina ?? 0} />
            <StatBar label="Power" value={fighter.stats?.power ?? 0} />
          </div>
          {fighter.fightingStyle && (
            <p className="text-[11px] text-white/70 mt-4 italic uppercase tracking-wide">
              Style: {fighter.fightingStyle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Fighters: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadFighters = async () => {
      try {
        const data = await getAllFighters();
        if (isMounted) {
          setFighters(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load the roster');
          console.error('Fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFighters();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-2xl md:text-3xl text-gray-300 animate-pulse">
          Loading Elite Roster...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh]">
        <p className="text-2xl md:text-3xl text-red-500 mb-4">{error}</p>
        <p className="text-gray-400">
          Make sure your backend is running at http://127.0.0.1:8000
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b-4 border-[#FE0002] pb-6">
        <h2 className="text-5xl md:text-7xl font-oswald font-black italic uppercase tracking-tighter mb-4 md:mb-0">
          ELITE <span className="text-[#FE0002]">ROSTER</span>
        </h2>
        <div className="flex flex-wrap gap-5">
          {['ALL', 'LIGHTWEIGHT', 'WELTERWEIGHT', 'HEAVYWEIGHT'].map((cat) => (
            <button
              key={cat}
              className="text-xs md:text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {fighters.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-400">
          No fighters found in the database yet.
          <br />
          <span className="text-sm mt-2 block">Add some via Swagger at /docs</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {fighters.map((fighter) => (
            <FighterCard key={fighter._id} fighter={fighter} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Fighters;