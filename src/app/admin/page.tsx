
export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Total Fighters</h3>
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            <i className="fa-solid fa-user-group text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display font-medium">124</div>
                    <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-arrow-trend-up"></i> +4 this month
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Upcoming Events</h3>
                        <div className="w-8 h-8 rounded-full bg-red-50 text-[#FE0002] flex items-center justify-center">
                            <i className="fa-solid fa-calendar text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display font-medium">3</div>
                    <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-arrow-trend-up"></i> Next event in 5 days
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Tickets Sold</h3>
                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                            <i className="fa-solid fa-ticket text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display font-medium">1,204</div>
                    <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-arrow-trend-up"></i> +15% vs last event
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border border-black/5 shadow-sm rounded-sm">
                    <div className="p-6 border-b border-black/5">
                        <h3 className="font-display font-bold uppercase tracking-widest text-sm">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 pb-4 border-b border-black/5 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#FE0002]"></div>
                                    <div>
                                        <p className="font-medium text-sm">New fighter registration pending</p>
                                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-black/5 shadow-sm rounded-sm">
                    <div className="p-6 border-b border-black/5">
                        <h3 className="font-display font-bold uppercase tracking-widest text-sm">Quick Actions</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <button className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group">
                            <i className="fa-solid fa-plus text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Add Fighter</span>
                        </button>
                        <button className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group">
                            <i className="fa-solid fa-calendar-plus text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Create Event</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
