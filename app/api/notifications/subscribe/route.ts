import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Aquí guardarías la suscripción en tu base de datos
    // Por ahora, solo la guardamos en memoria
    
    console.log('New subscription:', body.endpoint);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
