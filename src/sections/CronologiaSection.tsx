import React from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import type { PeriodoCronologia, FotoCronologia } from '../types';
import cronologiaData from '../contenido/cronologia.json';

export const CronologiaSection: React.FC = () => {
  const { idioma, abrirLightboxFoto } = useSite();
  const periodos = cronologiaData as PeriodoCronologia[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* Section Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Línea de Tiempo y Documentos' : 'Timeline and Archival Documents'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Cronología por períodos' : 'Chronology by Periods'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Inspirada en el modelo cronológico institucional de la Fundación Gego. Un recorrido documentado a través de los hitos vitales, creativos e históricos de María Luisa Pacheco, acompañado de fotografías de archivo.'
            : 'Inspired by the institutional chronological framework of Fundación Gego. A documented journey through the vital, creative, and historical milestones of María Luisa Pacheco, accompanied by archival period photographs.'}
        </p>
      </header>

      {/* Periods list */}
      <div className="space-y-24">
        {periodos.map((periodo) => {
          const rangoActual =
            idioma === 'en' && periodo.rango_en ? periodo.rango_en : periodo.rango;
          const tituloActual =
            idioma === 'en' && periodo.titulo_en ? periodo.titulo_en : periodo.titulo;
          const textoActual =
            idioma === 'en' && periodo.texto_en ? periodo.texto_en : periodo.texto;

          return (
            <article
              key={periodo.id}
              className="border-b border-[var(--line-border)] pb-24 last:border-b-0 last:pb-0"
            >
              {/* Connected period timeline with 2px vertical ochre line on the left */}
              <div className="relative pl-4 sm:pl-8 space-y-4">
                {/* Continuous 2px ochre vertical line that runs along both blocks */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B07A3B]"
                  aria-hidden="true"
                />

                {/* 1) Bloque "Período histórico": año grande, subtítulo, párrafo e hitos clave */}
                <div className="section-dark border border-[var(--line-border)] p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <span className="text-xs font-mono tracking-widest uppercase text-[#B07A3B] block">
                      {idioma === 'es' ? 'Período histórico' : 'Historical period'}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-white/10 pb-4">
                      <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-[#F5F2EC] font-light tracking-tight">
                        {rangoActual}
                      </h2>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#C9C4BC] italic">
                        {tituloActual}
                      </h3>
                    </div>
                  </div>

                  <div className="text-base sm:text-lg text-[#F5F2EC] font-sans font-light leading-relaxed">
                    <ParsedText text={textoActual} asParagraphs={true} />
                  </div>

                  {/* Milestones list with crisp contrast */}
                  {periodo.hitos && periodo.hitos.length > 0 && (
                    <div className="pt-4 border-t border-[var(--line-border)] space-y-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#B07A3B] block">
                        {idioma === 'es' ? 'Hitos clave del período:' : 'Key period milestones:'}
                      </span>
                      <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
                        {periodo.hitos.map((hito, hIdx) => {
                          const hitoTexto =
                            idioma === 'en' && hito.texto_en ? hito.texto_en : hito.texto;
                          return (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span className="font-mono text-xs text-[#B07A3B] font-semibold shrink-0 pt-0.5">
                                {hito.anio} —
                              </span>
                              <span className="text-[#F5F2EC] leading-normal">
                                <ParsedText text={hitoTexto} />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 2) Bloque "Fotografías y testimonios de época": las fotos de ese período */}
                {periodo.fotos && periodo.fotos.length > 0 && (
                  <div className="section-dark border border-[var(--line-border)] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1">
                      {/* Small ochre tag with year range repeating above */}
                      <span className="text-xs font-mono uppercase tracking-widest text-[#B07A3B] block">
                        {rangoActual} · {idioma === 'es' ? 'Fotografías y testimonios de época' : 'Photographs and archival documents'}
                      </span>
                      <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F5F2EC]">
                        {idioma === 'es'
                          ? 'Fotografías y testimonios de época'
                          : 'Photographs and archival documents'}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                      {periodo.fotos.map((foto) => (
                        <PhotoCard
                          key={foto.id}
                          foto={foto}
                          periodoFotos={periodo.fotos}
                          onOpen={() => abrirLightboxFoto(foto, periodo.fotos)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

interface PhotoCardProps {
  foto: FotoCronologia;
  periodoFotos: FotoCronologia[];
  onOpen: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ foto, onOpen }) => {
  const { idioma } = useSite();
  const descActual =
    idioma === 'en' && foto.descripcion_en ? foto.descripcion_en : foto.descripcion;
  const lugarActual =
    idioma === 'en' && foto.lugar_en ? foto.lugar_en : foto.lugar;
  const creditoActual =
    idioma === 'en' && foto.credito_en ? foto.credito_en : foto.credito;

  return (
    <div
      onClick={onOpen}
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
      className="group flex flex-col cursor-pointer protected-artwork select-none"
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#EDE8E0] dark:bg-[#1E1D1B] border border-[var(--line-border)] flex items-center justify-center">
        <img
          src={foto.imagen}
          alt={descActual}
          loading="lazy"
          className="h-full w-full object-contain p-1.5"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const placeholder = document.createElement('div');
              placeholder.className =
                'h-full w-full flex flex-col justify-between p-4 bg-[#EDE8E0] dark:bg-[#252321] text-left';
              placeholder.innerHTML = `
                <span class="text-[0.65rem] font-mono uppercase text-[#B07A3B] tracking-wider">Archivo · ${foto.fecha}</span>
                <p class="font-serif text-sm text-[var(--text-primary)] line-clamp-3 leading-snug">${descActual}</p>
                <span class="text-[0.6rem] font-mono text-[var(--text-secondary)] truncate">${foto.lugar}</span>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />

        {/* Desktop Hover Overlay with 300ms opacity and 8px upward shift */}
        <div className="hidden md:flex absolute inset-0 z-10 flex-col justify-end p-5 bg-black/80 section-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
            <p className="font-serif text-sm leading-snug text-[#F5F2EC] font-medium line-clamp-2">
              <ParsedText text={descActual} />
            </p>
            <div className="text-[0.7rem] text-[#DCD7D0] flex items-center gap-2">
              <span><ParsedText text={lugarActual} /></span>
              <span>·</span>
              <span className="text-[#D49B55] font-mono"><ParsedText text={foto.fecha} /></span>
            </div>
            {creditoActual && (
              <p className="text-[0.65rem] text-[#D49B55] italic pt-1">
                Foto: <ParsedText text={creditoActual} />
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only visible caption beneath photo */}
      <div className="md:hidden pt-2.5 pb-1 space-y-0.5 text-xs text-[var(--text-secondary)]">
        <p className="font-serif text-sm text-[var(--text-primary)] leading-tight">
          <ParsedText text={descActual} />
        </p>
        <p className="text-[0.7rem]">
          <ParsedText text={lugarActual} /> · <ParsedText text={foto.fecha} />
        </p>
        {creditoActual && (
          <p className="text-[0.65rem] text-[#B07A3B] italic">
            Foto: <ParsedText text={creditoActual} />
          </p>
        )}
      </div>
    </div>
  );
};
