import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    if (update.message && update.message.text) {
      const text: string = update.message.text.trim();
      const chatId = String(update.message.chat.id);

      if (text.startsWith('/start')) {
        const parts = text.split(' ');
        const token = parts[1];

        if (token) {
          const user = await db.getUser();
          if (user.telegram_link_token === token) {
            await db.updateTelegramChat(chatId);

            // Send confirmation back if bot token is present
            const botToken = process.env.TELEGRAM_BOT_TOKEN;
            if (botToken) {
              await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: '🎯 CompetitorRadar успешно привязан! Теперь вы будете получать оперативные AI-разведданные по конкурентам прямо сюда.',
                }),
              });
            }

            return NextResponse.json({ ok: true, linked: true });
          }
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
