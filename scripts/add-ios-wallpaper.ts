import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC5p_z8PqS2VF4aB7mK9vH3xL2wQ1rT4sU",
  authDomain: "kolop-36c54.firebaseapp.com",
  projectId: "kolop-36c54",
  storageBucket: "kolop-36c54.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addIOSWallpaper() {
  try {
    const wallpapersRef = collection(db, 'wallpapers');
    const docId = '32-Feature-IOS';
    
    // Verificar si ya existe
    const q = query(wallpapersRef, where('image', '==', '32-Feature-IOS.jpg'));
    const existing = await getDocs(q);
    
    if (existing.docs.length > 0) {
      console.log('✅ El wallpaper ya existe en Firestore');
      process.exit(0);
    }
    
    // Agregar el wallpaper
    await setDoc(doc(wallpapersRef, docId), {
      name: 'iOS Infinite Wallpaper',
      categories: ['IOS'],
      image: '32-Feature-IOS.jpg',
      featured: false,
      downloads: 0,
    });
    
    console.log('✅ Wallpaper IOS agregado exitosamente con ID:', docId);
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error agregando wallpaper:', error.message);
    process.exit(1);
  }
}

addIOSWallpaper();
