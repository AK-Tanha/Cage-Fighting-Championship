
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fighters from './components/Fighters';
import Events from './components/Events';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Hero onNavigate={setCurrentView} />;
      case 'fighters':
        return <Fighters />;
      case 'events':
        return <Events />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <footer className="bg-[#171715] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#FE0002] p-1 rotate-45">
                  <i className="fa-solid fa-hand-fist text-white text-xs -rotate-45"></i>
                </div>
                <span className="font-oswald text-xl font-black tracking-tighter uppercase">
                  CAGE FIGHTING <span className="text-[#FE0002]">CHAMPIONSHIP</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                The global leader in elite MMA competition. Based in the shadows of the cage, built on the blood of champions. Join the revolution.
              </p>
            </div>
            
            <div>
              <h4 className="font-oswald font-bold uppercase mb-4 tracking-widest text-[#FE0002]">Navigation</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView('events')}>Fight Schedule</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView('fighters')}>Fighter Rankings</li>
                <li className="hover:text-white cursor-pointer transition-colors">Fight Pass</li>
              </ul>
            </div>

            <div>
              <h4 className="font-oswald font-bold uppercase mb-4 tracking-widest text-[#FE0002]">Socials</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-black hover:bg-[#FE0002] transition-all rounded-sm">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-black hover:bg-[#FE0002] transition-all rounded-sm">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-black hover:bg-[#FE0002] transition-all rounded-sm">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <p>&copy; 2024 CFC Global Promotions. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
