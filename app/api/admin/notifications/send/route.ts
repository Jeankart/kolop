import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Verificar autorización
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, body: messageBody, category, url } = body;

    if (!title || !messageBody) {
      return NextResponse.json({ error: 'Title and body required' }, { status: 400 });
    }

    // Aquí iría la lógica para enviar push reales
    // Por ahora, solo simulamos

    const notification = {
      id: Date.now().toString(),
      title,
      body: messageBody,
      category: category || 'all',
      url: url || '/',
      sentAt: new Date().toLocaleString('es-ES'),
      count: 100, // Simulado: número de usuarios
    };

    console.log('Notification sent:', notification);

    return NextResponse.json({
      success: true,
      sent: 100,
      notification,
    });
  } catch (error) {
    console.error('Send notification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
