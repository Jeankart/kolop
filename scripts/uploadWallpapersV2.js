#!/usr/bin/env node

/**
 * Script mejorado para crear documentos de wallpapers en Firestore
 * 
 * Estrategia de naming:
 * - Cover: 26337-Cars.gif
 * - Imagen lg: 26337-Cars-Live-Charging.jpg
 * 
 * El script parsea el nombre para extraer:
 * - ID: 26337
 * - Categorías: ['Cars', 'Live', 'Charging']
 * 
 * Las imágenes se sirven desde public/ (sin usar Storage)
 * Uso: node scripts/uploadWallpapersV2.js
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: firebase-service-account.json no encontrado');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Carpeta única donde subirán las imágenes
const UPLOAD_FOLDER = path.join(__dirname, '../public/wallUploads');

/**
 * Parsea el nombre del archivo para extraer ID y categorías
 * Ejemplo: "26337-Cars-Live-Charging.jpg" 
 * Retorna: { id: '26337', categories: ['Cars', 'Live', 'Charging'] }
 */
function parseFilename(filename) {
  // Remover extensión
  const nameWithoutExt = filename.replace(/\.(gif|jpg|png)$/, '');
  
  // Split por guiones
  const parts = nameWithoutExt.split('-');
  
  if (parts.length < 2) {
    console.warn(`  ⚠️  Formato inválido: ${filename} (debe ser ID-Categoria-Categoria.ext)`);
    return null;
  }
  
  const id = parts[0];
  const categories = parts.slice(1);
  
  // Validar que sea un número
  if (!/^\d+$/.test(id)) {
    console.warn(`  ⚠️  ID no es un número: ${filename}`);
    return null;
  }
  
  // Validar categorías válidas
  const validCategories = ['Featured', 'Live', 'Charging', 'AI', 'Aesthetic', 'Widgets', 'Cars', 'B&W', 'Urban', 'Films', 'Cute', 'Anime', 'Hot'];
  const invalidCats = categories.filter(cat => !validCategories.includes(cat));
  
  if (invalidCats.length > 0) {
    console.warn(`  ⚠️  Categorías inválidas: ${invalidCats.join(', ')} en ${filename}`);
    return null;
  }
  
  return { id, categories };
}

async function uploadWallpapers() {
  try {
    console.log('🚀 Iniciando carga de wallpapers (v2)...\n');
    
    // Verificar que la carpeta existe
    if (!fs.existsSync(UPLOAD_FOLDER)) {
      console.error(`❌ Carpeta no encontrada: ${UPLOAD_FOLDER}`);
      process.exit(1);
    }
    
    // Leer archivos de la carpeta
    const files = fs.readdirSync(UPLOAD_FOLDER);
    
    if (files.length === 0) {
      console.log('ℹ️  No hay archivos en la carpeta');
      process.exit(0);
    }
    
    // Agrupar archivos por ID
    const wallpapers = new Map();
    
    for (const file of files) {
      if (file.startsWith('.')) continue; // Skip .DS_Store
      
      const ext = path.extname(file).toLowerCase();
      if (!['.gif', '.jpg', '.png'].includes(ext)) {
        console.warn(`  ⚠️  Extensión no soportada: ${file}`);
        continue;
      }
      
      const parsed = parseFilename(file);
      if (!parsed) continue;
      
      const { id, categories } = parsed;
      
      if (!wallpapers.has(id)) {
        wallpapers.set(id, { categories: new Set(categories), files: {} });
      }
      
      // Agregar categorías
      categories.forEach(cat => wallpapers.get(id).categories.add(cat));
      
      // Determinar si es cover (gif) o lg (jpg)
      if (ext === '.gif') {
        wallpapers.get(id).files.cover = file;
      } else {
        wallpapers.get(id).files.lg = file;
      }
    }
    
    console.log(`📂 Encontrados ${wallpapers.size} wallpapers\n`);
    
    let uploadedCount = 0;
    let skippedCount = 0;
    
    // Procesar cada wallpaper
    for (const [id, data] of wallpapers) {
      const { cover, lg } = data.files;
      const categories = Array.from(data.categories);
      
      if (!cover) {
        console.log(`  ⏭️  ${id} - Sin cover (.gif), saltando`);
        skippedCount++;
        continue;
      }
      
      try {
        const docId = `wallpaper_${id}`;
        const name = `Wall ${id}`;
        
        // Determinar si es featured
        const isFeatured = categories.includes('Featured');
        
        console.log(`  ⬆️  ${id} - Categorías: ${categories.join(', ')}`);
        
        await db.collection('wallpapers').doc(docId).set({
          id: id, // ID numérico como string
          name: name,
          categories: categories, // Array de categorías
          image: cover, // Nombre del cover
          featured: isFeatured,
          downloads: 0,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        console.log(`     ✅ Creado en Firestore`);
        uploadedCount++;
      } catch (error) {
        console.error(`     ❌ Error: ${error.message}`);
        skippedCount++;
      }
    }
    
    console.log(`\n✨ Carga completada!`);
    console.log(`   ✅ Subidos: ${uploadedCount}`);
    console.log(`   ⏭️  Saltados: ${skippedCount}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

uploadWallpapers();
