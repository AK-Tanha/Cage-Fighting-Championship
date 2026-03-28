"use client";

import { getRefereeById, updateReferee, uploadImage } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RefereeEditPage = () => {
  const router = useRouter();
  const params = useParams();
  const refereeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    name: "",
    record: "",
    nationality: "",
    date_of_birth: "",
    bio: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchReferee = async () => {
      if (!refereeId) return;
      try {
        const referee = await getRefereeById(refereeId);
        setData({
          name: referee.name || "",
          record: referee.record || "",
          nationality: referee.nationality || "",
          date_of_birth: referee.date_of_birth
            ? referee.date_of_birth.split("T")[0]
            : "",
          bio: referee.bio || "",
          image_url: referee.image_url || "",
        });
      } catch (err: any) {
        console.error("Error fetching referee:", err);
        setError("Failed to load referee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferee();
  }, [refereeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
      console.error("Image upload error", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateReferee(refereeId, data as any);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/admin/referees`);
      }, 2000);
    } catch (err: any) {
      console.error("error submitting form", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to update referee",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE0002]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin/referees"
              className="text-[#FE0002] text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mb-2"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to
              Referees
            </Link>
            <h1 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Edit <span className="text-[#FE0002]">Referee</span>
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
            Referee updated successfully! Redirecting...
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-black/5 shadow-xl rounded-sm overflow-hidden"
        >
          <div className="p-8 space-y-8">
            {/* Basic Info Section */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Enter referee full name"
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Record
                  </label>
                  <input
                    type="text"
                    name="record"
                    required
                    value={data.record}
                    onChange={handleChange}
                    placeholder="e.g. 100+ Matches"
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={data.nationality}
                    onChange={handleChange}
                    placeholder="e.g. USA"
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    required
                    value={data.date_of_birth}
                    onChange={handleChange}
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Biography Section */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                Biography
              </h3>
              <div className="flex flex-col">
                <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Referee Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  required
                  value={data.bio}
                  onChange={handleChange}
                  placeholder="Write a short biography about the referee..."
                  className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm resize-none"
                />
              </div>
            </div>

            {/* Visuals Section */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                Referee Image
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
                    placeholder="https://example.com/referee-image.jpg"
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
                        src={(data.image_url && data.image_url.includes('://')) ? data.image_url : "/og-fighter-default.jpg"}
                        alt="Referee preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white font-bold uppercase tracking-widest text-xs">
                          {uploadingImage ? 'Uploading...' : 'Change Image'}
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
                        {uploadingImage ? 'Uploading Image...' : 'Click or Drag to Upload Image'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="p-8 bg-gray-50 border-t border-black/5 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`
                group relative bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all 
                ${submitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#FE0002] active:scale-95"}
              `}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-circle-notch animate-spin"></i>{" "}
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-save group-hover:scale-110 transition-transform"></i>{" "}
                  Save Changes
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefereeEditPage;
