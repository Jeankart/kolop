#!/usr/bin/env node

/**
 * Script para reemplazar "Hot" por "Featured" en Firestore
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function replaceHotWithFeatured() {
  try {
    console.log('🔄 Reemplazando "Hot" por "Featured"...\n');

    const snapshot = await db.collection('wallpapers').get();
    
    let updatedCount = 0;
    const batch = db.batch();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      if (data.categories && Array.isArray(data.categories)) {
        // Si contiene "Hot", reemplazarlo por "Featured"
        if (data.categories.includes('Hot')) {
          const newCategories = data.categories.map(cat => cat === 'Hot' ? 'Featured' : cat);
          console.log(`  🔄 ${doc.id}: ${data.categories.join(', ')} → ${newCategories.join(', ')}`);
          batch.update(doc.ref, { categories: newCategories });
          updatedCount++;
        }
      }
    }

    await batch.commit();

    console.log(`\n✨ Actualización completada!`);
    console.log(`   ✅ Actualizados: ${updatedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

replaceHotWithFeatured();
