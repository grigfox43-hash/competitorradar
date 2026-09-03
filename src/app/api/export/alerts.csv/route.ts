import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const user = await db.getUser();

    // Check plan (Allow enterprise, or query flag for demo override)
    const { searchParams } = new URL(req.url);
    const forceDemo = searchParams.get('demo') === 'true';

    if (user.plan !== 'enterprise' && !forceDemo) {
      return NextResponse.json(
        {
          error: 'Экспорт истории в CSV доступен исключительно на тарифе Enterprise.',
          upgradeRequired: true,
        },
        { status: 403 }
      );
    }

    const alerts = await db.getAlerts(user.id);

    // Build CSV with proper UTF-8 BOM so Excel opens it cleanly
    const bom = '\uFEFF';
    const headers = ['ID', 'Дата и время', 'Конкурент', 'URL', 'Тип изменения', 'Саммари', 'Уверенность AI', 'Diff фрагмент', 'Доставлено в Telegram'];

    const rows = alerts.map((a) => [
      a.id,
      new Date(a.created_at).toLocaleString('ru-RU'),
      `"${(a.competitor_label || '').replace(/"/g, '""')}"`,
      `"${(a.url || '').replace(/"/g, '""')}"`,
      a.change_type,
      `"${(a.summary || '').replace(/"/g, '""')}"`,
      `${Math.round(a.confidence * 100)}%`,
      `"${(a.diff_snippet || '').replace(/"/g, '""')}"`,
      a.delivered_telegram ? 'Да' : 'Нет',
    ]);

    const csvContent = bom + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="competitor_radar_alerts_${Date.now()}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
