import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Idioma, Obra, FotoCronologia } from '../types';
import configData from '../contenido/config.json';

interface SiteContextType {
  idioma: Idioma;
  setIdioma: (id: Idioma) => void;
  mostrarMarcadores: boolean;
  setMostrarMarcadores: (val: boolean) => void;
  toggleMarcadores: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  seccionActiva: string;
  navegarA: (seccion: string) => void;
  obraSeleccionada: Obra | null;
  setObraSeleccionada: (obra: Obra | null) => void;
  fotoLightbox: FotoCronologia | null;
  fotosPeriodo: FotoCronologia[];
  abrirLightboxFoto: (foto: FotoCronologia, lista: FotoCronologia[]) => void;
  cerrarLightboxFoto: () => void;
  siguienteFotoLightbox: () => void;
  anteriorFotoLightbox: () => void;
  subseccionObra: 'catalogo' | 'mas-alla';
  setSubseccionObra: (sub: 'catalogo' | 'mas-alla') => void;
  filtroEtapaObra: string;
  setFiltroEtapaObra: (etapa: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [mostrarMarcadores, setMostrarMarcadores] = useState<boolean>(configData.MOSTRAR_MARCADORES);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [seccionActiva, setSeccionActiva] = useState<string>('inicio');
  const [subseccionObra, setSubseccionObra] = useState<'catalogo' | 'mas-alla'>('catalogo');
  const [obraSeleccionada, setObraSeleccionada] = useState<Obra | null>(null);
  const [filtroEtapaObra, setFiltroEtapaObra] = useState<string>('todas');

  const [fotoLightbox, setFotoLightbox] = useState<FotoCronologia | null>(null);
  const [fotosPeriodo, setFotosPeriodo] = useState<FotoCronologia[]>([]);

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle URL hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash === 'mas-alla-de-la-pintura') {
          setSeccionActiva('obra');
          setSubseccionObra('mas-alla');
        } else {
          setSeccionActiva(hash);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navegarA = (seccion: string) => {
    setSeccionActiva(seccion);
    window.location.hash = seccion;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMarcadores = () => {
    setMostrarMarcadores((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const abrirLightboxFoto = (foto: FotoCronologia, lista: FotoCronologia[]) => {
    setFotoLightbox(foto);
    setFotosPeriodo(lista);
  };

  const cerrarLightboxFoto = () => {
    setFotoLightbox(null);
  };

  const siguienteFotoLightbox = () => {
    if (!fotoLightbox || fotosPeriodo.length === 0) return;
    const currentIndex = fotosPeriodo.findIndex((f) => f.id === fotoLightbox.id);
    const nextIndex = (currentIndex + 1) % fotosPeriodo.length;
    setFotoLightbox(fotosPeriodo[nextIndex]);
  };

  const anteriorFotoLightbox = () => {
    if (!fotoLightbox || fotosPeriodo.length === 0) return;
    const currentIndex = fotosPeriodo.findIndex((f) => f.id === fotoLightbox.id);
    const prevIndex = (currentIndex - 1 + fotosPeriodo.length) % fotosPeriodo.length;
    setFotoLightbox(fotosPeriodo[prevIndex]);
  };

  return (
    <SiteContext.Provider
      value={{
        idioma,
        setIdioma,
        mostrarMarcadores,
        setMostrarMarcadores,
        toggleMarcadores,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        seccionActiva,
        navegarA,
        obraSeleccionada,
        setObraSeleccionada,
        fotoLightbox,
        fotosPeriodo,
        abrirLightboxFoto,
        cerrarLightboxFoto,
        siguienteFotoLightbox,
        anteriorFotoLightbox,
        subseccionObra,
        setSubseccionObra,
        filtroEtapaObra,
        setFiltroEtapaObra,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
