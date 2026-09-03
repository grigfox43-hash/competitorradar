'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { PlanType } from '@/lib/types';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('business');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadBilling = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/billing');
      if (res.ok) {
        const data = await res.json();
        if (data.plan) setCurrentPlan(data.plan);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBilling();
  }, []);

  const handlePlanChange = async (targetPlan: PlanType) => {
    if (targetPlan === currentPlan) return;
    setUpdating(targetPlan);
    setMessage(null);
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetPlan }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPlan(targetPlan);
        setMessage(data.message || `Тариф успешно обновлён!`);
      }
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setUpdating(null);
    }
  };

  const plans = [
    {
      id: 'solopreneur' as PlanType,
      name: 'Solopreneur',
      price: '$49',
      urls: 'до 5 сайтов',
      freq: 'Еженедельный дайджест',
      channels: 'Telegram',
      features: ['До 5 сайтов конкурентов', 'Еженедельный отчёт', 'AI-сравнение через Gemini', 'Персональный Telegram'],
    },
    {
      id: 'business' as PlanType,
      name: 'Business',
      price: '$129',
      urls: 'до 20 сайтов',
      freq: 'Ежедневный мониторинг',
      channels: 'Telegram',
      popular: true,
      features: ['До 20 сайтов конкурентов', 'Приоритетная очередь парсинга', 'Ежедневные проверки цен и фич', 'Мгновенные алерты в Telegram', 'История снапшотов 90 дней'],
    },
    {
      id: 'enterprise' as PlanType,
      name: 'Enterprise',
      price: '$299',
      urls: 'неограниченно',
      freq: 'Реалтайм (каждые 1–3ч)',
      channels: 'Telegram + Slack',
      features: ['Неограниченное число сайтов', 'Реалтайм мониторинг', 'Интеграция со Slack', 'Экспорт истории в CSV', 'Персональный менеджер'],
    },
  ];

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-heading">
          Управление тарифом и биллингом
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          Контролируйте вашу подписку, лимиты и каналы доставки разведданных
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-radar-accent/10 border border-radar-accent/30 text-xs text-radar-accent animate-fade-in flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-radar-muted hover:text-white">✕</button>
        </div>
      )}

      {/* Current Plan Overview (Spec 5.5) */}
      <div className="radar-card p-6 bg-[#111724] border-radar-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-radar-muted uppercase tracking-wider">Текущий активный план</div>
          <div className="text-xl font-bold text-white uppercase flex items-center gap-2">
            <span>{currentPlan}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-radar-accent/20 text-radar-accent border border-radar-accent/40 font-mono">
              АКТИВЕН
            </span>
          </div>
          <p className="text-xs text-radar-muted">
            Следующее автоматическое продление: <strong>3 октября 2026 г.</strong>
          </p>
        </div>

        <button
          onClick={() => alert('Перенаправление в Stripe Customer Portal...')}
          className="px-4 py-2 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/40 text-xs font-semibold text-white flex items-center gap-2 transition"
        >
          <CreditCard className="w-4 h-4 text-radar-accent" />
          <span>Управление платежами Stripe</span>
          <ExternalLink className="w-3 h-3 text-radar-muted" />
        </button>
      </div>

      {/* Plans comparison cards (Spec 3 & 5.5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.id;
          const isUpdatingThis = updating === p.id;

          return (
            <div
              key={p.id}
              className={`radar-card p-6 flex flex-col justify-between relative transition-all ${
                isCurrent
                  ? 'border-radar-accent shadow-[0_0_25px_rgba(61,255,176,0.15)] bg-[#131B27]'
                  : 'border-radar-border'
              }`}
            >
              {p.popular && !isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-radar-accent text-black font-bold text-[9px] uppercase">
                  Популярный
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <span className="text-xs text-radar-muted">{p.urls}</span>
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white font-heading">{p.price}</span>
                  <span className="text-xs text-radar-muted">/ мес</span>
                </div>

                <div className="mt-5 pt-4 border-t border-radar-border space-y-2.5 text-xs text-radar-muted">
                  <div className="text-radar-text font-medium">{p.freq}</div>
                  <div className="text-[11px]">Каналы: {p.channels}</div>
                  <ul className="space-y-2 pt-2">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-radar-text">
                        <CheckCircle2 className="w-3.5 h-3.5 text-radar-accent flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4">
                {isCurrent ? (
                  <div className="w-full py-2.5 rounded-xl bg-radar-accent/15 border border-radar-accent/40 text-center text-xs font-semibold text-radar-accent">
                    Текущий тариф
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanChange(p.id)}
                    disabled={Boolean(updating)}
                    className="w-full py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-xs transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isUpdatingThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Перейти на {p.name}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
