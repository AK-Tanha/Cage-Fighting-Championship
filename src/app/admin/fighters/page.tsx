"use client";
import { getAllFighters } from "@/lib/api";
import { Fighter } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminFightersPage() {
  const router = useRouter();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const response = await getAllFighters();
        setFighters(response);
      } catch (error) {
        console.error("Error fetching fighters:", error);
      }
    };
    fetchFighters();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight">
          Fighters Management
        </h2>
        <button
          className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95"
          onClick={() => router.push("/admin/fighters/create")}
        >
          <i className="fa-solid fa-plus"></i> Add Fighter
        </button>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm">
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-gray-50">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="SEARCH FIGHTERS..."
              className="bg-white border border-black/10 text-sm pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#FE0002] rounded-sm font-display tracking-wider placeholder:text-gray-400 uppercase text-[10px] font-bold"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:border-black rounded-sm flex items-center gap-2 bg-white">
              <i className="fa-solid fa-filter"></i> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-black/5">
                <th className="p-6">Fighter</th>
                <th className="p-6 text-center">Record</th>
                <th className="p-6">Weight Class</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {fighters.map((fighter, i) => (
                <tr
                  key={i}
                  className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black rounded-sm">
                        <Image src={fighter.image_url || fighter.image || "/og-fighter-default.jpg"} alt="fighter image" className="w-full h-full object-cover" width={100} height={100} />
                      </div>
                      <div>
                        <div className="font-display font-black uppercase text-base tracking-tighter">
                          {fighter.name}
                        </div>
                        {/* {fighter.nickname && (
                          <div className="text-[10px] text-[#FE0002] font-bold uppercase tracking-widest">
                            "{fighter.nickname}"
                          </div>
                        )} */}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center font-bold text-gray-700">
                    {typeof fighter.record === 'string'
                      ? fighter.record
                      : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}`}
                  </td>
                  <td className="p-6 uppercase text-gray-500 text-[10px] tracking-widest font-bold">
                    {fighter.weight_class}
                  </td>
                  <td className="p-6 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {fighter.style}
                    </span>
                  </td>
                  <td className="p-6 text-right space-x-2 whitespace-nowrap">
                    <button className="w-8 h-8 rounded border border-black/10 text-gray-600 hover:text-black hover:bg-black/5 hover:border-black transition-all">
                      <Link href={`/admin/fighters/${fighter._id}`}>
                        <i className="fa-solid fa-eye text-xs"></i>
                      </Link>
                    </button>
                    <button className="w-8 h-8 rounded border border-black/10 text-gray-600 hover:text-black hover:bg-black/5 hover:border-black transition-all">
                      <Link href={`/admin/fighters/edit/${fighter._id}`}>
                        <i className="fa-solid fa-pen text-xs"></i>
                      </Link>
                    </button>
                    <button className="w-8 h-8 rounded border border-black/10 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all">
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
