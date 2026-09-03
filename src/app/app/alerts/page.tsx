'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Check,
  Send,
  Loader2,
} from 'lucide-react';
import { Alert, ChangeType } from '@/lib/types';
import { useLanguage } from '@/lib/i18n';

export default function AlertsPage() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [counts, setCounts] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadAlerts = async (filter = activeFilter) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/alerts?type=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts || []);
        if (data.counts) setCounts(data.counts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts(activeFilter);
  }, [activeFilter]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch('/api/alerts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, is_read: true } : a)));
        setCounts((c: any) => ({ ...c, unread: Math.max(0, (c.unread || 1) - 1) }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filters = [
    { id: 'all', label: t('alerts.all'), countKey: 'all', color: '#F2F4F8' },
    { id: 'price', label: t('alerts.prices'), countKey: 'price', color: '#FF5C5C' },
    { id: 'new_feature', label: t('alerts.features'), countKey: 'new_feature', color: '#4C8CFF' },
    { id: 'offer', label: t('alerts.offers'), countKey: 'offer', color: '#3DFFB0' },
    { id: 'content', label: t('alerts.content'), countKey: 'content', color: '#F5A623' },
  ];

  const getBadgeDetails = (type: ChangeType) => {
    switch (type) {
      case 'price':
        return { label: t('alerts.prices'), color: '#FF5C5C', bg: 'rgba(255, 92, 92, 0.12)' };
      case 'new_feature':
        return { label: t('alerts.features'), color: '#4C8CFF', bg: 'rgba(76, 140, 255, 0.12)' };
      case 'offer':
        return { label: t('alerts.offers'), color: '#3DFFB0', bg: 'rgba(61, 255, 176, 0.12)' };
      case 'content':
        return { label: t('alerts.content'), color: '#F5A623', bg: 'rgba(245, 166, 35, 0.12)' };
      default:
        return { label: 'Change', color: '#8B93A7', bg: 'rgba(139, 147, 167, 0.12)' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
            <span>{t('alerts.title')}</span>
            {counts.unread > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-radar-alert text-black">
                {counts.unread} {t('alerts.newBadge')}
              </span>
            )}
          </h1>
          <p className="text-xs text-radar-muted mt-1">
            {t('alerts.subtitle')}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-radar-border">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          const count = counts[f.countKey] ?? 0;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-radar-card text-white border border-radar-accent shadow-[0_0_15px_rgba(61,255,176,0.1)]'
                  : 'bg-[#0E121B] text-radar-muted border border-radar-border hover:text-white hover:border-radar-border/80'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: f.color }}
              />
              <span>{f.label}</span>
              <span className="text-[10px] text-radar-muted font-mono ml-0.5">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Alert Feed Cards */}
      {loading ? (
        <div className="radar-card p-12 text-center text-radar-muted flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-radar-accent animate-spin" />
          <span className="text-xs">Загрузка...</span>
        </div>
      ) : alerts.length === 0 ? (
        <div className="radar-card p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#161C28] border border-radar-border flex items-center justify-center mx-auto text-radar-accent">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">{t('alerts.empty')}</h3>
          <p className="text-xs text-radar-muted max-w-sm mx-auto">
            {t('alerts.emptyDesc')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const badge = getBadgeDetails(alert.change_type);
            const isExpanded = expandedId === alert.id;

            return (
              <div
                key={alert.id}
                onClick={() => toggleExpand(alert.id)}
                className={`radar-card p-5 cursor-pointer transition-all border relative overflow-hidden ${
                  !alert.is_read
                    ? 'border-l-4 border-l-radar-accent bg-[#121824]'
                    : 'border-radar-border/80 bg-radar-card'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className="px-2 py-0.5 rounded-full font-semibold text-[10px] border"
                        style={{
                          color: badge.color,
                          backgroundColor: badge.bg,
                          borderColor: `${badge.color}40`,
                        }}
                      >
                        ● {badge.label}
                      </span>

                      <span className="font-semibold text-white">
                        {alert.competitor_label}
                      </span>

                      <a
                        href={alert.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-radar-muted hover:text-radar-accent font-mono text-[11px] flex items-center gap-1 transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {alert.delivered_telegram && (
                        <span className="text-[10px] text-radar-accent flex items-center gap-1 ml-auto sm:ml-0">
                          <Send className="w-2.5 h-2.5" /> Telegram
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-medium text-radar-text leading-snug">
                      {alert.summary}
                    </h4>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0 text-xs text-radar-muted">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {new Date(alert.created_at).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {!alert.is_read && (
                      <button
                        onClick={(e) => markAsRead(alert.id, e)}
                        className="px-2 py-1 rounded bg-[#1A2232] hover:bg-[#232E43] text-[10px] text-radar-accent border border-radar-accent/30 flex items-center gap-1 transition"
                        title={t('alerts.read')}
                      >
                        <Check className="w-3 h-3" />
                        <span>{t('alerts.read')}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-radar-border/40 flex items-center justify-between text-xs text-radar-muted">
                  <div className="flex items-center gap-1 text-[11px] text-radar-accent">
                    <Sparkles className="w-3 h-3" />
                    <span>{t('alerts.confidence')}: {Math.round((alert.confidence || 0.95) * 100)}%</span>
                  </div>

                  <span className="flex items-center gap-1 hover:text-white transition">
                    <span>{isExpanded ? t('alerts.hideDiff') : t('alerts.showDiff')}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </div>

                {isExpanded && alert.diff_snippet && (
                  <div className="mt-3 p-3 rounded-lg bg-[#0A0D13] border border-radar-border/60 text-xs font-mono text-radar-muted whitespace-pre-line leading-relaxed animate-fade-in">
                    <div className="text-[10px] uppercase text-radar-accent font-semibold mb-1">
                      {t('alerts.diffTitle')}
                    </div>
                    {alert.diff_snippet}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
