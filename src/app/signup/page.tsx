'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Radar, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/competitors');
  };

  return (
    <div className="min-h-screen bg-radar-bg flex items-center justify-center p-4 relative">
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
          <h2 className="text-xl font-bold text-white">Создать аккаунт разведки</h2>
          <p className="text-xs text-radar-muted">Подключите первый сайт конкурента за 60 секунд</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">Рабочий Email</label>
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
            <label className="block text-xs font-medium text-radar-muted mb-1.5">Придумайте пароль</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
              <input
                type="password"
                required
                placeholder="Минимум 8 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white placeholder:text-radar-muted/40 focus:outline-none focus:border-radar-accent/60 transition"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141A25] border border-radar-border/70 flex items-center gap-2 text-xs text-radar-muted">
            <ShieldCheck className="w-4 h-4 text-radar-accent flex-shrink-0" />
            <span>14 дней бесплатного пробного периода на тарифе Business</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(61,255,176,0.25)] transition-all flex items-center justify-center gap-2"
          >
            Начать мониторинг бесплатно
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-radar-muted pt-2">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-radar-accent hover:underline font-medium">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
