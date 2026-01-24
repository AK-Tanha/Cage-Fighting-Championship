
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-[#FE0002] p-2 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <i className="fa-solid fa-hand-fist text-white -rotate-45 group-hover:rotate-0 transition-transform"></i>
          </div>
          <span className="font-oswald text-2xl font-black tracking-tighter">
            CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-oswald text-sm font-bold tracking-widest uppercase">
          {[
            { id: 'home', label: 'Home' },
            { id: 'events', label: 'Events' },
            { id: 'fighters', label: 'Fighters' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`hover:text-[#FE0002] transition-colors relative pb-1 ${
                currentView === item.id ? 'text-[#FE0002]' : 'text-gray-400'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FE0002]"></span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-[#FE0002] text-white px-6 py-2 font-oswald font-bold uppercase tracking-wider skew-x-[-15deg] hover:bg-white hover:text-black transition-all">
            <span className="inline-block skew-x-[15deg]">Buy Tickets</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
