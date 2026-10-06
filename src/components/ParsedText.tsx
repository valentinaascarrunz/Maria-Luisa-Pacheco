import React from 'react';
import { useSite } from '../context/SiteContext';

interface ParsedTextProps {
  text: string;
  className?: string;
  asParagraphs?: boolean;
}

export const ParsedText: React.FC<ParsedTextProps> = ({ text, className = '', asParagraphs = false }) => {
  const { mostrarMarcadores } = useSite();

  if (!text) return null;

  // Split into paragraphs if requested
  if (asParagraphs && text.includes('\n')) {
    const paragraphs = text.split(/\n\s*\n/);
    return (
      <div className={`space-y-4 ${className}`}>
        {paragraphs.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            <ParsedTextContent text={p.trim()} mostrarMarcadores={mostrarMarcadores} />
          </p>
        ))}
      </div>
    );
  }

  return (
    <span className={className}>
      <ParsedTextContent text={text} mostrarMarcadores={mostrarMarcadores} />
    </span>
  );
};

const ParsedTextContent: React.FC<{ text: string; mostrarMarcadores: boolean }> = ({
  text,
  mostrarMarcadores,
}) => {
  if (!mostrarMarcadores) {
    // When markers are disabled:
    // Remove [PENDIENTE: ...] and [VERIFICAR: ...] tags cleanly
    const cleaned = text
      .replace(/\[PENDIENTE:[^\]]*\]/gi, '')
      .replace(/\[VERIFICAR:[^\]]*\]/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return <>{cleaned}</>;
  }

  // Regex to match [PENDIENTE: ...] or [VERIFICAR: ...]
  const regex = /(\[(?:PENDIENTE|VERIFICAR):[^\]]+\])/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('[PENDIENTE:')) {
          return (
            <span
              key={index}
              className="inline-block mx-1 my-0.5 px-1.5 py-0.5 text-[0.68rem] tracking-wide font-semibold bg-amber-200 text-amber-950 border border-amber-400 rounded-[2px] shadow-2xs select-all"
              title="Información pendiente a completar por la familia"
            >
              {part}
            </span>
          );
        }
        if (part.startsWith('[VERIFICAR:')) {
          return (
            <span
              key={index}
              className="inline-block mx-1 my-0.5 px-1.5 py-0.5 text-[0.68rem] tracking-wide font-medium bg-amber-100 text-amber-900 border border-dashed border-amber-500 rounded-[2px] shadow-2xs select-all"
              title="Dato a verificar por la familia"
            >
              {part}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};
