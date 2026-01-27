import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get Firestore data
    const wallpapersRef = collection(db, 'wallpapers');
    const snapshot = await getDocs(wallpapersRef);
    
    const firestoreCount = snapshot.size;
    const firestoreSample = snapshot.docs.slice(0, 3).map(doc => ({
      id: doc.id,
      name: (doc.data() as any).name,
      files: (doc.data() as any).files,
    }));

    // Check local files
    const wallUploadsPath = path.join(process.cwd(), 'public', 'wallUploads');
    let localFiles: string[] = [];
    let localCount = 0;

    try {
      if (fs.existsSync(wallUploadsPath)) {
        localFiles = fs.readdirSync(wallUploadsPath);
        localCount = localFiles.length;
      }
    } catch (err) {
      // Directory might not exist in production
    }

    return NextResponse.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      firestore: {
        count: firestoreCount,
        sample: firestoreSample,
      },
      localFiles: {
        count: localCount,
        sample: localFiles.slice(0, 5),
      },
      testUrl: '/wallUploads/' + (localFiles[0] || 'test.jpg'),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: (error as Error).message,
    }, { status: 500 });
  }
}
