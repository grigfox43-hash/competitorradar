import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const user = await db.getUser();
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'CompetitorRadarBot';
    const link = `https://t.me/${botUsername}?start=${user.telegram_link_token}`;

    return NextResponse.json({
      token: user.telegram_link_token,
      botUsername,
      deepLink: link,
      isConnected: Boolean(user.telegram_chat_id),
      chatId: user.telegram_chat_id || null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
