#!/usr/bin/env node

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function cleanup() {
  try {
    const walluploadDir = path.join(__dirname, '../public/wallUploads');
    const existingFiles = fs.readdirSync(walluploadDir);
    const existingIds = new Set();
    
    for (const file of existingFiles) {
      const match = file.match(/^(\d+)-/);
      if (match) existingIds.add(match[1]);
    }
    
    console.log('📂 IDs con archivos:', Array.from(existingIds).sort().join(', '));
    
    const snapshot = await db.collection('wallpapers').get();
    const toDelete = [];
    
    for (const doc of snapshot.docs) {
      if (!existingIds.has(doc.id)) {
        toDelete.push(doc.id);
      }
    }
    
    console.log('\n⚠️  Wallpapers a eliminar (sin archivos):', toDelete.join(', '));
    
    if (toDelete.length === 0) {
      console.log('✅ No hay wallpapers huérfanos');
      process.exit(0);
    }
    
    for (const id of toDelete) {
      await db.collection('wallpapers').doc(id).delete();
      console.log(`   ✅ Eliminado: ${id}`);
    }
    
    console.log(`\n✨ Limpieza completada! Eliminados: ${toDelete.length}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

cleanup();
