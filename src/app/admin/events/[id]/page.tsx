"use client";
import { getAllFighters, getAllReferees, getEventById } from "@/lib/api";
import { Fighter, FightEvent } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FighterHoverCard from "@/components/FighterHoverCard";

const EventDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<FightEvent | null>(null);
  const [fighters, setFighters] = useState<Record<string, Fighter>>({});
  const [referees, setReferees] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [fighterHoverCard, setFighterHoverCard] = useState<Fighter | null>(
    null,
  );
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!params?.id) return;
      try {
        const [eventData, fightersData, refereesData] = await Promise.all([
          getEventById(params.id as string),
          getAllFighters(),
          getAllReferees(),
        ]);
        setEvent(eventData);

        const fighterMap: Record<string, Fighter> = {};
        fightersData.forEach((f: Fighter) => {
          fighterMap[f._id] = f;
        });
        setFighters(fighterMap);

        const refereeMap: Record<string, any> = {};
        refereesData.forEach((r: any) => {
          refereeMap[r._id] = r;
        });
        setReferees(refereeMap);
      } catch (err: any) {
        setError(err.message || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE0002]"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-red-50 border border-red-200 text-[#FE0002] p-8 rounded-sm text-center">
        <p className="font-bold uppercase tracking-widest">
          {error || "Event not found"}
        </p>
        <button
          onClick={() => router.push("/admin/events")}
          className="mt-4 text-xs font-bold uppercase tracking-widest underline"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Fighter Hover Card */}
      {fighterHoverCard && (
        <FighterHoverCard
          ref={hoverCardRef}
          fighter={fighterHoverCard}
          hoverPos={hoverPos}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Event Details
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#FE0002] transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push(`/admin/events/edit/${event._id}`)}
          >
            <i className="fa-solid fa-pen"></i> Edit
          </button>
          <button
            className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push("/admin/events/create")}
          >
            <i className="fa-solid fa-plus"></i> Add Event
          </button>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm">
        <div className="w-full bg-black relative h-[300px] md:h-[400px]">
          <Image
            src={event.image_url || event.image || "/og-event-default.jpg"}
            alt={event.name}
            className="w-full h-full object-cover object-top"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter mb-4 leading-none">
              {event.name}
            </h1>
            <p className="text-gray-600 mb-6">
              Explore the full match listings and details for {event.name}.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Date
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Location
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {event.location}
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Status
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {event.status || "Scheduled"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 py-8 border-t border-black/5">
            <div>
              <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-4">
                Fight Card
              </h3>
              {event && event.fights && event.fights.length > 0 ? (
                <ul className="space-y-2">
                  {event.fights.map((fight: any, index: number) => {
                    const f1 = fighters[fight.fighter1];
                    const f2 = fighters[fight.fighter2];
                    return (
                      <li
                        key={index}
                        className="px-4 py-3 bg-gray-50 border border-black/5 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between text-sm gap-4"
                      >
                        <div className="flex items-center flex-wrap gap-2 md:gap-3 w-full md:w-auto">
                          <span className="font-bold text-[#FE0002] uppercase mr-1 md:mr-2.5 text-xs whitespace-nowrap">
                            Bout {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Fighter 1 */}
                          <div
                            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white hover:shadow-sm transition-all rounded-sm"
                            onClick={() =>
                              f1 && router.push(`/admin/fighters/${f1._id}`)
                            }
                            onMouseEnter={() => f1 && setFighterHoverCard(f1)}
                            onMouseMove={(e) =>
                              setHoverPos({ x: e.clientX, y: e.clientY })
                            }
                            onMouseLeave={() => setFighterHoverCard(null)}
                          >
                            <div className="relative w-10 h-10 overflow-hidden shrink-0 bg-gray-100">
                              <Image
                                src={
                                  f1?.image_url ||
                                  f1?.image ||
                                  "/og-fighter-default.jpg"
                                }
                                alt={f1?.name || "Fighter"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-semibold text-xs whitespace-nowrap pr-2">
                              {f1?.name ||
                                fight.fighter1Name ||
                                "Unknown Fighter"}
                            </span>
                          </div>

                          <span className="mx-1 text-gray-400 font-display italic text-[10px]">
                            VS
                          </span>

                          {/* Fighter 2 */}
                          <div
                            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white hover:shadow-sm transition-all rounded-sm"
                            onClick={() =>
                              f2 && router.push(`/admin/fighters/${f2._id}`)
                            }
                            onMouseEnter={() => f2 && setFighterHoverCard(f2)}
                            onMouseMove={(e) =>
                              setHoverPos({ x: e.clientX, y: e.clientY })
                            }
                            onMouseLeave={() => setFighterHoverCard(null)}
                          >
                            <div className="relative w-10 h-10 overflow-hidden shrink-0 bg-gray-100">
                              <Image
                                src={
                                  f2?.image_url ||
                                  f2?.image ||
                                  "/og-fighter-default.jpg"
                                }
                                alt={f2?.name || "Fighter"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-semibold text-xs whitespace-nowrap pr-2">
                              {f2?.name ||
                                fight.fighter2Name ||
                                "Unknown Fighter"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white border border-black/5 px-2 py-1 rounded whitespace-nowrap">
                            {fight.weight_class || "TBD"}
                          </span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight bg-gray-50 border border-black/5 px-2 py-1 rounded whitespace-nowrap flex items-center gap-1">                            
                            Ref:{" "}
                            <span onClick={() =>
                              fight.referee &&
                              router.push(`/admin/referees/${fight.referee}`)
                            } className="text-[10px] text-gray-500 font-bold uppercase tracking-tight bg-gray-50 border border-black/5 px-2 py-1 rounded whitespace-nowrap cursor-pointer hover:text-[#FE0002]">
                              {fight.referee && referees[fight.referee]
                                ? referees[fight.referee].name
                                : "N/A"}
                            </span>
                          </span>
                          {fight.result && (
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest bg-black px-2 py-1 rounded whitespace-nowrap">
                              {fight.result}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-8 bg-gray-50 border border-black/5 rounded-sm">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No fights scheduled
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
