import { NextRequest, NextResponse } from 'next/server';
import { db, PLAN_LIMITS } from '@/lib/db';
import { scrapeUrlToMarkdown } from '@/lib/scraper';

export async function GET(req: NextRequest) {
  try {
    const user = await db.getUser();
    const competitors = await db.getCompetitors(user.id);
    const planLimits = PLAN_LIMITS[user.plan];

    return NextResponse.json({
      competitors,
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        plan_status: user.plan_status,
        telegram_chat_id: user.telegram_chat_id,
        telegram_link_token: user.telegram_link_token,
      },
      stats: {
        used: competitors.filter((c) => c.is_active).length,
        limit: planLimits.urlLimit,
        planName: planLimits.name,
        canAddMore: competitors.filter((c) => c.is_active).length < planLimits.urlLimit,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, label, frequency } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Необходимо указать валидный URL' }, { status: 400 });
    }

    // Format URL if missing protocol
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const user = await db.getUser();

    // Enforce plan limits
    const currentList = await db.getCompetitors(user.id);
    const limit = PLAN_LIMITS[user.plan].urlLimit;
    if (currentList.filter((c) => c.is_active).length >= limit) {
      return NextResponse.json(
        {
          error: `Достигнут лимит URL для тарифа ${PLAN_LIMITS[user.plan].name} (${limit} сайтов). Обновите тариф.`,
          code: 'LIMIT_REACHED',
        },
        { status: 403 }
      );
    }

    // Save competitor
    const newComp = await db.addCompetitor(user.id, formattedUrl, label, frequency || 'daily');

    // Asynchronously take baseline snapshot
    try {
      const scraped = await scrapeUrlToMarkdown(formattedUrl);
      await db.saveSnapshot(newComp.id, scraped.markdown, scraped.hash);
      await db.updateCompetitorCheckTime(newComp.id);
    } catch (scrapErr) {
      console.warn('[Baseline Snapshot] Direct scrape notice:', scrapErr);
    }

    return NextResponse.json({ success: true, competitor: newComp }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID конкурента не указан' }, { status: 400 });
    }

    const success = await db.deleteCompetitor(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID конкурента не указан' }, { status: 400 });
    }

    const updated = await db.toggleCompetitor(id);
    return NextResponse.json({ success: true, competitor: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
