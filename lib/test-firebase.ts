// Simple Firebase test - no React, just raw calls
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  console.log('[testFirebase] Starting test...');
  console.log('[testFirebase] db:', db);
  
  try {
    const col = collection(db, 'wallpaper');
    console.log('[testFirebase] Collection created:', col);
    
    const q = query(col);
    console.log('[testFirebase] Query created:', q);
    
    const snapshot = await getDocs(q);
    console.log('[testFirebase] ✅ SUCCESS! Got snapshot with', snapshot.docs.length, 'docs');
    return snapshot;
  } catch (error) {
    console.error('[testFirebase] ❌ ERROR:', error);
    throw error;
  }
}
