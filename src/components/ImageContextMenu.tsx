import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { Download } from 'lucide-react';
import {
  downloadWatermarkedImage,
  generateDownloadFilename,
} from '../utils/imageWatermarkDownload';

interface MenuState {
  isOpen: boolean;
  x: number;
  y: number;
  imgSrc: string;
  filename: string;
}

export const ImageContextMenu: React.FC = () => {
  const { idioma } = useSite();
  const [menu, setMenu] = useState<MenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    imgSrc: '',
    filename: '',
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Helper to find relevant image element from event target
  const findTargetImage = (target: EventTarget | null): HTMLImageElement | null => {
    if (!target || !(target instanceof HTMLElement)) return null;
    if (target instanceof HTMLImageElement) return target;
    const innerImg = target.querySelector('img');
    if (innerImg) return innerImg;
    const parent = target.closest('.protected-artwork, [data-protected-image], figure, .relative');
    if (parent) {
      const parentImg = parent.querySelector('img');
      if (parentImg) return parentImg;
    }
    return null;
  };

  // Open menu with viewport boundary safety
  const openMenuAt = (clientX: number, clientY: number, img: HTMLImageElement) => {
    const src = img.currentSrc || img.src;
    if (!src) return;

    const filename = generateDownloadFilename(img);

    // Approximate menu dimensions for boundary checking
    const menuWidth = 190;
    const menuHeight = 52;
    const padding = 12;

    let x = clientX;
    let y = clientY;

    if (x + menuWidth > window.innerWidth - padding) {
      x = window.innerWidth - menuWidth - padding;
    }
    if (x < padding) {
      x = padding;
    }

    if (y + menuHeight > window.innerHeight - padding) {
      y = window.innerHeight - menuHeight - padding;
    }
    if (y < padding) {
      y = padding;
    }

    setMenu({
      isOpen: true,
      x,
      y,
      imgSrc: src,
      filename,
    });
  };

  const closeMenu = () => {
    if (isDownloading) return;
    setMenu((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
  };

  useEffect(() => {
    let longPressTimer: NodeJS.Timeout | null = null;
    let touchStartPos = { x: 0, y: 0 };
    let didLongPressTrigger = false;

    // 1. Right-click contextmenu handler
    const handleContextMenu = (e: MouseEvent) => {
      const img = findTargetImage(e.target);
      if (img && (img.src || img.currentSrc)) {
        e.preventDefault();
        e.stopPropagation();
        openMenuAt(e.clientX, e.clientY, img);
      }
    };

    // 2. Mobile touch long-press (500ms) handlers
    const handleTouchStart = (e: TouchEvent) => {
      didLongPressTrigger = false;
      if (e.touches.length !== 1) {
        if (longPressTimer) clearTimeout(longPressTimer);
        return;
      }

      const touch = e.touches[0];
      const img = findTargetImage(e.target);

      if (img && (img.src || img.currentSrc)) {
        touchStartPos = { x: touch.clientX, y: touch.clientY };

        if (longPressTimer) clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          didLongPressTrigger = true;
          // Provide subtle haptic feedback if available
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate?.(35);
            } catch {
              // ignore
            }
          }
          openMenuAt(touchStartPos.x, touchStartPos.y, img);
        }, 500);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!longPressTimer) return;
      if (e.touches.length !== 1) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        return;
      }
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPos.x);
      const dy = Math.abs(touch.clientY - touchStartPos.y);

      // Cancel long press if user is scrolling/moving finger (>10px)
      if (dx > 10 || dy > 10) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      if (didLongPressTrigger) {
        // Prevent accidental clicks after long press
        e.preventDefault();
      }
    };

    // 3. Close on click outside, escape key, or scroll
    const handlePointerDownOutside = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    // Register capture listeners on document
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, true);
    document.addEventListener('touchcancel', handleTouchEnd, true);
    document.addEventListener('pointerdown', handlePointerDownOutside, true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (longPressTimer) clearTimeout(longPressTimer);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd, true);
      document.removeEventListener('touchcancel', handleTouchEnd, true);
      document.removeEventListener('pointerdown', handlePointerDownOutside, true);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!menu.imgSrc || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadWatermarkedImage(menu.imgSrc, menu.filename);
    } catch (err) {
      console.error('Error watermarking and downloading image:', err);
    } finally {
      setIsDownloading(false);
      setMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

  if (!menu.isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Menú de imagen"
      style={{
        left: menu.x,
        top: menu.y,
      }}
      className="fixed z-[9999] bg-[#1E1D1B] text-[#F5F2EC] border border-[#B07A3B] shadow-2xl py-1 px-1 rounded-[3px] select-none text-left min-w-[175px] max-w-[240px] animate-in fade-in zoom-in-95 duration-100"
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        onClick={handleDownloadClick}
        disabled={isDownloading}
        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-sans text-[#F5F2EC] hover:bg-[#B07A3B]/20 hover:text-white transition-colors cursor-pointer w-full text-left rounded-xs focus:outline-none focus:bg-[#B07A3B]/25 disabled:opacity-50"
      >
        <Download size={14} className="text-[#B07A3B] shrink-0" />
        <span className="font-medium tracking-wide">
          {isDownloading
            ? (idioma === 'es' ? 'Preparando...' : 'Preparing...')
            : (idioma === 'es' ? 'Descargar imagen' : 'Download image')}
        </span>
      </button>
    </div>
  );
};
