import React, { useId } from 'react';

interface ArtworkWatermarkProps {
  /**
   * If true, displays an additional corner watermark in the bottom-right corner
   * with 60% opacity white, visible on both desktop and mobile.
   */
  isLightbox?: boolean;
  className?: string;
}

/**
 * Universal protection watermark overlay for artworks and archival photographs.
 * Renders a repeated diagonal layer (-30°) with "© Herederos de María Luisa Pacheco"
 * in 18% opacity white (font size 12-14px) without obscuring the artwork.
 * In lightboxes / modals, also displays the corner watermark with 60% opacity.
 * Layer is placed directly ON TOP of the image with pointer-events: none so it
 * appears in any screenshot or capture while allowing interactions to pass through.
 */
export const ArtworkWatermark: React.FC<ArtworkWatermarkProps> = ({
  isLightbox = false,
  className = '',
}) => {
  const patternId = useId();

  return (
    <div
      aria-hidden="true"
      data-watermark="true"
      className={`absolute inset-0 z-10 pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}
    >
      {/* 1. Diagonal repeated watermark layer: -30deg, 18% opacity white, 13px font */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <pattern
            id={patternId}
            width="320"
            height="75"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30)"
          >
            <text
              x="160"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fillOpacity="0.18"
              fontSize="13"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
              fontWeight="500"
              letterSpacing="0.04em"
            >
              © Herederos de María Luisa Pacheco
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* 2. Lightbox corner watermark: bottom-right corner, 60% opacity white, visible on desktop and mobile */}
      {isLightbox && (
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 px-2.5 py-1 bg-black/45 backdrop-blur-xs rounded-xs pointer-events-none select-none shadow-xs">
          <span
            className="text-[0.72rem] sm:text-xs font-mono tracking-wider text-white"
            style={{ opacity: 0.6 }}
          >
            © Herederos de María Luisa Pacheco
          </span>
        </div>
      )}
    </div>
  );
};
