"use client";
import { getAllFighters, getAllReferees, getEventById, updateEvent } from "@/lib/api";
import { Fighter, FightEvent, formatRecord } from "@/types";
import SelectWithImage from "@/components/SelectWithImage";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import FighterHoverCard from "@/components/FighterHoverCard";

const initialFight = {
  fighter1: "",
  fighter2: "",
  referee: "",
  weight_class: "",
  weight_limit_lbs: undefined as number | undefined,
  title_fight: false,
  title_name: "",
  is_main_event: false,
  is_co_main_event: false,
  rounds: 3,
  round_time_minutes: 5,
  is_championship_rounds: false,
  result: "",
  winner_id: "",
  method: "",
  round_ended: undefined as number | undefined,
  time_ended: "",
  order: 1,
  fight_type: "Professional",
};

const EventDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<FightEvent | null>(null);
  const [fighters, setFighters] = useState<Record<string, Fighter>>({});
  const [referees, setReferees] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fighterHoverCard, setFighterHoverCard] = useState<Fighter | null>(
    null,
  );
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFight, setEditFight] = useState<any>(null);
  const [detailsIndex, setDetailsIndex] = useState<number | null>(null);

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

  const fighterList = useMemo(() => Object.values(fighters), [fighters]);
  const refereeList = useMemo(() => Object.values(referees), [referees]);

  const fighterOptions = useMemo(() => fighterList.map((f) => ({
    value: f._id,
    label: `${f.personal_info?.full_name} (${f.physical_attributes?.weight_class})`,
    imageUrl: f.media?.profile_image,
  })), [fighterList]);

  const refereeOptions = useMemo(() => refereeList.map((r: any) => ({
    value: r._id,
    label: r.name,
    imageUrl: r.image_url,
  })), [refereeList]);

  const handleEditChange = (field: string, value: any) => {
    if (!editFight) return;
    setEditFight((prev: any) => {
      const updated = { ...prev, [field]: value };
      if ((field === "fighter1" || field === "fighter2") && updated.fighter1 && updated.fighter2) {
        const f1 = fighters[updated.fighter1];
        const f2 = fighters[updated.fighter2];
        if (f1 && f2) {
          const wc1 = f1.physical_attributes?.weight_class;
          const wc2 = f2.physical_attributes?.weight_class;
          if (wc1 && wc2 && wc1 === wc2) {
            updated.weight_class = wc1;
          } else {
            updated.weight_class = "Catchweight";
          }
        }
      }
      return updated;
    });
  };

  const startEdit = (index: number) => {
    const fight = event?.fights?.[index];
    if (fight) {
      setEditFight({ ...fight });
      setEditingIndex(index);
    }
  };

  const startAdd = () => {
    setEditFight({ ...initialFight, order: (event?.fights?.length || 0) + 1 });
    setEditingIndex(-1);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditFight(null);
  };

  const saveBout = async () => {
    if (!event || !editFight) return;
    if (!editFight.fighter1 || !editFight.fighter2) {
      setError("Both fighters must be selected.");
      return;
    }
    if (editFight.fighter1 === editFight.fighter2) {
      setError("Fighter 1 and Fighter 2 cannot be the same person.");
      return;
    }
    if (!editFight.referee) {
      setError("A referee must be selected.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updatedFights = [...(event.fights || [])];
      if (editingIndex === -1) {
        updatedFights.push(editFight);
      } else {
        updatedFights[editingIndex!] = editFight;
      }
      const payload = { ...event, fights: updatedFights };
      const updated = await updateEvent(event._id, payload as any);
      setEvent(updated);
      setEditingIndex(null);
      setEditFight(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to save bout");
    } finally {
      setSaving(false);
    }
  };

  const deleteBout = async (index: number) => {
    if (!event || !confirm("Remove this bout from the fight card?")) return;
    setSaving(true);
    setError(null);
    try {
      const updatedFights = (event.fights || []).filter((_: any, i: number) => i !== index);
      const payload = { ...event, fights: updatedFights };
      const updated = await updateEvent(event._id, payload as any);
      setEvent(updated);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to delete bout");
    } finally {
      setSaving(false);
    }
  };

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
            onClick={() => {
              const pw = window.open("", "_blank");
              if (!pw || !event) return;
              const d = new Date(event.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
              const rows = (event.fights || []).map((f: any, i: number) => {
                const f1 = fighters[f.fighter1];
                const f2 = fighters[f.fighter2];
                const ref = referees[f.referee];
                return `<tr>
                  <td style="text-align:center;font-weight:900;color:#FE0002;font-size:16px;padding:12px;border-bottom:1px solid #ddd">${i + 1}</td>
                  <td style="padding:12px;border-bottom:1px solid #ddd;vertical-align:middle;font-size:13px">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${f1?.media?.profile_image ? `<img src="${f1.media.profile_image}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;background:#f5f5f5" />` : ""}
                      <div><strong style="font-size:14px">${f1?.personal_info?.full_name || "TBD"}</strong><br/><span style="font-size:10px;color:#888">${formatRecord(f1?.record)}</span></div>
                    </div>
                  </td>
                  <td style="text-align:center;font-weight:900;font-size:14px;color:#FE0002;padding:12px;border-bottom:1px solid #ddd">VS</td>
                  <td style="padding:12px;border-bottom:1px solid #ddd;vertical-align:middle;font-size:13px;text-align:right">
                    <div style="display:flex;align-items:center;gap:10px;justify-content:flex-end">
                      <div><strong style="font-size:14px">${f2?.personal_info?.full_name || "TBD"}</strong><br/><span style="font-size:10px;color:#888">${formatRecord(f2?.record)}</span></div>
                      ${f2?.media?.profile_image ? `<img src="${f2.media.profile_image}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;background:#f5f5f5" />` : ""}
                    </div>
                  </td>
                  <td style="text-align:center;padding:12px;border-bottom:1px solid #ddd;font-size:11px;color:#555">${f.weight_class || "TBD"}</td>
                  <td style="text-align:center;padding:12px;border-bottom:1px solid #ddd;font-size:11px;color:#555">${ref?.name || "TBD"}</td>
                </tr>`;
              }).join("");
              pw.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>${event.name} - Fight Card</title>
                  <style>
                    @page { margin: 20mm 15mm; }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; background: #fff; }
                    .hdr { text-align: center; border-bottom: 3px solid #FE0002; padding-bottom: 20px; margin-bottom: 30px; }
                    .hdr h1 { font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; }
                    .hdr .s { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
                    .hdr .m { color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
                    table { width: 100%; border-collapse: collapse; }
                    th { background: #111; color: #fff; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; padding: 10px 12px; text-align: left; }
                    .ftr { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; }
                    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
                  </style>
                </head>
                <body>
                  <div class="hdr">
                    <h1>${event.name}</h1>
                    <div class="s">OFFICIAL FIGHT CARD</div>
                    <div class="m">${d} &mdash; ${event.location}</div>
                  </div>
                  <table>
                    <thead><tr><th>#</th><th>Fighter 1</th><th></th><th>Fighter 2</th><th>Weight Class</th><th>Referee</th></tr></thead>
                    <tbody>${rows}</tbody>
                  </table>
                  <div class="ftr">Cage Fighting Championship &mdash; All Rights Reserved</div>
                </body>
                </html>
              `);
              pw.document.close();
              pw.focus();
              setTimeout(() => pw.print(), 500);
            }}
            className="border border-black/20 text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-colors rounded-sm shadow-sm active:scale-95"
          >
            <i className="fa-solid fa-print"></i> Print Card
          </button>
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
            src={event.image_url || "/og-event-default.jpg"}
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
                  {new Date(event.date) >= new Date() ? "Upcoming" : "Past"}
                </span>
              </div>
            </div>
          </div>

          <div className="py-8 border-t border-black/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Fight Card
              </h3>
              <button
                onClick={startAdd}
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#FE0002] hover:text-black transition-colors"
              >
                <i className="fa-solid fa-plus"></i> Add Bout
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-[#FE0002] text-[#FE0002] font-bold text-xs uppercase tracking-widest">
                {error}
              </div>
            )}

            {/* Edit form */}
            {editingIndex !== null && editFight && (
              <div className="mb-6 p-6 bg-gray-50 border-2 border-[#FE0002]/30 rounded-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">
                  {editingIndex === -1 ? "Add Bout" : `Edit Bout ${editingIndex + 1}`}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Fighter 1</label>
                    <SelectWithImage options={fighterOptions} value={editFight.fighter1} onChange={(v) => handleEditChange("fighter1", v)} placeholder="Select Fighter" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Fighter 2</label>
                    <SelectWithImage options={fighterOptions} value={editFight.fighter2} onChange={(v) => handleEditChange("fighter2", v)} placeholder="Select Fighter" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Referee</label>
                    <SelectWithImage options={refereeOptions} value={editFight.referee} onChange={(v) => handleEditChange("referee", v)} placeholder="Select Referee" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Weight Class</label>
                    <input type="text" value={editFight.weight_class} readOnly className="w-full bg-gray-100 border border-black/10 rounded-sm px-3 py-2 text-sm text-gray-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Winner</label>
                    <select
                      value={editFight.winner_id || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditFight((prev: any) => ({
                          ...prev,
                          winner_id: val,
                          result: !val ? "" : val === "draw" ? "Draw" : "Win",
                        }));
                      }}
                      className="w-full bg-white border border-black/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#FE0002]"
                    >
                      <option value="">Not Set</option>
                      {editFight.fighter1 && fighters[editFight.fighter1] && (
                        <option value={editFight.fighter1}>{fighters[editFight.fighter1].personal_info?.full_name}</option>
                      )}
                      {editFight.fighter2 && fighters[editFight.fighter2] && (
                        <option value={editFight.fighter2}>{fighters[editFight.fighter2].personal_info?.full_name}</option>
                      )}
                      <option value="draw">Draw</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Method</label>
                    <select value={editFight.method || ""} onChange={(e) => handleEditChange("method", e.target.value)} className="w-full bg-white border border-black/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#FE0002]">
                      <option value="">Not Set</option>
                      <option value="KO/TKO">KO/TKO</option>
                      <option value="Submission">Submission</option>
                      <option value="Decision">Decision</option>
                      <option value="Disqualification">Disqualification</option>
                      <option value="No Contest">No Contest</option>
                      <option value="Draw">Draw</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Round Ended</label>
                    <input type="number" min="1" max="5" value={editFight.round_ended || ""} onChange={(e) => handleEditChange("round_ended", e.target.value ? Number(e.target.value) : "")} placeholder="e.g. 3" className="w-full bg-white border border-black/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FE0002]" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Time Ended</label>
                    <input type="text" value={editFight.time_ended || ""} onChange={(e) => handleEditChange("time_ended", e.target.value)} placeholder="e.g. 2:35" className="w-full bg-white border border-black/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#FE0002]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editFight.title_fight || false} onChange={(e) => handleEditChange("title_fight", e.target.checked)} className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Title Fight</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editFight.is_main_event || false} onChange={(e) => handleEditChange("is_main_event", e.target.checked)} className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Main Event</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editFight.is_co_main_event || false} onChange={(e) => handleEditChange("is_co_main_event", e.target.checked)} className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Co-Main</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={saveBout} disabled={saving} className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm">
                    {saving ? "Saving..." : "Save Bout"}
                  </button>
                  <button onClick={cancelEdit} className="border border-black/20 text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors rounded-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Bout list */}
            {event && event.fights && event.fights.length > 0 ? (
              <div className="space-y-2">
                {event.fights.map((fight: any, index: number) => {
                  const f1 = fighters[fight.fighter1];
                  const f2 = fighters[fight.fighter2];
                  const ref = referees[fight.referee];
                  return (
                    <div key={index}>
                      <div
                        className={`px-4 py-3 border rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between text-sm gap-4 ${editingIndex === index ? "border-[#FE0002] bg-red-50" : "bg-gray-50 border-black/5"}`}
                      >
                        <div className="flex items-center flex-wrap gap-2 md:gap-3 w-full md:w-auto">
                          <span className="font-bold text-[#FE0002] uppercase mr-1 md:mr-2.5 text-xs whitespace-nowrap">
                            Bout {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white hover:shadow-sm transition-all rounded-sm"
                            onClick={() => f1 && router.push(`/admin/fighters/${f1._id}`)}
                            onMouseEnter={() => f1 && setFighterHoverCard(f1)}
                            onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                            onMouseLeave={() => setFighterHoverCard(null)}
                          >
                            <div className="relative w-9 h-9 overflow-hidden shrink-0 bg-gray-100 rounded-full">
                              <Image src={f1?.media?.profile_image || "/og-fighter-default.jpg"} alt={f1?.personal_info?.full_name || "Fighter"} fill className="object-cover object-top" sizes="36px" />
                            </div>
                            <span className="font-semibold text-xs whitespace-nowrap">{f1?.personal_info?.full_name || "Unknown"}</span>
                          </div>
                          <span className="text-gray-400 font-display italic text-[10px]">VS</span>
                          <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-white hover:shadow-sm transition-all rounded-sm"
                            onClick={() => f2 && router.push(`/admin/fighters/${f2._id}`)}
                            onMouseEnter={() => f2 && setFighterHoverCard(f2)}
                            onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                            onMouseLeave={() => setFighterHoverCard(null)}
                          >
                            <div className="relative w-9 h-9 overflow-hidden shrink-0 bg-gray-100 rounded-full">
                              <Image src={f2?.media?.profile_image || "/og-fighter-default.jpg"} alt={f2?.personal_info?.full_name || "Fighter"} fill className="object-cover object-top" sizes="36px" />
                            </div>
                            <span className="font-semibold text-xs whitespace-nowrap">{f2?.personal_info?.full_name || "Unknown"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end">
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest bg-white border border-black/5 px-2 py-1 rounded whitespace-nowrap">{fight.weight_class || "TBD"}</span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tight bg-white border border-black/5 px-2 py-1 rounded whitespace-nowrap">Ref: {ref?.name || "N/A"}</span>
                          {fight.title_fight && <span className="text-[8px] text-white font-bold uppercase tracking-widest bg-[#FE0002] px-1.5 py-0.5 rounded whitespace-nowrap">Title</span>}
                          {fight.is_main_event && <span className="text-[8px] text-white font-bold uppercase tracking-widest bg-yellow-500 px-1.5 py-0.5 rounded whitespace-nowrap">Main</span>}
                          {fight.result && <span className="text-[9px] text-white font-bold uppercase tracking-widest bg-black px-2 py-1 rounded whitespace-nowrap">{fight.result}</span>}
                          <button onClick={() => setDetailsIndex(index)} className="text-gray-400 hover:text-black p-1 transition-colors" title="Bout details">
                            <i className="fa-solid fa-circle-info text-xs"></i>
                          </button>
                          <button onClick={() => startEdit(index)} className="text-gray-400 hover:text-black p-1 transition-colors" title="Edit bout">
                            <i className="fa-solid fa-pen text-xs"></i>
                          </button>
                          <button onClick={() => deleteBout(index)} className="text-red-400 hover:text-red-600 p-1 transition-colors" title="Remove bout">
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : editingIndex !== -1 ? (
              <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm">
                <i className="fa-solid fa-hand-fist text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
                  No fights on this card yet
                </p>
                <button onClick={startAdd} className="bg-[#FE0002] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">
                  Add Your First Bout
                </button>
              </div>
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

      {/* Bout Details Dialog */}
      {detailsIndex !== null && event?.fights?.[detailsIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDetailsIndex(null)} />
          <div className="relative bg-white w-full max-w-2xl mx-4 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const fight = event.fights![detailsIndex];
              const f1 = fight.fighter1 ? fighters[fight.fighter1] : undefined;
              const f2 = fight.fighter2 ? fighters[fight.fighter2] : undefined;
              const ref = fight.referee ? referees[fight.referee] : undefined;
              return (
                <>
                  <div className="sticky top-0 bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between z-10">
                    <h3 className="font-display font-black uppercase tracking-tight text-lg">
                      Bout {detailsIndex + 1} Details
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const pw = window.open("", "_blank");
                          if (!pw || !event) return;
                          const f1 = fight.fighter1 ? fighters[fight.fighter1] : undefined;
                          const f2 = fight.fighter2 ? fighters[fight.fighter2] : undefined;
                          const ref = fight.referee ? referees[fight.referee] : undefined;
                          const d = new Date(event.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
                          const fmtRec = (r: any) => r ? `${r.wins || 0}-${r.losses || 0}${r.draws ? `-${r.draws}` : ""}` : "0-0";
                          const ageF1 = f1?.personal_info?.date_of_birth ? Math.floor((new Date().getTime() - new Date(f1.personal_info.date_of_birth).getTime()) / 31557600000) : null;
                          const ageF2 = f2?.personal_info?.date_of_birth ? Math.floor((new Date().getTime() - new Date(f2.personal_info.date_of_birth).getTime()) / 31557600000) : null;
                          pw.document.write(`
                            <!DOCTYPE html>
                            <html>
                            <head>
                              <title>${f1?.personal_info?.full_name || "Fighter 1"} vs ${f2?.personal_info?.full_name || "Fighter 2"} - Bout Card</title>
                              <style>
                                @page { margin: 12mm; }
                                * { box-sizing: border-box; margin: 0; padding: 0; }
                                body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; background: #fff; padding: 30px; }
                                .evt-hdr { text-align: center; margin-bottom: 24px; }
                                .evt-hdr h1 { font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; }
                                .evt-hdr .evt-meta { color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
                                .matchup { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
                                .f-col { flex: 1; }
                                .f-col .f-card { text-align: center; margin-bottom: 12px; }
                                .f-col .f-card img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 2px solid ${f1 ? "#fecaca" : "#eee"}; margin-bottom: 12px; }
                                .f-col .f-card .f-name { font-size: 14px; font-weight: 900; text-transform: uppercase; }
                                .f-col .f-card .f-nick { font-size: 10px; color: #888; font-style: italic; margin-top: 2px; }
                                .f-col .f-card .f-rec { font-size: 10px; font-weight: 700; color: #555; margin-top: 4px; }
                                .f-col .f-stats { font-size: 10px; }
                                .f-col .f-stats .row { display: flex; justify-content: space-between; padding: 2px 0; }
                                .f-col .f-stats .row .lbl { color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
                                .f-col .f-stats .row .val { font-weight: 600; }
                                .center-col { text-align: center; padding-top: 40px; flex-shrink: 0; }
                                .center-col .vs { font-size: 24px; font-weight: 900; font-style: italic; color: #FE0002; }
                                .center-col .cls { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-top: -8px; display: block; }
                                .section { background: #f9fafb; border: 1px solid rgba(0,0,0,0.05); border-radius: 2px; padding: 12px; margin-top: 16px; }
                                .section .shdr { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 12px; }
                                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 32px; font-size: 13px; }
                                .grid .gi .glbl { font-size: 10px; color: #999; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; }
                                .grid .gi .gval { font-weight: 600; display: block; margin-top: 2px; }
                                .badge { display: inline-block; padding: 2px 8px; font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 2px; }
                                .badge-yellow { background: #facc15; color: #000; }
                                .badge-blue { background: #60a5fa; color: #fff; }
                                .badge-red { background: #FE0002; color: #fff; }
                                .badge-gray { background: #1f2937; color: #fff; }
                                .result-section { background: #f9fafb; border: 1px solid rgba(0,0,0,0.05); border-radius: 2px; padding: 12px; margin-top: 12px; }
                                .result-section .shdr { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 12px; }
                                .ftr { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; }
                                @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
                              </style>
                            </head>
                            <body>
                              <div class="evt-hdr">
                                <h1>${event.name}</h1>
                                <div class="evt-meta">${d} &mdash; ${event.location}</div>
                              </div>

                              <div class="matchup">
                                <div class="f-col">
                                  <div class="f-card">
                                    ${f1?.media?.profile_image ? `<div style="width:96px;height:96px;border-radius:50%;overflow:hidden;border:2px solid #fecaca;background:#f5f5f5;margin:0 auto 12px"><img src="${f1.media.profile_image}" alt="${f1.personal_info?.full_name || ""}" style="width:100%;height:100%;object-fit:cover;object-position:top" /></div>` : `<div style="width:96px;height:96px;border-radius:50%;background:#f5f5f5;margin:0 auto 12px"></div>`}
                                    <div class="f-name">${f1?.personal_info?.full_name || "TBD"}</div>
                                    ${f1?.personal_info?.nickname ? `<div class="f-nick">"${f1.personal_info.nickname}"</div>` : ""}
                                    <div class="f-rec">${fmtRec(f1?.record)}</div>
                                  </div>
                                  <div class="f-stats">
                                    ${ageF1 !== null ? '<div class="row"><span class="lbl">Age</span><span class="val">' + ageF1 + '</span></div>' : ""}
                                    ${f1?.personal_info?.nationality ? '<div class="row"><span class="lbl">Nationality</span><span class="val">' + f1.personal_info.nationality + '</span></div>' : ""}
                                    ${f1?.career?.gym ? '<div class="row"><span class="lbl">Club</span><span class="val">' + f1.career.gym + '</span></div>' : ""}
                                    ${f1?.physical_attributes?.height_cm ? '<div class="row"><span class="lbl">Height</span><span class="val">' + f1.physical_attributes.height_cm + ' cm</span></div>' : ""}
                                    ${f1?.physical_attributes?.weight_kg ? '<div class="row"><span class="lbl">Weight</span><span class="val">' + f1.physical_attributes.weight_kg + ' kg</span></div>' : ""}
                                    ${f1?.physical_attributes?.reach_cm ? '<div class="row"><span class="lbl">Reach</span><span class="val">' + f1.physical_attributes.reach_cm + ' cm</span></div>' : ""}
                                    ${f1?.physical_attributes?.weight_class ? '<div class="row"><span class="lbl">Weight Class</span><span class="val">' + f1.physical_attributes.weight_class + '</span></div>' : ""}
                                    ${f1?.stats?.win_streak !== undefined ? '<div class="row"><span class="lbl">Win Streak</span><span class="val">' + f1.stats.win_streak + '</span></div>' : ""}
                                  </div>
                                </div>

                                <div class="center-col">
                                  <div class="vs">VS</div>
                                  ${fight.weight_class ? '<span class="cls">' + fight.weight_class + '</span>' : ""}
                                </div>

                                <div class="f-col">
                                  <div class="f-card">
                                    ${f2?.media?.profile_image ? `<div style="width:96px;height:96px;border-radius:50%;overflow:hidden;border:2px solid #bfdbfe;background:#f5f5f5;margin:0 auto 12px"><img src="${f2.media.profile_image}" alt="${f2.personal_info?.full_name || ""}" style="width:100%;height:100%;object-fit:cover;object-position:top" /></div>` : `<div style="width:96px;height:96px;border-radius:50%;background:#f5f5f5;margin:0 auto 12px"></div>`}
                                    <div class="f-name">${f2?.personal_info?.full_name || "TBD"}</div>
                                    ${f2?.personal_info?.nickname ? `<div class="f-nick">"${f2.personal_info.nickname}"</div>` : ""}
                                    <div class="f-rec">${fmtRec(f2?.record)}</div>
                                  </div>
                                  <div class="f-stats">
                                    ${ageF2 !== null ? '<div class="row"><span class="lbl">Age</span><span class="val">' + ageF2 + '</span></div>' : ""}
                                    ${f2?.personal_info?.nationality ? '<div class="row"><span class="lbl">Nationality</span><span class="val">' + f2.personal_info.nationality + '</span></div>' : ""}
                                    ${f2?.career?.gym ? '<div class="row"><span class="lbl">Club</span><span class="val">' + f2.career.gym + '</span></div>' : ""}
                                    ${f2?.physical_attributes?.height_cm ? '<div class="row"><span class="lbl">Height</span><span class="val">' + f2.physical_attributes.height_cm + ' cm</span></div>' : ""}
                                    ${f2?.physical_attributes?.weight_kg ? '<div class="row"><span class="lbl">Weight</span><span class="val">' + f2.physical_attributes.weight_kg + ' kg</span></div>' : ""}
                                    ${f2?.physical_attributes?.reach_cm ? '<div class="row"><span class="lbl">Reach</span><span class="val">' + f2.physical_attributes.reach_cm + ' cm</span></div>' : ""}
                                    ${f2?.physical_attributes?.weight_class ? '<div class="row"><span class="lbl">Weight Class</span><span class="val">' + f2.physical_attributes.weight_class + '</span></div>' : ""}
                                    ${f2?.stats?.win_streak !== undefined ? '<div class="row"><span class="lbl">Win Streak</span><span class="val">' + f2.stats.win_streak + '</span></div>' : ""}
                                  </div>
                                </div>
                              </div>

                              <div class="section">
                                <div class="shdr">Match Information</div>
                                <div class="grid">
                                  <div class="gi"><span class="glbl">Referee</span><span class="gval">${ref?.name || "TBD"}</span></div>
                                  <div class="gi"><span class="glbl">Rounds</span><span class="gval">${fight.rounds || 3}</span></div>
                                  <div class="gi"><span class="glbl">Round Time</span><span class="gval">${fight.round_time_minutes || 5} min</span></div>
                                  ${(fight.is_main_event || fight.is_co_main_event || fight.title_fight || fight.fight_type) ? `
                                    <div class="gi">
                                      <span class="glbl">Bout Type</span>
                                      <span class="gval" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
                                        ${fight.is_main_event ? '<span class="badge badge-yellow">Main Event</span>' : ""}
                                        ${fight.is_co_main_event ? '<span class="badge badge-blue">Co-Main Event</span>' : ""}
                                        ${fight.title_fight ? '<span class="badge badge-red">Title Fight</span>' : ""}
                                        ${fight.fight_type ? '<span class="badge badge-gray">' + fight.fight_type + '</span>' : ""}
                                      </span>
                                    </div>
                                  ` : ""}
                                  ${fight.weight_limit_lbs ? '<div class="gi"><span class="glbl">Weight Limit</span><span class="gval">' + fight.weight_limit_lbs + ' lbs</span></div>' : ""}
                                  ${fight.title_name ? '<div class="gi"><span class="glbl">Title</span><span class="gval">' + fight.title_name + '</span></div>' : ""}
                                  ${fight.is_championship_rounds ? '<div class="gi"><span class="glbl">Championship Rounds</span><span class="gval" style="color:#FE0002">Yes</span></div>' : ""}
                                </div>
                              </div>

                              ${fight.result ? `
                                <div class="result-section">
                                  <div class="shdr">Result</div>
                                  <div class="grid">
                                    <div class="gi"><span class="glbl">Outcome</span><span class="gval">${fight.result}</span></div>
                                    ${fight.method ? '<div class="gi"><span class="glbl">Method</span><span class="gval">' + fight.method + '</span></div>' : ""}
                                    ${fight.winner_id ? '<div class="gi"><span class="glbl">Winner</span><span class="gval" style="color:#15803d">' + (fighters[fight.winner_id]?.personal_info?.full_name || "Unknown") + '</span></div>' : ""}
                                    ${fight.round_ended ? '<div class="gi"><span class="glbl">Round Ended</span><span class="gval">' + fight.round_ended + '</span></div>' : ""}
                                    ${fight.time_ended ? '<div class="gi"><span class="glbl">Time Ended</span><span class="gval">' + fight.time_ended + '</span></div>' : ""}
                                  </div>
                                </div>
                              ` : ""}

                              <div class="ftr">Cage Fighting Championship &mdash; All Rights Reserved</div>
                            </body>
                            </html>
                          `);
                          pw.document.close();
                          pw.focus();
                          setTimeout(() => pw.print(), 500);
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-sm transition-colors text-gray-400 hover:text-black"
                        title="Print bout card"
                      >
                        <i className="fa-solid fa-print text-xs"></i>
                      </button>
                      <button onClick={() => setDetailsIndex(null)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-sm transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Fighter matchup with center column */}
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="text-center mb-4">
                          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100 border-2 border-red-200">
                            {f1 && <Image src={f1.media?.profile_image || "/og-fighter-default.jpg"} alt={f1.personal_info?.full_name || "Fighter"} fill className="object-cover object-top" sizes="96px" />}
                          </div>
                          <p className="font-display font-black uppercase text-sm">{f1?.personal_info?.full_name || "TBD"}</p>
                          {f1?.personal_info?.nickname && <p className="text-[10px] text-gray-400 italic mt-0.5">"{f1.personal_info.nickname}"</p>}
                          <p className="text-[10px] text-gray-500 font-bold mt-1">{formatRecord(f1?.record)}</p>
                        </div>
                        <div className="space-y-1.5 text-[10px]">
                          {f1?.personal_info?.date_of_birth && (() => {
                            const age = Math.floor((new Date().getTime() - new Date(f1.personal_info.date_of_birth!).getTime()) / 31557600000);
                            return <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Age</span><span className="font-semibold">{age}</span></div>;
                          })()}
                          {f1?.personal_info?.nationality && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Nationality</span><span className="font-semibold">{f1.personal_info.nationality}</span></div>}
                          {f1?.career?.gym && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Club</span><span className="font-semibold">{f1.career.gym}</span></div>}
                          {f1?.physical_attributes?.height_cm && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Height</span><span className="font-semibold">{f1.physical_attributes.height_cm} cm</span></div>}
                          {f1?.physical_attributes?.weight_kg && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Weight</span><span className="font-semibold">{f1.physical_attributes.weight_kg} kg</span></div>}
                          {f1?.physical_attributes?.reach_cm && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Reach</span><span className="font-semibold">{f1.physical_attributes.reach_cm} cm</span></div>}
                          {f1?.physical_attributes?.weight_class && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Weight Class</span><span className="font-semibold">{f1.physical_attributes.weight_class}</span></div>}
                          {f1?.stats?.win_streak !== undefined && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Win Streak</span><span className="font-semibold">{f1.stats.win_streak}</span></div>}
                        </div>
                      </div>

                      <div className="text-center shrink-0 pt-10 flex flex-col items-center gap-4">
                        <div className="text-2xl font-display font-black italic text-[#FE0002]">VS</div>
                        {fight.weight_class && <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 block -mt-2">{fight.weight_class}</span>}
                      </div>

                      <div className="flex-1">
                        <div className="text-center mb-4">
                          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-200">
                            {f2 && <Image src={f2.media?.profile_image || "/og-fighter-default.jpg"} alt={f2.personal_info?.full_name || "Fighter"} fill className="object-cover object-top" sizes="96px" />}
                          </div>
                          <p className="font-display font-black uppercase text-sm">{f2?.personal_info?.full_name || "TBD"}</p>
                          {f2?.personal_info?.nickname && <p className="text-[10px] text-gray-400 italic mt-0.5">"{f2.personal_info.nickname}"</p>}
                          <p className="text-[10px] text-gray-500 font-bold mt-1">{formatRecord(f2?.record)}</p>
                        </div>
                        <div className="space-y-1.5 text-[10px]">
                          {f2?.personal_info?.date_of_birth && (() => {
                            const age = Math.floor((new Date().getTime() - new Date(f2.personal_info.date_of_birth!).getTime()) / 31557600000);
                            return <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Age</span><span className="font-semibold">{age}</span></div>;
                          })()}
                          {f2?.personal_info?.nationality && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Nationality</span><span className="font-semibold">{f2.personal_info.nationality}</span></div>}
                          {f2?.career?.gym && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Club</span><span className="font-semibold">{f2.career.gym}</span></div>}
                          {f2?.physical_attributes?.height_cm && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Height</span><span className="font-semibold">{f2.physical_attributes.height_cm} cm</span></div>}
                          {f2?.physical_attributes?.weight_kg && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Weight</span><span className="font-semibold">{f2.physical_attributes.weight_kg} kg</span></div>}
                          {f2?.physical_attributes?.reach_cm && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Reach</span><span className="font-semibold">{f2.physical_attributes.reach_cm} cm</span></div>}
                          {f2?.physical_attributes?.weight_class && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Weight Class</span><span className="font-semibold">{f2.physical_attributes.weight_class}</span></div>}
                          {f2?.stats?.win_streak !== undefined && <div className="flex justify-between"><span className="text-gray-400 uppercase tracking-widest">Win Streak</span><span className="font-semibold">{f2.stats.win_streak}</span></div>}
                        </div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="bg-gray-50 border border-black/5 rounded-sm p-3">
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3">Match Information</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Referee</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {ref?.image_url && <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-100 shrink-0"><Image src={ref.image_url} alt={ref.name} fill className="object-cover" sizes="20px" /></div>}
                            <span className="font-semibold">{ref?.name || "TBD"}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Rounds</span>
                          <span className="font-semibold mt-0.5 block">{fight.rounds || 3}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Round Time</span>
                          <span className="font-semibold mt-0.5 block">{fight.round_time_minutes || 5} min</span>
                        </div>
                        {(fight.is_main_event || fight.is_co_main_event || fight.title_fight || fight.fight_type) && (
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Bout Type</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {fight.is_main_event && <span className="px-2 py-0.5 bg-yellow-400 text-black text-[8px] font-black uppercase tracking-widest rounded-sm">Main Event</span>}
                              {fight.is_co_main_event && <span className="px-2 py-0.5 bg-blue-400 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">Co-Main Event</span>}
                              {fight.title_fight && <span className="px-2 py-0.5 bg-[#FE0002] text-white text-[8px] font-black uppercase tracking-widest rounded-sm">Title Fight</span>}
                              {fight.fight_type && <span className="px-2 py-0.5 bg-gray-800 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">{fight.fight_type}</span>}
                            </div>
                          </div>
                        )}
                        {fight.weight_limit_lbs && (
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Weight Limit</span>
                            <span className="font-semibold mt-0.5 block">{fight.weight_limit_lbs} lbs</span>
                          </div>
                        )}
                        {fight.title_name && (
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Title</span>
                            <span className="font-semibold mt-0.5 block">{fight.title_name}</span>
                          </div>
                        )}
                        {fight.is_championship_rounds && (
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Championship Rounds</span>
                            <span className="font-semibold mt-0.5 block text-[#FE0002]">Yes</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Result section */}
                    {fight.result && (
                      <div className="bg-gray-50 border border-black/5 rounded-sm p-5">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">Result</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Outcome</span>
                            <span className={`font-semibold mt-0.5 block ${fight.result === "win" || fight.result === "Win" ? "text-green-700" : ""}`}>{fight.result}</span>
                          </div>
                          {fight.method && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Method</span>
                              <span className="font-semibold mt-0.5 block">{fight.method}</span>
                            </div>
                          )}
                          {fight.winner_id && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Winner</span>
                              <span className="font-semibold mt-0.5 block text-green-700">{fighters[fight.winner_id]?.personal_info?.full_name || "Unknown"}</span>
                            </div>
                          )}
                          {fight.round_ended && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Round Ended</span>
                              <span className="font-semibold mt-0.5 block">{fight.round_ended}</span>
                            </div>
                          )}
                          {fight.time_ended && (
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Time Ended</span>
                              <span className="font-semibold mt-0.5 block">{fight.time_ended}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
