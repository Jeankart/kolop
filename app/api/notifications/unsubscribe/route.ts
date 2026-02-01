import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint } = body;
    
    // Aquí eliminarías la suscripción de tu base de datos
    console.log('Unsubscribe:', endpoint);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
