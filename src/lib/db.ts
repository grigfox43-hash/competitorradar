import { User, CompetitorUrl, CompetitorSnapshot, Alert, PlanType, PlanLimits } from './types';

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  solopreneur: {
    name: 'Solopreneur',
    priceUsd: 49,
    urlLimit: 5,
    frequency: 'Еженедельный дайджест',
    channels: ['Telegram'],
    features: ['До 5 сайтов конкурентов', 'AI-сравнение изменений', 'Еженедельный отчёт в Telegram', 'Email поддержка'],
  },
  business: {
    name: 'Business',
    priceUsd: 129,
    urlLimit: 20,
    frequency: 'Ежедневный мониторинг + моментальные алерты',
    channels: ['Telegram'],
    features: ['До 20 сайтов конкурентов', 'Приоритетная очередь парсинга', 'Ежедневные проверки цен и фич', 'Мгновенные алерты в Telegram', 'История снапшотов 90 дней'],
  },
  enterprise: {
    name: 'Enterprise',
    priceUsd: 299,
    urlLimit: 99999,
    frequency: 'Ежедневный / Реалтайм (каждые 1–3ч)',
    channels: ['Telegram', 'Slack'],
    features: ['Неограниченное число сайтов', 'Реалтайм мониторинг', 'Интеграция со Slack каналами', 'Экспорт истории в CSV', 'Персональный менеджер'],
  },
};

// Global in-memory storage (persists per server instance / Vercel container lifecycle)
interface DbState {
  users: User[];
  competitors: CompetitorUrl[];
  snapshots: CompetitorSnapshot[];
  alerts: Alert[];
}

const defaultUserId = 'usr-001';

