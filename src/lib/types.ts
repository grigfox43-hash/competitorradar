export type PlanType = 'solopreneur' | 'business' | 'enterprise';

export type PlanStatus = 'trialing' | 'active' | 'past_due' | 'canceled';

export type FrequencyType = 'weekly' | 'daily' | 'realtime';

export type ChangeType = 'price' | 'new_feature' | 'content' | 'offer' | 'other';

export interface User {
  id: string;
  email: string;
  telegram_chat_id?: string;
  telegram_link_token?: string;
  slack_webhook_url?: string;
  plan: PlanType;
  plan_status: PlanStatus;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
}

export interface CompetitorUrl {
  id: string;
  user_id: string;
  url: string;
  label: string;
  monitoring_frequency: FrequencyType;
  is_active: boolean;
  last_checked_at?: string;
  created_at: string;
  snapshots_count?: number;
}

export interface CompetitorSnapshot {
  id: string;
  competitor_url_id: string;
  content_markdown: string;
  content_hash: string;
  captured_at: string;
}

export interface Alert {
  id: string;
  competitor_url_id: string;
  user_id: string;
  competitor_label: string;
  url: string;
  change_type: ChangeType;
  summary: string;
  diff_snippet?: string;
  confidence: number;
  is_read: boolean;
  delivered_telegram: boolean;
  delivered_slack: boolean;
  created_at: string;
}

export interface ComparisonResult {
  has_significant_change: boolean;
  change_type: ChangeType;
  summary: string;
  confidence: number;
  diff_snippet?: string;
}

export interface PlanLimits {
  name: string;
  priceUsd: number;
  urlLimit: number;
  frequency: string;
  channels: string[];
  features: string[];
}
