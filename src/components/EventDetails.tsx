"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useRef } from "react";
import { getAllFighters, getAllReferees, getEventById } from "../lib/api";
import { FightEvent, Fighter, formatRecord } from "../types";
import { useQuery } from "@tanstack/react-query";
import { EventDetailsSkeleton } from "./Skeleton";
import FighterHoverCard from "./FighterHoverCard";
import PageHeader from "./PageHeader";

const FightRow: React.FC<{
  fight: any;
  fighters: Record<string, Fighter>;
  referees: Record<string, any>;
  index: number;
  setFighterHoverCard?: (f: Fighter | null) => void;
  setHoverPos?: (pos: { x: number; y: number }) => void;
}> = ({
  fight,
  fighters,
  referees,
  index,
  setFighterHoverCard,
  setHoverPos,
}) => {
  const f1 = fighters[fight.fighter1];
  const f2 = fighters[fight.fighter2];

  return (
    <div className="group relative bg-white border border-black/5 hover:border-[#FE0002]/30 transition-all rounded-sm p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-sm">
      <div
        className="flex-1 flex items-center gap-3 md:gap-4 w-full md:w-auto min-w-0"
        onMouseEnter={() =>
          setFighterHoverCard && f1 && setFighterHoverCard(f1)
        }
        onMouseMove={(e) =>
          setHoverPos && setHoverPos({ x: e.clientX, y: e.clientY })
        }
        onMouseLeave={() => setFighterHoverCard && setFighterHoverCard(null)}
      >
        <div className="text-xl md:text-2xl font-display font-black text-black/5 group-hover:text-[#FE0002]/10 transition-colors shrink-0">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 text-right min-w-0">
          <h4 className="text-lg md:text-xl font-display font-black uppercase italic truncate">
            <Link
              href={`/fighters/${f1?._id}`}
              className="hover:text-[#FE0002] transition-colors"
            >
              {f1?.personal_info?.full_name || "Unknown Fighter"}
            </Link>
          </h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            {formatRecord(f1?.record)}
          </p>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-none overflow-hidden border border-black/5 group-hover:border-[#FE0002]/30 transition-all bg-gray-50 relative">
          <Image
            src={
              f1?.media?.profile_image || '/og-fighter-default.jpg'
            }
            alt={f1?.personal_info?.full_name || "Fighter Image"}
            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
            fill
            sizes="56px"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center shrink-0 min-w-[100px] border-x border-black/5 px-4 h-full">
        <div className="text-2xl font-display font-black italic text-black/10 group-hover:text-[#FE0002]/20 transition-colors">
          VS
        </div>
        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black mb-1">
          {fight.weight_class}
        </p>

        <div className="flex flex-col items-center mt-1">
          <p className="text-[7px] font-black uppercase tracking-widest text-[#FE0002] mb-0.5 opacity-60">
            Referee
          </p>
          <p className="text-[9px] font-bold uppercase tracking-tight text-gray-500 whitespace-nowrap">
            {fight.referee && referees[fight.referee]
              ? referees[fight.referee].name
              : "Pending"}
          </p>
        </div>

        {fight.title_fight && (
          <span className="bg-black text-white text-[7px] font-black px-2 py-0.5 rounded-none mt-2 uppercase tracking-widest">
            TITLE FIGHT
          </span>
        )}
      </div>

      <div
        className="flex-1 flex flex-row-reverse items-center gap-3 md:gap-4 w-full md:w-auto min-w-0"
        onMouseEnter={() =>
          setFighterHoverCard && f2 && setFighterHoverCard(f2)
        }
        onMouseMove={(e) =>
          setHoverPos && setHoverPos({ x: e.clientX, y: e.clientY })
        }
        onMouseLeave={() => setFighterHoverCard && setFighterHoverCard(null)}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-none overflow-hidden border border-black/5 group-hover:border-[#FE0002]/30 transition-all bg-gray-50 relative">
          <Image
            src={
              f2?.media?.profile_image || `https://picsum.photos/seed/${f2?._id}/300/300`
            }
            alt={f2?.personal_info?.full_name || "Fighter Image"}
            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
            fill
            sizes="56px"
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <h4 className="text-lg md:text-xl font-display font-black uppercase italic truncate">
            <Link
              href={`/fighters/${f2?._id}`}
              className="hover:text-[#FE0002] transition-colors"
            >
              {f2?.personal_info?.full_name || "Unknown Fighter"}
            </Link>
          </h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            {formatRecord(f2?.record)}
          </p>
        </div>
        <div className="w-6 shrink-0 hidden md:block" />
      </div>
    </div>
  );
};

const EventDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [fighterHoverCard, setFighterHoverCard] = React.useState<Fighter | null>(null);
  const [hoverPos, setHoverPos] = React.useState({ x: 0, y: 0 });
  const hoverCardRef = useRef<HTMLDivElement>(null);

  const { data: event, isLoading: eventLoading, error: eventError } = useQuery({
    queryKey: ["event", params?.id],
    queryFn: () => getEventById(params!.id as string),
    enabled: !!params?.id,
  });

  const { data: fightersMap = {} } = useQuery({
    queryKey: ["fighters"],
    queryFn: async () => {
      const data = await getAllFighters();
      const fighterMap: Record<string, Fighter> = {};
      (Array.isArray(data) ? data : []).forEach((f: Fighter) => {
        fighterMap[f._id] = f;
      });
      return fighterMap;
    },
    enabled: !!params?.id,
  });

  const { data: refereesMap = {} } = useQuery({
    queryKey: ["referees"],
    queryFn: async () => {
      const data = await getAllReferees();
      const refereeMap: Record<string, any> = {};
      (Array.isArray(data) ? data : []).forEach((r: any) => {
        refereeMap[r._id] = r;
      });
      return refereeMap;
    },
    enabled: !!params?.id,
  });

  if (eventLoading) return <EventDetailsSkeleton />;

  if (eventError || !event)
    return (
      <div className="min-h-screen pt-20 md:pt-28 px-4 flex flex-col items-center">
        <h1 className="text-6xl font-display font-black uppercase text-[#FE0002] italic mb-4">
          Event Nullified
        </h1>
        <p className="text-gray-500 mb-8">
          {eventError instanceof Error ? eventError.message : "Event data corrupted or missing from the grid."}
        </p>
        <button
          onClick={() => router.push("/events")}
          className="bg-[#FE0002] text-white px-8 py-3 font-display font-black uppercase tracking-widest hover:bg-black transition-all italic"
        >
          Back to Schedule
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black pb-24 pt-20">
      {fighterHoverCard && (
        <FighterHoverCard
          ref={hoverCardRef}
          fighter={fighterHoverCard}
          hoverPos={hoverPos}
        />
      )}

      <div className="w-full relative h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden group">
        <Image
          src={event.image_url || `/api/proxy/events/${event._id}/image/`}
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          alt={event.name}
          fill
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      <PageHeader
        className="pt-8 pb-6"
        topSection={
          <div className="flex items-center gap-4">
            <span className="bg-[#FE0002] text-white px-5 py-1.5 text-xs font-black italic uppercase skew-x-[-12deg] shadow-lg shadow-[#FE0002]/20">
              <span className="inline-block skew-x-[12deg]">
                OFFICIAL EVENT
              </span>
            </span>
            <div className="h-px w-12 bg-black/10" />
            <span className="text-black font-display font-black uppercase tracking-[0.2em] text-sm">
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        }
        title={event.name}
        bottomLeftSection={
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-3 text-black">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <i className="fa-solid fa-location-dot text-[#FE0002]"></i>
              </div>
              <span className="font-display font-black uppercase tracking-widest text-sm md:text-base italic">
                {event.location}
              </span>
            </div>
            <div className="w-px h-6 bg-black/10 hidden md:block" />
            <div className="flex items-center gap-3 text-black">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-[#FE0002]"></i>
              </div>
              <span className="font-display font-black uppercase tracking-widest text-sm md:text-base italic">
                CFC Championship Card
              </span>
            </div>
          </div>
        }
        bottomRightSection={
          <div className="bg-black text-white px-8 py-5 flex items-center gap-5 skew-x-[-12deg] shadow-xl shadow-black/30">
            <div className="skew-x-[12deg] text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                Fight Card
              </p>
              <p className="text-4xl font-display font-black italic leading-none">
                {event.fights?.length || 0}
              </p>
            </div>
            <div className="w-px h-10 bg-white/20 skew-x-[12deg]" />
            <div className="skew-x-[12deg]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                Status
              </p>
              <p className="text-xl font-display font-black italic leading-none text-[#FE0002]">
                BOUTS
              </p>
            </div>
          </div>
        }
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-transparent via-gray-100/50 to-transparent -z-10 pointer-events-none blur-3xl" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b-2 border-black/10 pb-8 relative">
          <div className="flex items-center gap-4">
            <div className="w-2 h-12 bg-[#FE0002] skew-x-[-15deg]"></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-black drop-shadow-sm">
                OFFICIAL <span className="text-[#FE0002]">FIGHT CARD</span>
              </h2>
              <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mt-2">
                Main Card & Prelims
              </p>
            </div>
          </div>
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-lg shadow-black/20 flex items-center gap-3 transform hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE0002] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FE0002]"></span>
            </span>
            <p className="font-bold text-sm uppercase tracking-widest">
              {event.fights?.length || 0} MATCHUPS
            </p>
          </div>
        </div>

        {!event.fights || event.fights.length === 0 ? (
          <div className="relative overflow-hidden group text-center py-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-black/5 shadow-inner">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <i className="fa-solid fa-lock text-5xl text-gray-300 group-hover:text-[#FE0002] transition-colors duration-500"></i>
              <h3 className="text-2xl font-display uppercase italic font-black text-gray-400">
                Card Locked
              </h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-sm mx-auto">
                Fight card pending final commission approval. Check back soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-10 relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 via-black/5 to-transparent -z-10 hidden md:block"></div>

            {event.fights.map((fight: any, idx: number) => (
              <div
                key={idx}
                className="relative group/row transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 opacity-0 md:group-hover/row:opacity-100 transition-opacity duration-300 font-display font-black text-[#FE0002] text-xl italic flex items-center justify-center">
                  <span className="bg-white border-2 border-black/5 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transform -skew-x-12">
                    #{idx + 1}
                  </span>
                </div>
                <FightRow
                  fight={fight}
                  fighters={fightersMap}
                  referees={refereesMap}
                  index={idx}
                  setFighterHoverCard={setFighterHoverCard}
                  setHoverPos={setHoverPos}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-display font-black uppercase italic mb-2 text-black">
              Want to witness history?
            </h3>
            <p className="text-gray-600">
              Tickets are selling fast. Secure your seat at the arena now.
            </p>
          </div>
          <button className="bg-[#FE0002] hover:bg-black text-white px-12 py-4 font-display font-black uppercase italic tracking-widest transition-all">
            Buy Live Tickets
          </button>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="text-gray-500 hover:text-black transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
          >
            <span className="w-10 h-px bg-gray-500 group-hover:bg-black group-hover:w-16 transition-all" />
            Back to Events
            <span className="w-10 h-px bg-gray-500 group-hover:bg-black group-hover:w-16 transition-all" />
          </Link>
        </div>
      </div>

      <div className="md:hidden fixed bottom-10 left-6 right-6 z-50 animate-slide-in-bottom">
        <button className="w-full bg-[#FE0002] text-white py-4 font-display font-black uppercase italic tracking-widest shadow-2xl shadow-[#FE0002]/40 rounded-sm">
          Live Tickets - CFC {event.name.split(":")?.[0]}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
