"use client";
import { deleteHeroSlide, getAllHeroSlides } from "@/lib/api";
import { HeroSlide } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminHeroPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await getAllHeroSlides();
        setSlides(response);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this slide?")) return;
      await deleteHeroSlide(id);
      alert("Slide deleted successfully!");
      setSlides(slides.filter((slide) => slide._id !== id));
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
          Hero Section Management
        </h2>
        <button
          className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95 w-full sm:w-auto justify-center"
          onClick={() => router.push("/admin/hero/create")}
        >
          <i className="fa-solid fa-plus"></i> Add Slide
        </button>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm">
        <div className="p-4 border-b border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50">
          <div className="relative w-full sm:w-auto">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="SEARCH SLIDES..."
              className="bg-white border border-black/10 text-sm pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-[#FE0002] rounded-sm font-display tracking-wider placeholder:text-gray-400 uppercase text-[10px] font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-black/5">
                <th className="p-6">Thumbnail</th>
                <th className="p-6">Title</th>
                <th className="p-6">Subtitle</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-center">Order</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500 font-display uppercase tracking-widest text-xs">
                    Loading slides...
                  </td>
                </tr>
              ) : slides.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500 font-display uppercase tracking-widest text-xs">
                    No slides found
                  </td>
                </tr>
              ) : (
                slides.map((slide) => (
                  <tr
                    key={slide._id}
                    className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="w-20 h-10 bg-black rounded-sm overflow-hidden relative">
                        <Image 
                          src={slide.image_url || "/og-fighter-default.jpg"} 
                          alt={slide.title || "Slide"} 
                          className="w-full h-full object-cover object-top" 
                          fill
                          sizes="80px"
                        />
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-display font-black uppercase text-base tracking-tighter">
                        {slide.title || "Untitled"}
                      </div>
                    </td>
                    <td className="p-6 text-gray-500 text-[10px] tracking-widest font-bold max-w-xs truncate">
                      {slide.subtitle || ""}
                    </td>
                    <td className="p-6 text-center">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {slide.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-6 text-center font-bold text-gray-700">
                      {slide.order}
                    </td>
                    <td className="p-6 text-right space-x-2 whitespace-nowrap">
                      <button className="w-8 h-8 rounded border border-black/10 text-gray-600 hover:text-black hover:bg-black/5 hover:border-black transition-all">
                        <Link href={`/admin/hero/edit/${slide._id}`}>
                          <i className="fa-solid fa-pen text-xs"></i>
                        </Link>
                      </button>
                      <button 
                        className="w-8 h-8 rounded border border-black/10 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all" 
                        onClick={() => handleDelete(slide._id)}
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

