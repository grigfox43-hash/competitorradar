'use client';

import React, { useState, useEffect } from 'react';
import { Slack, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function SlackSettingsPage() {
  const { t } = useLanguage();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/competitors')
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.slack_webhook_url) setWebhookUrl(d.user.slack_webhook_url);
      });
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
          <Slack className="w-6 h-6 text-radar-info" />
          <span>{t('slack.title')}</span>
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          {t('slack.subtitle')}
        </p>
      </div>

      <div className="radar-card p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-radar-muted mb-1.5">
            {t('slack.label')}
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
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs transition"
        >
          {t('slack.saveBtn')}
        </button>

        {saved && (
          <div className="p-3 rounded-lg bg-radar-accent/10 border border-radar-accent/30 text-xs text-radar-accent flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{t('slack.success')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
