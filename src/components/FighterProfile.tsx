"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { getFighterById } from "../lib/api";
import { Fighter, FightRecord, formatRecord } from "../types";
import { useQuery } from "@tanstack/react-query";
import { FighterProfileSkeleton } from "./Skeleton";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  MessageCircle,
} from "lucide-react";
import PageHeader from "./PageHeader";

const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="border-l-4 border-[#FE0002] pl-4 py-3 bg-gray-50 rounded-r-none border-b border-gray-100">
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
      {label}
    </p>
    <p className="text-xl font-display font-black uppercase italic text-black leading-none">
      {value}
    </p>
  </div>
);

const FightCard: React.FC<{ fight: FightRecord; showResult: boolean }> = ({
  fight,
  showResult,
}) => (
  <div className="flex items-center gap-3 md:gap-8">
    <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 flex items-center justify-center font-display font-black text-xl md:text-3xl italic overflow-hidden rounded-full shrink-0">
      {fight.opponent_image ? (
        <Image
          src={fight.opponent_image}
          alt={fight.opponent_name}
          className="w-full h-full object-cover"
          width={80}
          height={80}
        />
      ) : (
        <span className="text-[#FE0002]">
          {fight.opponent_name.charAt(0)}
        </span>
      )}
    </div>
    <div className="flex-1 min-w-0">
      {showResult && fight.result && (
        <p className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-[0.2em] mb-1">
          {fight.result === "win" ? (
            <span className="text-green-400">WIN</span>
          ) : (
            <span className="text-red-400">LOSS</span>
          )}
          {fight.method && <span> &mdash; {fight.method}</span>}
          {fight.round_ended && <span> &mdash; R{fight.round_ended}</span>}
          {fight.time_ended && <span> &mdash; {fight.time_ended}</span>}
        </p>
      )}
      {!showResult && (
        <p className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-[0.2em] mb-1">
          Next Fight
        </p>
      )}
      <p className="text-base md:text-2xl font-display font-black uppercase italic leading-none mb-1 truncate">
        vs {fight.opponent_name}
      </p>
      <p className="text-[11px] md:text-sm text-gray-400 font-bold tracking-wide truncate">
        {fight.event_name}
        {fight.is_title_fight && fight.title_name && (
          <span className="ml-1 md:ml-2 text-[#FE0002]">({fight.title_name})</span>
        )}
        {fight.event_date && (
          <>
            <span className="mx-1 md:mx-2">&middot;</span>
            {fight.event_date}
          </>
        )}
        {fight.event_location && (
          <>
            <span className="mx-1 md:mx-2">&middot;</span>
            {fight.event_location}
          </>
        )}
      </p>
    </div>
  </div>
);

