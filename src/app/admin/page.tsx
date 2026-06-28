"use client";
import { getDashboard } from "@/lib/api";
import { DashboardResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const router = useRouter();

    const { data } = useQuery<DashboardResponse>({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await getDashboard();
            return response;
        },
    });

    const stats = data?.stats;
    const nextEvent = data?.next_event;
    const recentEvents = data?.recent_events ?? [];

    const daysUntilNext = nextEvent
        ? Math.ceil((new Date(nextEvent.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight">Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Total Fighters</h3>
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            <i className="fa-solid fa-user-group text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display">{stats?.total_fighters ?? "—"}</div>
                    <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-circle-check text-green-500"></i> {stats?.active_fighters ?? "—"} active
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Upcoming Events</h3>
                        <div className="w-8 h-8 rounded-full bg-red-50 text-[#FE0002] flex items-center justify-center">
                            <i className="fa-solid fa-calendar text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display">{stats?.upcoming_events ?? "—"}</div>
                    {daysUntilNext !== null ? (
                        <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                            <i className="fa-solid fa-clock"></i> Next in {daysUntilNext}d
                        </p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                            <i className="fa-solid fa-calendar-xmark"></i> No upcoming
                        </p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Total Events</h3>
                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                            <i className="fa-solid fa-trophy text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display">{stats?.total_events ?? "—"}</div>
                    <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-check-circle text-purple-500"></i> {stats?.past_events ?? "—"} past
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-display font-bold uppercase tracking-widest text-xs">Referees</h3>
                        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <i className="fa-solid fa-gavel text-sm"></i>
                        </div>
                    </div>
                    <div className="text-3xl font-black font-display">{stats?.total_referees ?? "—"}</div>
                    <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-images text-amber-500"></i> {stats?.total_hero_slides ?? "—"} hero slides
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-black/5 shadow-sm rounded-sm">
                    <div className="p-6 border-b border-black/5">
                        <h3 className="font-display font-bold uppercase tracking-widest text-sm">Recent Events</h3>
                    </div>
                    <div className="p-6">
                        {recentEvents.length > 0 ? (
                            <div className="space-y-4">
                                {recentEvents.map((event) => {
                                    const eventDate = new Date(event.date);
                                    const isPast = eventDate < new Date();
                                    return (
                                        <div
                                            key={event._id}
                                            className="flex items-start gap-4 pb-4 border-b border-black/5 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-sm transition-colors"
                                            onClick={() => router.push(`/admin/events/${event._id}`)}
                                        >
                                            <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${isPast ? "bg-gray-300" : "bg-[#FE0002]"}`}></div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-sm truncate">{event.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {event.date} &middot; {event.location}
                                                </p>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shrink-0 ${isPast ? "bg-gray-100 text-gray-400" : "bg-green-50 text-green-600"}`}>
                                                {event.fights?.length || 0} fights
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <i className="fa-solid fa-calendar-day text-3xl mb-3 block"></i>
                                <p className="text-sm font-medium">No events yet</p>
                                <button
                                    onClick={() => router.push("/admin/events/create")}
                                    className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#FE0002] hover:text-black transition-colors"
                                >
                                    Create Event
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-black/5 shadow-sm rounded-sm">
                    <div className="p-6 border-b border-black/5">
                        <h3 className="font-display font-bold uppercase tracking-widest text-sm">Quick Actions</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <button
                            className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group"
                            onClick={() => router.push("/admin/fighters/create")}
                        >
                            <i className="fa-solid fa-plus text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Add Fighter</span>
                        </button>
                        <button
                            className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group"
                            onClick={() => router.push("/admin/events/create")}
                        >
                            <i className="fa-solid fa-calendar-plus text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Create Event</span>
                        </button>
                        <button
                            className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group"
                            onClick={() => router.push("/admin/referees/create")}
                        >
                            <i className="fa-solid fa-gavel text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Add Referee</span>
                        </button>
                        <button
                            className="p-4 border border-black/10 rounded-sm hover:border-black transition-colors flex flex-col items-center justify-center gap-2 group"
                            onClick={() => router.push("/admin/hero/create")}
                        >
                            <i className="fa-solid fa-images text-gray-400 group-hover:text-[#FE0002] transition-colors"></i>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Hero Slide</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
