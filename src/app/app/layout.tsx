'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Radar,
  Globe,
  Bell,
  Send,
  Slack,
  CreditCard,
  Download,
  Play,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { AddCompetitorModal } from '@/components/AddCompetitorModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [userPlan, setUserPlan] = useState('business');
  const [unreadCount, setUnreadCount] = useState(2);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/competitors');
      if (res.ok) {
        const data = await res.json();
        if (data.user?.plan) setUserPlan(data.user.plan);
      }
      const aRes = await fetch('/api/alerts');
      if (aRes.ok) {
        const aData = await aRes.json();
        setUnreadCount(aData.counts?.unread || 0);
      }
    } catch {}
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleGlobalScan = async () => {
    setScanning(true);
    try {
      const res = await fetch('/api/scan', { method: 'POST' });
      if (res.ok) {
        // trigger reload on current page
        window.dispatchEvent(new Event('competitor-updated'));
        await fetchUserData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  const navItems = [
    { label: 'Конкуренты', href: '/app/competitors', icon: Globe },
    { label: 'Лента алертов', href: '/app/alerts', icon: Bell, badge: unreadCount },
    { label: 'Привязка Telegram', href: '/app/settings/telegram', icon: Send },
    { label: 'Интеграция Slack', href: '/app/settings/slack', icon: Slack },
    { label: 'Тариф и биллинг', href: '/app/settings/billing', icon: CreditCard },
    { label: 'Экспорт данных', href: '/app/settings/export', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-radar-text flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0E121B] border-r border-radar-border select-none">
        {/* Brand */}
        <div className="p-5 border-b border-radar-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-radar-card border border-radar-border flex items-center justify-center group-hover:border-radar-accent/60 transition">
              <Radar className="w-4 h-4 text-radar-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-heading">
                Competitor<span className="text-radar-accent">Radar</span>
              </span>
              <span className="text-[9px] text-radar-muted font-mono">DASHBOARD</span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#182130] text-radar-accent border border-radar-accent/30 shadow-[0_0_15px_rgba(61,255,176,0.08)]'
                    : 'text-radar-muted hover:text-white hover:bg-[#121722]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-radar-accent' : 'text-radar-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-radar-alert text-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-radar-border bg-[#0B0E14]/60 space-y-3">
          <div className="p-3 rounded-xl bg-radar-card border border-radar-border flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-radar-muted uppercase">Ваш тариф</span>
              <span className="text-xs font-bold text-white uppercase">{userPlan}</span>
            </div>
            <Link
              href="/app/settings/billing"
              className="text-[10px] font-semibold text-radar-accent hover:underline"
            >
              Изменить
            </Link>
          </div>

          <Link
            href="/"
            className="flex items-center justify-between text-xs text-radar-muted hover:text-white py-1 px-1 transition"
          >
            <span>На главную страницу</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-6 bg-[#0E121B]/90 border-b border-radar-border backdrop-blur flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-lg text-radar-muted hover:text-white hover:bg-radar-card"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-radar-accent animate-ping" />
              <span className="text-xs text-radar-muted font-mono hidden sm:inline">
                РАДАР АКТИВЕН • ОРКЕСТРАЦИЯ 24/7
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global scan button */}
            <button
              onClick={handleGlobalScan}
              disabled={scanning}
              className="px-3.5 py-1.5 rounded-xl border border-radar-border hover:border-radar-accent/40 bg-radar-card text-xs text-radar-text font-medium flex items-center gap-1.5 transition disabled:opacity-50"
              title="Запустить немедленное сканирование всех активных сайтов"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-radar-accent" />
                  <span className="hidden sm:inline">AI-сканирование...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-radar-accent" />
                  <span className="hidden sm:inline">Просканировать сейчас</span>
                </>
              )}
            </button>

            {/* Add competitor button */}
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-[0_0_15px_rgba(61,255,176,0.25)] flex items-center gap-1.5 transition"
            >
              <span>+</span>
              <span>Добавить URL</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-[#0E121B] border-b border-radar-border p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                  pathname === item.href
                    ? 'bg-[#182130] text-radar-accent'
                    : 'text-radar-muted hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Inner Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Add Competitor Modal */}
      <AddCompetitorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          window.dispatchEvent(new Event('competitor-updated'));
          fetchUserData();
        }}
        userPlan={userPlan}
      />
    </div>
  );
}
