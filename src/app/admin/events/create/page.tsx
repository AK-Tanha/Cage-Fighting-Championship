"use client";

import { createEvent, getAllFighters, getAllReferees, uploadImage } from "@/lib/api";
import { Fighter, Referee } from "@/types";
import SelectWithImage from "@/components/SelectWithImage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Section = "event-info" | "matchmaking";

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

const EventCreate = () => {
  const router = useRouter();
  const [section, setSection] = useState<Section>("event-info");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [referees, setReferees] = useState<Referee[]>([]);

  useEffect(() => {
    const fetchFightersAndReferees = async () => {
      try {
        const [fightersData, refereesData] = await Promise.all([
          getAllFighters(),
          getAllReferees()
        ]);
        setFighters(fightersData);
        setReferees(refereesData);
      } catch (err) {
        console.error("Failed to load fighters or referees for selection", err);
      }
    };
    fetchFightersAndReferees();
  }, []);

  const [data, setData] = useState({
    name: "",
    subtitle: "",
    date: "",
    location: "",
    image_url: "",
    fights: [{ ...initialFight }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFightChange = (index: number, field: string, value: any) => {
    const newFights = [...data.fights];
    newFights[index] = { ...newFights[index], [field]: value };
    if (field === "fighter1" || field === "fighter2") {
      const f1 = fighters.find((f) => f._id === (field === "fighter1" ? value : newFights[index].fighter1));
      const f2 = fighters.find((f) => f._id === (field === "fighter2" ? value : newFights[index].fighter2));
      if (f1 && f2) {
        const w1 = f1.physical_attributes?.weight_class || "";
        const w2 = f2.physical_attributes?.weight_class || "";
        if (w1 && w2 && w1.toUpperCase() === w2.toUpperCase()) {
          newFights[index].weight_class = w1;
        }
      }
    }
    setData((prev) => ({ ...prev, fights: newFights }));
  };

  const addFight = () => {
    setData((prev) => ({
      ...prev,
      fights: [...prev.fights, { ...initialFight, order: prev.fights.length + 1 }],
    }));
  };

  const removeFight = (index: number) => {
    setData((prev) => ({ ...prev, fights: prev.fights.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      setData((prev) => ({ ...prev, image_url: url }));
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!data.name || !data.date || !data.location) {
        throw new Error("Name, Date, and Location are required.");
      }
      for (let i = 0; i < data.fights.length; i++) {
        const f = data.fights[i];
        if (!f.fighter1 || !f.fighter2) {
          throw new Error(`Fight ${i + 1}: Both fighters must be selected.`);
        }
        if (f.fighter1 === f.fighter2) {
          throw new Error(`Fight ${i + 1}: Fighter 1 and Fighter 2 cannot be the same person.`);
        }
        if (!f.referee) {
          throw new Error(`Fight ${i + 1}: A referee must be selected.`);
        }
      }
      await createEvent(data as any);
      setSuccess(true);
      setTimeout(() => router.push("/admin/events"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const fighterOptions = useMemo(() => fighters.map((f) => ({
    value: f._id,
    label: `${f.personal_info?.full_name} (${f.physical_attributes?.weight_class})`,
    imageUrl: f.media?.profile_image,
  })), [fighters]);

  const refereeOptions = useMemo(() => referees.map((r) => ({
    value: r._id,
    label: r.name,
    imageUrl: r.image_url,
  })), [referees]);

  const tabs: { key: Section; label: string; icon: string }[] = [
    { key: "event-info", label: "Event Info", icon: "fa-solid fa-calendar" },
    { key: "matchmaking", label: "Matchmaking", icon: "fa-solid fa-hand-fist" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin/events"
              className="text-[#FE0002] text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mb-2"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to Events
            </Link>
            <h1 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Create <span className="text-[#FE0002]">Event</span>
            </h1>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-[#FE0002] text-[#FE0002] font-bold text-sm uppercase tracking-widest">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-bold text-sm uppercase tracking-widest">
            Event created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-black/5 shadow-xl rounded-sm overflow-hidden">
          {/* Section Tabs */}
          <div className="flex border-b border-black/5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSection(tab.key)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                  section === tab.key
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100"
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* EVENT INFO SECTION */}
            {section === "event-info" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Event Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={data.name}
                        onChange={handleChange}
                        placeholder="e.g. CFC 1: Genesis"
                        className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={data.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={data.location}
                        onChange={handleChange}
                        placeholder="e.g. MGM Grand, Las Vegas"
                        className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Subtitle (Optional)
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={data.subtitle}
                        onChange={handleChange}
                        placeholder="e.g. The Beginning"
                        className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                    Event Poster
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image_url"
                        value={data.image_url}
                        onChange={handleChange}
                        placeholder="https://example.com/event-poster.jpg"
                        className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                      />
                    </div>
                    <div className="relative border-2 border-dashed border-black/10 rounded-sm bg-gray-50/50 hover:bg-gray-100 transition-colors group cursor-pointer overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {data.image_url ? (
                        <div className="relative aspect-video w-full">
                          <Image
                            src={data.image_url}
                            alt="Event preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white font-bold uppercase tracking-widest text-xs">
                              {uploadingImage ? "Uploading..." : "Change Image"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 flex flex-col items-center justify-center min-h-[160px]">
                          {uploadingImage ? (
                            <i className="fa-solid fa-circle-notch animate-spin text-3xl text-[#FE0002] mb-3"></i>
                          ) : (
                            <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-300 mb-3 group-hover:text-[#FE0002] transition-colors"></i>
                          )}
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {uploadingImage ? "Uploading Image..." : "Click or Drag to Upload Poster"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* MATCHMAKING SECTION */}
            {section === "matchmaking" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400">
                    Fight Card
                  </h3>
                  <button
                    type="button"
                    onClick={addFight}
                    className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#FE0002] hover:text-black transition-colors"
                  >
                    <i className="fa-solid fa-plus"></i> Add Fight
                  </button>
                </div>

                {data.fights.length === 0 && (
                  <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm">
                    <i className="fa-solid fa-hand-fist text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
                      No fights scheduled yet
                    </p>
                    <button
                      type="button"
                      onClick={addFight}
                      className="bg-[#FE0002] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
                    >
                      Add Your First Fight
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {data.fights.map((fight, index) => {
                    const f1 = fighters.find((f) => f._id === fight.fighter1);
                    const f2 = fighters.find((f) => f._id === fight.fighter2);
                    const f1Weight = f1?.physical_attributes?.weight_class || "";
                    const f2Weight = f2?.physical_attributes?.weight_class || "";
                    const autoWeight = f1Weight && f2Weight && f1Weight.toUpperCase() === f2Weight.toUpperCase() ? f1Weight : "";

                    return (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", String(index));
                          (e.currentTarget as HTMLElement).classList.add("opacity-50");
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("border-[#FE0002]", "border-2");
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.classList.remove("border-[#FE0002]", "border-2");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("border-[#FE0002]", "border-2");
                          const from = parseInt(e.dataTransfer.getData("text/plain"));
                          (e.currentTarget as HTMLElement).classList.remove("opacity-50");
                          if (from === index) return;
                          const newFights = [...data.fights];
                          const [moved] = newFights.splice(from, 1);
                          newFights.splice(index, 0, moved);
                          setData((prev) => ({ ...prev, fights: newFights }));
                        }}
                        onDragEnd={(e) => {
                          (e.currentTarget as HTMLElement).classList.remove("opacity-50");
                          document.querySelectorAll(".border-\\[\\#FE0002\\]").forEach((el) => {
                            el.classList.remove("border-[#FE0002]", "border-2");
                          });
                        }}
                        className="p-6 bg-gray-50 border border-black/5 rounded-sm relative transition-all"
                      >
                        {/* Top bar */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-grip-vertical text-gray-300 cursor-grab active:cursor-grabbing"></i>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-white px-2 py-1 rounded-sm border border-black/5">
                              Fight {index + 1}
                            </span>
                            {fight.is_main_event && (
                              <span className="text-[9px] font-black uppercase tracking-widest bg-yellow-400 text-black px-2 py-0.5 rounded-sm">Main Event</span>
                            )}
                            {fight.is_co_main_event && (
                              <span className="text-[9px] font-black uppercase tracking-widest bg-blue-400 text-white px-2 py-0.5 rounded-sm">Co-Main</span>
                            )}
                            {fight.title_fight && (
                              <span className="text-[9px] font-black uppercase tracking-widest bg-[#FE0002] text-white px-2 py-0.5 rounded-sm">Title Fight</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newFights = [...data.fights];
                                  [newFights[index - 1], newFights[index]] = [newFights[index], newFights[index - 1]];
                                  setData((prev) => ({ ...prev, fights: newFights }));
                                }}
                                className="text-gray-400 hover:text-black p-1 transition-colors"
                                title="Move up"
                              >
                                <i className="fa-solid fa-chevron-up text-xs"></i>
                              </button>
                            )}
                            {index < data.fights.length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newFights = [...data.fights];
                                  [newFights[index], newFights[index + 1]] = [newFights[index + 1], newFights[index]];
                                  setData((prev) => ({ ...prev, fights: newFights }));
                                }}
                                className="text-gray-400 hover:text-black p-1 transition-colors"
                                title="Move down"
                              >
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                              </button>
                            )}
                            {data.fights.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFight(index)}
                                className="text-red-400 hover:text-red-600 p-1 transition-colors ml-1"
                                title="Remove fight"
                              >
                                <i className="fa-solid fa-trash text-sm"></i>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* VS Matchup */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                          <div className="md:col-span-2">
                            <div className={`p-3 rounded-sm border-2 text-center transition-all ${fight.fighter1 ? 'border-red-200 bg-red-50' : 'border-dashed border-gray-200 bg-white'}`}>
                              <label className="block text-[9px] font-black uppercase tracking-widest text-red-500 mb-2">Red Corner</label>
                              <SelectWithImage
                                options={fighterOptions}
                                value={fight.fighter1}
                                onChange={(v) => handleFightChange(index, "fighter1", v)}
                                placeholder="Select Fighter"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <span className="text-2xl font-black italic tracking-tighter text-gray-800">VS</span>
                            {autoWeight && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1 bg-white px-2 py-0.5 rounded-full border border-black/5">
                                {autoWeight}
                              </span>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <div className={`p-3 rounded-sm border-2 text-center transition-all ${fight.fighter2 ? 'border-blue-200 bg-blue-50' : 'border-dashed border-gray-200 bg-white'}`}>
                              <label className="block text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2">Blue Corner</label>
                              <SelectWithImage
                                options={fighterOptions}
                                value={fight.fighter2}
                                onChange={(v) => handleFightChange(index, "fighter2", v)}
                                placeholder="Select Fighter"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Auto-filled weight class input (hidden if auto-matched) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div className="flex flex-col">
                            <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">
                              Weight Class
                            </label>
                            <input
                              type="text"
                              value={fight.weight_class}
                              onChange={(e) => handleFightChange(index, "weight_class", e.target.value)}
                              placeholder={autoWeight || "e.g. Lightweight"}
                              className={`bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium ${autoWeight ? 'text-green-700' : ''}`}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">
                              Referee
                            </label>
                            <SelectWithImage
                              options={refereeOptions}
                              value={fight.referee}
                              onChange={(v) => handleFightChange(index, "referee", v)}
                              placeholder="Select referee"
                              required
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">
                              Weight Limit (lbs)
                            </label>
                            <input
                              type="number"
                              value={fight.weight_limit_lbs || ""}
                              onChange={(e) => handleFightChange(index, "weight_limit_lbs", e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="e.g. 155"
                              className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">
                              Fight Type
                            </label>
                            <select
                              value={fight.fight_type || "Professional"}
                              onChange={(e) => handleFightChange(index, "fight_type", e.target.value)}
                              className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                            >
                              <option value="Professional">Professional</option>
                              <option value="Amateur">Amateur</option>
                              <option value="Exhibition">Exhibition</option>
                            </select>
                          </div>
                        </div>

                        {/* Collapsible details */}
                        <details className="group">
                          <summary className="text-[9px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer hover:text-black transition-colors list-none flex items-center gap-2">
                            <i className="fa-solid fa-chevron-right text-[8px] group-open:rotate-90 transition-transform"></i>
                            Match Details
                          </summary>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-black/5">
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Rounds</label>
                              <input
                                type="number"
                                value={fight.rounds || 3}
                                onChange={(e) => handleFightChange(index, "rounds", parseInt(e.target.value))}
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Round Time (min)</label>
                              <input
                                type="number"
                                value={fight.round_time_minutes || 5}
                                onChange={(e) => handleFightChange(index, "round_time_minutes", parseInt(e.target.value))}
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Method</label>
                              <select
                                value={fight.method || ""}
                                onChange={(e) => handleFightChange(index, "method", e.target.value)}
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              >
                                <option value="">Not Set</option>
                                <option value="KO/TKO">KO/TKO</option>
                                <option value="Submission">Submission</option>
                                <option value="Decision">Decision</option>
                                <option value="Disqualification">Disqualification</option>
                                <option value="No Contest">No Contest</option>
                                <option value="Draw">Draw</option>
                              </select>
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Result</label>
                              <input
                                type="text"
                                value={fight.result}
                                onChange={(e) => handleFightChange(index, "result", e.target.value)}
                                placeholder="e.g. Scheduled"
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Order</label>
                              <input
                                type="number"
                                value={fight.order || index + 1}
                                onChange={(e) => handleFightChange(index, "order", parseInt(e.target.value))}
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Winner</label>
                              <select
                                value={fight.winner_id || ""}
                                onChange={(e) => handleFightChange(index, "winner_id", e.target.value)}
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              >
                                <option value="">Not Set</option>
                                {fight.fighter1 && (
                                  <option value={fight.fighter1}>{f1?.personal_info?.full_name || "Fighter 1"}</option>
                                )}
                                {fight.fighter2 && (
                                  <option value={fight.fighter2}>{f2?.personal_info?.full_name || "Fighter 2"}</option>
                                )}
                              </select>
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Round Ended</label>
                              <input
                                type="number"
                                value={fight.round_ended || ""}
                                onChange={(e) => handleFightChange(index, "round_ended", e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder="e.g. 3"
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Time Ended</label>
                              <input
                                type="text"
                                value={fight.time_ended || ""}
                                onChange={(e) => handleFightChange(index, "time_ended", e.target.value)}
                                placeholder="e.g. 4:32"
                                className="bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-black/5">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={fight.is_championship_rounds || false}
                                onChange={(e) => handleFightChange(index, "is_championship_rounds", e.target.checked)}
                                className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded"
                              />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Championship Rounds</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={fight.title_fight || false}
                                onChange={(e) => {
                                  handleFightChange(index, "title_fight", e.target.checked);
                                  if (e.target.checked) {
                                    handleFightChange(index, "is_championship_rounds", true);
                                  }
                                }}
                                className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded"
                              />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Title Fight</span>
                            </label>
                            {fight.title_fight && (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={fight.title_name || ""}
                                  onChange={(e) => handleFightChange(index, "title_name", e.target.value)}
                                  placeholder="Championship name"
                                  className="bg-white border border-black/10 rounded-sm px-3 py-1.5 focus:outline-none focus:border-[#FE0002] transition-colors text-xs font-medium w-48"
                                />
                              </div>
                            )}
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={fight.is_main_event || false}
                                onChange={(e) => {
                                  handleFightChange(index, "is_main_event", e.target.checked);
                                  if (e.target.checked) {
                                    handleFightChange(index, "is_co_main_event", false);
                                  }
                                }}
                                className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded"
                              />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Main Event</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={fight.is_co_main_event || false}
                                onChange={(e) => {
                                  handleFightChange(index, "is_co_main_event", e.target.checked);
                                  if (e.target.checked) {
                                    handleFightChange(index, "is_main_event", false);
                                  }
                                }}
                                className="w-4 h-4 text-[#FE0002] focus:ring-[#FE0002] border-gray-300 rounded"
                              />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Co-Main Event</span>
                            </label>
                          </div>
                        </details>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50 border-t border-black/5 flex items-center justify-between">
            {section === "matchmaking" ? (
              <>
                <button
                  type="button"
                  onClick={() => setSection("event-info")}
                  className="text-gray-500 hover:text-black text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Back: Event Info
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#FE0002] active:scale-95"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-circle-notch animate-spin"></i> Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i> Create Event
                    </span>
                  )}
                </button>
              </>
            ) : (
              <div className="flex-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSection("matchmaking")}
                  className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#FE0002] transition-all flex items-center gap-2"
                >
                  Next: Matchmaking
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
