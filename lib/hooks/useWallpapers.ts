import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface Wallpaper {
  id: string;
  name: string;
  categories: string[]; // Cambiar de category a categories array
  image: string;
  featured: boolean;
  downloads: number;
}

export const useWallpapers = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useWallpapers] Hook mounted, fetching wallpapers...');
    setLoading(true);
    try {
      const q = query(collection(db, 'wallpapers'));
      console.log('[useWallpapers] Query created:', q);
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log('[useWallpapers] Snapshot received. Docs count:', snapshot.docs.length);
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
            console.log('[useWallpapers] Document:', doc.id, doc.data());
            data.push({
              id: doc.id,
              ...(doc.data() as Omit<Wallpaper, 'id'>),
            });
          });
          // Ordenar por ID numérico
          data.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1]) || 0;
            const bNum = parseInt(b.id.split('_')[1]) || 0;
            return aNum - bNum;
          });
          console.log('[useWallpapers] Final data:', data);
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('[useWallpapers] Firebase Error:', error);
          setError(`Error cargando wallpapers: ${error.message}`);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error:', errorMsg);
      setError(errorMsg);
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};

export const useWallpapersByCategory = (category: string) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`[useWallpapersByCategory] Hook mounted for category: ${category}`);
    setLoading(true);
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', category)
      );
      console.log(`[useWallpapersByCategory] Query created for category: ${category}`);
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(`[useWallpapersByCategory] Snapshot for ${category}. Docs count:`, snapshot.docs.length);
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
            console.log(`[useWallpapersByCategory] Document for ${category}:`, doc.id, doc.data());
            data.push({
              id: doc.id,
              ...(doc.data() as Omit<Wallpaper, 'id'>),
            });
          });
          
          // Ordenar por ID numérico
          data.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1] || '999999', 10);
            const bNum = parseInt(b.id.split('_')[1] || '999999', 10);
            return aNum - bNum;
          });
          
          console.log(`[useWallpapersByCategory] Final data for ${category}:`, data);
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error(`[useWallpapersByCategory] Firebase Error for ${category}:`, error);
          setError(`Error cargando ${category}: ${error.message}`);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error:', errorMsg);
      setError(errorMsg);
      setLoading(false);
    }
  }, [category]);

  return { wallpapers, loading, error };
};

export const useWallpapersFeatured = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useWallpapersFeatured] Hook mounted, fetching Featured wallpapers...');
    setLoading(true);
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', 'Featured')
      );
      console.log('[useWallpapersFeatured] Query created');
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log('[useWallpapersFeatured] Snapshot received. Docs count:', snapshot.docs.length);
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
            console.log('[useWallpapersFeatured] Document:', doc.id, doc.data());
            data.push({
              id: doc.id,
              ...(doc.data() as Omit<Wallpaper, 'id'>),
            });
          });
          
          // Ordenar por ID numérico
          data.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1] || '999999', 10);
            const bNum = parseInt(b.id.split('_')[1] || '999999', 10);
            return aNum - bNum;
          });
          
          console.log('[useWallpapersFeatured] Final data:', data);
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('[useWallpapersFeatured] Firebase Error:', error);
          setError(`Error cargando Featured: ${error.message}`);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error:', errorMsg);
      setError(errorMsg);
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};
