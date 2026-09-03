'use client';

import React, { useState } from 'react';
import { X, Globe, Tag, Clock, Sparkles, Loader2 } from 'lucide-react';
import { FrequencyType } from '@/lib/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userPlan: string;
}

export function AddCompetitorModal({ isOpen, onClose, onSuccess, userPlan }: Props) {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [frequency, setFrequency] = useState<FrequencyType>(
    userPlan === 'solopreneur' ? 'weekly' : 'daily'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUrlChange = (val: string) => {
    setUrl(val);
    if (!label) {
      try {
        let clean = val.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        if (clean.length > 2) {
          const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
          setLabel(capitalized);
        }
      } catch {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          label: label || undefined,
          frequency,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ошибка при добавлении конкурента');
      }

      setUrl('');
      setLabel('');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-radar-card border border-radar-border shadow-2xl p-6 overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radar-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-radar-border mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Добавить сайт конкурента</h3>
              <p className="text-xs text-radar-muted">AI сформирует baseline snapshot для отслеживания</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded-lg text-radar-muted hover:text-white hover:bg-[#161C28] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-radar-alert/15 border border-radar-alert/30 text-xs text-radar-alert leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">
              URL страницы для мониторинга <span className="text-radar-alert">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <input
                type="text"
                required
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/pricing"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/50 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
            <p className="text-[11px] text-radar-muted/80 mt-1">
              Рекомендуется указывать страницы цен, тарифов, фич или главных офферов
            </p>
          </div>

          {/* Label Input */}
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">
              Название конкурента (лейбл)
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Например: Acme Corp Pricing"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/50 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
          </div>

          {/* Frequency Select */}
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">
              Частота проверок
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                disabled={loading || userPlan === 'solopreneur'}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition disabled:opacity-60"
              >
                <option value="weekly">Еженедельно (Доступно на всех тарифах)</option>
                <option value="daily" disabled={userPlan === 'solopreneur'}>
                  Ежедневно {userPlan === 'solopreneur' ? '(Требуется тариф Business)' : ''}
                </option>
                <option value="realtime" disabled={userPlan !== 'enterprise'}>
                  Реалтайм (каждые 1-3 часа) {userPlan !== 'enterprise' ? '(Только Enterprise)' : ''}
                </option>
              </select>
            </div>
            {userPlan === 'solopreneur' && (
              <p className="text-[11px] text-radar-warning mt-1">
                На тарифе Solopreneur доступен еженедельный мониторинг. Обновите тариф для ежедневных проверок.
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-radar-muted hover:text-white transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading || !url}
              className="px-5 py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-[0_0_15px_rgba(61,255,176,0.2)] disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Парсинг и сохранение...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Добавить и создать снимок
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
