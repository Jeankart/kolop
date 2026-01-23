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
    try {
      const q = query(collection(db, 'wallpapers'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: Wallpaper[] = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...(doc.data() as Omit<Wallpaper, 'id'>),
          });
        });
        setWallpapers(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando wallpapers');
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
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', category) // Cambiar a array-contains
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: Wallpaper[] = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...(doc.data() as Omit<Wallpaper, 'id'>),
          });
        });
        
        // Ordenar por ID numérico (extrayendo el número del ID)
        data.sort((a, b) => {
          const aNum = parseInt(a.id.split('_')[1] || '999999', 10);
          const bNum = parseInt(b.id.split('_')[1] || '999999', 10);
          return aNum - bNum;
        });
        
        setWallpapers(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando wallpapers');
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
    try {
      const q = query(
        collection(db, 'wallpapers'),
        where('categories', 'array-contains', 'Featured') // Buscar por categoría
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
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
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando wallpapers');
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};
