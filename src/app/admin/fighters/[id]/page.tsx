"use client";
import { getFighterById } from "@/lib/api";
import { Fighter } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FighterDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFighter = async () => {
      if (!params?.id) return;
      try {
        const data = await getFighterById(params.id as string);
        setFighter(data);
      } catch (err: any) {
        setError(err.message || "Failed to load fighter profile");
      } finally {
        setLoading(false);
      }
    };
    loadFighter();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE0002]"></div>
      </div>
    );
  }

  if (error || !fighter) {
    return (
      <div className="bg-red-50 border border-red-200 text-[#FE0002] p-8 rounded-sm text-center">
        <p className="font-bold uppercase tracking-widest">
          {error || "Fighter not found"}
        </p>
        <button
          onClick={() => router.push("/admin/fighters")}
          className="mt-4 text-xs font-bold uppercase tracking-widest underline"
        >
          Back to Fighters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Fighter Details
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#FE0002] transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push(`/admin/fighters/edit/${fighter._id}`)}
          >
            <i className="fa-solid fa-pen"></i> Edit
          </button>
          <button
            className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push("/admin/fighters/create")}
          >
            <i className="fa-solid fa-plus"></i> Add Fighter
          </button>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 bg-black aspect-square md:aspect-auto relative min-h-[400px]">
          <Image
            src={fighter.image_url || "https://picsum.photos/400/600"}
            alt={fighter.name}
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="md:col-span-8 p-8 md:p-12">
          <div className="mb-8">
            <div className="text-[#FE0002] font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
              {fighter.style || "Fighter"}
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter mb-4 leading-none">
              {fighter.name}
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Weight Class
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {fighter.weight_class}
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Record
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {fighter.record}
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-black/5 rounded-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Nationality
                </span>
                <span className="text-sm font-bold uppercase tracking-tight">
                  {fighter.nationality || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-black/5">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Date of Birth
                </span>
                <span className="text-sm font-medium">
                  {fighter.date_of_birth || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Club / Gym
                </span>
                <span className="text-sm font-medium">
                  {fighter.club || "Independent"}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Primary Style
                </span>
                <span className="text-sm font-medium">
                  {fighter.style || "Mixed Martial Arts"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-3">
              Biography
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {fighter.bio || "No biography available for this fighter."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FighterDetailsPage;
