import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import type { BiografiaCapitulo } from '../types';
import biografiaData from '../contenido/biografia.json';
import { Camera } from 'lucide-react';

export const BiografiaSection: React.FC = () => {
  const { idioma } = useSite();
  const capitulos = biografiaData as BiografiaCapitulo[];
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* 1. Header with Portrait (2 columns: photo left, full name & intro right; mobile stacked) */}
      <section className="border-b border-[var(--line-border)] pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Vertical Portrait */}
          <div className="md:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-sm overflow-hidden bg-[#EDE8E0] dark:bg-[#181716] border border-[var(--line-border)] shadow-md flex items-center justify-center">
              {!photoError ? (
                <img
                  src="https://raw.githubusercontent.com/valentinaascarrunz/mlp-imagenes/main/retrato.png"
                  alt="María Luisa Pacheco en su estudio"
                  loading="eager"
                  onError={() => setPhotoError(true)}
                  className="w-full h-auto object-contain select-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <div className="w-full aspect-3/4 flex flex-col items-center justify-center p-6 bg-[#EDE8E0] dark:bg-[#252321] text-center space-y-2">
                  <span className="font-serif text-lg text-[var(--text-primary)]">María Luisa Pacheco</span>
                  <span className="text-xs font-mono text-[#B07A3B]">1919–1982</span>
                  <span className="text-[0.7rem] font-mono text-[var(--text-secondary)]">[PENDIENTE: fotografía de archivo]</span>
                </div>
              )}
            </div>
            {/* Caption underneath */}
            <p className="mt-3 text-[0.72rem] text-[var(--text-secondary)] font-mono leading-relaxed">
              <ParsedText text="[PENDIENTE: descripción, lugar, año] · Foto: [PENDIENTE: crédito]" />
            </p>
          </div>

          {/* Right Column: Full Name, Dates, and Brief Introduction */}
          <div className="md:col-span-7 space-y-5 text-left">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B] block">
              {idioma === 'es' ? 'Semblanza Biográfica Oficial' : 'Official Biographical Profile'}
            </span>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] leading-[1.08]">
              María Luisa Mariaca Dietrich de Pacheco
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#B07A3B]">
              La Paz, 1919 – Nueva York, 1982
            </p>

            <div className="w-12 h-[1px] bg-[#B07A3B]" />

            <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-sans font-light">
              {idioma === 'es'
                ? 'Pionera de la abstracción en Bolivia y una de las figuras clave del arte abstracto latinoamericano del siglo XX. El sitio lo publica su familia (sus herederos) para preservar y difundir su legado y proteger el valor de su obra.'
                : 'Pioneer of abstraction in Bolivia and one of the pivotal figures of 20th-century Latin American abstract art. Published by her family (her heirs) to preserve and disseminate her legacy and protect the value of her work.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Chapters */}
      <div className="space-y-24">
        {capitulos.map((cap) => {
          const tituloActual = idioma === 'en' && cap.titulo_en ? cap.titulo_en : cap.titulo;
          const subtituloActual =
            idioma === 'en' && cap.subtitulo_en ? cap.subtitulo_en : cap.subtitulo;
          const contenidoActual =
            idioma === 'en' && cap.contenido_en ? cap.contenido_en : cap.contenido;

          return (
            <article key={cap.id} className="space-y-8 scroll-mt-24">
              {/* Chapter Title */}
              <div className="border-b border-[var(--line-border)]/60 pb-4">
                <div className="flex items-baseline gap-3 text-[#B07A3B] font-mono text-sm tracking-widest uppercase">
                  <span>Capítulo {cap.numero}</span>
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[var(--text-primary)] mt-1">
                  {tituloActual}
                </h2>
                {subtituloActual && (
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-mono tracking-wide">
                    {subtituloActual}
                  </p>
                )}
              </div>

              {/* Photo space placeholder at the beginning of each chapter */}
              <div className="my-6 p-6 border border-dashed border-[var(--line-border)] bg-white/40 dark:bg-white/5 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-[#B07A3B] shrink-0" />
                  <span>
                    <ParsedText text={`[PENDIENTE: foto de archivo — ${tituloActual}]`} />
                  </span>
                </div>
                <span className="text-[0.7rem] uppercase text-[#B07A3B]">
                  {idioma === 'es' ? 'Espacio para foto de archivo' : 'Archival photo space'}
                </span>
              </div>

              {/* Main Chapter Text */}
              <div className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-sans font-light">
                <ParsedText text={contenidoActual} asParagraphs={true} />
              </div>

              {/* Featured Quotes on light page background separated by fine ochre horizontal line */}
              {cap.citas && cap.citas.length > 0 && (
                <div className="my-10 space-y-8 divide-y divide-[#B07A3B] border-y border-[#B07A3B] py-2">
                  {cap.citas.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="pt-6 first:pt-2 pb-2 space-y-3"
                    >
                      <blockquote className="space-y-3">
                        <p className="font-serif-display text-2xl sm:text-3xl text-[#1E1D1B] leading-relaxed italic">
                          “{c.cita}”
                        </p>
                        {/* English translation in gray #5E5A54 */}
                        <p className="text-xs sm:text-sm text-[#5E5A54] italic font-sans leading-relaxed">
                          “{c.traduccion_en}”
                        </p>
                        <span className="block text-[0.7rem] uppercase tracking-widest text-[#B07A3B] font-mono">
                          — María Luisa Pacheco
                        </span>
                      </blockquote>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
