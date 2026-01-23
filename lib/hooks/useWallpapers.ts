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
    setLoading(true);
    try {
      const q = query(collection(db, 'wallpapers'));
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
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
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Firebase Error:', error);
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
    setLoading(true);
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', category)
      );
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
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
          
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Firebase Error:', error);
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
    setLoading(true);
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', 'Featured')
      );
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
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
          
          setWallpapers(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Firebase Error:', error);
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
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando wallpapers');
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};
