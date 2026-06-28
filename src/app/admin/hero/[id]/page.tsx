"use client";

import { getHeroSlideById } from "@/lib/api";
import { HeroSlide } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroSlideDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [slide, setSlide] = useState<HeroSlide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSlide = async () => {
      if (!params?.id) return;
      try {
        const data = await getHeroSlideById(params.id as string);
        setSlide(data);
      } catch (err: any) {
        setError(err.message || "Failed to load hero slide");
      } finally {
        setLoading(false);
      }
    };
    loadSlide();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE0002]"></div>
      </div>
    );
  }

  if (error || !slide) {
    return (
      <div className="bg-red-50 border border-red-200 text-[#FE0002] p-8 rounded-sm text-center">
        <p className="font-bold uppercase tracking-widest">
          {error || "Hero slide not found"}
        </p>
        <button
          onClick={() => router.push("/admin/hero")}
          className="mt-4 text-xs font-bold uppercase tracking-widest underline"
        >
          Back to Hero Management
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 shrink-0 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
            Hero Slide Details
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-black text-white px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#FE0002] transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push(`/admin/hero/edit/${slide._id}`)}
          >
            <i className="fa-solid fa-pen"></i> <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            className="bg-[#FE0002] text-white px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95"
            onClick={() => router.push("/admin/hero/create")}
          >
            <i className="fa-solid fa-plus"></i> <span className="hidden sm:inline">Add Slide</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-12 lg:col-span-8 bg-black aspect-video relative">
          <Image
            src={slide!.image_url || "/og-fighter-default.jpg"}
            alt={slide!.title || "Slide"}
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="md:col-span-12 lg:col-span-4 p-5 md:p-12 bg-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${slide!.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {slide!.is_active ? "Active" : "Inactive"}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Order: {slide!.order}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-display uppercase tracking-tighter mb-4 leading-none">
              {slide!.title || "Untitled"}
            </h1>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {slide.subtitle || "No subtitle provided."}
            </p>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                  Link Action
                </span>
                <span className="text-sm font-bold truncate block bg-gray-50 p-2 border border-black/5 rounded-sm">
                  {slide.link || "No link"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideDetailsPage;
