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
} from "lucide-react";

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="font-display font-black text-xl md:text-2xl text-white leading-none">
      {value}
    </p>
    <p className="text-white/50 text-[9px] md:text-[10px] uppercase font-black tracking-[0.22em] mt-1.5">
      {label}
    </p>
  </div>
);

const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between border-b border-black/10 last:border-b-0 px-5 py-4">
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.18em]">
      {label}
    </p>
    <p className="text-base md:text-lg font-display font-black uppercase italic text-black leading-none">
      {value}
    </p>
  </div>
);

const SectionHeading: React.FC<{
  kicker: string;
  title: string;
  light?: boolean;
}> = ({ kicker, title, light }) => (
  <div>
    <p className={`text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 flex items-center gap-2 ${light ? 'text-[#FE0002]' : 'text-[#FE0002]'}`}>
      <span className="inline-block w-6 h-[2px] bg-[#FE0002]" />
      {kicker}
    </p>
    <h2 className={`text-3xl md:text-4xl font-display font-black uppercase italic leading-none ${light ? 'text-white' : 'text-black'}`}>
      {title}
    </h2>
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
      {showResult && (
        <p className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-[0.2em] mb-1">
          {fight.method === "Draw" || fight.method === "No Contest" ? (
            <span className="text-amber-400">{fight.method}</span>
          ) : fight.result ? (
            fight.result === "win" ? (
              <span className="text-green-400">WIN</span>
            ) : (
              <span className="text-red-400">LOSS</span>
            )
          ) : null}
          {fight.method && fight.method !== "Draw" && fight.method !== "No Contest" && (
            <span> &mdash; {fight.method}</span>
          )}
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
  const pastFights: FightRecord[] =
    fighter.past_fights && fighter.past_fights.length
      ? fighter.past_fights
      : (fighter.latest_fight ? [fighter.latest_fight] : [])

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#FE0002] selection:text-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-black pt-[calc(3.5rem+env(safe-area-inset-top))] lg:pt-[calc(5rem+env(safe-area-inset-top))]">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-[#FE0002] rounded-full blur-[140px] opacity-25" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16 py-10 md:py-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-center">
          <div>
            <p className="text-[#FE0002] text-[11px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-[2px] bg-[#FE0002]" />
              {pa.weight_class || "Fighter"} &middot; {fighter.status || "Active"}
            </p>
            <h1 className="font-display font-black italic uppercase leading-[0.85] tracking-tighter text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              {pi.full_name}
            </h1>
            {pi.nickname && (
              <p className="mt-4 inline-block bg-[#FE0002] text-white px-4 py-1.5 text-xs md:text-sm font-display font-black italic uppercase tracking-wider skew-x-[-10deg]">
                <span className="inline-block skew-x-[10deg]">"{pi.nickname}"</span>
              </p>
            )}

            <div className="mt-8 flex items-end gap-6">
              <p className="font-display font-black text-white text-6xl md:text-8xl leading-none tracking-tight">
                {recordStr}
              </p>
              <div className="mb-1.5">
                <p className="text-[#FE0002] uppercase font-black tracking-[0.3em] text-[10px] md:text-xs leading-tight">Professional</p>
                <p className="text-[#FE0002] uppercase font-black tracking-[0.3em] text-[10px] md:text-xs leading-tight">Record</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {(pa.height_cm && (
                <Stat label="Height" value={`${pa.height_cm} cm`} />
              ))}
              {(pa.reach_cm && (
                <Stat label="Reach" value={`${pa.reach_cm} cm`} />
              ))}
              {(pa.weight_kg && (
                <Stat label="Weight" value={`${pa.weight_kg} kg`} />
              ))}
              <Stat label="Nationality" value={pi.nationality || "Unknown"} />
              <Stat label="Style" value={career.styles?.join(" / ") || "All-Rounder"} />
            </div>

            <div className="mt-8 flex items-center gap-3">
              {([
                { name: "Instagram", url: "#", icon: "" },
                { name: "Twitter", url: "#", icon: "" },
                { name: "Facebook", url: "#", icon: "" },
              ]).map((link, index) => {
                const iconClass =
                  "w-5 h-5 text-white hover:text-[#FE0002] transition-all";
                const renderIcon = () => {
                  switch (link.name.toLowerCase()) {
                    case "instagram":
                      return <Instagram className={iconClass} strokeWidth={2.5} />;
                    case "twitter":
                      return <Twitter className={iconClass} strokeWidth={2.5} />;
                    default:
                      return <Facebook className={iconClass} strokeWidth={2.5} />;
                  }
                };
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    className="flex items-center justify-center border border-white/15 hover:border-[#FE0002]/60 p-2.5 rounded-full transition-colors"
                  >
                    {renderIcon()}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Poster */}
          <div className="relative max-w-sm mx-auto w-full lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={media.profile_image || `https://picsum.photos/seed/${pi.full_name}/360/640`}
                alt={pi.full_name}
                className="w-full h-full object-cover object-top"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between">
                <span className="bg-[#FE0002] text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 skew-x-[-10deg]">
                  <span className="inline-block skew-x-[10deg]">{pa.weight_class}</span>
                </span>
                <span className="text-white/60 font-black text-[9px] uppercase tracking-[0.25em]">CFC Roster</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#FE0002]/40 rounded-2xl -z-10" />
          </div>
        </div>
      </header>

<div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 pt-10 md:pt-16 pb-10 md:pb-16">
          {/* Attributes */}
          <div className="lg:col-span-1">
            <SectionHeading kicker="Details" title="Attributes" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-gray-50">
              <DetailItem label="Division" value={pa.weight_class} />
              <DetailItem
                label="Style"
                value={career.styles?.join(" / ") || "All-Rounder"}
              />
              <DetailItem label="Status" value={fighter.status || "Active"} />
              <DetailItem label="Nationality" value={pi.nationality || "Unknown"} />
              <DetailItem label="Camp" value={career.gym || "CFC Elite"} />
            </div>
          </div>

          {/* Bio + bouts */}
          <div className="lg:col-span-2 space-y-10 md:space-y-14">
            <section>
              <SectionHeading kicker="The Story" title="Biography" />
              <div className="mt-6 prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  {career.bio ||
                    "No biography available for this fighter. Legend has it they prefer to let their performances inside the cage speak for themselves."}
                </p>
              </div>
            </section>

            {fighter.upcoming_fight && (
              <section className="rounded-2xl border border-[#FE0002]/20 bg-black text-white p-6 md:p-9 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#FE0002] rounded-full blur-[90px] opacity-20" />
                <div className="relative">
                  <SectionHeading light kicker="Scheduled" title="Upcoming Bout" />
                  <div className="mt-6 md:mt-7">
                    <FightCard fight={fighter.upcoming_fight} showResult={false} />
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-black/10 bg-black text-white p-6 md:p-9 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#FE0002] rounded-full blur-[90px] opacity-20" />
              <div className="relative">
                <SectionHeading kicker="Fought" title="Bout History" light />
                <div className="mt-6 md:mt-7">
                  {pastFights.length === 0 ? (
                    <p className="text-white/50 text-sm md:text-lg font-bold tracking-wide">
                      No fight history yet
                    </p>
                  ) : (
                    <div className="space-y-6 md:space-y-7">
                      {pastFights.map((f, i) => (
                        <div
                          key={i}
                          className={i > 0 ? "border-t border-white/10 pt-6 md:pt-7" : ""}
                        >
                          <FightCard fight={f} showResult={true} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="flex justify-end">
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

      <div className="h-24 bg-gradient-to-t from-gray-100 to-transparent" />
    </div>
  );
};

export default FighterProfile;
