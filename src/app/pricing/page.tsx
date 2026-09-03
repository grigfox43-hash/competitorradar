'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Тарифные планы
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
              Инвестируйте в конкурентное превосходство
            </h1>
            <p className="text-radar-muted text-base sm:text-lg">
              Фиксированная Per-URL подписка. Без скрытых платежей, отмена в 1 клик.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {/* Solopreneur */}
            <div className="radar-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Solopreneur</h3>
                <p className="text-xs text-radar-muted mt-1">Для стартапов и сольных основателей</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$49</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <div className="mt-6 pt-6 border-t border-radar-border space-y-3.5 text-xs text-radar-text">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>До <strong>5 сайтов</strong> конкурентов</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Еженедельный дайджест</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>AI-сравнение изменений</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Уведомления в Telegram</span>
                  </div>
                </div>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 block w-full py-3 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/60 text-white font-semibold text-xs text-center transition"
              >
                Подключить Solopreneur
              </Link>
            </div>

            {/* Business */}
            <div className="radar-card p-8 flex flex-col justify-between border-radar-accent shadow-[0_0_30px_rgba(61,255,176,0.15)] bg-[#131B27] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-radar-accent text-black font-bold text-[10px] tracking-wider uppercase shadow-md">
                Выбор большинства
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center justify-between">
                  Business
                  <span className="text-xs text-radar-accent font-mono">POPULAR</span>
                </h3>
                <p className="text-xs text-radar-muted mt-1">Для продуктовых команд и маркетологов</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$129</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <div className="mt-6 pt-6 border-t border-radar-border space-y-3.5 text-xs text-radar-text">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>До <strong>20 сайтов</strong> конкурентов</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span><strong>Ежедневный мониторинг</strong> цен и фич</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Приоритетная очередь парсинга</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Моментальные алерты в Telegram</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>История снапшотов 90 дней</span>
                  </div>
                </div>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 block w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-xs text-center shadow-[0_0_20px_rgba(61,255,176,0.25)] transition"
              >
                Подключить Business
              </Link>
            </div>

            {/* Enterprise */}
            <div className="radar-card p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="text-xs text-radar-muted mt-1">Для крупных компаний и агентств</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$299</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <div className="mt-6 pt-6 border-t border-radar-border space-y-3.5 text-xs text-radar-text">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span><strong>Неограниченно</strong> сайтов</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Реалтайм мониторинг (1-3 часа)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Доставка в <strong>Telegram + Slack</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Экспорт полной истории в CSV</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent" />
                    <span>Персональный аккаунт-менеджер</span>
                  </div>
                </div>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 block w-full py-3 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/60 text-white font-semibold text-xs text-center transition"
              >
                Подключить Enterprise
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
