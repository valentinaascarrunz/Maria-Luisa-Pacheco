import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ParsedText } from '../components/ParsedText';
import { Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactoSection: React.FC = () => {
  const { idioma } = useSite();
  const [enviado, setEnviado] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState('autenticacion');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    institucion: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[var(--line-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B07A3B]">
          {idioma === 'es' ? 'Atención a Museos, Investigadores y Prensa' : 'Liaison for Museums, Researchers, and Press'}
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
          {idioma === 'es' ? 'Contacto y Consultas' : 'Contact & Inquiries'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {idioma === 'es'
            ? 'Canal oficial de comunicación con los herederos y el archivo de María Luisa Pacheco para solicitudes de derechos de reproducción, consultas de autenticación, proyectos curatoriales y prensa especializada.'
            : 'Official communication channel with the heirs and estate of María Luisa Pacheco for image rights requests, authentication inquiries, curatorial projects, and specialized media.'}
        </p>
      </header>

      {/* Official Email Notice */}
      <div className="bg-white dark:bg-[#252321] border border-[var(--line-border)] border-l-4 border-l-[#B07A3B] shadow-xs p-6 sm:p-8 flex items-start gap-4">
        <Mail size={22} className="text-[#B07A3B] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p className="font-medium text-[#B07A3B]">
            {idioma === 'es' ? 'Dirección de correo electrónico oficial' : 'Official Estate Email'}
          </p>
          <p>
            {idioma === 'es'
              ? 'Para correspondencia directa o envío de expedientes de investigación:'
              : 'For direct correspondence or research dossier submissions:'}
          </p>
          <div className="pt-1">
            <span className="font-mono text-sm text-[#B07A3B] font-semibold">
              <ParsedText text="[PENDIENTE: email de contacto]" />
            </span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {enviado ? (
        <div className="section-dark p-8 sm:p-12 text-center space-y-4 border border-white/10">
          <CheckCircle2 size={44} className="text-[#D49B55] mx-auto" />
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F5F2EC]">
            {idioma === 'es' ? 'Mensaje enviado correctamente' : 'Message successfully sent'}
          </h2>
          <p className="text-sm text-[#DCD7D0] max-w-lg mx-auto">
            {idioma === 'es'
              ? 'Su solicitud ha sido transmitida al archivo de la familia. Nos comunicaremos a la mayor brevedad posible.'
              : 'Your inquiry has been relayed to the family estate. We will respond at the earliest convenience.'}
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="mt-4 px-6 py-2.5 bg-[#B07A3B] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#B07A3B]/90 transition-colors cursor-pointer"
          >
            {idioma === 'es' ? 'Enviar otra consulta' : 'Send another inquiry'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--bg-primary)] border border-[var(--line-border)] p-6 sm:p-10">
          {/* Inquiry Type */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              {idioma === 'es' ? 'Tipo de consulta *' : 'Inquiry Type *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                { id: 'autenticacion', label_es: 'Autenticación', label_en: 'Authentication' },
                { id: 'imagenes', label_es: 'Solicitud de imágenes', label_en: 'Image Rights' },
                { id: 'investigacion', label_es: 'Investigación académica', label_en: 'Academic Research' },
                { id: 'prensa', label_es: 'Prensa y difusión', label_en: 'Press & Media' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTipoConsulta(item.id)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    tipoConsulta === item.id
                      ? 'border-[#B07A3B] bg-[#B07A3B]/10 font-bold text-[#B07A3B]'
                      : 'border-[var(--line-border)] text-[var(--text-primary)] hover:border-[#B07A3B]/50'
                  }`}
                >
                  {idioma === 'es' ? item.label_es : item.label_en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
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
                placeholder="Nombre y apellido"
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
                placeholder="correo@institucion.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              {idioma === 'es' ? 'Institución / Universidad / Medio' : 'Institution / University / Media Outlet'}
            </label>
            <input
              type="text"
              value={formData.institucion}
              onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
              className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
              placeholder="Ej. Museo, Galería, Universidad o Editorial"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">
              {idioma === 'es' ? 'Detalle de la consulta *' : 'Inquiry Message *'}
            </label>
            <textarea
              rows={5}
              required
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              className="w-full bg-[#FFFFFF] border border-[#8A8580] p-2.5 text-xs text-[#1E1D1B] placeholder:text-[#8A8580] focus:outline-none focus:border-[#B07A3B]"
              placeholder={
                idioma === 'es'
                  ? 'Por favor describa con detalle los objetivos del proyecto, la obra objeto de consulta o los plazos de publicación.'
                  : 'Please describe the objectives of the project in detail, the specific artwork referenced, or upcoming publication timelines.'
              }
            />
          </div>

          <div className="pt-4 border-t border-[var(--line-border)] flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1D1B] dark:bg-[#F5F2EC] text-[#F5F2EC] dark:text-[#1E1D1B] hover:bg-[#B07A3B] dark:hover:bg-[#B07A3B] dark:hover:text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>{idioma === 'es' ? 'Enviar consulta' : 'Submit inquiry'}</span>
              <Send size={14} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