const FighterProfile: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const { data: fighter, isLoading, error } = useQuery({
    queryKey: ["fighter", params?.id],
    queryFn: () => getFighterById(params!.id as string),
    enabled: !!params?.id,
  });

  if (isLoading) return <FighterProfileSkeleton />;

  if (error || !fighter)
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
        <h1 className="text-5xl text-[#FE0002] font-display font-black italic mb-4 uppercase tracking-tighter">
          Profile Offline
        </h1>
        <p className="text-gray-400 mb-8 font-bold tracking-wide uppercase text-sm">
          {error instanceof Error ? error.message : "The fighter ID provided does not exist in our database."}
        </p>
        <button
          onClick={() => router.push("/fighters")}
          className="px-8 py-3 bg-black text-white font-black uppercase tracking-widest hover:bg-[#FE0002] transition-all skew-x-[-10deg]"
        >
          <div className="skew-x-[10deg]">Return to Roster</div>
        </button>
      </div>
    );

  const pi = fighter.personal_info || {}
  const pa = fighter.physical_attributes || {}
  const career = fighter.career || {}
  const media = fighter.media || {}
  const recordStr = formatRecord(fighter.record)

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#FE0002] selection:text-white pt-20 md:pt-28">
      <PageHeader
        topSection={
          <div className="flex items-center gap-2">
            <span className="bg-[#FE0002] text-white px-3 py-1 text-[10px] font-black uppercase italic tracking-widest skew-x-[-15deg]">
              <span className="inline-block skew-x-[15deg]">
                {pa.weight_class}
              </span>
            </span>
          </div>
        }
        title={pi.full_name}
        subtitle={
          pi.nickname && (
            <span className="bg-[#FE0002] text-white px-4 py-1 text-sm md:text-lg font-display font-black italic uppercase tracking-wider skew-x-[-15deg] inline-block">
              <span className="inline-block skew-x-[15deg]">
                {pi.nickname}
              </span>
            </span>
          )
        }
        bottomLeftSection={
          <div className="flex flex-col border-l-8 border-black pl-6 py-1">
            <p className="text-[#FE0002] uppercase font-black tracking-[0.4em] text-[10px] md:text-[12px] mb-2 leading-none">
              Professional Record
            </p>
            <p className="text-4xl md:text-6xl font-display font-black text-black tracking-tight leading-none">
              {recordStr}
            </p>
          </div>
        }
        bottomRightSection={
          <div className="flex items-center gap-3">
            {([
              { name: "Instagram", url: "#", icon: "" },
              { name: "Twitter", url: "#", icon: "" },
              { name: "Facebook", url: "#", icon: "" },
            ]).map((link, index) => {
              const iconClass =
                "w-7 h-7 text-black hover:text-[#FE0002] transition-all cursor-pointer";
              const renderIcon = () => {
                switch (link.name.toLowerCase()) {
                  case "instagram":
                    return (
                      <Instagram className={iconClass} strokeWidth={2.5} />
                    );
                  case "twitter":
                    return (
                      <Twitter className={iconClass} strokeWidth={2.5} />
                    );
                  case "facebook":
                    return <Facebook className={iconClass} strokeWidth={2.5} />;
                  case "youtube":
                    return <Youtube className={iconClass} strokeWidth={2.5} />;
                  case "threads":
                    return (
                      <MessageCircle className={iconClass} strokeWidth={2.5} />
                    );
                  default:
                    return <Globe className={iconClass} strokeWidth={2.5} />;
                }
              };

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className="flex items-center justify-center border-2 border-black/5 p-2 rounded-full hover:border-[#FE0002]/20 transition-colors"
                >
                  {renderIcon()}
                </a>
              );
            })}
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-12">
            <section className="relative group aspect-[9/16] overflow-hidden">
              <div className="absolute inset-0 border-2 border-black/5 transform translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              <Image
                src={
                  media.profile_image ||
                  `https://picsum.photos/seed/${pi.full_name}/360/640`
                }
                alt={pi.full_name}
                className="w-full h-full object-cover object-top z-10 shadow-lg"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
                quality={100}
              />
            </section>
            <section>
              <h2 className="text-3xl font-display font-black uppercase italic mb-8 border-l-8 border-[#FE0002] pl-4 text-black">
                Attributes
              </h2>
              <div className="grid grid-cols-1 gap-y-2">
                <DetailItem label="Division" value={pa.weight_class} />
                <DetailItem
                  label="Style"
                  value={career.styles?.join(", ") || "All-Rounder"}
                />
                <DetailItem label="Status" value={fighter.status || "Active"} />
                <DetailItem label="Nationality" value={pi.nationality || "Unknown"} />
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-display font-black uppercase italic mb-8 border-l-8 border-[#FE0002] pl-4 text-black">
                Biography
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {career.bio ||
                    "No biography available for this fighter. Legend has it they prefer to let their performances inside the cage speak for themselves."}
                </p>
              </div>
            </section>

            {fighter.upcoming_fight && (
              <section className="bg-black text-white p-6 md:p-10 rounded-none relative overflow-hidden group shadow-2xl skew-y-1">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE0002] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity" />
                <div className="-skew-y-1">
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase italic mb-4 md:mb-6 tracking-tight">
                    Upcoming Bout
                  </h2>
                  <FightCard fight={fighter.upcoming_fight} showResult={false} />
                </div>
              </section>
            )}

            <section className="bg-black text-white p-6 md:p-10 rounded-none relative overflow-hidden group shadow-2xl skew-y-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE0002] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity" />
              <div className="-skew-y-1">
                <h2 className="text-xl md:text-2xl font-display font-black uppercase italic mb-4 md:mb-6 tracking-tight">
                  {fighter.latest_fight ? "Latest Bout" : "Fight History"}
                </h2>
                {fighter.latest_fight ? (
                  <FightCard fight={fighter.latest_fight} showResult={true} />
                ) : (
                  <p className="text-gray-400 text-sm md:text-lg font-bold tracking-wide">
                    No fight history yet
                  </p>
                )}
              </div>
            </section>

            <div className="pt-8 flex justify-end">
              <button
                onClick={() => router.push("/fighters")}
                className="group flex items-center gap-4 text-black hover:text-[#FE0002] transition-colors uppercase font-black tracking-widest text-sm"
              >
                <span className="w-12 h-1 bg-black group-hover:w-20 group-hover:bg-[#FE0002] transition-all" />
                Back to Roster
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24 bg-gradient-to-t from-gray-100 to-transparent mt-12" />
    </div>
  );
};

export default FighterProfile;
