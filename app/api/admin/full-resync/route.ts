import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
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
  const match = filename.match(/^(\d+)-(.+)\.(gif|jpg|png|mp4)$/i);
  if (!match) return null;

  const id = match[1];
  const categoriesStr = match[2];
  const ext = match[3].toLowerCase();

  const categories = categoriesStr.split('-').map((cat) => cat.trim());

  return {
    id,
    categories,
    ext,
  };
}

// Normalizar categorías (mantener IOS, Live, B&W en mayúsculas)
function normalizeCategory(cat: string): string {
  const lower = cat.toLowerCase();
  if (lower === 'ios') return 'IOS';
  if (lower === 'b&w') return 'B&W';
  if (lower === 'live') return 'Live';
  if (lower === 'featured') return 'Featured';
  if (lower === 'aesthetic') return 'Aesthetic';
  if (lower === 'ai') return 'AI';
  if (lower === 'anime') return 'Anime';
  if (lower === 'cars') return 'Cars';
  if (lower === 'widgets') return 'Widgets';
  if (lower === 'charging') return 'Charging';
  if (lower === 'cute') return 'Cute';
  if (lower === 'films') return 'Films';
  if (lower === 'urban') return 'Urban';
  // Default: capitalizar
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const results: any[] = [];

    // PASO 1: Borrar todos los documentos de Firestore
    console.log('📋 Paso 1: Eliminando documentos de Firestore...');
    const wallpapersRef = collection(db, 'wallpapers');
    const allDocs = await getDocs(wallpapersRef);
    let deletedCount = 0;

    for (const doc of allDocs.docs) {
      try {
        await deleteDoc(doc.ref);
        deletedCount++;
      } catch (error) {
        console.error('Error eliminando documento:', doc.id, error);
      }
    }

    results.push({
      step: 1,
      message: `✅ Eliminados ${deletedCount} documentos de Firestore`,
    });

    // PASO 2: Leer archivos de wallUploads
    console.log('📁 Paso 2: Leyendo carpeta wallUploads...');
    const wallpapersDir = path.join(process.cwd(), 'public', 'wallUploads');
    
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

    results.push({
      step: 2,
      message: `✅ Encontrados ${files.length} archivos en wallUploads`,
    });

    // PASO 3: Agrupar archivos por ID
    console.log('📦 Paso 3: Agrupando archivos por ID...');
    const filesByID: FilesByID = {};

    for (const file of files) {
      const parsed = parseFilename(file);
      if (!parsed) {
        results.push({
          warning: `⚠️ Archivo ignorado (formato incorrecto): ${file}`,
        });
        continue;
      }

      const { id, categories, ext } = parsed;

      if (!filesByID[id]) {
        filesByID[id] = { categories };
      }

      (filesByID[id] as any)[ext] = file;
    }

    results.push({
      step: 3,
      message: `✅ Agrupados en ${Object.keys(filesByID).length} IDs únicos`,
    });

    // PASO 4: Crear documentos en Firestore
    console.log('💾 Paso 4: Guardando en Firestore...');
    let successCount = 0;
    let errorCount = 0;

    for (const [id, fileGroup] of Object.entries(filesByID)) {
      try {
        // Determinar archivos a usar
        const cover = fileGroup.gif || fileGroup.jpg || fileGroup.png;
        const download = fileGroup.jpg || fileGroup.png || fileGroup.gif;
        const video = fileGroup.mp4 || undefined;

        if (!cover || !download) {
          results.push({
            error: `❌ ID ${id} - Falta cover o download`,
          });
          errorCount++;
          continue;
        }

        // Crear documento con estructura correcta
        const wallpaperData: WallpaperData = {
          id,
          name: `Wallpaper ${id}`,
          categories: fileGroup.categories.map(normalizeCategory),
          files: {
            cover,
            download,
            ...(video && { video }),
          },
          featured: fileGroup.categories.some((cat) => cat.toLowerCase() === 'featured'),
          downloads: 0,
        };

        const docRef = doc(db, 'wallpapers', id);
        await setDoc(docRef, wallpaperData);

        const filesList = [cover, download, ...(video ? [video] : [])].join(', ');
        results.push({
          success: `✅ ID ${id} → ${fileGroup.categories.join(', ')} (${filesList})`,
        });
        successCount++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        results.push({
          error: `❌ ID ${id} - Error: ${errorMsg}`,
        });
        errorCount++;
      }
    }

    results.push({
      step: 4,
      message: `✅ Guardados ${successCount} wallpapers en Firestore`,
    });

    // Resumen final
    const summary = {
      success: true,
      message: `🎉 RESYNC Completado: ${deletedCount} eliminados, ${successCount} creados`,
      stats: {
        deletedCount,
        filesProcessed: files.length,
        groupsCreated: Object.keys(filesByID).length,
        successCount,
        errorCount,
      },
      results: results.slice(0, 30), // Limitar para no saturar
    };

    return NextResponse.json(summary);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Full resync error:', error);
    return NextResponse.json(
      { success: false, message: `Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
