'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCheck, ExternalLink, Bot, Zap, BellRing, Sparkles } from 'lucide-react';

interface SimulatedMessage {
  id: string;
  source: string;
  url: string;
  type: 'price' | 'feature' | 'offer';
  typeLabel: string;
  typeColor: string;
  badgeBg: string;
  title: string;
  content: string;
  diff: string;
  time: string;
}

export function TelegramChatSimulator() {
  const [messages, setMessages] = useState<SimulatedMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const rawMessages: SimulatedMessage[] = [
    {
      id: 'msg-1',
      source: 'Stripe Pricing',
      url: 'https://stripe.com/pricing',
      type: 'price',
      typeLabel: 'Изменение цен',
      typeColor: '#FF5C5C',
      badgeBg: 'rgba(255, 92, 92, 0.15)',
      title: 'Снижение комиссии для стартапов',
      content: 'Stripe обновил тарифы: запущена программа 0% комиссии на первые $50 000 оборота для новых аккаунтов.',
      diff: '- 2.9% + 30¢ flat fee\n+ 0% on first $50k via Startup Program',
      time: '12:04',
    },
    {
      id: 'msg-2',
      source: 'Linear Product',
      url: 'https://linear.app/features',
      type: 'feature',
      typeLabel: 'Новая фича',
      typeColor: '#4C8CFF',
      badgeBg: 'rgba(76, 140, 255, 0.15)',
      title: 'Запущен модуль Customer Requests',
      content: 'Добавлен полноценный функционал сортировки запросов пользователей с прямой привязкой к тикетам разработки.',
      diff: '+ Direct Zendesk & Intercom sync\n+ Customer Request priority score',
      time: '12:05',
    },
    {
      id: 'msg-3',
      source: 'Vercel Pricing',
      url: 'https://vercel.com/pricing',
      type: 'offer',
      typeLabel: 'Новый оффер',
      typeColor: '#3DFFB0',
      badgeBg: 'rgba(61, 255, 176, 0.15)',
      title: 'Бесплатный переход с Netlify',
      content: 'Анонсирован промо-пакет: $2 000 в кредитах на платформу при миграции командных проектов.',
      diff: '+ $2,000 migration credits guarantee\n+ Free dedicated migration support',
      time: '12:07',
    },
  ];

  useEffect(() => {
    // Initial message
    setMessages([rawMessages[0]]);
    setIsTyping(true);

    const timer1 = setTimeout(() => {
      setMessages([rawMessages[0], rawMessages[1]]);
      setIsTyping(true);
    }, 2400);

    const timer2 = setTimeout(() => {
      setMessages(rawMessages);
      setIsTyping(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#0F141E] border border-radar-border shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
      {/* Telegram Chat Header */}
      <div className="px-4 py-3 bg-[#161C28] border-b border-radar-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-radar-card to-[#1E293B] border border-radar-accent/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-radar-accent" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-radar-accent border-2 border-[#161C28]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-1.5">
              CompetitorRadar Bot
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-radar-accent/20 text-radar-accent border border-radar-accent/30">
                AI
              </span>
            </div>
            <div className="text-xs text-radar-muted">
              {isTyping ? (
                <span className="text-radar-accent flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3 h-3 inline" /> сканирует изменения...
                </span>
              ) : (
                'онлайн • бот разведки'
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-radar-accent animate-ping" />
        </div>
      </div>

      {/* Telegram Message Feed */}
      <div className="p-4 flex-1 space-y-3 min-h-[360px] max-h-[460px] overflow-y-auto bg-[radial-gradient(#1E2638_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Intro bot status */}
        <div className="text-center my-1">
          <span className="px-3 py-1 rounded-full bg-radar-card/80 border border-radar-border text-[11px] text-radar-muted">
            Сегодня, 00:00 UTC — Ежедневный скан выполнен
          </span>
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className="animate-fade-in rounded-xl bg-[#17202F] border border-radar-border/80 p-3.5 shadow-md relative group hover:border-radar-accent/40 transition-colors"
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
                style={{
                  color: m.typeColor,
                  backgroundColor: m.badgeBg,
                  borderColor: `${m.typeColor}40`,
                }}
              >
                ● {m.typeLabel}
              </span>
              <span className="text-[10px] text-radar-muted flex items-center gap-1">
                {m.time} <CheckCheck className="w-3.5 h-3.5 text-radar-accent" />
              </span>
            </div>

            {/* Target name & link */}
            <div className="text-xs font-semibold text-radar-text flex items-center justify-between mb-1">
              <span>{m.source}</span>
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="text-radar-muted hover:text-radar-accent transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Content summary */}
            <p className="text-xs text-[#CBD5E1] leading-relaxed mb-2 font-normal">
              {m.content}
            </p>

            {/* Diff Preview */}
            <div className="text-[11px] font-mono bg-[#0D121B] rounded p-2 text-radar-muted border border-radar-border/50 whitespace-pre-line leading-snug">
              {m.diff}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-radar-card border border-radar-border text-xs text-radar-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-radar-accent animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-radar-accent animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-radar-accent animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Fake input bar */}
      <div className="px-4 py-2.5 bg-[#161C28] border-t border-radar-border flex items-center gap-2">
        <div className="flex-1 bg-[#0F141E] rounded-full px-3.5 py-1.5 text-xs text-radar-muted border border-radar-border/60">
          Уведомления поступают мгновенно
        </div>
        <button
          className="w-8 h-8 rounded-full bg-radar-accent text-black flex items-center justify-center hover:opacity-90 transition"
          title="Канал подключен"
        >
          <BellRing className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
