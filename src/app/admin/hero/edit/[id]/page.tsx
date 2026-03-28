"use client";

import { getHeroSlideById, updateHeroSlide, uploadImage } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroSlideEdit = () => {
  const router = useRouter();
  const params = useParams();
  const slideId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    link: "",
    is_active: true,
    order: 0,
  });

  useEffect(() => {
    const fetchSlide = async () => {
      if (!slideId) return;
      try {
        const slide = await getHeroSlideById(slideId);
        setData({
          title: slide.title || "",
          subtitle: slide.subtitle || "",
          image_url: slide.image_url || "",
          link: slide.link || "",
          is_active: slide.is_active ?? true,
          order: slide.order || 0,
        });
      } catch (err: any) {
        console.error("Error fetching slide:", err);
        setError("Failed to load slide data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlide();
  }, [slideId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setData((prev) => ({ ...prev, [name]: name === "order" ? parseInt(value) || 0 : val }));
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
      await updateHeroSlide(slideId as string, data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/hero");
      }, 2000);
    } catch (err: any) {
      console.error("error submitting form", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to update slide",
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
              href="/admin/hero"
              className="text-[#FE0002] text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mb-2"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to Hero Management
            </Link>
            <h1 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Edit <span className="text-[#FE0002]">Hero Slide</span>
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
            Slide updated successfully! Redirecting...
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
                Slide Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={data.title}
                    onChange={handleChange}
                    placeholder="Main heading for the slide"
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Subtitle
                  </label>
                  <textarea
                    name="subtitle"
                    rows={2}
                    value={data.subtitle}
                    onChange={handleChange}
                    placeholder="Short description or sub-heading"
                    className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Link URL
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={data.link}
                      onChange={handleChange}
                      placeholder="e.g. /events or https://..."
                      className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={data.order}
                      onChange={handleChange}
                      placeholder="0"
                      className="bg-gray-50 border border-black/10 rounded-sm px-4 py-3 focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={data.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#FE0002]"
                  />
                  <label htmlFor="is_active" className="text-[10px] font-black uppercase tracking-widest text-gray-500 cursor-pointer">
                    Active (Displayed on Homepage)
                  </label>
                </div>
              </div>
            </div>

            {/* Visuals Section */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-black/5 pb-2">
                Slide Image
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
                    placeholder="https://example.com/slide-image.jpg"
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
                        alt="Slide preview"
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

export default HeroSlideEdit;
