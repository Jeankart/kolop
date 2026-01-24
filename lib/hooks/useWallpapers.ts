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
      const wallpapersRef = collection(db, 'wallpapers');
      const q = query(wallpapersRef);
      
      getDocs(q)
        .then((snapshot) => {
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              ...(doc.data() as Omit<Wallpaper, 'id'>),
            });
          });
          data.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1]) || 0;
            const bNum = parseInt(b.id.split('_')[1]) || 0;
            return aNum - bNum;
          });
          setWallpapers(data);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError(`Error cargando wallpapers: ${error.message}`);
          setLoading(false);
        });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
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
      
      // Usar onSnapshot para escuchar cambios en tiempo real
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data: Wallpaper[] = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...(doc.data() as Omit<Wallpaper, 'id'>),
          });
        });
        
        data.sort((a, b) => {
          const aNum = parseInt(a.id.split('_')[1] || '999999', 10);
          const bNum = parseInt(b.id.split('_')[1] || '999999', 10);
          return aNum - bNum;
        });
        
        setWallpapers(data);
        setLoading(false);
        setError(null);
      }, (error: any) => {
        setError(`Error cargando ${category}: ${error.message}`);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
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
      
      getDocs(q)
        .then((snapshot) => {
          const data: Wallpaper[] = [];
          snapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              ...(doc.data() as Omit<Wallpaper, 'id'>),
            });
          });
          
          data.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1] || '999999', 10);
            const bNum = parseInt(b.id.split('_')[1] || '999999', 10);
            return aNum - bNum;
          });
          
          setWallpapers(data);
          setLoading(false);
          setError(null);
        })
        .catch((error: any) => {
          setError(`Error cargando Featured: ${error.message}`);
          setLoading(false);
        });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      setLoading(false);
    }
  }, []);

  return { wallpapers, loading, error };
};
