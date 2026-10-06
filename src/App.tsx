import React, { useEffect } from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InicioSection } from './sections/InicioSection';
import { BiografiaSection } from './sections/BiografiaSection';
import { ObraSection } from './sections/ObraSection';
import { CronologiaSection } from './sections/CronologiaSection';
import { ExposicionesSection } from './sections/ExposicionesSection';
import { ColeccionesSection } from './sections/ColeccionesSection';
import { ArchivoSection } from './sections/ArchivoSection';
import { CensoSection } from './sections/CensoSection';
import { ContactoSection } from './sections/ContactoSection';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { ChronologyLightbox } from './components/ChronologyLightbox';

const MainLayout: React.FC = () => {
  const { seccionActiva, obraSeleccionada, setObraSeleccionada } = useSite();

  // Basic global protection: disable right-click on all artworks
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest('.protected-artwork') || target.tagName === 'IMG')) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Header />

      <main className="flex-1">
        {seccionActiva === 'inicio' && <InicioSection />}
        {seccionActiva === 'biografia' && <BiografiaSection />}
        {seccionActiva === 'obra' && <ObraSection />}
        {seccionActiva === 'cronologia' && <CronologiaSection />}
        {seccionActiva === 'exposiciones' && <ExposicionesSection />}
        {seccionActiva === 'colecciones' && <ColeccionesSection />}
        {seccionActiva === 'archivo' && <ArchivoSection />}
        {seccionActiva === 'censo' && <CensoSection />}
        {seccionActiva === 'contacto' && <ContactoSection />}
      </main>

      <Footer />

      {/* Global Modals & Lightboxes */}
      <ArtworkDetailModal
        obra={obraSeleccionada}
        onClose={() => setObraSeleccionada(null)}
      />
      <ChronologyLightbox />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <MainLayout />
    </SiteProvider>
  );
}
