import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('type') || 'all';

    const alerts = await db.getAlerts('usr-001', filter);

    const counts = {
      all: (await db.getAlerts('usr-001')).length,
      price: (await db.getAlerts('usr-001', 'price')).length,
      new_feature: (await db.getAlerts('usr-001', 'new_feature')).length,
      content: (await db.getAlerts('usr-001', 'content')).length,
      offer: (await db.getAlerts('usr-001', 'offer')).length,
      unread: (await db.getAlerts('usr-001')).filter((a) => !a.is_read).length,
    };

    return NextResponse.json({ alerts, counts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID алерта не указан' }, { status: 400 });
    }

    const updated = await db.markAlertRead(id);
    return NextResponse.json({ success: true, alert: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
