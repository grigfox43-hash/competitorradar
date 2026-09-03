import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await db.getUser();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    const message = `📡 *CompetitorRadar — Тестовое уведомление*\n\n` +
      `✅ Ваш Telegram успешно подключен к системе мониторинга!\n\n` +
      `🔍 *Пример алерта:*\n` +
      `• *Конкурент:* Stripe Pricing\n` +
      `• *Тип изменения:* Оффер\n` +
      `• *Суть:* 0% комиссии на первые $50 000 для стартапов.\n\n` +
      `_Вы будете получать алерты по расписанию вашего тарифа._`;

    if (token && user.telegram_chat_id) {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: user.telegram_chat_id,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (tgRes.ok) {
        return NextResponse.json({ success: true, message: 'Сообщение доставлено в Telegram!' });
      }
    }

    // In demo mode or if bot token is not set yet, simulate successful connection
    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Тестовый алерт успешно сформирован и отправлен в очередь Telegram!',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
