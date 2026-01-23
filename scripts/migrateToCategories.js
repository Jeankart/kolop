#!/usr/bin/env node

/**
 * Script para migrar documentos de Firestore
 * De: category (string) 
 * A: categories (array)
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

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de datos...\n');

    // Obtener todos los documentos
    const snapshot = await db.collection('wallpapers').get();
    
    if (snapshot.empty) {
      console.log('ℹ️  No hay documentos para migrar');
      process.exit(0);
    }

    let migratedCount = 0;
    let alreadyMigratedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const docId = doc.id;

      // Si ya tiene categories, saltarlo
      if (data.categories && Array.isArray(data.categories)) {
        console.log(`  ⏭️  ${docId} - Ya migrado`);
        alreadyMigratedCount++;
        continue;
      }

      // Si tiene category (viejo formato)
      if (data.category) {
        console.log(`  🔄 ${docId} - category: "${data.category}" → categories: ["${data.category}"]`);

        await db.collection('wallpapers').doc(docId).update({
          categories: [data.category],
          category: admin.firestore.FieldValue.delete(), // Eliminar campo viejo
        });

        migratedCount++;
        console.log(`     ✅ Migrado`);
      }
    }

    console.log(`\n✨ Migración completada!`);
    console.log(`   ✅ Migrados: ${migratedCount}`);
    console.log(`   ⏭️  Ya migrados: ${alreadyMigratedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrate();
