
import React from 'react';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <div className="mb-16">
        <h2 className="text-6xl font-oswald font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block">
          SCHEDULED <span className="text-[#FE0002]">WARS</span>
        </h2>
      </div>

      <div className="space-y-12">
        {EVENTS.map((event) => (
          <div key={event.id} className="group relative bg-[#171715] rounded-lg overflow-hidden flex flex-col lg:flex-row hover:shadow-[0_0_30px_rgba(254,0,2,0.15)] transition-all border border-white/5">
            <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {event.isLive && (
                <div className="absolute top-4 left-4 bg-[#FE0002] text-white px-3 py-1 text-xs font-bold uppercase animate-pulse rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE NOW
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
              <p className="text-[#FE0002] font-bold text-sm tracking-widest mb-2 uppercase">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h3 className="text-4xl md:text-5xl font-oswald font-black uppercase mb-4 group-hover:text-[#FE0002] transition-colors">{event.title}</h3>
              <div className="flex items-center gap-6 mb-8 text-gray-400 font-medium">
                <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-[#FE0002]"></i> {event.location}</span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-trophy text-[#FE0002]"></i> {event.mainEvent}</span>
              </div>
              <div className="flex gap-4">
                <button className="bg-[#FE0002] text-white px-8 py-3 font-oswald font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Get Tickets
                </button>
                <button className="border border-white/20 text-white px-8 py-3 font-oswald font-bold uppercase tracking-widest hover:border-[#FE0002] transition-all">
                  Fight Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
