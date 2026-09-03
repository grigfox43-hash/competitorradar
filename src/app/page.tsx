'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Radar,
  ArrowRight,
  TrendingDown,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileCode,
  Cpu,
  Bot,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RadarScanner } from '@/components/RadarScanner';
import { TelegramChatSimulator } from '@/components/TelegramChatSimulator';
import { useLanguage } from '@/lib/i18n';
import { SHOW_BILLING } from '@/lib/config';

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-radar-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111620_1px,transparent_1px),linear-gradient(to_bottom,#111620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radar-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-radar-card border border-radar-accent/30 text-xs text-radar-accent shadow-[0_0_15px_rgba(61,255,176,0.1)]">
                <span className="w-2 h-2 rounded-full bg-radar-accent animate-ping" />
                <span>{t('hero.pill')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading">
                {t('hero.title1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-radar-accent via-[#68FFCA] to-radar-info">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-radar-muted max-w-2xl leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-base shadow-[0_0_25px_rgba(61,255,176,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Radar className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  {t('hero.startBtn')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/40 text-radar-text font-medium text-base hover:bg-[#161C28] transition-all flex items-center justify-center gap-2"
                >
                  {t('hero.howBtn')}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-radar-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-radar-accent" />
                  <span>{t('hero.trust1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-radar-info" />
                  <span>{t('hero.trust2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-radar-accent" />
                  <span>{t('hero.trust3')}</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Live Telegram Simulation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full flex justify-center">
                <TelegramChatSimulator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. КАК ЭТО РАБОТАЕТ */}
      <section id="how-it-works" className="py-24 border-b border-radar-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              {t('how.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              {t('how.title')}
            </h2>
            <p className="text-radar-muted text-base">
              {t('how.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="radar-card p-8 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent font-bold font-mono text-lg">
                  01
                </div>
                <h3 className="text-xl font-bold text-white">{t('how.step1.title')}</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  {t('how.step1.desc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-radar-border/60 text-xs font-mono text-radar-accent flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>Firecrawl / Smart Scraper</span>
              </div>
            </div>

            <div className="radar-card p-8 relative flex flex-col justify-between border-radar-accent/30 shadow-[0_0_30px_rgba(61,255,176,0.06)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-info/15 border border-radar-info/30 flex items-center justify-center text-radar-info font-bold font-mono text-lg">
                  02
                </div>
                <h3 className="text-xl font-bold text-white">{t('how.step2.title')}</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  {t('how.step2.desc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-radar-border/60 text-xs font-mono text-radar-info flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Gemini Prompt Engine</span>
              </div>
            </div>

            <div className="radar-card p-8 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent font-bold font-mono text-lg">
                  03
                </div>
                <h3 className="text-xl font-bold text-white">{t('how.step3.title')}</h3>
                <p className="text-sm text-radar-muted leading-relaxed">
                  {t('how.step3.desc')}
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

      {/* 3. ОСОБЕННОСТИ И РАДАР */}
      <section id="features" className="py-24 border-b border-radar-border/40 bg-[#0C1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <RadarScanner size={440} />
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
                  {t('feat.badge')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
                  {t('feat.title')}
                </h2>
                <p className="text-radar-muted mt-3 leading-relaxed">
                  {t('feat.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-alert font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-alert" />
                    {t('feat.price.title')}
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    {t('feat.price.desc')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-info font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-info" />
                    {t('feat.feature.title')}
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    {t('feat.feature.desc')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-radar-accent font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-radar-accent" />
                    {t('feat.offer.title')}
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    {t('feat.offer.desc')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-radar-card border border-radar-border">
                  <div className="flex items-center gap-2 text-[#F5A623] font-semibold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                    {t('feat.content.title')}
                  </div>
                  <p className="text-xs text-radar-muted leading-relaxed">
                    {t('feat.content.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ДЛЯ КОГО */}
      <section className="py-24 border-b border-radar-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              {t('persona.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              {t('persona.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-accent">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('persona.cmo.title')}</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                {t('persona.cmo.desc')}
              </p>
            </div>

            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-info">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('persona.prod.title')}</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                {t('persona.prod.desc')}
              </p>
            </div>

            <div className="radar-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-accent">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('persona.founder.title')}</h3>
              <p className="text-sm text-radar-muted leading-relaxed">
                {t('persona.founder.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ТАРИФЫ (УСЛОВНО СКРЫТЫ ПРИ SHOW_BILLING = false) */}
      {SHOW_BILLING && (
        <section id="pricing" className="py-24 border-b border-radar-border/40 bg-[#0C1017]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
                Тарифные планы
              </h2>
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ */}
      <section id="faq" className="py-24 border-b border-radar-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-radar-accent font-semibold">
              {t('faq.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
              { q: t('faq.q4'), a: t('faq.a4') },
              { q: t('faq.q5'), a: t('faq.a5') },
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

      {/* 7. ФИНАЛЬНЫЙ CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0C1017] to-radar-bg">
        <div className="absolute inset-0 bg-radar-accent/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
            {t('cta.title')}
          </h2>
          <p className="text-radar-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-base shadow-[0_0_30px_rgba(61,255,176,0.35)] transition-all group"
            >
              <Radar className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              {t('cta.btn')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
