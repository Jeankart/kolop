import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, setDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import * as fs from 'fs';
import * as path from 'path';

interface WallpaperData {
  id: string;
  name: string;
  categories: string[];
  image: string;
  featured: boolean;
  downloads: number;
}

// Función para parsear el nombre del archivo
function parseFilename(filename: string): { id: string; categories: string[]; image: string } | null {
  // Formato: ID-Category1-Category2-Category3.ext
  // Ejemplo: 605-IOS.jpg → id: 605, categories: ['IOS'], image: '605-IOS.jpg'
  
  const match = filename.match(/^(\d+)-(.+)\.(gif|jpg|png|mp4)$/i);
  if (!match) return null;

  const id = match[1];
  const categoriesStr = match[2];
  const image = filename;

  // Dividir por guión para obtener categorías
  const categories = categoriesStr.split('-').map((cat) => cat.trim());

  return {
    id,
    categories,
    image,
  };
}

export async function POST(request: NextRequest) {
  try {
    const wallpapersDir = path.join(process.cwd(), 'public', 'wallUploads');
    
    // Leer archivos del directorio
    let files: string[] = [];
    try {
      files = fs.readdirSync(wallpapersDir).filter((file) => {
        return /\.(gif|jpg|png|mp4)$/i.test(file) && !file.startsWith('.');
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'No se puede leer el directorio de wallpapers' },
        { status: 500 }
      );
    }

    const results: any[] = [];
    let successCount = 0;
    let skipCount = 0;

    // Procesar cada archivo
    for (const file of files) {
      const parsed = parseFilename(file);
      
      if (!parsed) {
        results.push({
          success: false,
          message: `⏭️  ${file} - Formato inválido (espera: ID-Category.ext)`,
        });
        continue;
      }

      const { id, categories, image } = parsed;

      try {
        // Verificar si el documento ya existe
        const docRef = doc(db, 'wallpapers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          results.push({
            success: false,
            message: `⏭️  ${file} - Ya existe en Firestore (ID: ${id})`,
          });
          skipCount++;
          continue;
        }

        // Crear documento en Firestore
        const wallpaperData: WallpaperData = {
          id,
          name: `Wallpaper ${id}`,
          categories: categories.map((cat) => {
            // Capitalizar categorías
            return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
          }),
          image,
          featured: categories.some((cat) => cat.toLowerCase() === 'featured'),
          downloads: 0,
        };

        await setDoc(docRef, wallpaperData);

        results.push({
          success: true,
          message: `✅ ${file} → Categorías: ${wallpaperData.categories.join(', ')}`,
        });
        successCount++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        results.push({
          success: false,
          message: `❌ ${file} - Error: ${errorMsg}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Procesados ${files.length} archivos: ${successCount} nuevos, ${skipCount} omitidos`,
      results,
      stats: {
        total: files.length,
        added: successCount,
        skipped: skipCount,
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { success: false, message: `Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
