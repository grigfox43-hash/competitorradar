'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Radar, ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/app/competitors';
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ошибка авторизации');
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <h2 className="text-xl font-bold text-white">{t('auth.loginTitle')}</h2>
        <p className="text-xs text-radar-muted">{t('auth.loginSubtitle')}</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-radar-alert/15 border border-radar-alert/30 text-xs text-radar-alert leading-relaxed">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-radar-muted">{t('auth.password')}</label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(61,255,176,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {t('auth.loginBtn')}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-radar-muted pt-2">
        {t('auth.noAccount')}{' '}
        <Link href="/signup" className="text-radar-accent hover:underline font-medium">
          {t('nav.signup')}
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-radar-bg flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="absolute inset-0 bg-radar-accent/5 blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-radar-muted text-xs">Загрузка...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
