'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Cpu, FileCode, CheckCircle2, Shield, Network, Terminal } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Технологический стек
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
              Как устроен CompetitorRadar
            </h1>
            <p className="text-radar-muted text-base sm:text-lg max-w-2xl mx-auto">
              Полный обзор конвейера сбора данных: от распределённого краулинга до нейросетевой классификации изменений.
            </p>
          </div>

          {/* Architecture Pipeline Diagram */}
          <div className="radar-card p-8 bg-[#0D121B] border-radar-accent/20">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Network className="w-5 h-5 text-radar-accent" />
              Схема потока данных
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-[#141A25] border border-radar-border flex items-center justify-between">
                <span className="text-radar-accent">[00:00 UTC Cron / On-demand]</span>
                <span className="text-radar-muted">Оркестрация очереди мониторинга по частоте (daily / weekly)</span>
              </div>
              <div className="text-center text-radar-muted">↓</div>
              <div className="p-4 rounded-lg bg-[#141A25] border border-radar-border flex items-center justify-between">
                <span className="text-radar-info">[Firecrawl / Scraper]</span>
                <span className="text-radar-muted">Парсинг целевого URL → очистка от шума → Markdown snapshot</span>
              </div>
              <div className="text-center text-radar-muted">↓</div>
              <div className="p-4 rounded-lg bg-[#141A25] border border-radar-border flex items-center justify-between">
                <span className="text-radar-warning">[Snapshot Store]</span>
                <span className="text-radar-muted">SHA-256 хеширование и извлечение версии «Вчера» для того же URL</span>
              </div>
              <div className="text-center text-radar-muted">↓</div>
              <div className="p-4 rounded-lg bg-[#141A25] border border-radar-accent/40 flex items-center justify-between shadow-[0_0_15px_rgba(61,255,176,0.1)]">
                <span className="text-radar-accent">[Gemini AI Prompt Engine]</span>
                <span className="text-white">Сравнение версий «Вчера» vs «Сегодня» по эталонному промпту разведки</span>
              </div>
              <div className="text-center text-radar-muted">↓</div>
              <div className="p-4 rounded-lg bg-[#141A25] border border-radar-border flex items-center justify-between">
                <span className="text-radar-alert">[Alert Pipeline]</span>
                <span className="text-radar-muted">Запись в ленту дашборда + push в Telegram Bot и Slack Webhook</span>
              </div>
            </div>
          </div>

          {/* Deep-dive sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="radar-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-radar-accent font-semibold text-sm">
                <FileCode className="w-4 h-4" />
                <span>1. Извлечение чистого Markdown</span>
              </div>
              <p className="text-xs text-radar-muted leading-relaxed">
                Сайты насыщены всплывающими окнами, рекламными ротаторами и сложной JavaScript-разметкой. Краулер преобразует страницу в стандартизированный Markdown, очищая разметку от посторонних скриптов и стилей.
              </p>
            </div>

            <div className="radar-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-radar-info font-semibold text-sm">
                <Cpu className="w-4 h-4" />
                <span>2. Семантический дифференциал Gemini</span>
              </div>
              <p className="text-xs text-radar-muted leading-relaxed">
                Вместо слепого diff-алгоритма работает языковая модель <strong>Gemini</strong>. Она классифицирует изменения по категориям (price, new_feature, content, offer) и оценивает степень их важности для бизнеса.
              </p>
            </div>

            <div className="radar-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-radar-alert font-semibold text-sm">
                <Shield className="w-4 h-4" />
                <span>3. Защита от SSRF и безопасность</span>
              </div>
              <p className="text-xs text-radar-muted leading-relaxed">
                Все URL проходят строгую валидацию на сетевом уровне. Запрещены обращения к приватным локальным адресам (localhost, 127.0.0.1, 10.x, 192.168.x). Парсятся строго публичные страницы.
              </p>
            </div>

            <div className="radar-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-radar-accent font-semibold text-sm">
                <Bot className="w-4 h-4" />
                <span>4. Доставка в Telegram без задержек</span>
              </div>
              <p className="text-xs text-radar-muted leading-relaxed">
                Привязка Telegram-аккаунта происходит через персональный deep-link токен. Алерты содержат название конкурента, категорию, резюме на русском языке и конкретный diff.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-8">
            <Link
              href="/app/competitors"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(61,255,176,0.3)] transition-all"
            >
              Перейти к мониторингу в дашборде
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
