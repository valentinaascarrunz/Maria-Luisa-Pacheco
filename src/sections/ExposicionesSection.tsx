import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import type { ExposicionesData } from '../types';
import exposicionesDataRaw from '../contenido/exposiciones.json';
import { FileText, MapPin, Building2 } from 'lucide-react';

export const ExposicionesSection: React.FC = () => {
  const { idioma } = useSite();
  const exposicionesData = exposicionesDataRaw as ExposicionesData;
  const [tab, setTab] = useState<'en_vida' | 'postumas'>('en_vida');

  const enVidaLista = exposicionesData.en_vida || [];
  const postumasLista = exposicionesData.postumas || [];
  const listaActual = tab === 'en_vida' ? enVidaLista : postumasLista;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Historial de Exhibiciones' : 'Exhibition History'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Exposiciones' : 'Exhibitions'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Registro cronológico de exposiciones individuales, colectivas, salones y bienales, dividido en muestras realizadas en vida y retrospectivas póstumas.'
            : 'Chronological record of solo and group exhibitions, salons, and biennials, divided into lifetime presentations and posthumous retrospectives.'}
        </p>

        {/* Tab switcher: En vida vs Póstumas */}
        <div className="flex items-center gap-6 pt-6">
          <button
            onClick={() => setTab('en_vida')}
            className={`pb-2 text-sm sm:text-base uppercase font-mono tracking-widest transition-colors cursor-pointer ${
              tab === 'en_vida'
                ? 'text-[#B07A3B] border-b-2 border-[#B07A3B] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {idioma === 'es' ? 'Exposiciones en vida' : 'Lifetime Exhibitions'}{' '}
            <span className="text-xs font-normal">({enVidaLista.length})</span>
          </button>

          <button
            onClick={() => setTab('postumas')}
            className={`pb-2 text-sm sm:text-base uppercase font-mono tracking-widest transition-colors cursor-pointer ${
              tab === 'postumas'
                ? 'text-[#B07A3B] border-b-2 border-[#B07A3B] font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {idioma === 'es' ? 'Exposiciones póstumas' : 'Posthumous Exhibitions'}{' '}
            <span className="text-xs font-normal">({postumasLista.length})</span>
          </button>
        </div>
      </header>

      {/* Exhibitions List */}
      <div className="space-y-6">
        {listaActual.map((exp) => {
          const tituloActual = idioma === 'en' && exp.titulo_en ? exp.titulo_en : exp.titulo;
          const sedeActual = idioma === 'en' && exp.sede_en ? exp.sede_en : exp.sede;
          const ciudadActual = idioma === 'en' && exp.ciudad_en ? exp.ciudad_en : exp.ciudad;
          const tipoActual = idioma === 'en' && exp.tipo_en ? exp.tipo_en : exp.tipo;

          return (
            <div
              key={exp.id}
              className="p-6 section-dark border border-[var(--line-border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:border-[#B07A3B]/60"
            >
              {/* Left Details */}
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-base font-serif font-bold text-[#B07A3B]">{exp.anio}</span>
                  <span className="text-[#C9C4BC]">·</span>
                  <span className="text-[#C9C4BC] uppercase">{tipoActual}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EC] leading-snug">
                  <ParsedText text={tituloActual} />
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#C9C4BC] pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#B07A3B] shrink-0" />
                    <ParsedText text={sedeActual} />
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#B07A3B] shrink-0" />
                    <ParsedText text={ciudadActual} />
                  </span>
                </div>
              </div>

              {/* Right: PDF Catalog space */}
              <div className="shrink-0 flex items-center md:justify-end">
                {exp.catalogo_pdf ? (
                  <a
                    href={exp.catalogo_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#B07A3B] text-white hover:bg-[#B07A3B]/90 transition-colors"
                  >
                    <FileText size={14} />
                    <span>{idioma === 'es' ? 'Descargar Catálogo (PDF)' : 'Download Catalog (PDF)'}</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1 text-xs font-mono text-[#C9C4BC]">
                    <FileText size={14} />
                    <ParsedText text={exp.catalogo_marcador} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Pending notice in "En vida" as requested */}
        {tab === 'en_vida' && (
          <div className="p-5 border border-dashed border-amber-400/60 bg-amber-500/5 text-xs font-mono text-[var(--text-primary)] flex items-center justify-between">
            <ParsedText text="[PENDIENTE: otras exposiciones 1956–1982]" />
            <span className="text-[0.7rem] text-[var(--text-secondary)] uppercase">
              {idioma === 'es' ? 'Archivo en catalogación' : 'Archive in cataloging'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
