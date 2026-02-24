
export default function AdminEventsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-black uppercase tracking-tight">Events Management</h2>
                <button className="bg-[#FE0002] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95">
                    <i className="fa-solid fa-plus"></i> Create Event
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                    { id: 'CFC-300', name: 'PEREIRA VS HILL', date: 'APR 13, 2024', location: 'T-Mobile Arena, Las Vegas, NV', status: 'Upcoming', img: '/api/placeholder/400/200' },
                    { id: 'CFC-299', name: 'O\'MALLEY VS VERA 2', date: 'MAR 09, 2024', location: 'Kaseya Center, Miami, FL', status: 'Completed', img: '/api/placeholder/400/200' },
                    { id: 'CFC-298', name: 'VOLKANOVSKI VS TOPURIA', date: 'FEB 17, 2024', location: 'Honda Center, Anaheim, CA', status: 'Completed', img: '/api/placeholder/400/200' }
                ].map((event, i) => (
                    <div key={i} className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm group">
                        <div className="h-40 bg-gray-200 relative">
                            {/* In a real app, use next/image here */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 group-hover:bg-black/20 transition-colors">
                                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter text-center">{event.name}</h3>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className={`px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded-sm ${event.status === 'Upcoming' ? 'bg-[#FE0002] text-white' : 'bg-white text-black'}`}>
                                    {event.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-[10px] text-[#FE0002] font-bold uppercase tracking-widest">{event.id}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <i className="fa-solid fa-calendar-days text-gray-400"></i> {event.date}
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 font-medium mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-location-dot text-gray-400"></i>
                                {event.location}
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-black/5">
                                <button className="flex-1 py-2 text-center border border-black/10 hover:border-black text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm text-black">
                                    Edit Event
                                </button>
                                <button className="flex-1 py-2 text-center bg-gray-100 hover:bg-gray-200 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm text-black">
                                    Fight Card
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
