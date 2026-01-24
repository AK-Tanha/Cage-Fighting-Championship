
import React, { useState, useRef, useEffect } from 'react';
import { getFightAnalysis } from '../services/gemini';
import { ChatMessage } from '../types';

const AIAnalyst: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the CFC War Room. I'm your AI Fight Analyst. Which matchup should we break down today? Ask me about Silva vs Forge, or any hypothetical battle!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const result = await getFightAnalysis(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: result || 'Error analyzing fight.' }]);
    setIsLoading(false);
  };

  return (
    <div className="pt-32 pb-10 max-w-5xl mx-auto px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-4xl font-oswald font-black italic uppercase tracking-tighter">
          CFC <span className="text-[#FE0002]">ANALYST</span>
        </h2>
        <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Powered by Gemini 3.0</span>
      </div>

      <div className="flex-1 bg-[#171715] border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-sm ${
                msg.role === 'user' 
                  ? 'bg-[#FE0002] text-white font-bold' 
                  : 'bg-black/50 border-l-4 border-[#FE0002] text-gray-200'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black/50 border-l-4 border-gray-500 p-4 rounded-sm text-gray-400 italic text-sm animate-pulse">
                Breaking down the fight tape...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/30">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a fight breakdown (e.g. 'How does Forge beat Silva?')..."
              className="flex-1 bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#FE0002] transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-[#FE0002] hover:bg-white hover:text-black transition-all text-white w-12 flex items-center justify-center rounded-sm"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Suggestions:</span>
            {['Silva vs Forge', 'Vance path to victory', 'Top striking keys'].map(s => (
                <button 
                    key={s} 
                    onClick={() => setInput(s)}
                    className="text-[10px] text-gray-400 hover:text-[#FE0002] transition-colors underline"
                >
                    {s}
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyst;
