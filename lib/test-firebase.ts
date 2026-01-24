// Simple Firebase test - no React, just raw calls
import { collection, getDocs, query, collectionGroup } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  console.log('[testFirebase] Starting test...');
  console.log('[testFirebase] db:', db);
  
  try {
    // First, let's check the wallpapers collection
    const wallpapersCol = collection(db, 'wallpapers');
    console.log('[testFirebase] Querying wallpapers collection...');
    
    const q = query(wallpapersCol);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('getDocs timeout after 3s')), 3000)
    );
    
    const snapshot = await Promise.race([getDocs(q), timeoutPromise]) as any;
    console.log('[testFirebase] ✅ Wallpapers collection result:', snapshot.docs.length, 'docs');
    
    if (snapshot.docs.length > 0) {
      console.log('[testFirebase] First doc sample:', snapshot.docs[0].data());
    }
    
    return snapshot;
  } catch (error) {
    console.error('[testFirebase] ❌ ERROR:', error);
    
    // If wallpapers is empty, try to find where the data really is
    console.log('[testFirebase] Attempting to find all collections...');
    try {
      // Try common alternative collection names
      const alts = ['wallpaper', 'wall', 'images', 'images_wallpaper', 'wallpapers_data'];
      for (const altName of alts) {
        try {
          const altCol = collection(db, altName);
          const altQ = query(altCol);
          const altSnapshot = await getDocs(altQ);
          if (altSnapshot.docs.length > 0) {
            console.log(`[testFirebase] ⚠️ FOUND DATA in collection "${altName}": ${altSnapshot.docs.length} docs`);
            console.log('[testFirebase] First doc:', altSnapshot.docs[0].data());
          }
        } catch (e) {
          // Ignore
        }
      }
    } catch (searchError) {
      console.error('[testFirebase] Could not search collections:', searchError);
    }
    
    throw error;
  }
}
