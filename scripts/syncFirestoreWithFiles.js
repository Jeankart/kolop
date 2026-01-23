#!/usr/bin/env node

/**
 * Script para sincronizar Firestore con archivos reales en wallUploads
 * Elimina documentos cuyo archivo no existe
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
const UPLOAD_FOLDER = path.join(__dirname, '../public/wallUploads');

async function syncFirestore() {
  try {
    console.log('🔄 Sincronizando Firestore con archivos reales...\n');

    // Obtener archivos reales
    const files = fs.readdirSync(UPLOAD_FOLDER);
    const realFiles = new Set();
    
    for (const file of files) {
      if (file.endsWith('.gif')) {
        realFiles.add(file);
      }
    }

    console.log(`📁 Archivos en wallUploads: ${Array.from(realFiles).join(', ')}\n`);

    // Obtener documentos de Firestore
    const snapshot = await db.collection('wallpapers').get();
    
    let deletedCount = 0;
    let keptCount = 0;
    const batch = db.batch();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const imageFile = data.image;

      // Si el archivo NO existe en wallUploads, eliminar documento
      if (!realFiles.has(imageFile)) {
        console.log(`  🗑️  Eliminando: ${doc.id} (archivo no encontrado: ${imageFile})`);
        batch.delete(doc.ref);
        deletedCount++;
      } else {
        console.log(`  ✅ Manteniendo: ${doc.id} (${imageFile})`);
        keptCount++;
      }
    }

    await batch.commit();

    console.log(`\n✨ Sincronización completada!`);
    console.log(`   🗑️  Eliminados: ${deletedCount}`);
    console.log(`   ✅ Mantenidos: ${keptCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

syncFirestore();