const state: DbState = {
  users: [
    {
      id: defaultUserId,
      email: 'founder@competitorradar.io',
      telegram_chat_id: '',
      telegram_link_token: 'cr_tok_9b2e81a74d2f',
      slack_webhook_url: '',
      plan: 'business',
      plan_status: 'active',
      created_at: '2026-08-15T10:00:00.000Z',
    },
  ],
  competitors: [
    {
      id: 'comp-1',
      user_id: defaultUserId,
      url: 'https://stripe.com/pricing',
      label: 'Stripe Pricing',
      monitoring_frequency: 'daily',
      is_active: true,
      last_checked_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    },
    {
      id: 'comp-2',
      user_id: defaultUserId,
      url: 'https://linear.app/features',
      label: 'Linear Product',
      monitoring_frequency: 'daily',
      is_active: true,
      last_checked_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: 'comp-3',
      user_id: defaultUserId,
      url: 'https://vercel.com/pricing',
      label: 'Vercel Pricing',
      monitoring_frequency: 'daily',
      is_active: true,
      last_checked_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ],
  snapshots: [
    {
      id: 'snap-1-prev',
      competitor_url_id: 'comp-1',
      content_markdown: '# Stripe Pricing\n\nStandard fee: 2.9% + 30¢ per successful card charge.\nCustom volume discounts starting at $100k/mo.',
      content_hash: 'hash-s1',
      captured_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'snap-1-curr',
      competitor_url_id: 'comp-1',
      content_markdown: '# Stripe Pricing\n\nStandard fee: 2.9% + 30¢ per card charge.\nSpecial offer: 0% fee on first $50,000 for early-stage startups.',
      content_hash: 'hash-s2',
      captured_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
  ],
  alerts: [
    {
      id: 'alert-1',
      competitor_url_id: 'comp-1',
      user_id: defaultUserId,
      competitor_label: 'Stripe Pricing',
      url: 'https://stripe.com/pricing',
      change_type: 'offer',
      summary: 'Stripe добавил специальный оффер для стартапов: 0% комиссии на первые $50 000 процессинга.',
      diff_snippet: 'Было: Custom volume discounts starting at $100k/mo.\nСтало: Special offer: 0% fee on first $50,000 for early-stage startups.',
      confidence: 0.96,
      is_read: false,
      delivered_telegram: true,
      delivered_slack: false,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'alert-2',
      competitor_url_id: 'comp-2',
      user_id: defaultUserId,
      competitor_label: 'Linear Product',
      url: 'https://linear.app/features',
      change_type: 'new_feature',
      summary: 'Linear запустил новый модуль глубокой интеграции с системами клиентской поддержки (Customer Requests).',
      diff_snippet: '+ Customer Requests: triage and prioritize user feedback directly into engineering cycles.',
      confidence: 0.92,
      is_read: false,
      delivered_telegram: true,
      delivered_slack: false,
      created_at: new Date(Date.now() - 3600000 * 7).toISOString(),
    },
    {
      id: 'alert-3',
      competitor_url_id: 'comp-3',
      user_id: defaultUserId,
      competitor_label: 'Vercel Pricing',
      url: 'https://vercel.com/pricing',
      change_type: 'price',
      summary: 'Vercel снизил стоимость гигабайта Serverless Function execution до $0.18 и добавил 100GB бесплатного трафика.',
      diff_snippet: 'Было: $0.24 per GB-hour\nСтало: $0.18 per GB-hour + 100GB bandwidth included',
      confidence: 0.98,
      is_read: true,
      delivered_telegram: true,
      delivered_slack: false,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
};

export const db = {
  getUser: async (id = defaultUserId): Promise<User> => {
    const u = state.users.find((x) => x.id === id) || state.users[0];
    return { ...u };
  },

  updateUserPlan: async (plan: PlanType, status: any = 'active'): Promise<User> => {
    state.users[0].plan = plan;
    state.users[0].plan_status = status;
    return { ...state.users[0] };
  },

  updateTelegramChat: async (chatId: string): Promise<User> => {
    state.users[0].telegram_chat_id = chatId;
    return { ...state.users[0] };
  },

  updateSlackWebhook: async (url: string): Promise<User> => {
    state.users[0].slack_webhook_url = url;
    return { ...state.users[0] };
  },

  getCompetitors: async (userId = defaultUserId): Promise<CompetitorUrl[]> => {
    return state.competitors
      .filter((c) => c.user_id === userId)
      .map((c) => ({
        ...c,
        snapshots_count: state.snapshots.filter((s) => s.competitor_url_id === c.id).length,
      }));
  },

  getCompetitorById: async (id: string): Promise<CompetitorUrl | undefined> => {
    return state.competitors.find((c) => c.id === id);
  },

  addCompetitor: async (
    userId = defaultUserId,
    url: string,
    label: string,
    frequency: any = 'daily'
  ): Promise<CompetitorUrl> => {
    const user = await db.getUser(userId);
    const limit = PLAN_LIMITS[user.plan].urlLimit;
    const currentCount = state.competitors.filter((c) => c.user_id === userId && c.is_active).length;

    if (currentCount >= limit) {
      throw new Error(`Лимит URL исчерпан для тарифа ${PLAN_LIMITS[user.plan].name} (${limit} URL). Обновите тариф.`);
    }

    const newComp: CompetitorUrl = {
      id: `comp-${Date.now()}`,
      user_id: userId,
      url,
      label: label || new URL(url).hostname.replace('www.', ''),
      monitoring_frequency: frequency,
      is_active: true,
      last_checked_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    state.competitors.unshift(newComp);
    return newComp;
  },

  deleteCompetitor: async (id: string): Promise<boolean> => {
    const idx = state.competitors.findIndex((c) => c.id === id);
    if (idx !== -1) {
      state.competitors.splice(idx, 1);
      state.snapshots = state.snapshots.filter((s) => s.competitor_url_id !== id);
      return true;
    }
    return false;
  },

  toggleCompetitor: async (id: string): Promise<CompetitorUrl | null> => {
    const comp = state.competitors.find((c) => c.id === id);
    if (comp) {
      comp.is_active = !comp.is_active;
      return { ...comp };
    }
    return null;
  },

  updateCompetitorCheckTime: async (id: string): Promise<void> => {
    const comp = state.competitors.find((c) => c.id === id);
    if (comp) {
      comp.last_checked_at = new Date().toISOString();
    }
  },

  getSnapshots: async (competitorUrlId: string): Promise<CompetitorSnapshot[]> => {
    return state.snapshots
      .filter((s) => s.competitor_url_id === competitorUrlId)
      .sort((a, b) => new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime());
  },

  saveSnapshot: async (competitorUrlId: string, markdown: string, hash: string): Promise<CompetitorSnapshot> => {
    const snap: CompetitorSnapshot = {
      id: `snap-${Date.now()}`,
      competitor_url_id: competitorUrlId,
      content_markdown: markdown,
      content_hash: hash,
      captured_at: new Date().toISOString(),
    };
    state.snapshots.unshift(snap);
    return snap;
  },

  getAlerts: async (userId = defaultUserId, typeFilter?: string): Promise<Alert[]> => {
    let list = state.alerts.filter((a) => a.user_id === userId);
    if (typeFilter && typeFilter !== 'all') {
      list = list.filter((a) => a.change_type === typeFilter);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  addAlert: async (data: Omit<Alert, 'id' | 'created_at' | 'is_read'>): Promise<Alert> => {
    const newAlert: Alert = {
      ...data,
      id: `alert-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    state.alerts.unshift(newAlert);
    return newAlert;
  },

  markAlertRead: async (id: string): Promise<Alert | null> => {
    const alert = state.alerts.find((a) => a.id === id);
    if (alert) {
      alert.is_read = true;
      return { ...alert };
    }
    return null;
  },
};
