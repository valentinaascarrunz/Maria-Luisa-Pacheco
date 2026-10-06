import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import type { ColeccionItem } from '../types';
import coleccionesData from '../contenido/colecciones.json';
import { Building, MapPin, Compass } from 'lucide-react';

export const ColeccionesSection: React.FC = () => {
  const { idioma } = useSite();
  const colecciones = coleccionesData as ColeccionItem[];
  const [selectedMuseumId, setSelectedMuseumId] = useState<string | null>(null);
  const [highlightedMuseumId, setHighlightedMuseumId] = useState<string | null>(null);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const highlightTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handlePointClick = (id: string) => {
    setSelectedMuseumId(id);
    setHighlightedMuseumId(id);
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedMuseumId(null);
    }, 2000);

    const elem = document.getElementById(`museum-card-${id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Geographic points for visual map
  // Mapping coordinates into relative SVG positions across the Americas
  const mapPoints = [
    { id: 'ama-oea', label: 'Washington, D.C.', museo: 'Art Museum of the Americas (OEA)', ciudad: 'Washington, D.C.', pais: 'EE. UU.', x: 72, y: 35 },
    { id: 'bid-washington', label: 'Washington, D.C. (BID)', museo: 'Banco Interamericano de Desarrollo', ciudad: 'Washington, D.C.', pais: 'EE. UU.', x: 70, y: 38 },
    { id: 'guggenheim-ny', label: 'New York', museo: 'Solomon R. Guggenheim Museum', ciudad: 'Nueva York', pais: 'EE. UU.', x: 75, y: 31 },
    { id: 'davis-wellesley', label: 'Wellesley, MA', museo: 'Davis Museum, Wellesley College', ciudad: 'Wellesley, MA', pais: 'EE. UU.', x: 78, y: 28 },
    { id: 'blanton-austin', label: 'Austin, TX', museo: 'Blanton Museum of Art', ciudad: 'Austin, TX', pais: 'EE. UU.', x: 55, y: 44 },
    { id: 'banco-republica-bogota', label: 'Bogotá', museo: 'Colección de Arte del Banco de la República', ciudad: 'Bogotá', pais: 'Colombia', x: 67, y: 62 },
    { id: 'mna-lapaz', label: 'La Paz', museo: 'Museo Nacional de Arte', ciudad: 'La Paz', pais: 'Bolivia', x: 65, y: 76 },
    { id: 'mssa-santiago', label: 'Santiago', museo: 'Museo de la Solidaridad Salvador Allende', ciudad: 'Santiago', pais: 'Chile', x: 63, y: 88 },
  ];

  const hoveredPoint = mapPoints.find((pt) => pt.id === hoveredPointId);
  const hoveredMuseum = hoveredPoint ? colecciones.find((col) => col.id === hoveredPoint.id) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Presencia Institucional Global' : 'Global Institutional Presence'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Colecciones públicas y museos' : 'Public & Museum Collections'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Las obras de María Luisa Pacheco forman parte del patrimonio de museos e instituciones culturales clave en los Estados Unidos y América Latina.'
            : 'María Luisa Pacheco’s works are conserved within pivotal museum collections and cultural institutions throughout the United States and Latin America.'}
        </p>
      </header>

      {/* Interactive Cartographic Map Component */}
      <div className="section-dark border border-[var(--line-border)] p-6 sm:p-10 relative overflow-hidden">
        {/* Header above map */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-6 pb-4 border-b border-white/10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#B07A3B] mb-1">
              <Compass size={15} />
              <span>{idioma === 'es' ? 'Presencia en colecciones públicas' : 'Public Collections Presence'}</span>
            </div>
            {/* Title above map in BLANCO */}
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F5F2EC]">
              {idioma === 'es' ? 'Su obra en el mundo' : 'Her Work Across the World'}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#C9C4BC]">
            {idioma === 'es' ? 'Haga clic en un punto para enfocar el museo' : 'Click any node to focus museum'}
          </span>
        </div>

        {/* Stylized SVG Map of the Americas - Full section width, 460px on desktop, 280px on mobile */}
        <div className="relative w-full h-[280px] md:h-[460px] section-dark rounded overflow-hidden flex items-center justify-center p-2 sm:p-4">
          {/* Tooltip on hover */}
          {hoveredPoint && (
            <div
              className="absolute z-30 pointer-events-none px-3.5 py-2.5 bg-[#1E1D1B] border border-[#B07A3B] shadow-2xl text-left transform -translate-x-1/2 -translate-y-full transition-all duration-150 rounded-[2px]"
              style={{
                left: `${hoveredPoint.x}%`,
                top: `max(16px, calc(${hoveredPoint.y}% - 14px))`,
              }}
            >
              <p className="font-serif text-base text-[#F5F2EC] font-medium leading-tight">
                {hoveredMuseum ? (idioma === 'en' ? hoveredMuseum.nombre_en : hoveredMuseum.nombre) : hoveredPoint.museo}
              </p>
              <p className="text-xs font-mono text-[#D9A867] mt-0.5">
                {hoveredMuseum ? `${hoveredMuseum.ciudad}, ${idioma === 'en' ? hoveredMuseum.pais_en : hoveredMuseum.pais}` : `${hoveredPoint.ciudad}, ${hoveredPoint.pais}`}
              </p>
            </div>
          )}

          <svg
            viewBox="0 0 100 100"
            className="w-full h-full opacity-95 select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Stylized continental geometric land contours */}
            {/* North America subtle shape */}
            <path
              d="M 25 15 L 45 10 L 75 18 L 85 30 L 70 48 L 52 48 L 48 35 L 35 32 Z"
              fill="#272523"
              stroke="#383532"
              strokeWidth="0.5"
            />
            {/* Central America connection */}
            <path
              d="M 52 48 L 58 55 L 63 58 L 60 62 L 54 52 Z"
              fill="#272523"
              stroke="#383532"
              strokeWidth="0.5"
            />
            {/* South America shape */}
            <path
              d="M 60 58 L 78 62 L 82 72 L 72 88 L 64 94 L 58 84 L 56 68 Z"
              fill="#272523"
              stroke="#383532"
              strokeWidth="0.5"
            />

            {/* Andes backbone line */}
            <path
              d="M 58 60 Q 64 74 62 90"
              fill="none"
              stroke="#B07A3B"
              strokeWidth="0.6"
              strokeDasharray="1,1"
              opacity="0.4"
            />

            {/* Map nodes */}
            {mapPoints.map((pt) => {
              const isSelected = selectedMuseumId === pt.id;
              const isHighlighted = highlightedMuseumId === pt.id;
              const isHovered = hoveredPointId === pt.id;

              return (
                <g
                  key={pt.id}
                  onClick={() => handlePointClick(pt.id)}
                  onMouseEnter={() => setHoveredPointId(pt.id)}
                  onMouseLeave={() => setHoveredPointId(null)}
                  className="cursor-pointer"
                >
                  {/* Soft pulsing ochre halo respecting prefers-reduced-motion */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected || isHighlighted || isHovered ? 7.5 : 5.5}
                    fill="none"
                    stroke="#B07A3B"
                    strokeWidth="0.8"
                    className="map-halo-pulse"
                    opacity={isSelected || isHighlighted || isHovered ? 0.9 : 0.5}
                  />

                  {/* Main ochre point */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected || isHighlighted || isHovered ? 3.6 : 2.6}
                    fill="#B07A3B"
                    stroke="#F5F2EC"
                    strokeWidth={isSelected || isHighlighted || isHovered ? 0.6 : 0.3}
                  />

                  {/* Node label */}
                  <text
                    x={pt.x + 3.2}
                    y={pt.y + 0.8}
                    fill={isSelected || isHighlighted || isHovered ? '#F5F2EC' : '#C9C4BC'}
                    fontSize="2.4"
                    fontFamily="Inter, sans-serif"
                    fontWeight={isSelected || isHighlighted || isHovered ? 'bold' : 'normal'}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Row below map: collections count by country in GRIS CLARO */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#C9C4BC]">
          <span className="uppercase tracking-wider text-[0.7rem] text-[#B07A3B]">
            {idioma === 'es' ? 'Colecciones públicas por país:' : 'Public collections by country:'}
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[#C9C4BC]">
              <strong className="text-[#F5F2EC] font-semibold">{idioma === 'es' ? 'EE. UU.' : 'United States'}:</strong> 5 {idioma === 'es' ? 'colecciones' : 'collections'}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-[#C9C4BC]">
              <strong className="text-[#F5F2EC] font-semibold">Chile:</strong> 1 {idioma === 'es' ? 'colección' : 'collection'}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-[#C9C4BC]">
              <strong className="text-[#F5F2EC] font-semibold">Colombia:</strong> 1 {idioma === 'es' ? 'colección' : 'collection'}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-[#C9C4BC]">
              <strong className="text-[#F5F2EC] font-semibold">Bolivia:</strong> 1 {idioma === 'es' ? 'colección' : 'collection'}
            </span>
          </div>
        </div>
      </div>

      {/* Museum Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colecciones.map((col) => {
          const isSelected = selectedMuseumId === col.id;
          const isHighlighted = highlightedMuseumId === col.id;
          const nombreActual = idioma === 'en' && col.nombre_en ? col.nombre_en : col.nombre;
          const paisActual = idioma === 'en' && col.pais_en ? col.pais_en : col.pais;
          const descActual =
            idioma === 'en' && col.descripcion_en ? col.descripcion_en : col.descripcion;
          const obrasActual =
            idioma === 'en' && col.obras_destacadas_en
              ? col.obras_destacadas_en
              : col.obras_destacadas;

          return (
            <div
              key={col.id}
              id={`museum-card-${col.id}`}
              onClick={() => setSelectedMuseumId(col.id)}
              className={`p-6 sm:p-8 section-dark border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer shadow-xs ${
                isHighlighted
                  ? 'border-[#B07A3B] ring-2 ring-[#B07A3B] shadow-[0_0_25px_rgba(176,122,59,0.5)]'
                  : isSelected
                  ? 'border-[#B07A3B] ring-1 ring-[#B07A3B]'
                  : 'border-[var(--line-border)] hover:border-[#B07A3B]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 text-[#B07A3B]">
                    <MapPin size={13} />
                    <ParsedText text={`${col.ciudad}, ${paisActual}`} />
                  </span>
                  {col.marcador && (
                    <span className="text-[0.68rem]">
                      <ParsedText text={col.marcador} />
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[#F5F2EC] leading-snug">
                  <ParsedText text={nombreActual} />
                </h3>

                <p className="text-xs sm:text-sm text-[#C9C4BC] leading-relaxed">
                  <ParsedText text={descActual} />
                </p>
              </div>

              {/* Works held */}
              {obrasActual && obrasActual.length > 0 && (
                <div className="pt-4 border-t border-[var(--line-border)] space-y-1">
                  <span className="text-[0.68rem] uppercase font-mono tracking-wider text-[#B07A3B] block">
                    {idioma === 'es' ? 'Obras documentadas en acervo:' : 'Documented works in collection:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#D9A867] font-medium">
                    {obrasActual.map((o, idx) => (
                      <span key={idx} className="bg-white/5 px-2 py-0.5 rounded-[2px] text-[#D9A867]">
                        <ParsedText text={o} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
