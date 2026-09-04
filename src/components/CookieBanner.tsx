'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cr_cookie_consent');
    if (!saved) {
      // Show after a tiny delay so it animates smoothly
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }

    const handleOpenSettings = () => setVisible(true);
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleChoice = (type: 'all' | 'essential') => {
    localStorage.setItem('cr_cookie_consent', type);
    document.cookie = `cr_cookie_consent=${type}; path=/; max-age=31536000; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in">
      <div className="rounded-2xl bg-[#0E121B]/95 border border-radar-accent/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(61,255,176,0.15)] backdrop-blur-md p-5 text-radar-text relative">
        <button
          onClick={() => handleChoice('essential')}
          className="absolute top-3 right-3 text-radar-muted hover:text-white p-1 rounded-lg transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-radar-accent/15 border border-radar-accent/30 flex items-center justify-center text-radar-accent flex-shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>

          <div className="space-y-2 flex-1 pr-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>{t('cookie.title')}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-radar-accent" />
            </h4>
            <p className="text-[11px] text-radar-muted leading-relaxed">
              {t('cookie.desc')}{' '}
              <Link
                href="/privacy"
                className="text-radar-accent underline hover:text-white transition"
              >
                {t('cookie.learnMore')}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-radar-border/60 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="px-3 py-1.5 rounded-xl border border-radar-border bg-[#141A26] hover:bg-[#1A2232] text-radar-muted hover:text-white text-[11px] font-medium transition"
          >
            {t('cookie.essential')}
          </button>
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="px-4 py-1.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-[11px] shadow-sm transition"
          >
            {t('cookie.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
