import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import type { ArchivoData } from '../types';
import archivoDataRaw from '../contenido/archivo.json';
import { ExternalLink, BookOpen, Archive, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export const ArchivoSection: React.FC = () => {
  const { idioma } = useSite();
  const archivo = archivoDataRaw as ArchivoData;
  const [enlaceActivo, setEnlaceActivo] = useState<number | null>(null);
  const [categoriaEnlace, setCategoriaEnlace] = useState<string>('todos');

  const enlacesFiltrados = archivo.enlaces_en_linea.filter((enlace) => {
    if (categoriaEnlace === 'todos') return true;
    const text = (enlace.titulo + ' ' + (enlace.titulo_en || '')).toLowerCase();
    if (categoriaEnlace === 'museos') {
      return text.includes('museum') || text.includes('smithsonian') || text.includes('arts & culture') || text.includes('blanton') || text.includes('davis');
    }
    if (categoriaEnlace === 'prensa') {
      return text.includes('artnet') || text.includes('prensa') || text.includes('subastas') || text.includes('auction');
    }
    if (categoriaEnlace === 'recursos') {
      return text.includes('artsy') || text.includes('project') || text.includes('artnet') || text.includes('google');
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Fondo Documental y Fuentes' : 'Archival Holdings and Sources'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Archivo y Bibliografía' : 'Archive & Bibliography'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Documentación oficial, correspondencia histórica, acervo fotográfico y literatura crítica sobre la vida y obra de María Luisa Pacheco.'
            : 'Official documentation, historical correspondence, photographic holdings, and critical scholarship on the life and work of María Luisa Pacheco.'}
        </p>
      </header>

      {/* 1. Fondo Documental del Smithsonian */}
      <section className="section-dark border border-[var(--line-border)] p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#D49B55]">
          <Archive size={16} />
          <span>{idioma === 'es' ? 'Fondo Documental Principal' : 'Primary Archival Collection'}</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F5F2EC]">
            {idioma === 'en' ? archivo.fondo_documental.titulo_en : archivo.fondo_documental.titulo}
          </h2>
          <p className="text-sm font-mono text-[#D49B55]">
            {idioma === 'en'
              ? archivo.fondo_documental.institucion_en
              : archivo.fondo_documental.institucion}
          </p>
          <p className="text-xs text-[#A39E97]">
            {idioma === 'en'
              ? archivo.fondo_documental.donacion_en
              : archivo.fondo_documental.donacion}
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#DCD7D0] leading-relaxed max-w-3xl">
          {idioma === 'en'
            ? archivo.fondo_documental.descripcion_en
            : archivo.fondo_documental.descripcion}
        </p>

        <div className="pt-2">
          <a
            href={archivo.fondo_documental.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B07A3B] hover:bg-[#B07A3B]/90 text-white text-xs font-mono tracking-wider uppercase transition-colors"
          >
            <span>{idioma === 'es' ? 'Consultar Fondo en el Smithsonian' : 'Explore Smithsonian Collection'}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* 2. Archivo Fotográfico */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B07A3B]">
          <ImageIcon size={16} />
          <span>{idioma === 'es' ? 'Archivo Fotográfico' : 'Photographic Archive'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {archivo.fotografias_archivo.map((foto) => (
            <div
              key={foto.id}
              className="bg-white dark:bg-[#252321] border border-[var(--line-border)] shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                className="relative aspect-4/3 section-dark flex items-center justify-center p-6 text-center protected-artwork select-none"
              >
                {/* Image or Smithsonian placeholder */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D49B55]">
                    {idioma === 'es' ? 'Fotografía Histórica' : 'Historical Photograph'}
                  </span>
                  <p className="font-serif text-xl text-[#F5F2EC] max-w-sm">
                    {idioma === 'en' ? foto.titulo_en : foto.titulo}
                  </p>
                  <span className="text-xs font-mono text-[#C9C4BC]">{foto.fuente}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg text-[var(--text-primary)]">
                  <ParsedText text={idioma === 'en' ? foto.titulo_en : foto.titulo} />
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  <ParsedText text={idioma === 'en' ? foto.fuente_en : foto.fuente} />
                </p>

                {foto.enlace && (
                  <a
                    href={foto.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#B07A3B] hover:underline font-mono pt-1"
                  >
                    <span>{idioma === 'es' ? 'Ver registro en Smithsonian AAA' : 'View Smithsonian AAA record'}</span>
                    <ExternalLink size={12} />
                  </a>
                )}

                {foto.marcador && (
                  <div className="pt-2">
                    <ParsedText text={foto.marcador} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bibliografía */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B07A3B]">
          <BookOpen size={16} />
          <span>{idioma === 'es' ? 'Bibliografía Esencial' : 'Selected Bibliography'}</span>
        </div>

        <div className="divide-y divide-[var(--line-border)] border-y border-[var(--line-border)]">
          {archivo.bibliografia.map((bib, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm">
              <div className="space-y-0.5">
                <span className="font-medium text-[var(--text-primary)]">{bib.autor}. </span>
                <span className="italic text-[var(--text-primary)]">“{bib.titulo}”. </span>
                <span className="text-[var(--text-secondary)]">{bib.publicacion}.</span>
              </div>
              <span className="text-xs font-mono text-[#B07A3B] shrink-0 uppercase tracking-wider">
                {bib.tipo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Prensa, Museos y Recursos en Línea */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line-border)] pb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B07A3B]">
            <LinkIcon size={16} />
            <span>{idioma === 'es' ? 'Prensa, Museos y Recursos en Línea' : 'Press, Museums, and Online Resources'}</span>
          </div>

          {/* Filter tabs: Prensa, Museos, Recursos en línea */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            {[
              { id: 'todos', label_es: 'Todos', label_en: 'All' },
              { id: 'prensa', label_es: 'Prensa', label_en: 'Press' },
              { id: 'museos', label_es: 'Museos', label_en: 'Museums' },
              { id: 'recursos', label_es: 'Recursos en línea', label_en: 'Online Resources' },
            ].map((cat) => {
              const isActive = categoriaEnlace === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaEnlace(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B07A3B] text-[#F5F2EC] border border-[#B07A3B] font-semibold shadow-xs'
                      : 'text-[#F5F2EC] border border-[#C9C4BC] hover:border-[#B07A3B]'
                  }`}
                >
                  {idioma === 'en' ? cat.label_en : cat.label_es}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enlacesFiltrados.map((enlace, idx) => {
            const titActual = idioma === 'en' && enlace.titulo_en ? enlace.titulo_en : enlace.titulo;
            const detActual = idioma === 'en' && enlace.detalle_en ? enlace.detalle_en : enlace.detalle;
            const isSelected = enlaceActivo === idx;

            return (
              <a
                key={idx}
                href={enlace.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEnlaceActivo(idx)}
                className={`group p-5 section-dark border transition-all flex flex-col justify-between space-y-3 shadow-xs ${
                  isSelected ? 'border-[#B07A3B]' : 'border-[var(--line-border)] hover:border-[#B07A3B]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className={`font-serif text-lg leading-snug transition-colors ${
                        isSelected ? 'text-[#B07A3B]' : 'text-[#F5F2EC] group-hover:text-[#B07A3B]'
                      }`}
                    >
                      {titActual}
                    </h4>
                    <ExternalLink
                      size={14}
                      className={`shrink-0 mt-1 transition-colors ${
                        isSelected ? 'text-[#B07A3B]' : 'text-[#C9C4BC] group-hover:text-[#B07A3B]'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#C9C4BC] mt-1.5 leading-relaxed">
                    {detActual}
                  </p>
                </div>
                <span className="text-[0.68rem] font-mono text-[#B07A3B] truncate block">
                  {enlace.url.replace('https://', '')}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
