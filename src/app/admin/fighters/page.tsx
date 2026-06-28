"use client";
import { deleteFighter, getAllFighters } from "@/lib/api";
import { Fighter, formatRecord } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminFightersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: fighters = [] } = useQuery<Fighter[]>({
    queryKey: ["fighters"],
    queryFn: async () => {
      const response = await getAllFighters();
      return response;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFighter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fighters"] });
      alert("Fighter deleted successfully!");
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fighter?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
          Fighters Management
        </h2>
        <button
          className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95 w-full sm:w-auto justify-center"
          onClick={() => router.push("/admin/fighters/create")}
        >
          <i className="fa-solid fa-plus"></i> Add Fighter
        </button>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm">
        <div className="p-4 border-b border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50">
          <div className="relative w-full sm:w-auto">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="SEARCH FIGHTERS..."
              className="bg-white border border-black/10 text-sm pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-[#FE0002] rounded-sm font-display tracking-wider placeholder:text-gray-400 uppercase text-[10px] font-bold"
            />
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <button className="px-4 py-2 border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:border-black rounded-sm flex items-center gap-2 bg-white">
              <i className="fa-solid fa-filter"></i> Filter
            </button>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {fighters.map((fighter) => {
            const pi = fighter.personal_info || {}
            const pa = fighter.physical_attributes || {}
            const career = fighter.career || {}
            const media = fighter.media || {}
            const recordStr = formatRecord(fighter.record)
            return (
              <div key={fighter._id} className="bg-white border border-black/5 rounded-sm p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-sm overflow-hidden relative shrink-0">
                    <Image src={media.profile_image || "/og-fighter-default.jpg"} alt={pi.full_name} fill className="object-cover object-top" sizes="48px" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-black uppercase text-sm tracking-tighter truncate">{pi.full_name}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{pa.weight_class}</div>
                  </div>
                  <div className="ml-auto text-center">
                    <div className="font-bold text-gray-700 text-sm">{recordStr}</div>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full inline-block mt-1">{career.styles?.join(", ")}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-black/5">
                  <Link href={`/admin/fighters/${fighter._id}`} className="flex-1 text-center py-2 border border-black/10 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-eye mr-1"></i> View</Link>
                  <Link href={`/admin/fighters/edit/${fighter._id}`} className="flex-1 text-center py-2 border border-black/10 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-pen mr-1"></i> Edit</Link>
                  <button onClick={() => handleDelete(fighter._id)} className="flex-[0.5] text-center py-2 border border-red-200 text-red-500 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-black/5">
                <th className="p-6">Fighter</th>
                <th className="p-6 text-center">Record</th>
                <th className="p-6">Weight Class</th>
                <th className="p-6 text-center">Style</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {fighters.map((fighter, i) => {
                const pi = fighter.personal_info || {}
                const pa = fighter.physical_attributes || {}
                const career = fighter.career || {}
                const media = fighter.media || {}
                const recordStr = formatRecord(fighter.record)

                return (
                  <tr
                    key={i}
                    className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-sm overflow-hidden relative">
                          <Image
                            src={media.profile_image || "/og-fighter-default.jpg"}
                            alt="fighter image"
                            className="w-full h-full object-cover object-top"
                            fill
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <div className="font-display font-black uppercase text-base tracking-tighter">
                            {pi.full_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center font-bold text-gray-700">
                      {recordStr}
                    </td>
                    <td className="p-6 uppercase text-gray-500 text-[10px] tracking-widest font-bold">
                      {pa.weight_class}
                    </td>
                    <td className="p-6 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {career.styles?.join(", ")}
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
                      <button className="w-8 h-8 rounded border border-black/10 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all" onClick={() => handleDelete(fighter._id)}>
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
