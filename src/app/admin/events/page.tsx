"use client";
import { deleteEvent, getAllEvents } from "@/lib/api";
import { FightEvent } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminEventsPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: events = [] } = useQuery<FightEvent[]>({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await getAllEvents();
            return response;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        deleteMutation.mutate(id);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Events Management
                </h2>
                <button
                    className="bg-[#FE0002] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95 w-full sm:w-auto justify-center"
                    onClick={() => router.push("/admin/events/create")}
                >
                    <i className="fa-solid fa-plus"></i> Create Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, i) => (
                    <div
                        key={i}
                        className="flex flex-col h-full bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
                    >
                        <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                            <Image
                                src={event.image_url || "/og-event-default.jpg"}
                                alt={event.name}
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={i < 3}
                            />
                            <div className="absolute top-4 right-4 z-10">
                                <span
                                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm shadow-sm text-white ${
                                        new Date(event.date) >= new Date() ? "bg-[#FE0002]" : "bg-gray-500"
                                    }`}
                                >
                                    {new Date(event.date) >= new Date() ? "Upcoming" : "Past"}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="mb-auto">
                                <div className="flex flex-col gap-2 mb-4">
                                    <h3 className="font-display font-black text-base text-black uppercase tracking-tighter leading-tight">
                                        {event.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        <i className="fa-solid fa-calendar-days text-[#FE0002]"></i>
                                        {event.date}
                                    </div>
                                </div>

                                <div className="text-[11px] text-gray-600 font-medium flex items-center gap-2 mb-6">
                                    <i className="fa-solid fa-location-dot text-gray-400"></i>
                                    {event.location}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-6 border-t border-black/5">
                                <button
                                    onClick={() => router.push(`/admin/events/${event._id}`)}
                                    className="flex-1 py-2.5 text-center border border-black/10 hover:bg-black hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm text-black"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => router.push(`/admin/events/edit/${event._id}`)}
                                    className="flex-1 py-2.5 text-center border border-black/10 hover:bg-black hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm text-black"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="flex-[0.5] py-2.5 text-center bg-red-50 hover:bg-red-100 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm text-red-600"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
