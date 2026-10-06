import React, { useEffect } from 'react';
import type { Obra } from '../types';
import { useSite } from '../context/SiteContext';
import { ArtworkImage } from './ArtworkImage';
import { ParsedText } from './ParsedText';
import { X, ExternalLink } from 'lucide-react';
import obrasData from '../contenido/obras.json';

interface ArtworkDetailModalProps {
  obra: Obra | null;
  onClose: () => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({ obra, onClose }) => {
  const { idioma, setObraSeleccionada, mostrarMarcadores } = useSite();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!obra) return null;

  const tituloActual = idioma === 'en' && obra.titulo_en ? obra.titulo_en : obra.titulo;
  const tecnicaActual = idioma === 'en' && obra.tecnica_en ? obra.tecnica_en : obra.tecnica;
  const etapaActual = idioma === 'en' && obra.etapa_en ? obra.etapa_en : obra.etapa;
  const coleccionActual = idioma === 'en' && obra.coleccion_en ? obra.coleccion_en : obra.coleccion;
  const notasActual = idioma === 'en' && obra.notas_en ? obra.notas_en : obra.notas;
  const medidasActual = idioma === 'en' && obra.medidas_en ? obra.medidas_en : obra.medidas;

  // Find related works in the same period or collection
  const obrasRelacionadas = (obrasData as Obra[])
    .filter((o) => o.id !== obra.id && (o.etapa === obra.etapa || o.decada === obra.decada))
    .slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl section-dark border border-white/10 shadow-2xl p-6 md:p-10 overflow-hidden my-auto text-[#F5F2EC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#C9C4BC] hover:text-[#F5F2EC] transition-colors z-20 cursor-pointer"
          aria-label={idioma === 'es' ? 'Cerrar ficha' : 'Close view'}
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Artwork Canvas */}
          <div className="lg:col-span-7 w-full">
            <ArtworkImage
              obra={obra}
              aspectRatio="aspect-4/3"
              className="w-full shadow-inner"
              showHoverOverlay={false}
            />
            <p className="mt-2 text-[0.65rem] text-[#A39E97] tracking-wider uppercase text-center font-mono">
              © Herederos de María Luisa Pacheco · Reproducción prohibida
            </p>
          </div>

          {/* Technical Data & Catalog Entry */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Stage label */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D49B55] mb-2 font-mono">
                <span>{etapaActual}</span>
                {obra.decada && (
                  <>
                    <span>·</span>
                    <span>{obra.decada}s</span>
                  </>
                )}
              </div>

              {/* Title & Year */}
              <h3 className="font-serif-display text-3xl md:text-4xl text-[#F5F2EC] leading-tight">
                <ParsedText text={tituloActual} />
              </h3>
              <p className="font-serif text-xl text-[#D49B55] mt-1">
                <ParsedText text={obra.anio} />
              </p>

              {/* Marker alert if active */}
              {mostrarMarcadores && obra.marcador && (
                <div className="mt-3">
                  <ParsedText text={obra.marcador} />
                </div>
              )}

              {/* Technical specifications */}
              <div className="mt-6 border-t border-[var(--line-border)] pt-4 space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-[var(--line-border)]/50">
                  <span className="text-[#C9C4BC]">
                    {idioma === 'es' ? 'Técnica' : 'Medium'}
                  </span>
                  <span className="font-medium text-[#F5F2EC] text-right">
                    <ParsedText text={tecnicaActual} />
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[var(--line-border)]/50">
                  <span className="text-[#C9C4BC]">
                    {idioma === 'es' ? 'Medidas' : 'Dimensions'}
                  </span>
                  <span className="font-medium text-[#F5F2EC] text-right">
                    <ParsedText text={medidasActual} />
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[var(--line-border)]/50">
                  <span className="text-[#C9C4BC]">
                    {idioma === 'es' ? 'Colección' : 'Collection'}
                  </span>
                  <span className="font-medium text-[#F5F2EC] text-right max-w-[65%]">
                    <ParsedText text={coleccionActual} />
                  </span>
                </div>
              </div>

              {/* Curatorial Notes */}
              {notasActual && (
                <div className="mt-6 text-sm text-[#DCD7D0] leading-relaxed italic border-l-2 border-[#B07A3B] pl-3">
                  <ParsedText text={notasActual} />
                </div>
              )}

              {/* Image source reference for family */}
              {obra.fuente_imagen && (
                <div className="mt-4 pt-4 border-t border-[var(--line-border)]/50 text-xs">
                  <span className="text-[#C9C4BC] block mb-1">
                    {idioma === 'es' ? 'Fuente documentada:' : 'Documented source:'}
                  </span>
                  <a
                    href={obra.fuente_imagen}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#D49B55] hover:underline font-mono text-[0.72rem] break-all"
                  >
                    <span>{obra.fuente_imagen.replace('https://', '')}</span>
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                </div>
              )}
            </div>

            {/* Related works */}
            {obrasRelacionadas.length > 0 && (
              <div className="border-t border-[var(--line-border)] pt-4">
                <span className="text-xs tracking-wider uppercase text-[#D49B55] font-mono block mb-3">
                  {idioma === 'es' ? 'Obras relacionadas' : 'Related works'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {obrasRelacionadas.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setObraSeleccionada(rel)}
                      className="text-left group cursor-pointer"
                    >
                      <ArtworkImage
                        obra={rel}
                        aspectRatio="aspect-square"
                        className="w-full"
                        showHoverOverlay={false}
                      />
                      <p className="mt-1 text-[0.7rem] truncate text-[#F5F2EC] group-hover:text-[#D49B55]">
                        {idioma === 'en' && rel.titulo_en ? rel.titulo_en : rel.titulo}
                      </p>
                      <p className="text-[0.65rem] text-[#D49B55] font-mono">{rel.anio}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
