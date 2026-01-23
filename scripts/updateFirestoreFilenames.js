#!/usr/bin/env node

/**
 * Script para actualizar Firestore con nuevos nombres de archivo
 * Lee los archivos en wallUploads y actualiza los documentos correspondientes
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

/**
 * Parsea el nombre del archivo
 * Ejemplo: "1-Live-Hot-Charging-Cars.gif" → { id: '1', filename: '1-Live-Hot-Charging-Cars.gif' }
 */
function parseFilename(filename) {
  // Remover extensión
  const nameWithoutExt = filename.replace(/\.(gif|jpg|png)$/, '');
  const ext = filename.match(/\.(gif|jpg|png)$/)?.[0] || '.gif';
  
  // Split por guiones
  const parts = nameWithoutExt.split('-');
  
  if (parts.length < 1) return null;
  
  const id = parts[0];
  
  // Validar que sea un número
  if (!/^\d+$/.test(id)) return null;
  
  return { id, filename };
}

async function migrateFilenames() {
  try {
    console.log('🔄 Actualizando Firestore con nuevos nombres...\n');
    
    // Leer archivos de wallUploads
    const files = fs.readdirSync(UPLOAD_FOLDER);
    
    // Agrupar por ID
    const updates = new Map();
    
    for (const file of files) {
      if (file.startsWith('.')) continue;
      if (!file.endsWith('.gif') && !file.endsWith('.jpg') && !file.endsWith('.png')) continue;
      
      const parsed = parseFilename(file);
      if (!parsed) continue;
      
      const { id, filename } = parsed;
      
      // Guardar solo el .gif (cover)
      if (filename.endsWith('.gif')) {
        updates.set(id, filename);
      }
    }
    
    console.log(`📂 Encontrados ${updates.size} wallpapers únicos\n`);
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    // Actualizar documentos en Firestore
    for (const [id, filename] of updates) {
      try {
        // Buscar documentos con este ID
        const snapshot = await db
          .collection('wallpapers')
          .where('id', '==', id)
          .get();
        
        if (snapshot.empty) {
          console.log(`  ⚠️  ID ${id} - No encontrado en Firestore`);
          notFoundCount++;
          continue;
        }
        
        // Actualizar todos los documentos con este ID
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
          batch.update(doc.ref, { image: filename });
        });
        
        await batch.commit();
        
        console.log(`  ✅ ID ${id} - ${filename}`);
        updatedCount++;
      } catch (error) {
        console.error(`  ❌ ID ${id} - Error: ${error.message}`);
      }
    }
    
    console.log(`\n✨ Actualización completada!`);
    console.log(`   ✅ Actualizados: ${updatedCount}`);
    console.log(`   ⚠️  No encontrados: ${notFoundCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrateFilenames();
