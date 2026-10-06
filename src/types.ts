export type Idioma = 'es' | 'en';

export interface Obra {
  id: string;
  titulo: string;
  titulo_en: string;
  anio: string;
  tecnica: string;
  tecnica_en: string;
  medidas: string;
  medidas_en: string;
  etapa: 'Indigenismo figurativo' | 'Cubismo andino' | 'Expresionismo abstracto' | 'Materia y paisaje' | string;
  etapa_en: string;
  decada: string;
  coleccion: string;
  coleccion_en: string;
  imagen: string | null;
  fuente_imagen: string;
  notas: string;
  notas_en: string;
  marcador: string | null;
}

export interface FotoCronologia {
  id: string;
  imagen: string;
  descripcion: string;
  descripcion_en: string;
  lugar: string;
  lugar_en: string;
  fecha: string;
  credito: string;
  credito_en: string;
}

export interface HitoCronologia {
  anio: string;
  texto: string;
  texto_en: string;
}

export interface PeriodoCronologia {
  id: string;
  rango: string;
  rango_en: string;
  titulo: string;
  titulo_en: string;
  texto: string;
  texto_en: string;
  hitos: HitoCronologia[];
  fotos: FotoCronologia[];
}

export interface ExposicionItem {
  id: string;
  anio: string;
  titulo: string;
  titulo_en: string;
  sede: string;
  sede_en: string;
  ciudad: string;
  ciudad_en: string;
  tipo: string;
  tipo_en: string;
  catalogo_pdf: string | null;
  catalogo_marcador: string;
}

export interface ExposicionesData {
  en_vida: ExposicionItem[];
  postumas: ExposicionItem[];
}

export interface ColeccionItem {
  id: string;
  nombre: string;
  nombre_en: string;
  ciudad: string;
  pais: string;
  pais_en: string;
  obras_destacadas: string[];
  obras_destacadas_en: string[];
  coordenadas: {
    lat: number;
    lng: number;
  };
  descripcion: string;
  descripcion_en: string;
  marcador: string | null;
}

export interface ArchivoData {
  fondo_documental: {
    titulo: string;
    titulo_en: string;
    institucion: string;
    institucion_en: string;
    donacion: string;
    donacion_en: string;
    descripcion: string;
    descripcion_en: string;
    enlace: string;
  };
  fotografias_archivo: {
    id: string;
    titulo: string;
    titulo_en: string;
    fuente: string;
    fuente_en: string;
    enlace: string;
    marcador: string | null;
    imagen: string;
  }[];
  bibliografia: {
    autor: string;
    titulo: string;
    publicacion: string;
    tipo: string;
  }[];
  enlaces_en_linea: {
    titulo: string;
    titulo_en: string;
    url: string;
    detalle: string;
    detalle_en: string;
  }[];
}

export interface CitaBiografia {
  cita: string;
  traduccion_en: string;
}

export interface BiografiaCapitulo {
  id: string;
  numero: string;
  titulo: string;
  titulo_en: string;
  subtitulo: string;
  subtitulo_en: string;
  contenido: string;
  contenido_en: string;
  foto_archivo: {
    imagen: string;
    pie: string;
    pie_en: string;
  };
  citas: CitaBiografia[];
}

export interface MasAllaPinturaItem {
  id: string;
  titulo: string;
  titulo_en: string;
  periodo: string;
  periodo_en: string;
  disciplina: string;
  disciplina_en: string;
  descripcion: string;
  descripcion_en: string;
  marcador: string;
}
