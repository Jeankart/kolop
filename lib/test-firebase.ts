// Simple Firebase test - no React, just raw calls
// Test with the CORRECT collection name: wallpapers (plural)
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  console.log('[testFirebase] Starting test...');
  console.log('[testFirebase] db:', db);
  
  try {
    const col = collection(db, 'wallpapers');
    console.log('[testFirebase] Collection created:', col);
    
    const q = query(col);
    console.log('[testFirebase] Query created:', q);
    
    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('getDocs timeout after 3s')), 3000)
    );
    
    // Race between getDocs and timeout
    const snapshot = await Promise.race([getDocs(q), timeoutPromise]) as any;
    console.log('[testFirebase] ✅ SUCCESS! Got snapshot with', snapshot.docs.length, 'docs');
    return snapshot;
  } catch (error) {
    console.error('[testFirebase] ❌ ERROR:', error);
    throw error;
  }
}
