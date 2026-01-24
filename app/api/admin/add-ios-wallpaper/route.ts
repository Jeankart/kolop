import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const wallpapersRef = collection(db, 'wallpapers');
    
    // Verificar si ya existe
    const q = query(wallpapersRef, where('image', '==', '32-Feature-IOS.jpg'));
    const existing = await getDocs(q);
    
    if (existing.docs.length > 0) {
      return NextResponse.json({ 
        success: true, 
        message: '✅ El wallpaper IOS ya existe en Firestore' 
      });
    }
    
    const docId = '32-Feature-IOS';
    
    await setDoc(doc(wallpapersRef, docId), {
      name: 'iOS Infinite Wallpaper',
      categories: ['IOS'],
      image: '32-Feature-IOS.jpg',
      featured: false,
      downloads: 0,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: '✅ Wallpaper IOS agregado exitosamente con ID: ' + docId 
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '❌ Error: ' + error.message 
    }, { status: 500 });
  }
}
