import React, { useState } from 'react';
import type { Obra } from '../types';
import { useSite } from '../context/SiteContext';

interface ArtworkImageProps {
  obra: Obra;
  className?: string;
  aspectRatio?: string;
  onClick?: () => void;
  showHoverOverlay?: boolean;
  hidePlaceholderText?: boolean;
  objectFit?: 'contain' | 'cover';
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  obra,
  className = '',
  aspectRatio = 'aspect-4/3',
  onClick,
  showHoverOverlay = true,
  hidePlaceholderText = false,
  objectFit = 'contain',
}) => {
  const { idioma } = useSite();
  const [imageError, setImageError] = useState(false);

  const tituloActual = idioma === 'en' && obra.titulo_en ? obra.titulo_en : obra.titulo;
  const tecnicaActual = idioma === 'en' && obra.tecnica_en ? obra.tecnica_en : obra.tecnica;

  const hasImage = Boolean(obra.imagen && obra.imagen.trim());

  return (
    <div
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
      className={`group relative overflow-hidden bg-[#EDE8E0] dark:bg-[#1E1D1B] ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      } protected-artwork select-none flex items-center justify-center`}
    >
      {/* 1. Real artwork image (normal img tag, no filters, full artwork contain) */}
      {hasImage && !imageError ? (
        <img
          src={obra.imagen!}
          alt={`${tituloActual} (${obra.anio}) — María Luisa Pacheco`}
          loading="lazy"
          onError={() => setImageError(true)}
          className={`w-full h-full ${
            objectFit === 'cover'
              ? 'object-cover'
              : 'object-contain p-2'
          }`}
        />
      ) : (
        /* 2. Completely neutral placeholder when there is no file */
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 bg-[#EDE8E0] dark:bg-[#252321] text-center border border-[var(--line-border)]">
          {!hidePlaceholderText && (
            <>
              {/* Top metadata */}
              <div className="flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-secondary)]">
                <span>{obra.anio || 's/f'}</span>
                <span className="text-[#B07A3B]">{obra.etapa}</span>
              </div>

              {/* Center Title and Technique */}
              <div className="my-auto space-y-1.5 px-2">
                <h4 className="font-serif-display text-lg sm:text-xl text-[var(--text-primary)] leading-tight">
                  {tituloActual}
                </h4>
                {tecnicaActual && tecnicaActual !== '[PENDIENTE]' && (
                  <p className="text-xs text-[var(--text-secondary)] italic">
                    {tecnicaActual}
                  </p>
                )}
                <span className="inline-block mt-2 px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-[#B07A3B] border border-[#B07A3B]/40 bg-white/40 dark:bg-black/20">
                  {idioma === 'es' ? 'Obra sin fotografía de archivo' : 'Artwork without archival photo'}
                </span>
              </div>

              {/* Bottom metadata */}
              <div className="flex items-center justify-between text-[0.65rem] text-[var(--text-secondary)] border-t border-[var(--line-border)] pt-2 font-mono">
                <span className="truncate max-w-[70%]">{obra.coleccion || 'Colección'}</span>
                <span className="text-[#B07A3B]">{obra.id}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* 3. Desktop Hover Overlay (Gallery hover requirement: title, year, medium) */}
      {showHoverOverlay && (
        <div className="hidden md:flex absolute inset-0 z-20 items-end p-5 bg-black/75 section-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-left">
          <div className="space-y-1">
            <p className="font-serif-display text-lg leading-snug text-[#F5F2EC] font-medium">{tituloActual}</p>
            <p className="text-xs text-[#DCD7D0] font-mono">
              {obra.anio}
              {tecnicaActual && tecnicaActual !== '[PENDIENTE]' ? ` · ${tecnicaActual}` : ''}
            </p>
            {obra.coleccion && obra.coleccion !== '[PENDIENTE]' && (
              <p className="text-[0.7rem] text-[#D49B55] truncate">{obra.coleccion}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
