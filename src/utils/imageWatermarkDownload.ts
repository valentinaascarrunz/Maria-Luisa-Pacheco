/**
 * Utility for drawing the watermark and downloading images as JPG.
 *
 * Watermark requirements:
 * 1. Text "© Herederos de María Luisa Pacheco" repeated in diagonal (-30°) in white at 25% opacity.
 * 2. Same text in the bottom right corner at 70% opacity.
 * 3. Text size proportional to image dimensions (~3% of image width).
 * 4. Exported as JPG with filename format: "[Title]-[Year]-MLPacheco.jpg" (e.g. "Montanas-1979-MLPacheco.jpg").
 */

export function sanitizeForFilename(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics/accents (ñ -> n, á -> a)
    .replace(/[^a-zA-Z0-9\s-_]/g, '') // remove special symbols
    .trim()
    .replace(/\s+/g, '-');
}

export function generateDownloadFilename(img: HTMLImageElement): string {
  let title = img.dataset.title || '';
  let year = img.dataset.year || '';

  if (!title || !year) {
    const alt = img.alt || '';

    // Match patterns like "Title (Year) — María Luisa Pacheco" or "Title, Year"
    const matchParens = alt.match(/^(.*?)(?:\s*\((\d{4}[^\)]*)\))/);
    const matchComma = alt.match(/^(.*?),\s*(\d{4})/);

    if (matchParens) {
      if (!title) title = matchParens[1].trim();
      if (!year) year = matchParens[2].trim();
    } else if (matchComma) {
      if (!title) title = matchComma[1].trim();
      if (!year) year = matchComma[2].trim();
    } else if (!title) {
      title = alt.replace(/—\s*María Luisa Pacheco/gi, '').trim() || 'Obra';
    }
  }

  const cleanTitle = sanitizeForFilename(title) || 'Maria-Luisa-Pacheco';
  const cleanYear = sanitizeForFilename(year);

  const parts = [cleanTitle];
  if (cleanYear) {
    parts.push(cleanYear);
  }
  parts.push('MLPacheco');

  return `${parts.join('-')}.jpg`;
}

/**
 * Loads an image (using CORS / Blob fallback), renders it onto an offscreen canvas
 * at its native original dimensions, draws the diagonal and corner watermarks,
 * and triggers a JPG download.
 */
export async function downloadWatermarkedImage(
  imageSrc: string,
  filename: string
): Promise<void> {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  let blobUrlToRevoke: string | null = null;

  try {
    // Try fetching via CORS to create a same-origin blob url as the most reliable canvas source
    const res = await fetch(imageSrc, { mode: 'cors' });
    if (res.ok) {
      const blob = await res.blob();
      blobUrlToRevoke = URL.createObjectURL(blob);
      img.src = blobUrlToRevoke;
    } else {
      img.src = imageSrc;
    }
  } catch {
    // Fallback directly to crossOrigin anonymous loading
    img.src = imageSrc;
  }

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image for watermarking'));
  });

  const W = img.naturalWidth || img.width;
  const H = img.naturalHeight || img.height;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    if (blobUrlToRevoke) URL.revokeObjectURL(blobUrlToRevoke);
    throw new Error('Canvas 2D context unavailable');
  }

  // Draw white background so transparent areas in PNGs don't become black in JPG
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Draw original image at original size
  ctx.drawImage(img, 0, 0, W, H);

  const watermarkText = '© Herederos de María Luisa Pacheco';

  // Proportional font size (~3% of image width, min 14px)
  const baseFontSize = Math.max(14, Math.round(W * 0.03));

  // 1. Diagonal repeated watermark (-30°) at 25% opacity
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate((-30 * Math.PI) / 180);

  ctx.font = `500 ${baseFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const textMetrics = ctx.measureText(watermarkText);
  const textWidth = textMetrics.width;
  const stepX = textWidth + baseFontSize * 2.2;
  const stepY = baseFontSize * 3.4;

  const diagonal = Math.sqrt(W * W + H * H);
  const startX = -diagonal / 2 - stepX;
  const endX = diagonal / 2 + stepX;
  const startY = -diagonal / 2 - stepY;
  const endY = diagonal / 2 + stepY;

  let row = 0;
  for (let y = startY; y <= endY; y += stepY) {
    const offsetX = row % 2 === 0 ? 0 : stepX / 2;
    for (let x = startX - stepX; x <= endX + stepX; x += stepX) {
      ctx.fillText(watermarkText, x + offsetX, y);
    }
    row++;
  }
  ctx.restore();

  // 2. Corner watermark: bottom right corner at 70% opacity, ~3% font size
  ctx.save();
  const cornerFontSize = Math.max(13, Math.round(W * 0.026));
  ctx.font = `600 ${cornerFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';

  const margin = Math.round(cornerFontSize * 1.25);
  const cornerX = W - margin;
  const cornerY = H - margin;

  // Subtle shadow for legibility over light artwork areas
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = Math.round(cornerFontSize * 0.35);
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
  ctx.fillText(watermarkText, cornerX, cornerY);
  ctx.restore();

  // Clean up blob url if created
  if (blobUrlToRevoke) {
    URL.revokeObjectURL(blobUrlToRevoke);
  }

  // Export as JPG and trigger file download
  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create JPG blob from canvas'));
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
        resolve();
      },
      'image/jpeg',
      0.92
    );
  });
}
