// Simple Firebase test - no React, just raw calls
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  try {
    const wallpapersCol = collection(db, 'wallpapers');
    const q = query(wallpapersCol);
    const snapshot = await getDocs(q);
    console.log('[Firebase] Connection OK - Found', snapshot.docs.length, 'wallpapers');
    return snapshot;
  } catch (error) {
    console.error('[Firebase] Connection failed:', error);
    throw error;
  }
}
