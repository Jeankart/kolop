// Simple Firebase test - no React, just raw calls
import { collection, getDocs, query, collectionGroup } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  console.log('[testFirebase] Starting test...');
  console.log('[testFirebase] db:', db);
  
  try {
    // First, let's check the wallpapers collection without any filters
    const wallpapersCol = collection(db, 'wallpapers');
    console.log('[testFirebase] Querying wallpapers collection...');
    
    const q = query(wallpapersCol);
    const snapshot = await getDocs(q);
    
    console.log('[testFirebase] ✅ Wallpapers collection result:', snapshot.docs.length, 'docs');
    
    if (snapshot.docs.length > 0) {
      console.log('[testFirebase] ========= DOCUMENT STRUCTURE ==========');
      const firstDoc = snapshot.docs[0];
      const firstData = firstDoc.data();
      console.log('[testFirebase] First doc ID:', firstDoc.id);
      console.log('[testFirebase] First doc data:', firstData);
      console.log('[testFirebase] Fields in first doc:', Object.keys(firstData));
      
      // Check if categories field exists and what format it has
      if ('categories' in firstData) {
        console.log('[testFirebase] ✅ "categories" field exists');
        console.log('[testFirebase] categories value:', firstData.categories);
        console.log('[testFirebase] categories type:', typeof firstData.categories);
      } else {
        console.log('[testFirebase] ❌ "categories" field does NOT exist');
      }
      
      // Check if category field exists (singular)
      if ('category' in firstData) {
        console.log('[testFirebase] ⚠️ "category" field exists (singular):', firstData.category);
      }
      
      console.log('[testFirebase] ========= TESTING QUERY FILTERS ==========');
      // Test if filtering works
      const { query: queryFunc, where } = await import('firebase/firestore');
      const testCategories = ['Featured', 'Charging', 'Aesthetic'];
      
      for (const cat of testCategories) {
        try {
          const filterQ = queryFunc(wallpapersCol, where('categories', 'array-contains', cat));
          const filterSnapshot = await getDocs(filterQ);
          console.log(`[testFirebase] Query for "${cat}": ${filterSnapshot.docs.length} docs`);
        } catch (e: any) {
          console.log(`[testFirebase] Query for "${cat}" failed:`, e.message);
        }
      }
    }
    
    return snapshot;
  } catch (error) {
    console.error('[testFirebase] ❌ ERROR:', error);
    throw error;
  }
}
