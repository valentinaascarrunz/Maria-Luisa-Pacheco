import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { ArtworkImage } from '../components/ArtworkImage';
import { ParsedText } from '../components/ParsedText';
import { ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';
import type { Obra } from '../types';
import obrasData from '../contenido/obras.json';

interface StageImageCardProps {
  imagen: string | null;
  titulo: string;
  anios: string;
  marcador?: string;
}

const StageImageCard: React.FC<StageImageCardProps> = ({ imagen, titulo, anios, marcador }) => {
  const [hasError, setHasError] = useState(false);

  if (!imagen || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#EDE8E0] dark:bg-[#252321] text-center space-y-1.5">
        <span className="font-serif text-sm tracking-wide text-[var(--text-primary)]">{titulo}</span>
        <span className="text-xs font-mono text-[#B07A3B]">{anios}</span>
        {marcador ? (
          <ParsedText text={marcador} />
        ) : (
          <span className="text-[0.68rem] font-mono text-[var(--text-secondary)]">[PENDIENTE: imagen]</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={imagen}
      alt={`${titulo} — María Luisa Pacheco`}
      loading="lazy"
      onError={() => setHasError(true)}
      className="w-full h-full object-contain p-2 hover:opacity-100 transition-opacity select-none"
    />
  );
};

export const InicioSection: React.FC = () => {
  const { idioma, navegarA, setObraSeleccionada, setFiltroEtapaObra, setSubseccionObra } = useSite();

  const allObras = obrasData as Obra[];
  const obraMontanas = allObras.find((o) => o.id === 'montanas-1979') || allObras[0];

  // 5 featured works with real photographs for slow carousel:
  // Catavi (1974), Composición (1960), Sin título Paisaje andino (1954), Wila (1972), Montañas (1979)
  const featuredIds = [
    'catavi-1974',
    'composicion-1960',
    'sin-titulo-paisaje-andino-1954',
    'wila-1972',
    'montanas-1979',
  ];
  const featuredWorks = featuredIds
    .map((id) => allObras.find((o) => o.id === id))
    .filter(Boolean) as Obra[];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Slow carousel timer (7 seconds per slide)
  useEffect(() => {
    if (!isPlaying || featuredWorks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredWorks.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, featuredWorks.length]);

  const handleEtapaClick = (etapaId: string) => {
    setFiltroEtapaObra(etapaId);
    setSubseccionObra('catalogo');
    navegarA('obra');
  };

  // 4 etapas definitions as specified
  const cuatroEtapas = [
    {
      id: 'Indigenismo figurativo',
      titulo: 'Indigenismo figurativo',
      titulo_en: 'Figurative Indigenism',
      anios: '1936–1950',
      descripcion: 'Retratos, paisajes y figuras andinas.',
      descripcion_en: 'Portraits, landscapes, and Andean figures.',
      imagen: null,
      marcador: '[PENDIENTE: imagen]',
    },
    {
      id: 'Cubismo andino',
      titulo: 'Cubismo andino',
      titulo_en: 'Andean Cubism',
      anios: '1951–1956',
      descripcion: 'Montañas y figuras fragmentadas en planos.',
      descripcion_en: 'Mountains and figures fractured into planes.',
      imagen: 'https://raw.githubusercontent.com/valentinaascarrunz/mlp-imagenes/main/2020-29_sb_2021-11-089957.jpg',
      obraId: 'sin-titulo-paisaje-andino-1954',
    },
    {
      id: 'Expresionismo abstracto',
      titulo: 'Expresionismo abstracto',
      titulo_en: 'Abstract Expressionism',
      anios: '1956–1969',
      descripcion: 'Óleo grueso, espátula y madera.',
      descripcion_en: 'Thick impasto, palette knife, and wood.',
      imagen: 'https://raw.githubusercontent.com/valentinaascarrunz/mlp-imagenes/main/normalized.jpg',
      obraId: 'sin-titulo-1966',
    },
    {
      id: 'Materia y paisaje',
      titulo: 'Materia y paisaje',
      titulo_en: 'Matter and Landscape',
      anios: '1970–1982',
      descripcion: 'Arena, collage y formas minerales.',
      descripcion_en: 'Sand, collage, and mineral forms.',
      imagen: 'https://raw.githubusercontent.com/valentinaascarrunz/mlp-imagenes/main/maria-luisa-pacheco-montanas-1979-trivium-art-history.jpg',
      obraId: 'montanas-1979',
    },
  ];

  // En cifras data as specified
  const enCifras = [
    {
      cifra: '3',
      texto: 'Becas Guggenheim consecutivas (1958–1960)',
      texto_en: 'Consecutive Guggenheim Fellowships (1958–1960)',
    },
    {
      cifra: '26',
      texto: 'Años de carrera en Nueva York (1956–1982)',
      texto_en: 'Years of career in New York (1956–1982)',
    },
    {
      cifra: '8',
      texto: 'Museos y colecciones públicas con su obra',
      texto_en: 'Museums and public collections with her work',
    },
    {
      cifra: '1959',
      texto: 'Premio de pintura, Bienal de São Paulo',
      texto_en: 'Painting Prize, São Paulo Biennial',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Fullscreen Hero Artwork with Identity */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-end p-6 sm:p-12 md:p-16 overflow-hidden section-dark text-[#F5F2EC]">
        {/* Fullscreen background artwork: Montañas (1979) with dark overlay for legibility */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/valentinaascarrunz/mlp-imagenes/main/maria-luisa-pacheco-montanas-1979-trivium-art-history.jpg"
            alt="Montañas (1979) — María Luisa Pacheco"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay ensuring artist name and typography are perfectly readable */}
          <div className="absolute inset-0 bg-[#1E1D1B]/75" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-mono text-[#D49B55]">
            Montañas, 1979 · Técnica mixta y arena sobre tela
          </span>

          <h1 className="font-serif-display text-5xl sm:text-6xl md:text-8xl tracking-tight text-[#F5F2EC] leading-[0.95]">
            María Luisa Pacheco
          </h1>

          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#D49B55] tracking-wide">
            La Paz 1919 – Nueva York 1982
          </p>

          <p className="pt-2 text-sm sm:text-base md:text-lg text-[#DCD7D0] max-w-2xl font-light leading-relaxed">
            {idioma === 'es'
              ? 'Pionera de la abstracción en Bolivia. Los Andes, convertidos en materia, textura y luz.'
              : 'Pioneer of abstraction in Bolivia. The Andes, turned into matter, texture, and light.'}
          </p>
        </div>

        {/* Bottom subtle indicator */}
        <div className="relative z-10 pt-8 flex items-center justify-between text-xs text-[#DCD7D0] border-t border-white/10 mt-8">
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[#C9C4BC]">
            {idioma === 'es' ? 'Archivo y Legado Oficial' : 'Official Estate & Archive'}
          </span>
          <button
            onClick={() => setObraSeleccionada(obraMontanas)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#B07A3B] hover:bg-[#B07A3B]/90 text-white transition-colors cursor-pointer text-xs font-mono tracking-wider uppercase"
          >
            <span>{idioma === 'es' ? 'Ver ficha de Montañas' : 'View Montañas artwork details'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* 2. Featured Quote Section */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="w-12 h-[1px] bg-[#B07A3B] mx-auto" />
        <blockquote className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] leading-relaxed italic font-light">
          “Las montañas están ahí como un desafío, me siento llena de humildad ante ellas, pero me siento también dueña de ellas.”
        </blockquote>
        <p className="text-sm md:text-base text-[var(--text-secondary)] italic font-sans max-w-2xl mx-auto">
          “The mountains are there as a challenge; I feel full of humility before them, but I also feel that I own them.”
        </p>
        <span className="block text-xs uppercase tracking-widest text-[#B07A3B] font-mono">
          — María Luisa Pacheco
        </span>
      </section>

      {/* 3. Su obra en cuatro etapas (4 columns, on mobile stacked) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[var(--line-border)] pb-4 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B07A3B]">
              {idioma === 'es' ? 'Evolución artística' : 'Artistic evolution'}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[var(--text-primary)]">
              {idioma === 'es' ? 'Su obra en cuatro etapas' : 'Her work in four stages'}
            </h2>
          </div>
          <button
            onClick={() => {
              setFiltroEtapaObra('todas');
              setSubseccionObra('catalogo');
              navegarA('obra');
            }}
            className="text-xs font-mono text-[#B07A3B] hover:text-[var(--text-primary)] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{idioma === 'es' ? 'Ver todas las obras' : 'View all works'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cuatroEtapas.map((etapa) => {
            const tituloActual = idioma === 'en' ? etapa.titulo_en : etapa.titulo;
            const descActual = idioma === 'en' ? etapa.descripcion_en : etapa.descripcion;

            return (
              <div
                key={etapa.id}
                onClick={() => handleEtapaClick(etapa.id)}
                className="group flex flex-col bg-white dark:bg-[#252321] border border-[var(--line-border)] p-4 cursor-pointer transition-all duration-300 hover:border-[#B07A3B] hover:-translate-y-1 shadow-xs"
              >
                {/* Artwork image container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EDE8E0] dark:bg-[#1E1D1B] flex items-center justify-center">
                  <StageImageCard
                    imagen={etapa.imagen}
                    titulo={tituloActual}
                    anios={etapa.anios}
                    marcador={etapa.marcador}
                  />
                </div>

                {/* Stage Metadata */}
                <div className="pt-4 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="text-[0.7rem] font-mono text-[#B07A3B] uppercase tracking-wider block">
                      {etapa.anios}
                    </span>
                    <h3 className="font-serif-display text-xl text-[#B07A3B] transition-colors leading-tight mt-0.5">
                      {tituloActual}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1 border-t border-[var(--line-border)]/50">
                    {descActual}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Franja "En cifras" */}
      <section className="section-dark border-y border-[var(--line-border)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#B07A3B]">
              {idioma === 'es' ? 'Trayectoria y reconocimiento – En cifras' : 'Milestones & Recognition – In Figures'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--line-border)]">
            {enCifras.map((item, idx) => (
              <div key={idx} className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-8' : ''} space-y-2`}>
                <span className="font-serif-display text-5xl sm:text-6xl text-[#F5F2EC] leading-none block">
                  {item.cifra}
                </span>
                <p className="text-xs sm:text-sm text-[#C9C4BC] leading-snug">
                  {idioma === 'en' ? item.texto_en : item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Slow Carousel of 5 Featured Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[var(--line-border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B07A3B]">
              {idioma === 'es' ? 'Selección institucional' : 'Institutional selection'}
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[var(--text-primary)]">
              {idioma === 'es' ? 'Obras destacadas' : 'Featured works'}
            </h2>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[#B07A3B] transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex items-center gap-2">
              {featuredWorks.map((work, idx) => (
                <button
                  key={work.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all cursor-pointer rounded-full ${
                    currentSlide === idx ? 'w-8 bg-[#B07A3B]' : 'w-2 bg-[var(--text-secondary)]/40 hover:bg-[#B07A3B]/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Slide */}
        {featuredWorks.length > 0 && (
          <div className="relative overflow-hidden section-dark border border-[var(--line-border)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Artwork view */}
              <div
                className="lg:col-span-8 cursor-pointer"
                onClick={() => setObraSeleccionada(featuredWorks[currentSlide])}
              >
                <ArtworkImage
                  obra={featuredWorks[currentSlide]}
                  aspectRatio="h-full min-h-[350px] lg:min-h-[460px] w-full"
                  className="h-full w-full"
                  showHoverOverlay={false}
                />
              </div>

              {/* Technical card beside the carousel image */}
              <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between section-dark text-[#F5F2EC]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#D49B55] tracking-widest uppercase">
                    <span>{featuredWorks[currentSlide].etapa}</span>
                    <span>{featuredWorks[currentSlide].anio}</span>
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F5F2EC]">
                    {idioma === 'en' && featuredWorks[currentSlide].titulo_en
                      ? featuredWorks[currentSlide].titulo_en
                      : featuredWorks[currentSlide].titulo}
                  </h3>

                  <div className="text-xs text-[#DCD7D0] space-y-1 font-sans">
                    <p>
                      <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Técnica:' : 'Medium:'}</strong>{' '}
                      {featuredWorks[currentSlide].tecnica}
                    </p>
                    {featuredWorks[currentSlide].medidas && featuredWorks[currentSlide].medidas !== '[PENDIENTE]' && (
                      <p>
                        <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Medidas:' : 'Dimensions:'}</strong>{' '}
                        {featuredWorks[currentSlide].medidas}
                      </p>
                    )}
                    <p>
                      <strong className="text-[#F5F2EC]">{idioma === 'es' ? 'Colección:' : 'Collection:'}</strong>{' '}
                      {featuredWorks[currentSlide].coleccion}
                    </p>
                  </div>

                  {featuredWorks[currentSlide].notas && (
                    <p className="text-xs text-[#DCD7D0] italic pt-2 border-t border-white/10">
                      <ParsedText text={featuredWorks[currentSlide].notas} />
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setObraSeleccionada(featuredWorks[currentSlide])}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#B07A3B] hover:bg-[#B07A3B]/90 text-white text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>{idioma === 'es' ? 'Abrir en catálogo' : 'Open in catalog'}</span>
                    <ArrowRight size={13} />
                  </button>
                  <span className="text-xs font-mono text-[#C9C4BC]">
                    {currentSlide + 1} / {featuredWorks.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
