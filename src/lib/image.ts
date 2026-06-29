export async function fetchImageForEdit(url: string, maxLongSide = 1200): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();

  const img = new Image();
  const imageUrl = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    img.onload = () => {
      URL.revokeObjectURL(imageUrl);

      const { naturalWidth: w, naturalHeight: h } = img;
      if (w <= maxLongSide && h <= maxLongSide) {
        const file = new File([blob], "fighter-image.png", { type: "image/png" });
        resolve(file);
        return;
      }

      const scale = w > h ? maxLongSide / w : maxLongSide / h;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((downsampled) => {
        const file = new File([downsampled!], "fighter-image.png", { type: "image/png" });
        resolve(file);
      }, "image/png");
    };
    img.src = imageUrl;
  });
}
