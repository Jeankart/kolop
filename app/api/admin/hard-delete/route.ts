import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 HARD DELETE: Iniciando limpieza completa de Firestore...');
    
    const wallpapersRef = collection(db, 'wallpapers');
    const allDocs = await getDocs(wallpapersRef);
    
    console.log(`📊 Total de documentos encontrados: ${allDocs.docs.length}`);
    
    let deletedCount = 0;
    const deletedIds: string[] = [];
    const errors: string[] = [];

    // Borrar cada documento individualmente
    for (const doc of allDocs.docs) {
      try {
        console.log(`🗑️ Borrando: ${doc.id}`);
        await deleteDoc(doc.ref);
        deletedCount++;
        deletedIds.push(doc.id);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        console.error(`❌ Error borrando ${doc.id}:`, errorMsg);
        errors.push(`${doc.id}: ${errorMsg}`);
      }
    }

    // Verificar que se borraron todos
    const verifyDocs = await getDocs(wallpapersRef);
    console.log(`✅ Verificación post-borrado: ${verifyDocs.docs.length} documentos restantes`);

    return NextResponse.json({
      success: true,
      message: `🔥 HARD DELETE Completado: ${deletedCount} documentos eliminados`,
      stats: {
        attemptedDelete: allDocs.docs.length,
        deletedCount,
        remainingCount: verifyDocs.docs.length,
        errors: errors.length,
      },
      deletedIds,
      errors: errors.length > 0 ? errors : [],
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('HARD DELETE error:', error);
    return NextResponse.json(
      { success: false, message: `Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
