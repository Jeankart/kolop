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
    console.log('[useWallpapers] db object:', db);
    setLoading(true);
    
    // Add timeout to debug if onSnapshot ever fires
    let timeoutId: NodeJS.Timeout;
    
    try {
      const wallpapersRef = collection(db, 'wallpaper');
      console.log('[useWallpapers] Collection ref:', wallpapersRef.path);
      
      const q = query(wallpapersRef);
      console.log('[useWallpapers] Query created');
      
      timeoutId = setTimeout(() => {
        console.error('[useWallpapers] TIMEOUT: onSnapshot never fired after 5s');
        console.error('[useWallpapers] db:', db);
        console.error('[useWallpapers] query:', q);
      }, 5000);
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          clearTimeout(timeoutId);
          console.log('[useWallpapers] ✅ Snapshot received! Docs count:', snapshot.docs.length);
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
        (error: any) => {
          clearTimeout(timeoutId);
          console.error('[useWallpapers] ❌ Firebase Error:', error);
          console.error('[useWallpapers] Error code:', error.code);
          console.error('[useWallpapers] Error message:', error.message);
          setError(`Error cargando wallpapers: ${error.message}`);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
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
    
    let timeoutId: NodeJS.Timeout;
    
    try {
      const q = query(
        collection(db, 'wallpaper'),
        where('categories', 'array-contains', category)
      );
      console.log(`[useWallpapersByCategory] Query created for category: ${category}`);
      
      timeoutId = setTimeout(() => {
        console.error(`[useWallpapersByCategory] TIMEOUT for ${category}: onSnapshot never fired after 5s`);
      }, 5000);
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          clearTimeout(timeoutId);
          console.log(`[useWallpapersByCategory] ✅ Snapshot for ${category}. Docs count:`, snapshot.docs.length);
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
        (error: any) => {
          clearTimeout(timeoutId);
          console.error(`[useWallpapersByCategory] ❌ Firebase Error for ${category}:`, error);
          console.error(`[useWallpapersByCategory] Error code for ${category}:`, error.code);
          setError(`Error cargando ${category}: ${error.message}`);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
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
    
    let timeoutId: NodeJS.Timeout;
    
    try {
      const q = query(
        collection(db, 'wallpaper'),
        where('categories', 'array-contains', 'Featured')
      );
      console.log('[useWallpapersFeatured] Query created');
      
      timeoutId = setTimeout(() => {
        console.error('[useWallpapersFeatured] TIMEOUT: onSnapshot never fired after 5s');
      }, 5000);
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          clearTimeout(timeoutId);
          console.log('[useWallpapersFeatured] ✅ Snapshot received. Docs count:', snapshot.docs.length);
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
        (error: any) => {
          clearTimeout(timeoutId);
          console.error('[useWallpapersFeatured] ❌ Firebase Error:', error);
          console.error('[useWallpapersFeatured] Error code:', error.code);
          setError(`Error cargando Featured: ${error.message}`);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error:', errorMsg);
      setError(errorMsg);
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};
