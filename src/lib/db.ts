import { User, CompetitorUrl, CompetitorSnapshot, Alert, PlanType, PlanLimits } from './types';
import { getDb } from './mongodb';
import { hashPassword } from './auth';

import { SHOW_BILLING } from './config';
export { SHOW_BILLING };

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  solopreneur: {
    name: 'Solopreneur',
    priceUsd: 49,
    urlLimit: SHOW_BILLING ? 5 : 99999, // unlimited during preview
    frequency: 'Еженедельный дайджест',
    channels: ['Telegram'],
    features: ['До 5 сайтов конкурентов', 'AI-сравнение изменений', 'Еженедельный отчёт в Telegram'],
  },
  business: {
    name: 'Business',
    priceUsd: 129,
    urlLimit: SHOW_BILLING ? 20 : 99999,
    frequency: 'Ежедневный мониторинг + моментальные алерты',
    channels: ['Telegram'],
    features: ['До 20 сайтов конкурентов', 'Приоритетная очередь парсинга', 'Ежедневные проверки цен и фич'],
  },
  enterprise: {
    name: 'Enterprise',
    priceUsd: 299,
    urlLimit: 99999,
    frequency: 'Ежедневный / Реалтайм (каждые 1–3ч)',
    channels: ['Telegram', 'Slack'],
    features: ['Неограниченное число сайтов', 'Реалтайм мониторинг', 'Интеграция со Slack', 'Экспорт CSV'],
  },
};

// Local fallback store
interface DbState {
  users: (User & { password_hash?: string })[];
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
      password_hash: hashPassword('password123'),
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
      content_markdown: '# Stripe Pricing\n\nStandard fee: 2.9% + 30¢ per card charge.',
      content_hash: 'hash-s1',
      captured_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'snap-1-curr',
      competitor_url_id: 'comp-1',
      content_markdown: '# Stripe Pricing\n\nSpecial offer: 0% fee on first $50,000 for early-stage startups.',
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
      diff_snippet: 'Было: Standard fee: 2.9% + 30¢\nСтало: 0% fee on first $50,000 for startups.',
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
      summary: 'Linear запустил новый модуль Customer Requests с интеграцией Intercom и Zendesk.',
      diff_snippet: '+ Customer Requests: triage user feedback directly into issues.',
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
      summary: 'Vercel снизил стоимость гигабайта Serverless Function execution до $0.18.',
      diff_snippet: 'Было: $0.24 per GB-hour\nСтало: $0.18 per GB-hour',
      confidence: 0.98,
      is_read: true,
      delivered_telegram: true,
      delivered_slack: false,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
};

