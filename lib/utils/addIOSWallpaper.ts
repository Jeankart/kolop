import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export async function addIOSWallpaper() {
  try {
    const wallpapersRef = collection(db, 'wallpapers');
    
    // Crear documento con ID basado en el nombre del archivo
    const docId = '32-Feature-IOS';
    
    await setDoc(doc(wallpapersRef, docId), {
      name: 'iOS Infinite Wallpaper',
      categories: ['IOS'],
      image: '32-Feature-IOS.jpg',
      featured: false,
      downloads: 0,
      createdAt: new Date(),
    });
    
    console.log('✅ Wallpaper IOS agregado exitosamente con ID:', docId);
  } catch (error) {
    console.error('❌ Error agregando wallpaper IOS:', error);
  }
}

// Ejecutar al cargar
addIOSWallpaper();
