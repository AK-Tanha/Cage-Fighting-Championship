"use client";
import { deleteReferee, getAllReferees } from "@/lib/api";
import { Referee } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminRefereesPage() {
  const router = useRouter();
  const [referees, setReferees] = useState<Referee[]>([]);

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const response = await getAllReferees();
        setReferees(response);
      } catch (error) {
        console.error("Error fetching referees:", error);
      }
    };
    fetchReferees();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this referee?")) return;
      await deleteReferee(id);
      alert("Referee deleted successfully!");
      setReferees(referees.filter((referee) => referee._id !== id));
    } catch (error) {
      console.error("Error deleting referee:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
          Referees Management
        </h2>
        <button
          className="bg-[#FE0002] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95 w-full sm:w-auto justify-center"
          onClick={() => router.push("/admin/referees/create")}
        >
          <i className="fa-solid fa-plus"></i> Add Referee
        </button>
      </div>

      <div className="bg-white border border-black/5 rounded-sm overflow-hidden shadow-sm">
        <div className="p-4 border-b border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50">
          <div className="relative w-full sm:w-auto">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="SEARCH REFEREES..."
              className="bg-white border border-black/10 text-sm pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-[#FE0002] rounded-sm font-display tracking-wider placeholder:text-gray-400 uppercase text-[10px] font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-black/5">
                <th className="p-6">Referee</th>
                <th className="p-6 text-center">Record</th>
                <th className="p-6">Nationality</th>
                <th className="p-6 text-center">Date of Birth</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {referees.map((referee, i) => (
                <tr
                  key={i}
                  className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black rounded-sm overflow-hidden relative">
                        <Image 
                            src={(referee.image_url && referee.image_url.includes('://')) ? referee.image_url : "/og-fighter-default.jpg"} 
                            alt={referee.name || "Referee"} 
                            className="w-full h-full object-cover object-top" 
                            fill 
                            sizes="40px"
                        />
                      </div>
                      <div>
                        <div className="font-display font-black uppercase text-base tracking-tighter">
                          {referee.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center font-bold text-gray-700">
                    {referee.record}
                  </td>
                  <td className="p-6 uppercase text-gray-500 text-[10px] tracking-widest font-bold">
                    {referee.nationality}
                  </td>
                  <td className="p-6 text-center text-gray-500">
                    {referee.date_of_birth}
                  </td>
                  <td className="p-6 text-right space-x-2 whitespace-nowrap">
                    <button className="w-8 h-8 rounded border border-black/10 text-gray-600 hover:text-black hover:bg-black/5 hover:border-black transition-all">
                      <Link href={`/admin/referees/${referee._id}`}>
                        <i className="fa-solid fa-eye text-xs"></i>
                      </Link>
                    </button>
                    <button className="w-8 h-8 rounded border border-black/10 text-gray-600 hover:text-black hover:bg-black/5 hover:border-black transition-all">
                      <Link href={`/admin/referees/edit/${referee._id}`}>
                        <i className="fa-solid fa-pen text-xs"></i>
                      </Link>
                    </button>
                    <button className="w-8 h-8 rounded border border-black/10 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all" onClick={() => handleDelete(referee._id)}>
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {referees.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm uppercase tracking-widest font-bold">
              No referees found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
