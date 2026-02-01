import { NextRequest, NextResponse } from 'next/server';

// Simulación de BD de subscripciones
let subscriptions: Map<string, any> = new Map();
let notificationHistory: any[] = [];

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      totalSubscribed: subscriptions.size,
      recentNotifications: notificationHistory.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
