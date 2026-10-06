import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import { ShieldCheck, Upload, Send, CheckCircle2 } from 'lucide-react';

export const CensoSection: React.FC = () => {
  const { idioma } = useSite();
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    pais: '',
    titulo: '',
    anio: '',
    tecnica: '',
    medidas: '',
    procedencia: '',
    comentarios: '',
  });

  const [archivos, setArchivos] = useState<{
    frente: File | null;
    reverso: File | null;
    firma: File | null;
  }>({
    frente: null,
    reverso: null,
    firma: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission to the family's endpoint
    setEnviado(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Documentación y Catalogación Razonada' : 'Documentation & Catalogue Raisonné'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Censo de Obras' : 'Census of Works'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Convocatoria abierta a coleccionistas privados, galerías, casas de subastas y museos para el registro e inventario oficial de piezas de María Luisa Pacheco.'
            : 'Open call to private collectors, galleries, auction houses, and museums for the official registration and inventory of works by María Luisa Pacheco.'}
        </p>
      </header>

      {/* Confidentiality Notice Box as requested */}
      <div className="bg-white dark:bg-[#252321] border border-[var(--line-border)] border-l-4 border-l-[#B07A3B] shadow-xs p-6 sm:p-8 flex items-start gap-4">
        <ShieldCheck size={24} className="text-[#B07A3B] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p className="font-medium text-[#B07A3B]">
            {idioma === 'es' ? 'Compromiso de estricta confidencialidad' : 'Commitment to strict confidentiality'}
          </p>
          <p>
            {idioma === 'es'
              ? 'La familia y herederos de María Luisa Pacheco están documentando la totalidad de su obra para el Catálogo Razonado y la preservación de su legado. Toda la información personal y datos de procedencia recibidos son tratados con absoluta confidencialidad y no serán compartidos públicamente sin autorización expresa del propietario.'
              : 'The family and heirs of María Luisa Pacheco are currently compiling the full documentation of her complete oeuvre for the upcoming Catalogue Raisonné and preservation of her legacy. All personal information and provenance records provided are handled with absolute confidentiality and will not be disclosed publicly without explicit authorization from the owner.'}
          </p>
          <p className="pt-2 text-xs font-mono text-[#B07A3B]">
            {idioma === 'es' ? 'Canal de recepción: ' : 'Submission recipient: '}
            <ParsedText text="[PENDIENTE: email de la familia]" />
          </p>
        </div>
      </div>

      {/* Submission Feedback */}
      {enviado ? (
        <div className="section-dark p-8 sm:p-12 text-center space-y-4 border border-white/10">
          <CheckCircle2 size={44} className="text-[#D49B55] mx-auto" />
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F5F2EC]">
            {idioma === 'es' ? 'Registro recibido exitosamente' : 'Registration successfully received'}
          </h2>
          <p className="text-sm text-[#DCD7D0] max-w-lg mx-auto">
            {idioma === 'es'
              ? 'Agradecemos su valiosa contribución a la catalogación del legado de María Luisa Pacheco. La familia revisará la documentación técnica y se comunicará a la brevedad.'
              : 'Thank you for your valuable contribution to the cataloging of María Luisa Pacheco’s legacy. The family estate will review the technical submission and be in touch shortly.'}
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="mt-4 px-6 py-2.5 bg-[#B07A3B] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#B07A3B]/90 transition-colors cursor-pointer"
          >
            {idioma === 'es' ? 'Registrar otra obra' : 'Register another artwork'}
          </button>
        </div>
      ) : (
        /* The Census Form */
        <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--bg-primary)] border border-[var(--line-border)] p-6 sm:p-10">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[var(--text-primary)] border-b border-[var(--line-border)] pb-3">
              {idioma === 'es' ? '1. Datos del registrante' : '1. Registrant Information'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Nombre completo *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="Ej. Colección Martínez / Dr. Carlos Paz"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Correo electrónico *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="contacto@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'País de residencia *' : 'Country of Residence *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="Ej. Bolivia, Estados Unidos, etc."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6">
            <h3 className="font-serif text-2xl text-[var(--text-primary)] border-b border-[var(--line-border)] pb-3">
              {idioma === 'es' ? '2. Ficha técnica de la obra' : '2. Technical Details of Artwork'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Título de la obra *' : 'Artwork Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder={idioma === 'es' ? 'Título o "Sin título"' : 'Title or "Untitled"'}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Año estimado o fechado' : 'Year or Estimated Date'}
                </label>
                <input
                  type="text"
                  value={formData.anio}
                  onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="Ej. 1974 o c. 1968"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Técnica / Soporte *' : 'Medium / Support *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.tecnica}
                  onChange={(e) => setFormData({ ...formData, tecnica: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="Ej. Óleo y arena sobre tela, madera balsa, etc."
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {idioma === 'es' ? 'Medidas (alto × ancho en cm) *' : 'Dimensions (H × W in cm) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.medidas}
                  onChange={(e) => setFormData({ ...formData, medidas: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                  placeholder="Ej. 120 × 95 cm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                {idioma === 'es' ? 'Procedencia (cómo y cuándo la obtuvo) *' : 'Provenance (how and when acquired) *'}
              </label>
              <textarea
                rows={3}
                required
                value={formData.procedencia}
                onChange={(e) => setFormData({ ...formData, procedencia: e.target.value })}
                className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
                placeholder={
                  idioma === 'es'
                    ? 'Indique si fue adquirida en galería (ej. Lee Ault), subasta, regalo de la artista, o herencia familiar.'
                    : 'Indicate whether acquired from a gallery (e.g. Lee Ault), auction, artist gift, or family inheritance.'
                }
              />
            </div>
          </div>

          {/* Photographic Documentation (Frente, Reverso, Firma) */}
          <div className="space-y-4 pt-6">
            <h3 className="font-serif text-2xl text-[var(--text-primary)] border-b border-[var(--line-border)] pb-3">
              {idioma === 'es' ? '3. Registro fotográfico' : '3. Photographic Documentation'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              {idioma === 'es'
                ? 'Por favor adjunte fotografías nítidas para la verificación técnica del estado y procedencia de la obra:'
                : 'Please attach clear photographs for technical verification of condition and provenance:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Foto Frente */}
              <div className="border border-dashed border-[var(--line-border)] p-4 text-center bg-[#EDE8E0]/50 dark:bg-[#252321]/50 space-y-2">
                <Upload size={20} className="text-[#B07A3B] mx-auto" />
                <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  {idioma === 'es' ? 'Frente completo' : 'Full Front View'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArchivos({ ...archivos, frente: e.target.files?.[0] || null })}
                  className="text-[0.68rem] text-[var(--text-secondary)] w-full file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[0.68rem] file:bg-[#B07A3B] file:text-white"
                />
              </div>

              {/* Foto Reverso */}
              <div className="border border-dashed border-[var(--line-border)] p-4 text-center bg-[#EDE8E0]/50 dark:bg-[#252321]/50 space-y-2">
                <Upload size={20} className="text-[#B07A3B] mx-auto" />
                <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  {idioma === 'es' ? 'Reverso / Bastidor' : 'Back / Stretcher'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArchivos({ ...archivos, reverso: e.target.files?.[0] || null })}
                  className="text-[0.68rem] text-[var(--text-secondary)] w-full file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[0.68rem] file:bg-[#B07A3B] file:text-white"
                />
              </div>

              {/* Foto Firma */}
              <div className="border border-dashed border-[var(--line-border)] p-4 text-center bg-[#EDE8E0]/50 dark:bg-[#252321]/50 space-y-2">
                <Upload size={20} className="text-[#B07A3B] mx-auto" />
                <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-primary)]">
                  {idioma === 'es' ? 'Detalle de la firma' : 'Signature Detail'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArchivos({ ...archivos, firma: e.target.files?.[0] || null })}
                  className="text-[0.68rem] text-[var(--text-secondary)] w-full file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[0.68rem] file:bg-[#B07A3B] file:text-white"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              {idioma === 'es' ? 'Comentarios adicionales' : 'Additional Comments'}
            </label>
            <textarea
              rows={3}
              value={formData.comentarios}
              onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
              className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
              placeholder={
                idioma === 'es'
                  ? 'Inscripciones al dorso, etiquetas de exposiciones históricas o estado de conservación.'
                  : 'Inscriptions on reverse, historical exhibition labels, or conservation condition.'
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[var(--line-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[0.7rem] font-mono text-[var(--text-secondary)]">
              {idioma === 'es' ? '* Campos requeridos para el censo oficial' : '* Required fields for the official census'}
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1D1B] dark:bg-[#F5F2EC] text-[#F5F2EC] dark:text-[#1E1D1B] hover:bg-[#B07A3B] dark:hover:bg-[#B07A3B] dark:hover:text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>{idioma === 'es' ? 'Enviar registro al archivo' : 'Submit record to archive'}</span>
              <Send size={14} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
