import React from 'react';
import Link from 'next/link';
import { Radar, Send, ShieldCheck, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-radar-border bg-[#090C11] text-radar-muted pt-14 pb-10">
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
              AI-разведчик, который круглосуточно следит за изменениями на сайтах конкурентов и присылает главное в Telegram.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-radar-accent">
              <Cpu className="w-3.5 h-3.5" />
              <span>Сравнение на базе AI Gemini</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Продукт
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/app/competitors" className="hover:text-radar-accent transition-colors">
                  Дашборд конкурентов
                </Link>
              </li>
              <li>
                <Link href="/app/alerts" className="hover:text-radar-accent transition-colors">
                  Лента алертов
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-radar-accent transition-colors">
                  Тарифные планы
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-radar-accent transition-colors">
                  Архитектура и стек
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Интеграции
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/app/settings/telegram" className="hover:text-radar-accent transition-colors">
                  Telegram Bot API
                </Link>
              </li>
              <li>
                <Link href="/app/settings/slack" className="hover:text-radar-accent transition-colors">
                  Slack Webhooks (Enterprise)
                </Link>
              </li>
              <li>
                <Link href="/app/settings/export" className="hover:text-radar-accent transition-colors">
                  Экспорт в CSV
                </Link>
              </li>
              <li>
                <Link href="/app/settings/billing" className="hover:text-radar-accent transition-colors">
                  Биллинг Stripe
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Contacts */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Безопасность
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-radar-accent" />
                <span>Парсинг только публичных страниц</span>
              </li>
              <li>
                <span className="text-radar-muted">Защита от SSRF и изоляция сессий</span>
              </li>
              <li>
                <span className="text-radar-muted">Хранение ключей на бэкенде</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-radar-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <div>
            © {new Date().getFullYear()} CompetitorRadar. Все права защищены.
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-radar-text transition">Тарифы</Link>
            <Link href="/how-it-works" className="hover:text-radar-text transition">Технологии</Link>
            <Link href="/app/competitors" className="hover:text-radar-accent transition">Личный кабинет</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
