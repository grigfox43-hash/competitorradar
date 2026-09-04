'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Radar, ArrowRight, Lock, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SignupPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consentGiven) {
      setError(
        `${t('legal.ageConfirm')} ${t('legal.terms')} ${t('legal.and')} ${t('legal.privacy')} ${t('legal.consentText')}`
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ошибка при регистрации');
      }

      router.push('/app/competitors');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radar-bg flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="absolute inset-0 bg-radar-accent/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl bg-radar-card border border-radar-border p-8 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#161C28] border border-radar-border flex items-center justify-center">
              <Radar className="w-5 h-5 text-radar-accent" />
            </div>
            <span className="text-xl font-bold text-white font-heading">
              Competitor<span className="text-radar-accent">Radar</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">{t('auth.signupTitle')}</h2>
          <p className="text-xs text-radar-muted">{t('auth.signupSubtitle')}</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-radar-alert/15 border border-radar-alert/30 text-xs text-radar-alert leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/40 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">{t('auth.password')}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <input
                type="password"
                required
                placeholder={t('auth.passwordHint')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/40 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141A25] border border-radar-border/70 flex items-center gap-2 text-xs text-radar-muted">
            <ShieldCheck className="w-4 h-4 text-radar-accent flex-shrink-0" />
            <span>{t('hero.trust1')} • {t('hero.trust2')}</span>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="signupConsentCheckbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded bg-[#0B0E14] border border-radar-border text-radar-accent focus:ring-radar-accent/30 cursor-pointer flex-shrink-0"
            />
            <label htmlFor="signupConsentCheckbox" className="text-[11px] text-radar-muted leading-tight cursor-pointer select-none">
              {t('legal.ageConfirm')}{' '}
              <Link href="/terms" target="_blank" className="text-radar-accent underline hover:text-white">
                {t('legal.terms')}
              </Link>{' '}
              {t('legal.and')}{' '}
              <Link href="/privacy" target="_blank" className="text-radar-accent underline hover:text-white">
                {t('legal.privacy')}
              </Link>{' '}
              {t('legal.consentText')}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !consentGiven}
            className="w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(61,255,176,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {t('auth.signupBtn')}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-radar-muted pt-2">
          {t('auth.haveAccount')}{' '}
          <Link href="/login" className="text-radar-accent hover:underline font-medium">
            {t('nav.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}
