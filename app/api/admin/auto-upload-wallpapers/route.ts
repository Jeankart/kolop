import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, setDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import * as fs from 'fs';
import * as path from 'path';

interface WallpaperData {
  id: string;
  name: string;
  categories: string[];
  files: {
    cover: string;
    download: string;
    video?: string;
  };
  featured: boolean;
  downloads: number;
}

interface FilesByID {
  [key: string]: {
    gif?: string;
    jpg?: string;
    png?: string;
    mp4?: string;
    categories: string[];
  };
}

// Función para parsear el nombre del archivo
function parseFilename(filename: string): { id: string; categories: string[]; ext: string } | null {
  // Formato: ID-Category1-Category2-Category3.ext
  // Ejemplo: 605-IOS.jpg → id: 605, categories: ['IOS'], ext: 'jpg'
  
  const match = filename.match(/^(\d+)-(.+)\.(gif|jpg|png|mp4)$/i);
  if (!match) return null;

  const id = match[1];
  const categoriesStr = match[2];
  const ext = match[3].toLowerCase();

  // Dividir por guión para obtener categorías
  const categories = categoriesStr.split('-').map((cat) => cat.trim());

  return {
    id,
    categories,
    ext,
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

    // Agrupar archivos por ID
    const filesByID: FilesByID = {};

    for (const file of files) {
      const parsed = parseFilename(file);
      if (!parsed) continue;

      const { id, categories, ext } = parsed;

      if (!filesByID[id]) {
        filesByID[id] = { categories };
      }

      (filesByID[id] as any)[ext] = file;
    }

    const results: any[] = [];
    let successCount = 0;
    let skipCount = 0;

    // Procesar cada grupo de archivos por ID
    for (const [id, files] of Object.entries(filesByID)) {
      try {
        // Verificar si el documento ya existe
        const docRef = doc(db, 'wallpapers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          results.push({
            success: false,
            message: `⏭️  ID ${id} - Ya existe en Firestore`,
          });
          skipCount++;
          continue;
        }

        // Determinar archivos a usar
        const cover = files.gif || files.jpg || files.png;
        const download = files.jpg || files.png || files.gif;
        const video = files.mp4 || undefined;

        if (!cover || !download) {
          results.push({
            success: false,
            message: `❌ ID ${id} - Falta cover o download`,
          });
          continue;
        }

        // Crear documento en Firestore
        const wallpaperData: WallpaperData = {
          id,
          name: `Wallpaper ${id}`,
          categories: files.categories.map((cat) => {
            // Capitalizar categorías
            return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
          }),
          files: {
            cover,
            download,
            ...(video && { video }),
          },
          featured: files.categories.some((cat) => cat.toLowerCase() === 'featured'),
          downloads: 0,
        };

        await setDoc(docRef, wallpaperData);

        const filesList = [cover, download, ...(video ? [video] : [])].join(', ');
        results.push({
          success: true,
          message: `✅ ID ${id} → ${files.categories.join(', ')} (${filesList})`,
        });
        successCount++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        results.push({
          success: false,
          message: `❌ ID ${id} - Error: ${errorMsg}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Procesados ${Object.keys(filesByID).length} wallpapers: ${successCount} nuevos, ${skipCount} omitidos`,
      results,
      stats: {
        total: Object.keys(filesByID).length,
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
