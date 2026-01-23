#!/usr/bin/env node

/**
 * Script para eliminar documentos viejos de Firestore
 * Mantiene solo los documentos con IDs nuevos (wallpaper_*)
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

async function cleanFirestore() {
  try {
    console.log('🗑️  Limpiando Firestore...\n');

    // Obtener todos los documentos
    const snapshot = await db.collection('wallpapers').get();
    
    let deletedCount = 0;
    let keptCount = 0;

    const batch = db.batch();

    for (const doc of snapshot.docs) {
      const docId = doc.id;
      
      // Eliminar documentos viejos (que no empiezan con wallpaper_)
      if (!docId.startsWith('wallpaper_')) {
        console.log(`  🗑️  Eliminando: ${docId}`);
        batch.delete(doc.ref);
        deletedCount++;
      } else {
        console.log(`  ✅ Manteniendo: ${docId}`);
        keptCount++;
      }
    }

    await batch.commit();

    console.log(`\n✨ Limpieza completada!`);
    console.log(`   🗑️  Eliminados: ${deletedCount}`);
    console.log(`   ✅ Mantenidos: ${keptCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanFirestore();
