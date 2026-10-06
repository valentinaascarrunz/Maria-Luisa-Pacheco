import React from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from './ParsedText';
import { Eye, EyeOff } from 'lucide-react';

export const Footer: React.FC = () => {
  const { idioma, setIdioma, navegarA, mostrarMarcadores, toggleMarcadores } = useSite();

  const navItems = [
    { id: 'inicio', label: idioma === 'es' ? 'Inicio' : 'Home' },
    { id: 'biografia', label: idioma === 'es' ? 'Biografía' : 'Biography' },
    { id: 'obra', label: idioma === 'es' ? 'Obras' : 'Works' },
    { id: 'cronologia', label: idioma === 'es' ? 'Cronología' : 'Chronology' },
    { id: 'exposiciones', label: idioma === 'es' ? 'Exposiciones' : 'Exhibitions' },
    { id: 'colecciones', label: idioma === 'es' ? 'Colecciones' : 'Collections' },
    { id: 'archivo', label: idioma === 'es' ? 'Archivo' : 'Archive' },
    { id: 'censo', label: idioma === 'es' ? 'Censo de obras' : 'Census of Works' },
    { id: 'contacto', label: idioma === 'es' ? 'Contacto' : 'Contact' },
  ];

  return (
    <footer className="border-t border-[var(--line-border)] bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Family Control Strip for Markers */}
      <div className="section-dark py-2.5 px-4 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[0.72rem] tracking-wide">
              {idioma === 'es'
                ? 'Panel de control familiar: '
                : 'Family estate control panel: '}
              <span className="text-[#B07A3B]">
                MOSTRAR_MARCADORES = {mostrarMarcadores ? 'true' : 'false'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMarcadores}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.72rem] font-mono tracking-wider uppercase bg-white/10 hover:bg-white/20 text-[#F5F2EC] transition-colors rounded-[2px] cursor-pointer"
              title={
                mostrarMarcadores
                  ? 'Ocultar marcadores amarillos para vista pública'
                  : 'Mostrar marcadores amarillos para revisión familiar'
              }
            >
              {mostrarMarcadores ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>
                {mostrarMarcadores
                  ? idioma === 'es'
                    ? 'Ocultar marcadores'
                    : 'Hide markers'
                  : idioma === 'es'
                  ? 'Mostrar marcadores'
                  : 'Show markers'}
              </span>
            </button>
            <span className="text-white/40 text-[0.7rem] hidden md:inline">
              (Edite <code className="text-amber-300">contenido/config.json</code> para guardar)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Column 1: Identity & Legal notice */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-serif-display text-2xl uppercase tracking-wider text-[var(--text-primary)]">
              María Luisa Pacheco
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#B07A3B] font-mono">
              1919–1982 · La Paz – Nueva York
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {idioma === 'es'
                ? 'Sitio oficial publicado por la familia y herederos de María Luisa Pacheco para la catalogación, investigación, preservación y difusión de su vida y obra artística.'
                : 'Official estate website published by the family and heirs of María Luisa Pacheco dedicated to cataloging, researching, preserving, and sharing her life and artistic legacy.'}
            </p>

            {/* Prompt exact requirement 5.10 */}
            <div className="pt-2 text-xs text-[var(--text-secondary)] border-t border-[var(--line-border)]/50 space-y-1">
              <p>
                ©{' '}
                <ParsedText text="[PENDIENTE: nombre legal — p. ej. Herederos de María Luisa Pacheco]" />
                .
              </p>
              <p>
                {idioma === 'es'
                  ? 'Todas las obras © Herederos de María Luisa Pacheco. Prohibida su reproducción sin autorización.'
                  : 'All artworks © Heirs of María Luisa Pacheco. Reproduction prohibited without prior authorization.'}
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4">
            <span className="block text-xs font-mono tracking-widest uppercase text-[#B07A3B] mb-3">
              {idioma === 'es' ? 'Secciones' : 'Navigation'}
            </span>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navegarA(item.id)}
                  className="text-left text-[var(--text-primary)] hover:text-[#B07A3B] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Archives & Language */}
          <div className="md:col-span-2 space-y-4">
            <span className="block text-xs font-mono tracking-widest uppercase text-[#B07A3B]">
              {idioma === 'es' ? 'Idioma' : 'Language'}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <button
                onClick={() => setIdioma('es')}
                className={`transition-colors cursor-pointer ${
                  idioma === 'es' ? 'text-[#B07A3B] font-bold border-b border-[#B07A3B]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Español
              </button>
              <span className="text-[var(--text-secondary)]">·</span>
              <button
                onClick={() => setIdioma('en')}
                className={`transition-colors cursor-pointer ${
                  idioma === 'en' ? 'text-[#B07A3B] font-bold border-b border-[#B07A3B]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                English
              </button>
            </div>

            <div className="pt-2 text-[0.7rem] text-[var(--text-secondary)] space-y-1">
              <p>Archivo: Archives of American Art, Smithsonian</p>
              <p>La Paz · Washington · Nueva York</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
