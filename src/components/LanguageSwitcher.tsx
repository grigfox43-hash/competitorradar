'use client';

import React from 'react';
import { useLanguage, Language } from '@/lib/i18n';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-radar-border bg-radar-card hover:bg-[#161C28] hover:border-radar-accent/40 text-xs font-medium text-radar-text transition shadow-sm ${
        compact ? 'text-[11px] px-2 py-1' : ''
      }`}
      title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
      aria-label="Switch Language"
    >
      <span className="text-sm leading-none select-none">
        {language === 'ru' ? '🇷🇺' : '🇬🇧'}
      </span>
      <span className="font-mono font-semibold uppercase text-radar-accent">
        {language === 'ru' ? 'RU' : 'EN'}
      </span>
    </button>
  );
}
