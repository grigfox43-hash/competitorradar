'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Radar, Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signup' }: Props) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup' && !consentGiven) {
      setError(
        `${t('legal.ageConfirm')} ${t('legal.terms')} ${t('legal.and')} ${t('legal.privacy')} ${t('legal.consentText')}`
      );
      return;
    }

    setLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (mode === 'login' ? 'Ошибка входа' : 'Ошибка регистрации'));
      }

      // Success -> navigate to dashboard
      window.location.href = '/app/competitors';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-radar-card border border-radar-border shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radar-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-radar-muted hover:text-white hover:bg-[#161C28] transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#161C28] border border-radar-border flex items-center justify-center">
              <Radar className="w-5 h-5 text-radar-accent" />
            </div>
            <span className="text-xl font-bold text-white font-heading">
              Competitor<span className="text-radar-accent">Radar</span>
            </span>
          </div>
          <p className="text-xs text-radar-muted">
            {mode === 'login' ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#0B0E14] rounded-xl border border-radar-border mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'login'
                ? 'bg-radar-card text-radar-accent border border-radar-accent/30 shadow-sm'
                : 'text-radar-muted hover:text-white'
            }`}
          >
            {t('nav.login')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'signup'
                ? 'bg-radar-card text-radar-accent border border-radar-accent/30 shadow-sm'
                : 'text-radar-muted hover:text-white'
            }`}
          >
            {t('nav.signup')}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-radar-alert/15 border border-radar-alert/30 text-xs text-radar-alert leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                disabled={loading}
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
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/40 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div className="p-3 rounded-xl bg-[#141A25] border border-radar-border/70 flex items-center gap-2 text-xs text-radar-muted">
                <ShieldCheck className="w-4 h-4 text-radar-accent flex-shrink-0" />
                <span>{t('hero.trust1')} • {t('hero.trust2')}</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="authConsentModal"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-[#0B0E14] border border-radar-border text-radar-accent focus:ring-radar-accent/30 cursor-pointer flex-shrink-0"
                />
                <label htmlFor="authConsentModal" className="text-[11px] text-radar-muted leading-tight cursor-pointer select-none">
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
            </>
          )}

          <button
            type="submit"
            disabled={loading || (mode === 'signup' && !consentGiven)}
            className="w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(61,255,176,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? t('auth.loginBtn') : t('auth.signupBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-radar-muted pt-4">
          {mode === 'login' ? (
            <>
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-radar-accent hover:underline font-semibold"
              >
                {t('nav.signup')}
              </button>
            </>
          ) : (
            <>
              {t('auth.haveAccount')}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-radar-accent hover:underline font-semibold"
              >
                {t('nav.login')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
