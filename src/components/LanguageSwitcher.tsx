'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';

// Crisp SVG Flag for Russia (White, Blue, Red tricolor)
export function FlagRU({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={`${className} rounded-[2px] shadow-sm flex-shrink-0 overflow-hidden`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="14" fill="#D52B1E" />
      <rect width="20" height="9.33" fill="#0039A6" />
      <rect width="20" height="4.67" fill="#FFFFFF" />
    </svg>
  );
}

// Crisp SVG Flag for Great Britain / UK (Union Jack)
export function FlagGB({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={`${className} rounded-[2px] shadow-sm flex-shrink-0 overflow-hidden`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="gbClip">
        <rect width="20" height="14" rx="2" />
      </clipPath>
      <g clipPath="url(#gbClip)">
        <rect width="20" height="14" fill="#012169" />
        {/* Diagonal white */}
        <path d="M0,0 L20,14 M20,0 L0,14" stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Diagonal red */}
        <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.2" />
        {/* Cross white */}
        <path d="M10,0 L10,14 M0,7 L20,7" stroke="#FFFFFF" strokeWidth="4.2" />
        {/* Cross red */}
        <path d="M10,0 L10,14 M0,7 L20,7" stroke="#C8102E" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-radar-border bg-radar-card hover:bg-[#161C28] hover:border-radar-accent/50 text-xs font-medium text-radar-text transition shadow-sm ${
        compact ? 'text-[11px] px-2 py-1' : ''
      }`}
      title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
      aria-label="Switch language"
    >
      {language === 'ru' ? <FlagRU /> : <FlagGB />}
      <span className="font-mono font-bold tracking-wide text-radar-accent uppercase">
        {language === 'ru' ? 'RU' : 'EN'}
      </span>
    </button>
  );
}
