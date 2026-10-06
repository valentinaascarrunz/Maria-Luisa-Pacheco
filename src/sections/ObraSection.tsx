import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { ArtworkImage } from '../components/ArtworkImage';
import { ParsedText } from '../components/ParsedText';
import type { Obra, MasAllaPinturaItem } from '../types';
import obrasData from '../contenido/obras.json';
import masAllaData from '../contenido/mas_alla_de_la_pintura.json';
import { Filter, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';

export const ObraSection: React.FC = () => {
  const { idioma, setObraSeleccionada, subseccionObra, setSubseccionObra, filtroEtapaObra, setFiltroEtapaObra } = useSite();

  // Filters state
  const [selectedEtapa, setSelectedEtapa] = useState<string>(filtroEtapaObra || 'todas');
  const [selectedDecada, setSelectedDecada] = useState<string>('todas');
  const [selectedTecnica, setSelectedTecnica] = useState<string>('todas');
  const [selectedColeccion, setSelectedColeccion] = useState<string>('todas');

  React.useEffect(() => {
    if (filtroEtapaObra) {
      setSelectedEtapa(filtroEtapaObra);
    }
  }, [filtroEtapaObra]);

  const obras = obrasData as Obra[];
  const masAllaItems = masAllaData as MasAllaPinturaItem[];

  // Etapas definitions with descriptions as requested
  const etapasInfo = [
    {
      id: 'Indigenismo figurativo',
      titulo: 'Indigenismo figurativo',
      titulo_en: 'Figurative Indigenism',
      periodo: 'Fines de los 30 – fines de los 40',
      periodo_en: 'Late 1930s – late 1940s',
      descripcion: 'Retratos, paisajes y figuras indígenas y campesinas.',
      descripcion_en: 'Portraits, landscapes, and indigenous and rural figures.',
    },
    {
      id: 'Cubismo andino',
      titulo: 'Cubismo andino',
      titulo_en: 'Andean Cubism',
      periodo: '1951–1956',
      periodo_en: '1951–1956',
      descripcion: 'La figura y la montaña fragmentadas en planos.',
      descripcion_en: 'The figure and the mountain fractured into geometric planes.',
    },
    {
      id: 'Expresionismo abstracto',
      titulo: 'Expresionismo abstracto',
      titulo_en: 'Abstract Expressionism',
      periodo: '1956 – años 60',
      periodo_en: '1956 – 1960s',
      descripcion: 'Menos color, más textura, óleo grueso con espátula y madera balsa.',
      descripcion_en: 'Reduced color, heightened texture, thick impasto with palette knife and balsa wood.',
    },
    {
      id: 'Materia y paisaje',
      titulo: 'Materia y paisaje',
      titulo_en: 'Matter and Landscape',
      periodo: 'Años 70 – 1982',
      periodo_en: '1970s – 1982',
      descripcion:
        'Arena, papel, madera contrachapada y cartón; ocres, grises y formas como de piedra y mineral.',
      descripcion_en:
        'Sand, paper, plywood, and cardboard; ochres, grays, and stone-like mineral structures.',
    },
  ];

  // Unique techniques for filter
  const tecnicasDisponibles = useMemo(() => {
    const set = new Set<string>();
    obras.forEach((o) => {
      if (o.tecnica && o.tecnica !== '[PENDIENTE]') set.add(o.tecnica);
    });
    return Array.from(set);
  }, [obras]);

  // Unique collections for filter
  const coleccionesDisponibles = useMemo(() => {
    const set = new Set<string>();
    obras.forEach((o) => {
      if (o.coleccion && o.coleccion !== '[PENDIENTE]') set.add(o.coleccion);
    });
    return Array.from(set);
  }, [obras]);

  // Filtered artworks
  const obrasFiltradas = useMemo(() => {
    return obras.filter((o) => {
      if (selectedEtapa !== 'todas' && o.etapa !== selectedEtapa) return false;
      if (selectedDecada !== 'todas' && o.decada !== selectedDecada) return false;
      if (selectedTecnica !== 'todas' && o.tecnica !== selectedTecnica) return false;
      if (selectedColeccion !== 'todas' && o.coleccion !== selectedColeccion) return false;
      return true;
    });
  }, [obras, selectedEtapa, selectedDecada, selectedTecnica, selectedColeccion]);

  const resetFilters = () => {
    setSelectedEtapa('todas');
    setFiltroEtapaObra('todas');
    setSelectedDecada('todas');
    setSelectedTecnica('todas');
    setSelectedColeccion('todas');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header & Sub-navigation */}
      <header className="space-y-6 border-b border-[var(--line-border)] pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
              {idioma === 'es' ? 'Catálogo Razonado y Disciplinas' : 'Catalogue Raisonné & Disciplines'}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              {idioma === 'es' ? 'Obras de María Luisa Pacheco' : 'Works of María Luisa Pacheco'}
            </h1>
          </div>

          {/* Sub-tabs: Catálogo vs Más allá de la pintura */}
          <div className="flex items-center gap-2 border-b-2 border-transparent">
            <button
              onClick={() => setSubseccionObra('catalogo')}
              className={`pb-2 px-3 text-xs md:text-sm uppercase font-mono tracking-widest transition-colors cursor-pointer ${
                subseccionObra === 'catalogo'
                  ? 'text-[#B07A3B] border-b-2 border-[#B07A3B] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {idioma === 'es' ? 'Catálogo de Obras' : 'Works Catalog'}
            </button>
            <span className="text-[var(--text-secondary)] pb-2">/</span>
            <button
              onClick={() => setSubseccionObra('mas-alla')}
              className={`pb-2 px-3 text-xs md:text-sm uppercase font-mono tracking-widest transition-colors cursor-pointer ${
                subseccionObra === 'mas-alla'
                  ? 'text-[#B07A3B] border-b-2 border-[#B07A3B] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {idioma === 'es' ? 'Más allá de la pintura' : 'Beyond Painting'}
            </button>
          </div>
        </div>
      </header>

      {/* SUBSECTION: MÁS ALLÁ DE LA PINTURA */}
      {subseccionObra === 'mas-alla' ? (
        <section className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif-display text-3xl md:text-4xl text-[var(--text-primary)]">
              {idioma === 'es' ? 'Más allá de la pintura' : 'Beyond Painting'}
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              {idioma === 'es'
                ? 'La trayectoria de María Luisa Pacheco abarcó también la ilustración periodística y literaria, el diseño textil en Nueva York y la experimentación escultórica tridimensional previa a su partida a Europa.'
                : 'María Luisa Pacheco’s career also encompassed journalistic and literary illustration, textile pattern design in New York, and three-dimensional sculptural experimentation prior to her departure for Europe.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {masAllaItems.map((item) => (
              <div
                key={item.id}
                className="section-dark border border-[var(--line-border)] p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B07A3B] tracking-wider uppercase">
                    <span>{idioma === 'en' ? item.periodo_en : item.periodo}</span>
                    <span className="text-[0.68rem] text-[#C9C4BC]">
                      {idioma === 'en' ? item.disciplina_en : item.disciplina}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl text-[#B07A3B]">
                    {idioma === 'en' ? item.titulo_en : item.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C9C4BC] leading-relaxed">
                    {idioma === 'en' ? item.descripcion_en : item.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line-border)] flex items-center justify-between">
                  <span className="text-xs">
                    <ParsedText text={item.marcador} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* SUBSECTION: CATÁLOGO DE PINTURA */
        <section className="space-y-12">
          {/* Etapas introduction cards as requested */}
          <div className="space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B07A3B]">
              {idioma === 'es' ? 'Evolución formal por etapas' : 'Formal evolution across stages'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {etapasInfo.map((et) => {
                const isSelected = selectedEtapa === et.id;
                return (
                  <button
                    key={et.id}
                    onClick={() => setSelectedEtapa(isSelected ? 'todas' : et.id)}
                    className={`text-left p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#B07A3B] bg-[#B07A3B]/10 shadow-sm'
                        : 'border-[var(--line-border)] bg-[var(--bg-primary)] hover:border-[#B07A3B]/60'
                    }`}
                  >
                    <span className="text-[0.7rem] font-mono uppercase text-[#B07A3B] block mb-1">
                      {idioma === 'en' ? et.periodo_en : et.periodo}
                    </span>
                    <h3 className="font-serif-display text-xl text-[var(--text-primary)]">
                      {idioma === 'en' ? et.titulo_en : et.titulo}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                      {idioma === 'en' ? et.descripcion_en : et.descripcion}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive filter controls */}
          <div className="section-dark border border-[var(--line-border)] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F5F2EC]">
                <SlidersHorizontal size={15} className="text-[#B07A3B]" />
                <span className="text-[#F5F2EC]">{idioma === 'es' ? 'Filtrar catálogo' : 'Filter catalog'}</span>
                <span className="text-[#F5F2EC]">({obrasFiltradas.length} {idioma === 'es' ? 'obras' : 'works'})</span>
              </div>

              {(selectedEtapa !== 'todas' ||
                selectedDecada !== 'todas' ||
                selectedTecnica !== 'todas' ||
                selectedColeccion !== 'todas') && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono text-[#B07A3B] hover:underline cursor-pointer"
                >
                  {idioma === 'es' ? 'Restablecer filtros' : 'Reset filters'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Etapa Select */}
              <div>
                <label className="block text-[0.7rem] uppercase font-mono text-[#C9C4BC] mb-1">
                  {idioma === 'es' ? 'Etapa' : 'Stage'}
                </label>
                <select
                  value={selectedEtapa}
                  onChange={(e) => setSelectedEtapa(e.target.value)}
                  className="w-full bg-[#1E1D1B] border border-[#8A8580] p-2 text-xs text-[#F5F2EC] focus:outline-none focus:border-[#B07A3B]"
                >
                  <option value="todas">{idioma === 'es' ? 'Todas las etapas' : 'All stages'}</option>
                  {etapasInfo.map((et) => (
                    <option key={et.id} value={et.id}>
                      {idioma === 'en' ? et.titulo_en : et.titulo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Década Select */}
              <div>
                <label className="block text-[0.7rem] uppercase font-mono text-[#C9C4BC] mb-1">
                  {idioma === 'es' ? 'Década' : 'Decade'}
                </label>
                <select
                  value={selectedDecada}
                  onChange={(e) => setSelectedDecada(e.target.value)}
                  className="w-full bg-[#1E1D1B] border border-[#8A8580] p-2 text-xs text-[#F5F2EC] focus:outline-none focus:border-[#B07A3B]"
                >
                  <option value="todas">{idioma === 'es' ? 'Todas las décadas' : 'All decades'}</option>
                  <option value="1940">1940s</option>
                  <option value="1950">1950s</option>
                  <option value="1960">1960s</option>
                  <option value="1970">1970s</option>
                </select>
              </div>

              {/* Técnica Select */}
              <div>
                <label className="block text-[0.7rem] uppercase font-mono text-[#C9C4BC] mb-1">
                  {idioma === 'es' ? 'Técnica' : 'Medium'}
                </label>
                <select
                  value={selectedTecnica}
                  onChange={(e) => setSelectedTecnica(e.target.value)}
                  className="w-full bg-[#1E1D1B] border border-[#8A8580] p-2 text-xs text-[#F5F2EC] focus:outline-none focus:border-[#B07A3B]"
                >
                  <option value="todas">{idioma === 'es' ? 'Todas las técnicas' : 'All mediums'}</option>
                  {tecnicasDisponibles.map((tec) => (
                    <option key={tec} value={tec}>
                      {tec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Colección Select */}
              <div>
                <label className="block text-[0.7rem] uppercase font-mono text-[#C9C4BC] mb-1">
                  {idioma === 'es' ? 'Colección' : 'Collection'}
                </label>
                <select
                  value={selectedColeccion}
                  onChange={(e) => setSelectedColeccion(e.target.value)}
                  className="w-full bg-[#1E1D1B] border border-[#8A8580] p-2 text-xs text-[#F5F2EC] focus:outline-none focus:border-[#B07A3B]"
                >
                  <option value="todas">{idioma === 'es' ? 'Todas las colecciones' : 'All collections'}</option>
                  {coleccionesDisponibles.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Masonry / Grid Gallery */}
          {obrasFiltradas.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-[#EDE8E0] dark:bg-[#252321] border border-[var(--line-border)]">
              <p className="font-serif text-2xl text-[var(--text-primary)]">
                {idioma === 'es' ? 'No se encontraron obras con los filtros seleccionados' : 'No works match selected filters'}
              </p>
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-[#B07A3B] underline cursor-pointer"
              >
                {idioma === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {obrasFiltradas.map((obra) => {
                const tituloActual = idioma === 'en' && obra.titulo_en ? obra.titulo_en : obra.titulo;
                const tecnicaActual = idioma === 'en' && obra.tecnica_en ? obra.tecnica_en : obra.tecnica;

                return (
                  <div
                    key={obra.id}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => setObraSeleccionada(obra)}
                  >
                    {/* Artwork image with hover overlay */}
                    <ArtworkImage
                      obra={obra}
                      aspectRatio="aspect-4/3"
                      className="w-full border border-[var(--line-border)]"
                      showHoverOverlay={true}
                    />

                    {/* Mobile & Accessible caption under the card */}
                    <div className="pt-3 pb-1 space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-lg text-[var(--text-primary)] group-hover:text-[#B07A3B] transition-colors leading-tight">
                          <ParsedText text={tituloActual} />
                        </h4>
                        <span className="text-xs font-mono text-[var(--text-secondary)] shrink-0">
                          <ParsedText text={obra.anio} />
                        </span>
                      </div>

                      <div className="text-xs text-[var(--text-secondary)] truncate">
                        {tecnicaActual && tecnicaActual !== '[PENDIENTE]' && (
                          <ParsedText text={tecnicaActual} />
                        )}
                        {obra.medidas && obra.medidas !== '[PENDIENTE]' && (
                          <span> · {obra.medidas}</span>
                        )}
                      </div>

                      {obra.marcador && (
                        <div className="pt-1">
                          <ParsedText text={obra.marcador} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
