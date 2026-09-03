import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { scrapeUrlToMarkdown } from '@/lib/scraper';
import { compareSnapshotsWithGemini } from '@/lib/gemini';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    const userId = session?.userId || 'usr-001';

    const body = await req.json().catch(() => ({}));
    const { competitorId } = body;

    const user = await db.getUser(userId);
    let competitorsToScan = await db.getCompetitors(userId);

    if (competitorId) {
      competitorsToScan = competitorsToScan.filter((c) => c.id === competitorId);
    }

    if (competitorsToScan.length === 0) {
      return NextResponse.json({ error: 'Нет активных конкурентов для сканирования' }, { status: 400 });
    }

    const results = [];

    for (const comp of competitorsToScan) {
      const currentScrape = await scrapeUrlToMarkdown(comp.url);
      const history = await db.getSnapshots(comp.id);
      const previousSnapshot = history.length > 0 ? history[0] : null;

      await db.saveSnapshot(comp.id, currentScrape.markdown, currentScrape.hash);
      await db.updateCompetitorCheckTime(comp.id);

      if (!previousSnapshot) {
        results.push({
          competitorId: comp.id,
          label: comp.label,
          status: 'baseline_created',
          message: 'Создан базовый снапшот страницы для последующего AI-сравнения.',
        });
        continue;
      }

      if (previousSnapshot.content_hash === currentScrape.hash) {
        results.push({
          competitorId: comp.id,
          label: comp.label,
          status: 'unchanged',
          message: 'Контент не изменился со времени последней проверки.',
        });
        continue;
      }

      const comparison = await compareSnapshotsWithGemini(
        previousSnapshot.content_markdown,
        currentScrape.markdown
      );

      if (comparison.has_significant_change) {
        const newAlert = await db.addAlert({
          competitor_url_id: comp.id,
          user_id: userId,
          competitor_label: comp.label,
          url: comp.url,
          change_type: comparison.change_type,
          summary: comparison.summary,
          diff_snippet: comparison.diff_snippet,
          confidence: comparison.confidence,
          delivered_telegram: Boolean(user.telegram_chat_id),
          delivered_slack: false,
        });

        results.push({
          competitorId: comp.id,
          label: comp.label,
          status: 'alert_created',
          alert: newAlert,
        });
      } else {
        results.push({
          competitorId: comp.id,
          label: comp.label,
          status: 'insignificant_change',
          message: 'AI отфильтровал косметические изменения, алерт не требуется.',
        });
      }
    }

    return NextResponse.json({
      success: true,
      scannedCount: competitorsToScan.length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