export const db = {
  // User Authentication & Management
  getUser: async (id?: string): Promise<User> => {
    const mongo = await getDb();
    if (mongo) {
      const query = id ? { id } : {};
      const u = await mongo.collection('users').findOne(query);
      if (u) {
        return {
          id: u.id,
          email: u.email,
          telegram_chat_id: u.telegram_chat_id,
          telegram_link_token: u.telegram_link_token,
          slack_webhook_url: u.slack_webhook_url,
          plan: u.plan || 'business',
          plan_status: u.plan_status || 'active',
          created_at: u.created_at,
        };
      }
    }

    const fallback = id ? state.users.find((x) => x.id === id) : state.users[0];
    const u = fallback || state.users[0];
    return {
      id: u.id,
      email: u.email,
      telegram_chat_id: u.telegram_chat_id,
      telegram_link_token: u.telegram_link_token,
      slack_webhook_url: u.slack_webhook_url,
      plan: u.plan,
      plan_status: u.plan_status,
      created_at: u.created_at,
    };
  },

  getUserByEmail: async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const mongo = await getDb();
    if (mongo) {
      const u = await mongo.collection('users').findOne({ email: cleanEmail });
      if (u) return u;
    }
    return state.users.find((x) => x.email.toLowerCase() === cleanEmail) || null;
  },

  createUser: async (email: string, passwordHash: string): Promise<User> => {
    const cleanEmail = email.trim().toLowerCase();
    const newUser: User & { password_hash: string } = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password_hash: passwordHash,
      telegram_chat_id: '',
      telegram_link_token: `cr_tok_${Math.random().toString(36).substring(2, 12)}`,
      slack_webhook_url: '',
      plan: 'business',
      plan_status: 'active',
      created_at: new Date().toISOString(),
    };

    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('users').insertOne(newUser);
    }
    state.users.unshift(newUser);

    return {
      id: newUser.id,
      email: newUser.email,
      telegram_chat_id: newUser.telegram_chat_id,
      telegram_link_token: newUser.telegram_link_token,
      slack_webhook_url: newUser.slack_webhook_url,
      plan: newUser.plan,
      plan_status: newUser.plan_status,
      created_at: newUser.created_at,
    };
  },

  updateUserPlan: async (plan: PlanType, status: any = 'active', userId?: string): Promise<User> => {
    const targetId = userId || defaultUserId;
    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('users').updateOne({ id: targetId }, { $set: { plan, plan_status: status } });
    }
    const user = state.users.find((u) => u.id === targetId) || state.users[0];
    user.plan = plan;
    user.plan_status = status;
    return { ...user };
  },

  updateTelegramChat: async (chatId: string, userId?: string): Promise<void> => {
    const targetId = userId || defaultUserId;
    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('users').updateOne({ id: targetId }, { $set: { telegram_chat_id: chatId } });
    }
    const user = state.users.find((u) => u.id === targetId) || state.users[0];
    user.telegram_chat_id = chatId;
  },

  updateSlackWebhook: async (url: string, userId?: string): Promise<void> => {
    const targetId = userId || defaultUserId;
    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('users').updateOne({ id: targetId }, { $set: { slack_webhook_url: url } });
    }
    const user = state.users.find((u) => u.id === targetId) || state.users[0];
    user.slack_webhook_url = url;
  },

  // Competitor URLs Management
  getCompetitors: async (userId?: string): Promise<CompetitorUrl[]> => {
    const mongo = await getDb();
    if (mongo) {
      const query = userId ? { user_id: userId } : {};
      const list = await mongo.collection('competitors').find(query).toArray();
      if (list.length > 0) {
        return list.map((c: any) => ({
          id: c.id,
          user_id: c.user_id,
          url: c.url,
          label: c.label,
          monitoring_frequency: c.monitoring_frequency,
          is_active: Boolean(c.is_active),
          last_checked_at: c.last_checked_at,
          created_at: c.created_at,
        }));
      }
    }

    // fallback state
    return state.competitors
      .filter((c) => !userId || c.user_id === userId || c.user_id === defaultUserId)
      .map((c) => ({
        ...c,
        snapshots_count: state.snapshots.filter((s) => s.competitor_url_id === c.id).length,
      }));
  },

  addCompetitor: async (
    userId: string,
    url: string,
    label?: string,
    frequency: any = 'daily'
  ): Promise<CompetitorUrl> => {
    const newComp: CompetitorUrl = {
      id: `comp-${Date.now()}`,
      user_id: userId || defaultUserId,
      url,
      label: label || new URL(url).hostname.replace('www.', ''),
      monitoring_frequency: frequency,
      is_active: true,
      last_checked_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('competitors').insertOne(newComp);
    }
    state.competitors.unshift(newComp);

    return newComp;
  },

  deleteCompetitor: async (id: string, userId?: string): Promise<boolean> => {
    const mongo = await getDb();
    if (mongo) {
      const q: any = { id };
      if (userId) q.user_id = userId;
      await mongo.collection('competitors').deleteOne(q);
      await mongo.collection('snapshots').deleteMany({ competitor_url_id: id });
    }

    const idx = state.competitors.findIndex((c) => c.id === id);
    if (idx !== -1) {
      state.competitors.splice(idx, 1);
      state.snapshots = state.snapshots.filter((s) => s.competitor_url_id !== id);
      return true;
    }
    return true;
  },

  toggleCompetitor: async (id: string, userId?: string): Promise<CompetitorUrl | null> => {
    const mongo = await getDb();
    if (mongo) {
      const q: any = { id };
      if (userId) q.user_id = userId;
      const comp = await mongo.collection('competitors').findOne(q);
      if (comp) {
        const nextState = !comp.is_active;
        await mongo.collection('competitors').updateOne(q, { $set: { is_active: nextState } });
        return {
          id: comp.id,
          user_id: comp.user_id,
          url: comp.url,
          label: comp.label,
          monitoring_frequency: comp.monitoring_frequency,
          is_active: nextState,
          last_checked_at: comp.last_checked_at,
          created_at: comp.created_at,
        };
      }
    }

    const comp = state.competitors.find((c) => c.id === id);
    if (comp) {
      comp.is_active = !comp.is_active;
      return { ...comp };
    }
    return null;
  },

  updateCompetitorCheckTime: async (id: string): Promise<void> => {
    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('competitors').updateOne({ id }, { $set: { last_checked_at: new Date().toISOString() } });
    }
    const comp = state.competitors.find((c) => c.id === id);
    if (comp) {
      comp.last_checked_at = new Date().toISOString();
    }
  },

  // Snapshots
  getSnapshots: async (competitorUrlId: string): Promise<CompetitorSnapshot[]> => {
    const mongo = await getDb();
    if (mongo) {
      const list = await mongo
        .collection('snapshots')
        .find({ competitor_url_id: competitorUrlId })
        .sort({ captured_at: -1 })
        .toArray();
      if (list.length > 0) {
        return list.map((s: any) => ({
          id: s.id,
          competitor_url_id: s.competitor_url_id,
          content_markdown: s.content_markdown,
          content_hash: s.content_hash,
          captured_at: s.captured_at,
        }));
      }
    }

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

    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('snapshots').insertOne(snap);
    }
    state.snapshots.unshift(snap);

    return snap;
  },

  // Alerts
  getAlerts: async (userId?: string, typeFilter?: string): Promise<Alert[]> => {
    const mongo = await getDb();
    if (mongo) {
      const query: any = {};
      if (userId) query.user_id = userId;
      if (typeFilter && typeFilter !== 'all') query.change_type = typeFilter;

      const list = await mongo.collection('alerts').find(query).sort({ created_at: -1 }).toArray();
      if (list.length > 0) {
        return list.map((a: any) => ({
          id: a.id,
          competitor_url_id: a.competitor_url_id,
          user_id: a.user_id,
          competitor_label: a.competitor_label,
          url: a.url,
          change_type: a.change_type,
          summary: a.summary,
          diff_snippet: a.diff_snippet,
          confidence: a.confidence,
          is_read: Boolean(a.is_read),
          delivered_telegram: Boolean(a.delivered_telegram),
          delivered_slack: Boolean(a.delivered_slack),
          created_at: a.created_at,
        }));
      }
    }

    let list = state.alerts.filter((a) => !userId || a.user_id === userId || a.user_id === defaultUserId);
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

    const mongo = await getDb();
    if (mongo) {
      await mongo.collection('alerts').insertOne(newAlert);
    }
    state.alerts.unshift(newAlert);

    return newAlert;
  },

  markAlertRead: async (id: string, userId?: string): Promise<Alert | null> => {
    const mongo = await getDb();
    if (mongo) {
      const q: any = { id };
      if (userId) q.user_id = userId;
      await mongo.collection('alerts').updateOne(q, { $set: { is_read: true } });
    }

    const alert = state.alerts.find((a) => a.id === id);
    if (alert) {
      alert.is_read = true;
      return { ...alert };
    }
    return null;
  },
};
