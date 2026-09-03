import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    const userId = session?.userId || 'usr-001';

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('type') || 'all';

    const alerts = await db.getAlerts(userId, filter);

    const allUserAlerts = await db.getAlerts(userId);
    const counts = {
      all: allUserAlerts.length,
      price: (await db.getAlerts(userId, 'price')).length,
      new_feature: (await db.getAlerts(userId, 'new_feature')).length,
      content: (await db.getAlerts(userId, 'content')).length,
      offer: (await db.getAlerts(userId, 'offer')).length,
      unread: allUserAlerts.filter((a) => !a.is_read).length,
    };

    return NextResponse.json({ alerts, counts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    const userId = session?.userId || 'usr-001';

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID алерта не указан' }, { status: 400 });
    }

    const updated = await db.markAlertRead(id, userId);
    return NextResponse.json({ success: true, alert: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
