"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ImageCropperProps {
  file: File;
  aspectRatio?: number;
  outputWidth?: number;
  outputHeight?: number;
  onApply: (adjustedFile: File) => void;
  onCancel: () => void;
}

export default function ImageCropper({
  file,
  aspectRatio = 9 / 16,
  outputWidth = 360,
  outputHeight = 640,
  onApply,
  onCancel,
}: ImageCropperProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageNatural, setImageNatural] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const frameSize = useCallback(() => {
    if (!frameRef.current) return { w: 400, h: 400 / aspectRatio };
    const w = frameRef.current.clientWidth;
    return { w, h: w / aspectRatio };
  }, [aspectRatio]);

  const getTransform = useCallback(() => {
    const { w: fw, h: fh } = frameSize();
    const nw = imageNatural.w;
    const nh = imageNatural.h;
    if (!nw || !nh) return { scale: 1, dx: 0, dy: 0, displayW: fw, displayH: fh };

    const baseScale = Math.max(fw / nw, fh / nh);
    const scale = baseScale * zoom;
    const displayW = nw * scale;
    const displayH = nh * scale;

    const maxDx = Math.max(0, (displayW - fw) / 2);
    const maxDy = Math.max(0, (displayH - fh) / 2);
    const dx = Math.max(-maxDx, Math.min(maxDx, pan.x));
    const dy = Math.max(-maxDy, Math.min(maxDy, pan.y));

    return { scale, dx, dy, displayW, displayH, maxDx, maxDy };
  }, [imageNatural, zoom, pan, frameSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanStart({ ...pan });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPan({ x: panStart.x + dx, y: panStart.y + dy });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (v: number) => {
    setZoom(Math.max(1, Math.min(5, v)));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleApply = useCallback(async () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w: fw, h: fh } = frameSize();
    const nw = imageNatural.w;
    const nh = imageNatural.h;
    if (!nw || !nh) return;

    const baseScale = Math.max(fw / nw, fh / nh);
    const scale = baseScale * zoom;
    const displayW = nw * scale;
    const displayH = nh * scale;
    const maxDx = Math.max(0, (displayW - fw) / 2);
    const maxDy = Math.max(0, (displayH - fh) / 2);
    const dx = Math.max(-maxDx, Math.min(maxDx, pan.x));
    const dy = Math.max(-maxDy, Math.min(maxDy, pan.y));

    const srcX = ((displayW - fw) / 2 - dx) / scale;
    const srcY = ((displayH - fh) / 2 - dy) / scale;
    const srcW = fw / scale;
    const srcH = fh / scale;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outputWidth, outputHeight);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const adjustedFile = new File([blob], file.name.replace(/\.[^.]+$/, ".png"), {
        type: "image/png",
      });
      onApply(adjustedFile);
    }, "image/png");
  }, [imageNatural, zoom, pan, frameSize, outputWidth, outputHeight, file, onApply]);

  const { scale, dx, dy, displayW, displayH } = getTransform();
  const { w: frameW, h: frameH } = frameSize();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-sm w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-black/10 flex-shrink-0">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">
            Image <span className="text-[#FE0002]">Cropper</span>
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 rounded-sm transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
          {/* frame preview */}
          <div className="lg:col-span-2 flex items-center justify-center min-h-[350px]">
            <div
              ref={frameRef}
              className="relative overflow-hidden bg-gray-900 rounded-sm"
              style={{
                width: "100%",
                maxWidth: "500px",
                aspectRatio: `${aspectRatio}`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {imageUrl && (
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Crop"
                  onLoad={() => {
                    if (imageRef.current) {
                      setImageNatural({
                        w: imageRef.current.naturalWidth,
                        h: imageRef.current.naturalHeight,
                      });
                      resetView();
                    }
                  }}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: displayW,
                    height: displayH,
                    maxWidth: "none",
                    maxHeight: "none",
                    transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                  draggable={false}
                />
              )}

              {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-circle-notch animate-spin text-3xl text-white/50"></i>
                </div>
              )}

              {/* grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent calc(33.33% - 1px), rgba(255,255,255,0.15) calc(33.33% - 1px), rgba(255,255,255,0.15) 33.33%), repeating-linear-gradient(90deg, transparent, transparent calc(33.33% - 1px), rgba(255,255,255,0.15) calc(33.33% - 1px), rgba(255,255,255,0.15) 33.33%)` }} />

              {/* aspect ratio label */}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded-sm text-[10px] font-bold text-white/80 tracking-widest pointer-events-none">
                {aspectRatio === 1 ? "1:1" : aspectRatio === 9 / 16 ? "9:16" : aspectRatio === 16 / 9 ? "16:9" : `${aspectRatio}:1`}
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-5 flex-shrink-0">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Zoom
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 w-6 text-center">
                  1×
                </span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => handleZoomChange(Number(e.target.value))}
                  className="flex-1 h-1.5 accent-[#FE0002]"
                />
                <span className="text-[10px] font-bold text-gray-400 w-6 text-center">
                  5×
                </span>
              </div>
              <div className="text-center mt-1">
                <span className="text-[11px] font-bold text-gray-600 tabular-nums">
                  {zoom.toFixed(1)}×
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Output
              </h3>
              <div className="bg-gray-50 rounded-sm px-3 py-2.5 text-xs text-gray-600 font-medium">
                {outputWidth} × {outputHeight}px
                <span className="block text-[10px] text-gray-400 font-medium mt-0.5">
                  {aspectRatio === 1 ? "Square" : aspectRatio === 9 / 16 ? "9:16 Portrait" : aspectRatio === 16 / 9 ? "16:9 Widescreen" : `${aspectRatio}:1`}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Actions
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={resetView}
                  className="w-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-rotate-left"></i> Reset View
                </button>

                <div className="bg-gray-50 rounded-sm px-3 py-2.5">
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                    <i className="fa-solid fa-arrows mr-1"></i> Drag to reposition · Scroll to zoom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 px-4 md:px-6 py-3 border-t border-black/10 flex-shrink-0">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-[#FE0002] rounded-sm transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-crop"></i> Crop & Upload
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
