/**
 * Obtiene la ruta correcta de la imagen de cover
 * Intenta cargar el .gif primero, si no existe cae a .jpg
 * @param imagePath - Ruta base de la imagen (puede ser .gif o .jpg)
 * @returns Ruta del archivo .gif (si es lo que intentamos cargar primero)
 */
export const getCoverImagePath = (imagePath: string): string => {
  if (!imagePath) return '';
  // Siempre intentar cargar gif primero si existe
  return imagePath.replace(/\.(jpg|jpeg|png)$/, '.gif');
};

/**
 * Genera el nombre del archivo .gif a partir de una ruta
 * @param imagePath - Ruta base de la imagen
 * @returns Ruta del archivo .gif
 */
export const getGifPath = (imagePath: string): string => {
  if (!imagePath) return '';
  return imagePath.replace(/\.(jpg|jpeg|png)$/, '.gif');
};

/**
 * Genera el nombre del archivo .jpg a partir de una ruta
 * @param imagePath - Ruta base de la imagen
 * @returns Ruta del archivo .jpg
 */
export const getJpgPath = (imagePath: string): string => {
  if (!imagePath) return '';
  return imagePath.replace(/\.gif$/, '.jpg');
};

/**
 * Obtiene la ruta del archivo de imagen original (tal como está en la BD)
 * @param imagePath - Ruta base de la imagen
 * @returns Ruta del archivo original
 */
export const getOriginalImagePath = (imagePath: string): string => {
  if (!imagePath) return '';
  // Si ya termina en .gif, devolver tal cual
  if (imagePath.endsWith('.gif')) {
    return imagePath;
  }
  // Si es jpg, devolver tal cual
  return imagePath;
};
