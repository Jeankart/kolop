import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface Wallpaper {
  id: string;
  name: string;
  category: string;
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
        where('category', '==', category)
      );
      
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
        where('featured', '==', true)
      );
      
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
