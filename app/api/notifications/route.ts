import { NextRequest, NextResponse } from 'next/server';

// Almacenamiento simple en memoria (en producción usar base de datos)
let subscriptions: PushSubscription[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, action } = body;

    if (action === 'subscribe') {
      // Agregar nueva suscripción
      if (!subscriptions.find(s => s.endpoint === endpoint)) {
        subscriptions.push(body);
      }
      return NextResponse.json({ success: true, message: 'Subscribed' });
    }

    if (action === 'unsubscribe') {
      // Remover suscripción
      subscriptions = subscriptions.filter(s => s.endpoint !== endpoint);
      return NextResponse.json({ success: true, message: 'Unsubscribed' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Endpoint para enviar notificaciones (protegido)
export async function PUT(req: NextRequest) {
  try {
    // Verificar token de autorización (agregar tu lógica)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, body: messageBody, url } = body;

    // Aquí iría la lógica para enviar push reales via Firebase
    // Por ahora, solo simulamos
    
    console.log(`Sending ${subscriptions.length} push notifications...`);
    
    // En producción:
    // await sendPushNotifications(subscriptions, {
    //   title,
    //   body: messageBody,
    //   url
    // });

    return NextResponse.json({
      success: true,
      sent: subscriptions.length,
      message: `Push notification sent to ${subscriptions.length} users`
    });
  } catch (error) {
    console.error('Send notification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
