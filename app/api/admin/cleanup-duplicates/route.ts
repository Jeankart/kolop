import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface WallpaperDoc {
  id: string;
  name: string;
  categories: string[];
  featured?: boolean;
  downloads?: number;
  files?: {
    cover: string;
    download: string;
    video?: string;
  };
  image?: string; // vieja estructura
  createdAt?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener todos los wallpapers de Firestore
    const wallpapersRef = collection(db, 'wallpapers');
    const snapshot = await getDocs(wallpapersRef);

    const results: any[] = [];
    let deletedCount = 0;
    let keptCount = 0;
    const errors: string[] = [];

    // Analizar estructura de datos
    let hasOldStructure = false;
    let hasNewStructure = false;
    const dataStructure: { [key: string]: string[] } = {};

    const wallpapersList: WallpaperDoc[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      wallpapersList.push({
        id: doc.id,
        ...data,
      });

      // Detectar estructura
      if (data.image) {
        hasOldStructure = true;
        if (!dataStructure['old']) dataStructure['old'] = [];
        dataStructure['old'].push(doc.id);
      }
      if (data.files) {
        hasNewStructure = true;
        if (!dataStructure['new']) dataStructure['new'] = [];
        dataStructure['new'].push(doc.id);
      }
    });

    // Si hay estructura vieja, necesitamos limpiar
    if (hasOldStructure) {
      results.push({
        success: false,
        message: `❌ Se detectó estructura vieja en ${dataStructure['old']?.length || 0} documentos`,
        details: dataStructure['old']?.slice(0, 5) || [],
      });

      // Eliminar documentos con estructura vieja
      for (const doc of snapshot.docs) {
        const data = doc.data();
        if (data.image && !data.files) {
          try {
            await deleteDoc(doc.ref);
            deletedCount++;
            results.push({
              success: true,
              message: `✅ Eliminado documento con estructura vieja: ${doc.id}`,
            });
          } catch (e) {
            const errorMsg = e instanceof Error ? e.message : 'Error desconocido';
            errors.push(`Error eliminando ${doc.id}: ${errorMsg}`);
          }
        }
      }
    }

    // Contar estructura nueva
    if (hasNewStructure) {
      keptCount = dataStructure['new']?.length || 0;
      results.push({
        success: true,
        message: `✅ Se mantuvieron ${keptCount} documentos con estructura nueva`,
      });
    }

    // Resumen final
    const summary = {
      success: true,
      message: `Limpieza completado: ${deletedCount} eliminados, ${keptCount} mantenidos`,
      stats: {
        deletedCount,
        keptCount,
        totalDocuments: wallpapersList.length,
        oldStructure: dataStructure['old']?.length || 0,
        newStructure: dataStructure['new']?.length || 0,
      },
      errors: errors.length > 0 ? errors : [],
      results: results.slice(0, 20), // Limitar resultados para no saturar
    };

    return NextResponse.json(summary);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { success: false, message: `Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
