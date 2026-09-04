'use client';

import React from 'react';
import Link from 'next/link';
import { Radar, ShieldCheck, Cpu, Scale, Cookie, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { SHOW_BILLING } from '@/lib/config';

export function Footer() {
  const { t } = useLanguage();

  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <footer className="border-t border-radar-border bg-[#090C11] text-radar-muted pt-14 pb-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-radar-card border border-radar-border flex items-center justify-center">
                <Radar className="w-4 h-4 text-radar-accent" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Competitor<span className="text-radar-accent">Radar</span>
              </span>
            </Link>
            <p className="text-xs text-radar-muted leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-radar-accent">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('footer.gemini')}</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.product')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/app/competitors" className="hover:text-radar-accent transition-colors">
                  {t('dash.competitors')}
                </Link>
              </li>
              <li>
                <Link href="/app/alerts" className="hover:text-radar-accent transition-colors">
                  {t('dash.alerts')}
                </Link>
              </li>
              {SHOW_BILLING && (
                <li>
                  <Link href="/pricing" className="hover:text-radar-accent transition-colors">
                    {t('nav.pricing')}
                  </Link>
                </li>
              )}
              <li>
                <a href="/#how-it-works" className="hover:text-radar-accent transition-colors">
                  {t('nav.howItWorks')}
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-radar-accent transition-colors">
                  {t('nav.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.integrations')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/app/settings/telegram" className="hover:text-radar-accent transition-colors">
                  Telegram Bot API
                </Link>
              </li>
              <li>
                <Link href="/app/settings/slack" className="hover:text-radar-accent transition-colors">
                  Slack Webhooks
                </Link>
              </li>
              <li>
                <Link href="/app/settings/export" className="hover:text-radar-accent transition-colors">
                  CSV Export
                </Link>
              </li>
              <li>
                <span className="text-radar-muted">SSRF Protection & Isolated Cloud</span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (GDPR, 152-FZ, CCPA, CFAA) */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-radar-accent" />
              <span>Правовая информация</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-radar-accent transition-colors flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-radar-accent" />
                  <span>{t('legal.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-radar-accent transition-colors flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-radar-accent" />
                  <span>{t('legal.terms')}</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookieSettings}
                  className="hover:text-radar-accent transition-colors flex items-center gap-1.5 text-left"
                >
                  <Cookie className="w-3 h-3 text-radar-accent" />
                  <span>{t('legal.cookies')}</span>
                </button>
              </li>
              <li className="pt-1 text-[11px] text-radar-muted">
                <a href="mailto:legal@competitorradar.io" className="hover:underline flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  <span>legal@competitorradar.io</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers Banner (Compliance with 149-FZ, CFAA, FTC Act, EU AI Act) */}
        <div className="p-4 rounded-xl bg-[#0B0E14] border border-radar-border/70 text-[11px] text-radar-muted space-y-1.5 mb-8 leading-relaxed">
          <div className="flex items-center gap-2 text-radar-text font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-radar-accent" />
            <span>Соответствие международному законодательству:</span>
          </div>
          <p>{t('legal.publicNotice')}</p>
          <p className="text-radar-muted/80">{t('legal.aiNotice')}</p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-radar-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <div>
            © {new Date().getFullYear()} CompetitorRadar. {t('footer.rights')}
          </div>
          <div className="flex flex-wrap gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-radar-text transition">{t('legal.privacy')}</Link>
            <Link href="/terms" className="hover:text-radar-text transition">{t('legal.terms')}</Link>
            <button type="button" onClick={handleOpenCookieSettings} className="hover:text-radar-text transition">
              {t('legal.cookies')}
            </button>
            <Link href="/app/competitors" className="hover:text-radar-accent transition">{t('nav.dashboard')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
