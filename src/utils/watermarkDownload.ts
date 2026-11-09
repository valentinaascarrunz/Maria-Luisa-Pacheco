/**
 * Utility to process and download artworks and photographs with an applied watermark.
 * Watermark details:
 * - Repeated diagonal text (-30°) "© Herederos de María Luisa Pacheco" in white at 25% opacity
 * - Bottom-right corner text "© Herederos de María Luisa Pacheco" in white at 70% opacity
 * - Font size proportional to image dimensions (approx. 3% of width)
 * - Filename: "[Title]-[Year]-MLPacheco.jpg"
 */

export function formatDownloadFilename(title?: string, year?: string): string {
  let rawTitle = (title || 'Obra').trim();

  // If title includes parenthetical year like "Composición (1960)", extract clean title and year
  const yearMatch = rawTitle.match(/\((\d{4})\)/);
  let resolvedYear = year || (yearMatch ? yearMatch[1] : '');
  if (yearMatch) {
    rawTitle = rawTitle.replace(/\s*\(\d{4}\)\s*/, ' ');
  }

  // Remove diacritics and non-alphanumeric chars for clean cross-platform filenames
  const cleanTitle = rawTitle
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const cleanYear = (resolvedYear || '')
    .toString()
    .replace(/[^0-9]/g, '')
    .slice(0, 4);

  const parts = [cleanTitle || 'Obra'];
  if (cleanYear) parts.push(cleanYear);
  parts.push('MLPacheco');

  return `${parts.join('-')}.jpg`;
}

/**
 * Loads an image from a URL into an HTMLImageElement with anonymous CORS.
 * Falls back to fetching as Blob if needed.
 */
function loadImageWithCORS(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => resolve(img);
    img.onerror = () => {
      // Secondary fallback: fetch as blob to bypass potential image element caching issues
      fetch(src, { mode: 'cors' })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            URL.revokeObjectURL(blobUrl);
            resolve(fallbackImg);
          };
          fallbackImg.onerror = (e) => {
            URL.revokeObjectURL(blobUrl);
            reject(e);
          };
          fallbackImg.src = blobUrl;
        })
        .catch(reject);
    };

    img.src = src;
  });
}

/**
 * Renders the watermark and initiates the download of the image.
 */
export async function downloadWatermarkedImage(
  src: string,
  title?: string,
  year?: string
): Promise<void> {
  if (!src) return;

  const img = await loadImageWithCORS(src);

  const W = img.naturalWidth || img.width || 1200;
  const H = img.naturalHeight || img.height || 900;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Fill canvas with white background (in case of transparent PNGs being saved as JPG)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Draw original image at native full resolution
  ctx.drawImage(img, 0, 0, W, H);

  const watermarkText = '© Herederos de María Luisa Pacheco';

  // Proportional font size: approx 3% of image width (minimum 14px for very small assets)
  const fontSize = Math.max(14, Math.round(W * 0.03));

  // 1. Diagonal repeated watermark (-30 deg) at 25% opacity white
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate((-30 * Math.PI) / 180);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const textMetrics = ctx.measureText(watermarkText);
  const stepX = textMetrics.width + fontSize * 2.2;
  const stepY = fontSize * 3.4;
  const maxDim = Math.sqrt(W * W + H * H);

  let row = 0;
  for (let y = -maxDim; y <= maxDim; y += stepY) {
    const offsetX = (row % 2) * (stepX / 2);
    for (let x = -maxDim + offsetX; x <= maxDim; x += stepX) {
      ctx.fillText(watermarkText, x, y);
    }
    row++;
  }
  ctx.restore();

  // 2. Corner watermark in the bottom-right corner at 70% opacity white
  ctx.save();
  const cornerFontSize = Math.max(12, Math.round(fontSize * 0.82));
  ctx.font = `600 ${cornerFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';

  // Subtle dark drop-shadow to guarantee high legibility over both dark and pure white artworks
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = Math.max(3, Math.round(cornerFontSize * 0.25));
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';

  const marginX = Math.max(12, Math.round(W * 0.025));
  const marginY = Math.max(12, Math.round(H * 0.025));
  ctx.fillText(watermarkText, W - marginX, H - marginY);
  ctx.restore();

  // 3. Convert to high-quality JPEG and trigger browser download
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob failed'));
          return;
        }

        const filename = formatDownloadFilename(title, year);
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          resolve();
        }, 1500);
      },
      'image/jpeg',
      0.95
    );
  });
}
