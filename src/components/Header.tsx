import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { idioma, setIdioma, seccionActiva, navegarA, darkMode, toggleDarkMode, setSubseccionObra } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (id: string) => {
    if (id === 'obra') {
      setSubseccionObra('catalogo');
    }
    navegarA(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line-border)] bg-[var(--bg-primary)]/98 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Brand: Single line, ~22px, without clipping at top, subtitle removed */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="text-left group cursor-pointer shrink-0 pt-0.5 focus-visible:outline-2 focus-visible:outline-[#B07A3B]"
          >
            <span className="font-serif-display text-[22px] tracking-wide uppercase text-[var(--text-primary)] group-hover:text-[#B07A3B] transition-colors whitespace-nowrap leading-none block">
              María Luisa Pacheco
            </span>
          </button>

          {/* Desktop Navigation: all in single line, whitespace-nowrap, no wrapping */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-[0.78rem] tracking-wider uppercase font-medium">
            {navItems.map((item) => {
              const isActive = seccionActiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#B07A3B]'
                      : 'text-[var(--text-primary)] hover:text-[#B07A3B]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B07A3B]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right utility controls: More space between Contacto and selector */}
          <div className="flex items-center gap-3 sm:gap-4 xl:ml-6 2xl:ml-8 xl:pl-6 xl:border-l xl:border-[var(--line-border)] shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center text-xs tracking-widest uppercase font-mono">
              <button
                onClick={() => setIdioma('es')}
                className={`px-1 py-0.5 transition-colors cursor-pointer ${
                  idioma === 'es' ? 'text-[#B07A3B] font-bold border-b border-[#B07A3B]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
              <span className="text-[var(--text-secondary)] mx-0.5">/</span>
              <button
                onClick={() => setIdioma('en')}
                className={`px-1 py-0.5 transition-colors cursor-pointer ${
                  idioma === 'en' ? 'text-[#B07A3B] font-bold border-b border-[#B07A3B]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer rounded"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-[var(--text-primary)] hover:text-[#B07A3B] transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[var(--line-border)] bg-[var(--bg-primary)] px-6 py-6 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-2.5">
            {navItems.map((item) => {
              const isActive = seccionActiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm uppercase tracking-widest py-2 transition-colors cursor-pointer ${
                    isActive ? 'text-[#B07A3B] font-semibold pl-2 border-l-2 border-[#B07A3B]' : 'text-[var(--text-primary)] hover:text-[#B07A3B]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--line-border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>{idioma === 'es' ? 'Sitio Oficial de la Familia' : 'Official Estate Website'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIdioma('es')}
                className={`font-mono ${idioma === 'es' ? 'text-[#B07A3B] font-bold' : ''}`}
              >
                ES
              </button>
              <span>·</span>
              <button
                onClick={() => setIdioma('en')}
                className={`font-mono ${idioma === 'en' ? 'text-[#B07A3B] font-bold' : ''}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
