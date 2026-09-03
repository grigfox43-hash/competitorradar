'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radar, Menu, X, ArrowRight, Shield } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-radar-bg/85 border-b border-radar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-radar-card border border-radar-border flex items-center justify-center group-hover:border-radar-accent/60 transition-colors shadow-[0_0_15px_rgba(61,255,176,0.1)]">
              <Radar className="w-5 h-5 text-radar-accent transition-transform duration-500 group-hover:rotate-45" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-radar-accent animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-radar-text font-heading flex items-center gap-1.5">
                Competitor<span className="text-radar-accent">Radar</span>
              </span>
              <span className="text-[10px] text-radar-muted -mt-1 font-mono tracking-wide">
                AI INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-radar-muted">
            <Link href="/#how-it-works" className="hover:text-radar-text transition-colors">
              Как это работает
            </Link>
            <Link href="/#features" className="hover:text-radar-text transition-colors">
              Возможности
            </Link>
            <Link href="/pricing" className="hover:text-radar-text transition-colors">
              Тарифы
            </Link>
            <Link href="/how-it-works" className="hover:text-radar-text transition-colors">
              Технологии
            </Link>
            <Link href="/#faq" className="hover:text-radar-text transition-colors">
              FAQ
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/app/competitors"
              className="text-sm font-medium text-radar-text px-4 py-2 rounded-lg border border-radar-border hover:bg-radar-card hover:border-radar-border/80 transition-colors"
            >
              Дашборд
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold text-black bg-radar-accent hover:bg-radar-accent/90 px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(61,255,176,0.25)] transition-all flex items-center gap-1.5 group"
            >
              Начать бесплатно
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/app/competitors"
              className="text-xs px-2.5 py-1.5 rounded bg-radar-card border border-radar-border text-radar-text"
            >
              Дашборд
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-radar-muted hover:text-radar-text hover:bg-radar-card transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-radar-border bg-radar-card px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-radar-muted hover:text-white py-1"
          >
            Как это работает
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-radar-muted hover:text-white py-1"
          >
            Тарифы
          </Link>
          <Link
            href="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-radar-muted hover:text-white py-1"
          >
            Технологии
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-radar-muted hover:text-white py-1"
          >
            FAQ
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/app/competitors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-sm font-medium text-radar-text py-2 rounded-lg border border-radar-border bg-[#161C28]"
            >
              Войти в дашборд
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-sm font-semibold text-black bg-radar-accent py-2 rounded-lg"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
