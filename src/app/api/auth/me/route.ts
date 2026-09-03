import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const user = await db.getUser(session.userId);
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        created_at: user.created_at,
        telegram_chat_id: user.telegram_chat_id,
        telegram_link_token: user.telegram_link_token,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message });
  }
}
