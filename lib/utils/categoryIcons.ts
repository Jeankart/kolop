/**
 * Utility para obtener iconos de categorías
 */

export function getCategoryIcons(categories: string[]): string[] {
  const icons: Record<string, string> = {
    Live: '/icons/live.png',
    Charging: '/icons/charging.png',
    Featured: '/icons/featured.png',
  };
  
  // Retornar array de iconos en el orden: Featured, Live, Charging
  const result = [];
  if (categories.includes('Featured')) result.push(icons.Featured);
  if (categories.includes('Live')) result.push(icons.Live);
  if (categories.includes('Charging')) result.push(icons.Charging);
  
  return result;
}

// Mantener función antigua para compatibilidad
export function getCategoryIcon(categories: string[]): string | null {
  const icons = getCategoryIcons(categories);
  return icons.length > 0 ? icons[0] : null;
}

export function shouldShowCategoryIcon(categories: string[]): boolean {
  const iconCategories = ['Featured', 'Live', 'Charging'];
  
  // Si categories es un array, verificar si contiene alguna categoría con icono
  if (Array.isArray(categories)) {
    return categories.some(cat => iconCategories.includes(cat));
  }
  return false;
}
