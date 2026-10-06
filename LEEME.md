# Guía de Uso y Edición para la Familia — Archivo y Legado Oficial María Luisa Pacheco

Estimada familia de María Luisa Pacheco:

Este sitio web ha sido construido para preservar, catalogar y difundir el legado y la obra de María Luisa Pacheco (1919–1982). Todo el contenido se encuentra en archivos de datos legibles (formato JSON y Markdown) dentro de la carpeta `/contenido/`, de modo que pueden actualizarlo, añadir obras o completar los datos pendientes **sin necesidad de programar ni tocar el código de la aplicación**.

---

## 1. Cómo apagar las etiquetas amarillas (Marcadores)

El sitio cuenta con dos tipos de etiquetas visibles en amarillo para facilitar la revisión familiar:
- **`[PENDIENTE: …]`**: indica datos faltantes.
- **`[VERIFICAR: …]`**: indica datos que aparecen en fuentes pero que requieren confirmación familiar.

### Para ocultar todos los marcadores en el sitio:
1. Abra el archivo `contenido/config.json` (o `src/contenido/config.json`).
2. Verá la línea:
   ```json
   {
     "MOSTRAR_MARCADORES": true
   }
   ```
3. Cambie `"MOSTRAR_MARCADORES": true` por `"MOSTRAR_MARCADORES": false`.
4. Guarde el archivo. Todas las etiquetas amarillas se ocultarán automáticamente tanto en el encabezado, fichas de obras, biografía y cronología.
*(Nota: En la interfaz del sitio también hay un conmutador rápido en el pie de página para previsualizar cómo se ve con o sin marcadores).*

---

## 2. Cómo agregar o editar una obra en el catálogo

Todas las obras están registradas en el archivo `contenido/obras.json`.

### Para editar una obra existente:
Busque la obra por su título o año y complete los campos que tienen `[PENDIENTE]` o `[VERIFICAR]`. Por ejemplo:
```json
{
  "id": "sin-titulo-paisaje-andino-1954",
  "titulo": "Sin título (Paisaje andino)",
  "titulo_en": "Untitled (Andean Landscape)",
  "anio": "1954",
  "tecnica": "Óleo sobre tela",
  "tecnica_en": "Oil on canvas",
  "medidas": "100 × 80 cm",
  "medidas_en": "39.4 × 31.5 in",
  "etapa": "Cubismo andino",
  "etapa_en": "Andean Cubism",
  "decada": "1950",
  "coleccion": "Davis Museum, Wellesley College",
  "coleccion_en": "Davis Museum, Wellesley College",
  "imagen": "/imagenes/obras/sin-titulo-paisaje-andino-1954.jpg",
  "fuente_imagen": "https://www1.wellesley.edu/davismuseum/explore-the-collections/recent-acquisitions/node/200756",
  "notas": "Adquisición reciente del museo.",
  "notas_en": "Recent museum acquisition.",
  "marcador": null
}
```
*Si ya verificó un dato, puede cambiar `"marcador": "[VERIFICAR: ...]` por `"marcador": null`.*

### Para añadir una nueva obra:
Agregue un nuevo bloque con la misma estructura al final de la lista en `contenido/obras.json`, asegurándose de que cada obra tenga un `id` único en minúsculas y sin acentos ni espacios (por ejemplo: `mi-nueva-obra-1972`).

---

## 3. Dónde y cómo subir las imágenes de las obras

1. Guarde la imagen de la obra en formato JPG o WebP con el mismo nombre que el `id` de la obra.
   - Ejemplo: si el `id` es `catavi-1974`, guarde el archivo como `catavi-1974.jpg` dentro de la carpeta:
     `/public/imagenes/obras/`
2. En la ficha de la obra en `contenido/obras.json`, asegúrese de que el campo `"imagen"` apunte a `/imagenes/obras/catavi-1974.jpg`.
3. Mientras no suban el archivo real, el sitio web muestra un elegante placeholder de fondo piedra mineral con el título y año de la obra, respetando la estética del museo.

### Fuentes directas recomendadas para descargar las imágenes:
- **Composición (1960)**: [Google Arts & Culture](https://artsandculture.google.com/asset/composition/LwHeGUyqmqiRxg)
- **Catavi (1974)**: [Blanton Museum of Art](https://blanton.emuseum.com/objects/14029/catavi)
- **Sin título (1966)**: [Artsy / Blanton](https://www.artsy.net/artwork/maria-luisa-pacheco-untitled)
- **Sin título (Paisaje andino) (1954)**: [Davis Museum, Wellesley College](https://www1.wellesley.edu/davismuseum/explore-the-collections/recent-acquisitions/node/200756)
- **Obras 1955–1979 (Wila, Mallasa, Montañas, etc.)**: [The Art History Project](https://www.arthistoryproject.com/artists/maria-luisa-pacheco/)
- **Obras en subasta internacional**: [Artnet Past Auction Results](https://www.artnet.com/artists/mar%C3%ADa-luisa-pacheco/past-auction-results)
- **Fotografía de María Luisa en su estudio (c. 1960)**: [Smithsonian Archives of American Art](https://www.aaa.si.edu/collections/items/detail/photograph-mara-luisa-pacheco-painting-her-studio-21158)

---

## 4. Cómo modificar textos de la Biografía y Cronología

- **Biografía**: Está dividida en 5 capítulos en `contenido/biografia.json` y también en archivos Markdown `contenido/biografia.es.md` (español) y `contenido/biografia.en.md` (inglés). Pueden editar los párrafos directamente allí.
- **Cronología**: Organizada por períodos (1919–1935, 1936–1950, 1951–1955, 1956–1969, 1970–1982, Legado) en `contenido/cronologia.json`. Cada hito y foto tiene su texto en español e inglés.
- **Exposiciones**: En `contenido/exposiciones.json` divididas en exposiciones *en vida* y *póstumas*.
- **Colecciones**: En `contenido/colecciones.json` con los museos donde se conserva obra.
- **Archivo y Enlaces**: En `contenido/archivo.json` con la bibliografía y fondo del Smithsonian.

---

## 5. Censo de Obras y Consultas

- En la página **Censo de obras**, coleccionistas e instituciones pueden enviar fichas técnicas y fotografías de obras para su registro.
- En la página **Contacto**, se reciben solicitudes de autenticación, reproducción de imágenes, investigación y prensa.
- Los envíos se canalizan a través de los formularios conectados al correo de los herederos.
