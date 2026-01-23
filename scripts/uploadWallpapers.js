#!/usr/bin/env node

/**
 * Script para crear documentos de wallpapers en Firestore
 * Las imágenes se sirven desde public/ (sin usar Storage)
 * Uso: node scripts/uploadWallpapers.js
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: firebase-service-account.json no encontrado');
  console.error('   Descárgalo desde Firebase Console > Project Settings > Service Accounts');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Mapeo de carpetas a categorías
const FOLDERS = {
  wallFeatured: 'Featured',
  wallLive: 'Live',
  wallCharging: 'Charging',
  wallAI: 'AI',
  wallAesthetic: 'Aesthetic',
  wallCats: 'Cats',
  wallCars: 'Cars',
  'wallB&W': 'B&W',
  wallUrban: 'Urban',
  wallFilms: 'Films',
  wallCute: 'Cute',
  wallAnime: 'Anime',
};

async function uploadWallpapers() {
  try {
    console.log('🚀 Iniciando carga de wallpapers...\n');

    for (const [folderName, category] of Object.entries(FOLDERS)) {
      const folderPath = path.join(__dirname, `../public/${folderName}`);

      if (!fs.existsSync(folderPath)) {
        console.log(`⏭️  Carpeta no existe: ${folderName}`);
        continue;
      }

      console.log(`📁 Procesando: ${category} (${folderName})`);

      // Leer archivos de la carpeta
      const files = fs.readdirSync(folderPath).filter(f => {
        return f.endsWith('.gif') || f.endsWith('.jpg') || f.endsWith('.png');
      });

      // Agrupar covers y descargas
      const wallpapers = new Map();

      for (const file of files) {
        const match = file.match(/^(.+?)(lg)?\.(\w+)$/);
        if (!match) continue;

        const baseName = match[1];
        const isLarge = !!match[2];
        
        if (!wallpapers.has(baseName)) {
          wallpapers.set(baseName, { cover: null, download: null });
        }

        const wp = wallpapers.get(baseName);
        if (isLarge) {
          wp.download = file;
        } else {
          wp.cover = file;
        }
      }

      // Procesar cada wallpaper
      for (const [baseName, images] of wallpapers) {
        try {
          const coverFile = images.cover;
          const downloadFile = images.download || images.cover;

          if (!coverFile) continue;

          console.log(`  ⬆️  ${baseName}`);

          // Crear documento en Firestore
          // Las imágenes se sirven desde public/wallXXX/ (sin Storage)
          const docId = `${category.toLowerCase()}_${baseName}`;
          await db.collection('wallpapers').doc(docId).set({
            name: baseName,
            categories: [category], // Array de categorías
            image: coverFile, // Nombre del archivo para rutas locales: /wallFeatured/wall1.gif
            featured: category === 'Featured',
            downloads: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          console.log(`     ✅ Creado en Firestore`);
        } catch (error) {
          console.error(`     ❌ Error: ${error.message}`);
        }
      }

      console.log('');
    }

    console.log('✨ ¡Carga completada!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

uploadWallpapers();
