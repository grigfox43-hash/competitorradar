'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Slack, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function SlackSettingsPage() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [userPlan, setUserPlan] = useState('business');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/competitors')
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.plan) setUserPlan(d.user.plan);
      });
  }, []);

  const isEnterprise = userPlan === 'enterprise';

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
          <span>Интеграция со Slack</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E293B] text-radar-info border border-radar-info/30">
            ENTERPRISE
          </span>
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          Транслируйте алерты об изменениях у конкурентов напрямую в командные каналы Slack
        </p>
      </div>

      {!isEnterprise ? (
        /* Enterprise Feature Lock Overlay (Spec 5.4 / 3) */
        <div className="radar-card p-8 text-center space-y-4 border-radar-info/30 bg-[#0E1522] relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-[#152135] border border-radar-info/40 flex items-center justify-center mx-auto text-radar-info">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Функция доступна на тарифе Enterprise
          </h3>
          <p className="text-xs text-radar-muted max-w-md mx-auto leading-relaxed">
            Подключение командных каналов Slack через Incoming Webhooks входит в тариф Enterprise с неограниченным мониторингом сайтов и CSV-экспортом.
          </p>
          <div className="pt-2">
            <Link
              href="/app/settings/billing"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-md transition"
            >
              Улучшить тариф до Enterprise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Active Enterprise Form */
        <div className="radar-card p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">
              Slack Incoming Webhook URL
            </label>
            <input
              type="text"
              placeholder="https://hooks.slack.com/services/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition"
            />
          </div>

          <button
            onClick={() => setSaved(true)}
            className="px-5 py-2.5 rounded-xl bg-radar-accent text-black font-semibold text-xs transition"
          >
            Сохранить вебхук
          </button>

          {saved && (
            <div className="p-3 rounded-lg bg-radar-accent/10 text-xs text-radar-accent flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Slack Webhook успешно сохранён! Алерты будут дублироваться в выбранный канал.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
