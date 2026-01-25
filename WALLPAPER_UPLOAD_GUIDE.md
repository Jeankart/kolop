# 📱 Guía de Subida de Wallpapers

## Descripción General

Este documento explica el sistema completo de subida y gestión de wallpapers en la aplicación. El sistema está diseñado para ser simple pero potente, permitiendo automáticamente sincronizar wallpapers desde una carpeta local a la base de datos Firestore.

---

## 📋 Tabla de Contenidos

1. [Estructura de Datos](#estructura-de-datos)
2. [Categorías Disponibles](#categorías-disponibles)
3. [Proceso de Subida](#proceso-de-subida)
4. [Formato de Nombres](#formato-de-nombres)
5. [Sincronización con Firestore](#sincronización-con-firestore)
6. [APIs Administrativas](#apis-administrativas)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Estructura de Datos

### Documento en Firestore

Cada wallpaper se almacena en Firestore con la siguiente estructura:

```typescript
interface Wallpaper {
  id: string;                    // ID único del wallpaper
  name: string;                  // Nombre legible
  categories: string[];          // Array de categorías
  files: {
    cover: string;               // Archivo de portada (GIF o JPG)
    download: string;            // Archivo de descarga (JPG)
    video?: string;              // Archivo de video opcional (MP4)
  };
  featured: boolean;             // Indicador si es destacado
  downloads: number;             // Contador de descargas (comienza en 0)
}
```

### Ejemplo de Documento

```json
{
  "id": "200",
  "name": "Live Charging Cars",
  "categories": ["Live", "Featured", "Charging", "Charging-Cars"],
  "files": {
    "cover": "200-Live-Featured-Charging-Cars.gif",
    "download": "200-Live-Featured-Charging-Cars.jpg",
    "video": "200-Live-Featured-Charging-Cars.mp4"
  },
  "featured": true,
  "downloads": 0
}
```

---

## 🏷️ Categorías Disponibles

La aplicación soporta las siguientes categorías:

### Categorías Principales

| Categoría | Descripción | Ruta |
|-----------|-------------|------|
| **IOS** | Wallpapers para dispositivos iOS | `/app/ios/page.tsx` |
| **Live** | Wallpapers animados (video) | `/app/live/page.tsx` |
| **AI** | Generados con IA | `/app/ai/page.tsx` |
| **Aesthetic** | Estilo estético | `/app/aesthetic/page.tsx` |
| **Anime** | Temática anime | `/app/anime/page.tsx` |
| **B&W** | Blanco y Negro | `/app/bw/page.tsx` |
| **Cars** | Temática de autos | `/app/cars/page.tsx` |
| **Cats** | Temática de gatos | `/app/cats/page.tsx` |
| **Charging** | Temática de carga | `/app/charging/page.tsx` |
| **Cute** | Temática adorable | `/app/cute/page.tsx` |
| **Films** | Temática de películas | `/app/films/page.tsx` |
| **Urban** | Temática urbana | `/app/urban/page.tsx` |
| **Featured** | Destacados (especial, no es una página) | Página principal |

### Reglas de Categorización

1. **Cada wallpaper puede tener múltiples categorías**
   - Ejemplo: Un wallpaper puede ser `Featured`, `Live`, `Charging` y `Cars` al mismo tiempo

2. **La categoría "Featured" es especial**
   - Los wallpapers marcados como Featured aparecen en la sección "Hot 🔥" de la página principal
   - Se identifica automáticamente en el nombre del archivo

3. **Capitalización correcta**
   - Las categorías deben capitalizarse correctamente:
     - `IOS` (todo mayúsculas)
     - `B&W` (con ampersand)
     - `Live` (L mayúscula)
     - `AI` (todo mayúsculas)
     - Resto: Primera letra mayúscula

---

## 🚀 Proceso de Subida

### Flujo Completo

```
1. Preparar archivos
   ↓
2. Nombrarlos correctamente (ID-Categoria1-Categoria2.ext)
   ↓
3. Copiarlos a la carpeta /public/wallUploads/
   ↓
4. Ejecutar sincronización desde /admin/hard-delete
   ↓
5. Sistema automáticamente:
   - Lee archivos de wallUploads
   - Parsea nombres
   - Agrupa por ID
   - Detecta Featured
   - Sincroniza a Firestore
   ↓
6. ¡Listo! Los wallpapers aparecen en la app
```

### Paso a Paso

#### 1. Preparar los Archivos

Necesitas 2-3 archivos por wallpaper:

- **Cover (.gif o .jpg)** - Para la vista previa en los carruseles
- **Download (.jpg)** - Para descargar en alta calidad
- **Video (.mp4)** - OPCIONAL, solo para wallpapers animados (Live)

Ejemplo:
```
200-Live-Featured-Charging-Cars.gif
200-Live-Featured-Charging-Cars.jpg
200-Live-Featured-Charging-Cars.mp4
```

#### 2. Copiar a la Carpeta

Copia los archivos a:
```
/public/wallUploads/
```

#### 3. Sincronizar

Ve a la URL de administración:
```
http://localhost:3000/admin/hard-delete
```

Esta página automáticamente:
- Limpia toda la base de datos Firestore
- Lee la carpeta `wallUploads`
- Recrea todos los documentos
- Muestra el progreso en tiempo real

---

## 📝 Formato de Nombres

### Estructura Obligatoria

```
[ID]-[Categoria1]-[Categoria2]-[Categoria3].[extension]
```

### Reglas

1. **ID** - Número único que agrupa los archivos del mismo wallpaper
   - Ejemplo: `200`, `601`, `1`
   - No puede repetirse para diferentes wallpapers

2. **Categorías** - Separadas por guiones `-`
   - Mínimo: 1 categoría
   - Máximo: Sin límite
   - Orden: Listar categorías lógicamente
   - Si incluyes `Featured`, aparecerá en destacados

3. **Extensiones soportadas**
   - `.gif` - Animado (recomendado para preview/cover)
   - `.jpg` - Estática (recomendado para descarga)
   - `.png` - Estática (soportado)
   - `.mp4` - Video (para Live wallpapers)

### Ejemplos Correctos

```
# Wallpaper AI destacado
500-Featured-AI.jpg
501-Featured-AI.jpg

# Wallpaper Live con todas las características
200-Live-Featured-Charging-Cars.gif
200-Live-Featured-Charging-Cars.jpg
200-Live-Featured-Charging-Cars.mp4

# Wallpaper iOS
600-Featured-IOS.jpg
601-Featured-IOS.jpg
605-IOS.jpg

# Wallpaper múltiples categorías
1-Featured-Aesthetic.gif
1-Featured-Aesthetic.jpg
```

### Ejemplos Incorrectos ❌

```
❌ 200.jpg              # Falta el nombre/categoría
❌ 200_Live_AI.jpg      # Usa guiones bajos, debe ser guiones
❌ 200-live-ai.jpg      # Categorías en minúsculas (será corregido)
❌ Live-200.jpg         # ID debe estar primero
❌ wallpaper.jpg        # Falta el ID
```

---

## 🔄 Sincronización con Firestore

### Cómo Funciona la Sincronización

El sistema de sincronización es completamente automático. Aquí está el flujo detallado:

#### 1. Lectura de Archivos

```typescript
// Se leen todos los archivos de /public/wallUploads/
// Se filtran: solo .gif, .jpg, .png, .mp4
// Se ignoran archivos que comienzan con .
```

#### 2. Parsing de Nombres

```typescript
// Extrae: ID, Categorías, Extensión
// Formato esperado: [ID]-[Categorias].[ext]

// Ejemplo:
// "200-Live-Featured-Charging-Cars.gif"
// ↓
// id: "200"
// categories: ["Live", "Featured", "Charging", "Charging-Cars"]
// ext: "gif"
```

#### 3. Agrupación por ID

```typescript
// Agrupa todos los archivos con el mismo ID
// 200-Live-Featured-Charging-Cars.gif  → cover (porque es .gif)
// 200-Live-Featured-Charging-Cars.jpg  → download
// 200-Live-Featured-Charging-Cars.mp4  → video
```

#### 4. Normalización de Categorías

```typescript
// Aplica reglas de capitalización
// "ios" → "IOS"
// "b&w" → "B&W"
// "live" → "Live"
// "featured" → "Featured"
// Rest → Primera letra mayúscula

// Resultado:
categories: ["Live", "Featured", "Charging", "Charging-Cars"]
```

#### 5. Detección de Featured

```typescript
// Si "Featured" está en las categorías
// → featured: true
// En caso contrario
// → featured: false
```

#### 6. Creación del Documento

```typescript
// Se crea un documento en Firestore con:
{
  id: "200",
  name: "Nombre automático (ID + categorías)",
  categories: ["Live", "Featured", "Charging", "Charging-Cars"],
  files: {
    cover: "200-Live-Featured-Charging-Cars.gif",
    download: "200-Live-Featured-Charging-Cars.jpg",
    video: "200-Live-Featured-Charging-Cars.mp4"
  },
  featured: true,  // Porque "Featured" está en categorías
  downloads: 0
}
```

### Clave Importante

- **Cada wallpaper = 1 documento en Firestore**
- **Todos los archivos con el mismo ID = 1 wallpaper**
- **Si un ID tiene múltiples .gif o .jpg, el primero en orden alfabético es elegido**

---

## 🔧 APIs Administrativas

### 1. Hard Delete (Limpiar Todo)

**Endpoint:** `POST /api/admin/hard-delete`

Elimina TODOS los documentos de Firestore. Útil para:
- Limpiar datos incorrectos
- Preparar resincronización completa

```bash
curl -X POST http://localhost:3000/api/admin/hard-delete
```

**Respuesta:**
```json
{
  "success": true,
  "stats": {
    "attemptedDelete": 17,
    "deletedCount": 17,
    "remainingCount": 0
  }
}
```

### 2. Full Resync (Sincronizar)

**Endpoint:** `POST /api/admin/full-resync`

Lee la carpeta `wallUploads` y sincroniza todo a Firestore:
1. Elimina documentos existentes
2. Lee archivos de `wallUploads`
3. Parsea nombres
4. Agrupa por ID
5. Crea documentos en Firestore

```bash
curl -X POST http://localhost:3000/api/admin/full-resync
```

**Respuesta:**
```json
{
  "success": true,
  "steps": [
    {
      "step": 1,
      "message": "✅ Eliminados 17 documentos de Firestore"
    },
    {
      "step": 2,
      "message": "✅ Leyendo 67 archivos de wallUploads"
    },
    {
      "step": 3,
      "message": "✅ Procesados 17 wallpapers únicos"
    },
    {
      "step": 4,
      "message": "✅ Creados 17 documentos en Firestore"
    }
  ],
  "summary": "Sincronización completada: 17 wallpapers"
}
```

### 3. Debug Firestore (Inspeccionar)

**Endpoint:** `GET /api/admin/debug-firestore`

Retorna información detallada de todo lo que hay en Firestore:
- Total de documentos
- IDs únicos
- Duplicados (si los hay)
- Lista completa de wallpapers

```bash
curl http://localhost:3000/api/admin/debug-firestore
```

**Respuesta:**
```json
{
  "stats": {
    "totalDocuments": 17,
    "uniqueIds": 17,
    "duplicatesFound": 0
  },
  "wallpapers": [
    {
      "id": "1",
      "name": "1",
      "categories": ["Featured", "Aesthetic"],
      "featured": true,
      "downloads": 0
    },
    ...
  ],
  "duplicates": []
}
```

### Acceso Web a APIs

También puedes acceder a estas APIs desde el navegador:

- **Sincronizar:** http://localhost:3000/admin/hard-delete
- **Inspeccionar:** http://localhost:3000/api/admin/debug-firestore

---

## 📊 Estructura de Carpetas

```
/public/wallUploads/
├── 1-Featured-Aesthetic.gif
├── 1-Featured-Aesthetic.jpg
├── 200-Live-Featured-Charging-Cars.gif
├── 200-Live-Featured-Charging-Cars.jpg
├── 200-Live-Featured-Charging-Cars.mp4
├── 500-Featured-AI.jpg
├── 501-Featured-AI.jpg
├── ...
└── 622-IOS.jpg
```

**Carpeta Alternativa (si usas):**
```
/wallUploads/  (en raíz del proyecto)
```

---

## 🎯 Casos de Uso Comunes

### Caso 1: Agregar un Wallpaper Nuevo

1. Prepara 2-3 archivos:
   - `150-Anime-Cute.gif` (preview)
   - `150-Anime-Cute.jpg` (descarga)

2. Cópialos a `/public/wallUploads/`

3. Ve a http://localhost:3000/admin/hard-delete

4. Espera a que se sincronice

5. ¡Listo! Aparecerá en la sección Anime y Cute

### Caso 2: Actualizar un Wallpaper Existente

1. Modifica los archivos (mantén el mismo ID)

2. Reemplaza los archivos en `/public/wallUploads/`

3. Ve a http://localhost:3000/admin/hard-delete

4. Se actualizará automáticamente

### Caso 3: Marcar como Destacado

1. Asegúrate que el nombre tenga "Featured"
   - `200-Featured-Live.jpg` ✅
   - `200-Live-Featured.jpg` ✅
   - `200-Live.jpg` ❌ (no aparecerá en Hot)

2. Resincroniza

3. Aparecerá en la sección "Hot 🔥"

### Caso 4: Wallpaper Live con Video

1. Prepara 3 archivos:
   - `200-Live-Featured.gif` (preview)
   - `200-Live-Featured.jpg` (descarga estática)
   - `200-Live-Featured.mp4` (video)

2. Cópialos a `/public/wallUploads/`

3. Resincroniza

4. Los usuarios podrán descargar el video

---

## 🐛 Troubleshooting

### Problema: Los wallpapers no aparecen

**Causas comunes:**

1. **Nombres incorrectos**
   - Verifica el formato: `[ID]-[Categorias].[ext]`
   - Usa guiones `-`, no guiones bajos `_`

2. **Archivos en carpeta incorrecta**
   - Deben estar en `/public/wallUploads/`
   - Verifica que la carpeta exista

3. **No se ejecutó la sincronización**
   - Ve a http://localhost:3000/admin/hard-delete
   - Espera a que termine

**Solución:**

```bash
# 1. Verifica que los archivos estén presentes
ls -la /public/wallUploads/

# 2. Inspecciona Firestore
curl http://localhost:3000/api/admin/debug-firestore | jq '.stats'

# 3. Resincroniza
curl -X POST http://localhost:3000/api/admin/full-resync
```

### Problema: Firestore muestra duplicados

**Causas:**

1. Sincronización incompleta
2. IDs duplicados con categorías diferentes

**Solución:**

```bash
# Ejecuta hard-delete y full-resync
curl -X POST http://localhost:3000/api/admin/hard-delete
curl -X POST http://localhost:3000/api/admin/full-resync
```

### Problema: Wallpaper no aparece en categoría correcta

**Verificar:**

1. ¿Tiene la categoría en el nombre?
   - `200-Live-Featured.jpg` ✅ (aparece en Live)
   - `200-Featured.jpg` ❌ (no aparece en Live)

2. ¿Está correctamente capitalizada?
   - `IOS` no `ios`
   - `B&W` no `bw`
   - `Live` no `live`

3. ¿Se resincronizó después de cambiar el nombre?

### Problema: El video no descarga

**Verificar:**

1. ¿Existe el archivo `.mp4`?
   - Debe tener el mismo ID que el `.jpg` y `.gif`

2. ¿Es un wallpaper Live?
   - Debe tener la categoría `Live`

3. ¿Está en `/public/wallUploads/`?

---

## 📚 Referencia Rápida

### Comandos Útiles

```bash
# Ver todos los archivos en wallUploads
ls -la /public/wallUploads/ | grep -E "\.(gif|jpg|png|mp4)$"

# Contar archivos
ls -1 /public/wallUploads/ | grep -E "\.(gif|jpg|png|mp4)$" | wc -l

# Inspeccionar Firestore
curl -s http://localhost:3000/api/admin/debug-firestore | jq '.stats'

# Listar wallpapers de una categoría
curl -s http://localhost:3000/api/admin/debug-firestore | jq '.wallpapers[] | select(.categories[] == "IOS")'
```

### URLs Administrativas

| Función | URL |
|---------|-----|
| Sincronizar | http://localhost:3000/admin/hard-delete |
| Inspeccionar | http://localhost:3000/api/admin/debug-firestore |
| Ver API | http://localhost:3000/api/admin/full-resync |

---

## 🎨 Mejores Prácticas

1. **Nombres consistentes**
   - Siempre usa el formato: `ID-Categorías.ext`
   - Mantén un patrón en los IDs (secuencial)

2. **Calidad de archivos**
   - GIF: 600x1200px máximo (para preview)
   - JPG: 1080x2160px (para descarga)
   - MP4: 1080x2160px, 30fps, 5-10MB máximo

3. **Categorías lógicas**
   - Usa categorías coherentes
   - Evita categorías duplicadas
   - Agrupa temáticamente

4. **Resincronización**
   - Siempre resincroniza después de cambios
   - Verifica con el debug endpoint
   - Usa hard-delete si algo se corrompe

5. **Backups**
   - Mantén una copia de los archivos originales
   - Documenta los IDs usados
   - Antes de cambios mayores, inspecciona Firestore

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica el formato de nombres
2. Inspecciona Firestore con debug endpoint
3. Resincroniza completamente
4. Revisa los logs del servidor (`npm run dev`)

---

**Última actualización:** 25 de enero de 2026
