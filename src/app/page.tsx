'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radar,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  TrendingDown,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileCode,
  Bell,
  Cpu,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RadarScanner } from '@/components/RadarScanner';
import { TelegramChatSimulator } from '@/components/TelegramChatSimulator';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-radar-border/40">
        {/* Decorative background grid and ambient lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111620_1px,transparent_1px),linear-gradient(to_bottom,#111620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radar-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top intelligence pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-radar-card border border-radar-accent/30 text-xs text-radar-accent shadow-[0_0_15px_rgba(61,255,176,0.1)]">
                <span className="w-2 h-2 rounded-full bg-radar-accent animate-ping" />
                <span>Автоматический мониторинг конкурентов 24/7</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading">
                Узнавайте об изменениях у конкурентов{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-radar-accent via-[#68FFCA] to-radar-info">
                  раньше, чем это заметит рынок
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-radar-muted max-w-2xl leading-relaxed">
                CompetitorRadar автоматически парсит страницы цен, фич и промо-акций ваших соперников,
                сравнивает снапшоты через <strong>AI Gemini</strong>, отфильтровывает косметический шум и присылает главное прямо в Telegram.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/app/competitors"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-base shadow-[0_0_25px_rgba(61,255,176,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Radar className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Запустить радар бесплатно
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/40 text-radar-text font-medium text-base hover:bg-[#161C28] transition-all flex items-center justify-center gap-2"
                >
                  Как это устроено
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-radar-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-radar-accent" />
                  <span>Парсинг без блокировок</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-radar-info" />
                  <span>Интеллект Gemini</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-radar-accent" />
                  <span>Мгновенный бот Telegram</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Telegram Chat Simulation + Radar Sweep */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full flex justify-center">
                <TelegramChatSimulator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. КАК ЭТО РАБОТАЕТ (3 ШАГА) */}
      <section id="how-it-works" className="py-24 border-b border-radar-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Архитектура системы
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              От сырой веб-страницы до конкретного инсайта за 3 шага
            </h2>
            <p className="text-radar-muted text-base">
              Вам больше не нужно открывать вкладки конкурентов вручную. Автоматический конвейер отслеживания работает ежедневно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="radar-card p-8 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent font-bold font-mono text-lg">
                  01
                </div>
                <h3 className="text-xl font-bold text-white">Добавьте URL сайтов</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  Укажите страницы цен, тарифов или продуктов конкурентов. Краулер немедленно сформирует первоначальный baseline snapshot в формате чистого Markdown.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-radar-border/60 text-xs font-mono text-radar-accent flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>Firecrawl / Smart Scraper</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="radar-card p-8 relative flex flex-col justify-between border-radar-accent/30 shadow-[0_0_30px_rgba(61,255,176,0.06)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-info/15 border border-radar-info/30 flex items-center justify-center text-radar-info font-bold font-mono text-lg">
                  02
                </div>
                <h3 className="text-xl font-bold text-white">AI-анализ различий</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  Нейросеть <strong>Gemini</strong> построчно сопоставляет снапшоты «вчера» и «сегодня». Косметические правки, счётчики и баннеры игнорируются — фиксируются только бизнес-изменения.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-radar-border/60 text-xs font-mono text-radar-info flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Gemini LLM Prompt Node</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="radar-card p-8 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent font-bold font-mono text-lg">
                  03
                </div>
                <h3 className="text-xl font-bold text-white">Алерт в Telegram / Slack</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  При выявлении значимого изменения сервис моментально отправляет структурированное уведомление: категория события, краткая суть и наглядный diff старой и новой версии.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-radar-border/60 text-xs font-mono text-radar-accent flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>Telegram Bot / Slack Webhook</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ИНТЕРАКТИВНЫЙ РАДАР И ДЕМО АЛЕРТОВ */}
      <section id="features" className="py-24 border-b border-radar-border/40 bg-[#0C1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Radar scanner visualization */}
            <div className="lg:col-span-5 flex justify-center">
              <RadarScanner size={440} />
            </div>

            {/* Features & Types of Alerts */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
                  Точность фильтрации
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
                  Фильтрация шума: только то, что влияет на выручку
                </h2>
                <p className="text-radar-muted mt-3 leading-relaxed">
                  Большинство мониторов присылают сотни уведомлений при смене даты или обновлении CSS. CompetitorRadar через AI распознаёт смысл изменений:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-alert font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-alert" />
                    Изменения цен и тарифов
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    Детекция изменения стоимости подписок, скидок, валют, скрытых комиссий и лимитов планов.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-info font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-info" />
                    Новые продукты и фичи
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    Отслеживание запуска новых разделов, интеграций, модулей и страниц продуктовой документации.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-accent font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-accent" />
                    Офферы и промо-акции
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    Моментальный сигнал, когда конкурент запускает бесплатный триал, аудит или спецпредложение.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-[#F5A623] font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                    Смена позиционирования (CTA)
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    Анализ изменения главных заголовков, УТП, ценностных предложений и кнопок захвата лидов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ДЛЯ КОГО (3 ПЕРСОНЫ) */}
      <section className="py-24 border-b border-radar-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Целевая аудитория
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Создано для тех, кто принимает ключевые решения
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CMO */}
            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-accent">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Директора по маркетингу (CMO)</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                Знайте о рекламных офферах и ценовых ходах конкурентов раньше рынка. Защищайте долю компании и оперативно корректируйте собственные рекламные кампании.
              </p>
            </div>

            {/* Product Manager */}
            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-info">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Продуктовые менеджеры</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                Отслеживайте продуктовый роадмап и релизы конкурентов без ручного прокликивания их лендингов. Будьте в курсе всех новых функций и изменений тарификации.
              </p>
            </div>

            {/* Founder */}
            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-accent">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">B2B-фаундеры</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                Экономьте до 15 часов аналитической рутины в месяц. Получайте выжимку в Telegram и сразу понимайте, как реагировать на шаги конкурентов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ТАРИФЫ (SECTION 3 & 6.1) */}
      <section id="pricing" className="py-24 border-b border-radar-border/40 bg-[#0C1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Тарифные планы
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Прозрачные тарифы под любые масштабы разведки
            </h2>
            <p className="text-radar-muted text-base">
              Per-URL подписка с выбором частоты мониторинга и каналов доставки алертов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Solopreneur */}
            <div className="radar-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-lg font-bold text-white">Solopreneur</div>
                <p className="text-xs text-radar-muted mt-1">Для независимых фаундеров и соло-маркетологов</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$49</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-xs text-radar-text">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>До <strong>5 сайтов</strong> конкурентов</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Еженедельный дайджест изменений</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>AI-сравнение через Gemini</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Доставка в персональный Telegram</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 w-full py-3 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/60 text-white font-semibold text-xs text-center transition"
              >
                Выбрать Solopreneur
              </Link>
            </div>

            {/* Business (POPULAR) */}
            <div className="radar-card p-8 flex flex-col justify-between border-radar-accent shadow-[0_0_30px_rgba(61,255,176,0.15)] relative bg-[#131B27]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-radar-accent text-black font-bold text-[10px] tracking-wider uppercase shadow-md">
                Самый популярный
              </div>
              <div>
                <div className="text-lg font-bold text-white flex items-center justify-between">
                  Business
                  <span className="text-xs text-radar-accent font-mono">PRIORITY</span>
                </div>
                <p className="text-xs text-radar-muted mt-1">Для растущих продуктовых команд и агентств</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$129</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-xs text-radar-text">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>До <strong>20 сайтов</strong> конкурентов</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span><strong>Ежедневный мониторинг</strong> цен и офферов</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Приоритетная очередь краулинга</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Моментальные алерты в Telegram</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>История снапшотов 90 дней</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-xs text-center shadow-[0_0_20px_rgba(61,255,176,0.25)] transition"
              >
                Выбрать Business
              </Link>
            </div>

            {/* Enterprise */}
            <div className="radar-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-lg font-bold text-white">Enterprise</div>
                <p className="text-xs text-radar-muted mt-1">Для корпораций и масштабного конкурентного анализа</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">$299</span>
                  <span className="text-sm text-radar-muted">/ месяц</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-xs text-radar-text">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span><strong>Неограниченное</strong> число URL</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Реалтайм проверка (каждые 1-3 часа)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Доставка в <strong>Telegram + Slack</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Экспорт полной истории в CSV</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-radar-accent flex-shrink-0" />
                    <span>Выделенный менеджер и SLA</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/settings/billing"
                className="mt-8 w-full py-3 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/60 text-white font-semibold text-xs text-center transition"
              >
                Выбрать Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (SECTION 6.1) */}
      <section id="faq" className="py-24 border-b border-radar-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              Вопросы и ответы
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Как работает парсинг и не забанят ли меня конкуренты?',
                a: 'Парсер обращается только к публично доступным страницам сайтов через распределённую сеть прокси. Запросы отправляются с интервалами, имитирующими обычного пользователя, поэтому риска блокировки вашего аккаунта нет.',
              },
              {
                q: 'Какие страницы конкурентов лучше всего добавлять?',
                a: 'Наибольшую пользу приносят страницы с тарифами (/pricing), списком продуктовых фич (/features), описанием интеграций, а также главные промо-лендинги.',
              },
              {
                q: 'Как AI отличает реальные изменения от косметических правок?',
                a: 'Парсер переводит страницу в чистый Markdown без стилей и скриптов. Затем модель Gemini анализирует смысл текста и сопоставляет только существенные бизнес-факторы: цены, условия, фичи и УТП.',
              },
              {
                q: 'Можно ли получать алерты в командный канал Slack?',
                a: 'Да! Интеграция со Slack через Incoming Webhooks доступна на тарифе Enterprise. На тарифах Solopreneur и Business доставка осуществляется в Telegram.',
              },
              {
                q: 'Как начать работу с сервисом?',
                a: 'Нажмите «Запустить радар», введите URL первого сайта конкурента и подключите Telegram бота по персональной ссылке за 30 секунд.',
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl bg-radar-card border border-radar-border overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-radar-accent transition"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-radar-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-radar-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-radar-muted leading-relaxed border-t border-radar-border/40 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ФИНАЛЬНЫЙ CTA (SECTION 6.1) */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0C1017] to-radar-bg">
        <div className="absolute inset-0 bg-radar-accent/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
            Начните следить за конкурентами уже сегодня
          </h2>
          <p className="text-radar-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Подключите первого конкурента прямо сейчас. Первый снапшот и сравнительный отчёт сформируются в течение 1 минуты.
          </p>
          <div className="pt-2">
            <Link
              href="/app/competitors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-base shadow-[0_0_30px_rgba(61,255,176,0.35)] transition-all group"
            >
              <Radar className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              Перейти в дашборд мониторинга
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
