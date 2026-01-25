import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const wallpapersRef = collection(db, 'wallpapers');
    const allDocs = await getDocs(wallpapersRef);

    const wallpapers: any[] = [];
    const idMap: { [key: string]: any[] } = {};

    // Obtener todos los documentos y agrupar por ID
    allDocs.forEach((doc) => {
      const data = {
        docId: doc.id,
        data: doc.data(),
      };
      wallpapers.push(data);

      if (!idMap[doc.id]) {
        idMap[doc.id] = [];
      }
      idMap[doc.id].push(data);
    });

    // Detectar duplicados
    const duplicates: any[] = [];
    for (const [id, docs] of Object.entries(idMap)) {
      if (docs.length > 1) {
        duplicates.push({
          id,
          count: docs.length,
          docs: docs,
        });
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalDocuments: wallpapers.length,
        uniqueIds: Object.keys(idMap).length,
        duplicatesFound: duplicates.length,
      },
      allWallpapers: wallpapers.sort((a, b) => {
        const aNum = parseInt(a.docId);
        const bNum = parseInt(b.docId);
        return aNum - bNum;
      }),
      duplicates,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { success: false, message: `Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
