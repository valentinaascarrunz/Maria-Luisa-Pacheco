import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from './ParsedText';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const ChronologyLightbox: React.FC = () => {
  const {
    idioma,
    fotoLightbox,
    cerrarLightboxFoto,
    siguienteFotoLightbox,
    anteriorFotoLightbox,
    fotosPeriodo,
  } = useSite();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarLightboxFoto();
      if (e.key === 'ArrowRight') siguienteFotoLightbox();
      if (e.key === 'ArrowLeft') anteriorFotoLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cerrarLightboxFoto, siguienteFotoLightbox, anteriorFotoLightbox]);

  if (!fotoLightbox) return null;

  const descActual =
    idioma === 'en' && fotoLightbox.descripcion_en ? fotoLightbox.descripcion_en : fotoLightbox.descripcion;
  const lugarActual =
    idioma === 'en' && fotoLightbox.lugar_en ? fotoLightbox.lugar_en : fotoLightbox.lugar;
  const creditoActual =
    idioma === 'en' && fotoLightbox.credito_en ? fotoLightbox.credito_en : fotoLightbox.credito;

  const currentIndex = fotosPeriodo.findIndex((f) => f.id === fotoLightbox.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      onClick={cerrarLightboxFoto}
    >
      <div
        className="relative w-full max-w-4xl flex flex-col items-center max-h-[90vh] text-[#F5F2EC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={cerrarLightboxFoto}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label={idioma === 'es' ? 'Cerrar visor' : 'Close lightbox'}
        >
          <X size={26} />
        </button>

        {/* Previous Button */}
        {fotosPeriodo.length > 1 && (
          <button
            onClick={anteriorFotoLightbox}
            className="absolute left-[-1.5rem] md:left-[-3rem] top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full bg-black/30 hover:bg-black/60"
            aria-label={idioma === 'es' ? 'Foto anterior' : 'Previous photograph'}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Next Button */}
        {fotosPeriodo.length > 1 && (
          <button
            onClick={siguienteFotoLightbox}
            className="absolute right-[-1.5rem] md:right-[-3rem] top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full bg-black/30 hover:bg-black/60"
            aria-label={idioma === 'es' ? 'Siguiente foto' : 'Next photograph'}
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Large Image Frame with Stone Fallback */}
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          className="relative w-full max-h-[65vh] flex items-center justify-center section-dark border border-white/10 overflow-hidden protected-artwork"
        >
          <img
            src={fotoLightbox.imagen}
            alt={descActual}
            className="max-h-[65vh] w-auto max-w-full object-contain"
            onError={(e) => {
              // Gracefully handle missing real image with an elegant archive placeholder
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className =
                  'h-72 w-full flex flex-col items-center justify-center p-8 bg-[#1E1D1B] section-dark text-center';
                placeholder.innerHTML = `
                  <span class="text-xs uppercase tracking-widest text-[#D49B55] font-mono mb-2">Archivo Histórico · Fotografía de Período</span>
                  <p class="font-serif text-xl max-w-lg text-[#F5F2EC] mb-3">${descActual}</p>
                  <span class="text-[0.7rem] font-mono text-[#C9C4BC]">${fotoLightbox.imagen}</span>
                `;
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>

        {/* Detailed Caption Below */}
        <div className="w-full mt-4 section-dark p-4 border border-white/10 space-y-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h4 className="font-serif text-lg md:text-xl text-[#F5F2EC]">
              <ParsedText text={descActual} />
            </h4>
            <span className="text-xs font-mono text-[#D49B55] tracking-wider shrink-0">
              {currentIndex + 1} / {fotosPeriodo.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#DCD7D0] pt-1">
            {lugarActual && (
              <span>
                <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Lugar:' : 'Location:'}</strong>{' '}
                <ParsedText text={lugarActual} />
              </span>
            )}
            {fotoLightbox.fecha && (
              <span>
                <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Fecha:' : 'Date:'}</strong>{' '}
                <ParsedText text={fotoLightbox.fecha} />
              </span>
            )}
            {creditoActual && (
              <span>
                <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Foto:' : 'Credit:'}</strong>{' '}
                <ParsedText text={creditoActual} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
