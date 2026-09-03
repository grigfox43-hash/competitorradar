'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Lock, Calendar, FileSpreadsheet, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ExportSettingsPage() {
  const [userPlan, setUserPlan] = useState('business');
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-09-03');

  useEffect(() => {
    fetch('/api/competitors')
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.plan) setUserPlan(d.user.plan);
      })
      .finally(() => setLoading(false));
  }, []);

  const isEnterprise = userPlan === 'enterprise';

  const handleDownload = (demo = false) => {
    const url = `/api/export/alerts.csv${demo ? '?demo=true' : ''}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
          <span>Экспорт истории (CSV)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E293B] text-radar-accent border border-radar-accent/30">
            ENTERPRISE
          </span>
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          Выгружайте полную историю зафиксированных алертов, снапшотов и диффов для корпоративного анализа
        </p>
      </div>

      {!isEnterprise ? (
        /* Feature Lock Overlay (Spec 5.4) */
        <div className="radar-card p-8 text-center space-y-4 border-radar-accent/30 bg-[#0E1522]">
          <div className="w-12 h-12 rounded-2xl bg-[#152135] border border-radar-accent/40 flex items-center justify-center mx-auto text-radar-accent">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Экспорт доступен на тарифе Enterprise
          </h3>
          <p className="text-xs text-radar-muted max-w-md mx-auto leading-relaxed">
            Выгрузка полной базы диффов, изменений цен и продуктовых обновлений конкурентов в CSV/Excel доступна на тарифе Enterprise.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/app/settings/billing"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-md transition"
            >
              Улучшить тариф до Enterprise
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDownload(true)}
              className="text-xs text-radar-muted hover:text-white underline py-2"
            >
              Скачать демо-образец CSV
            </button>
          </div>
        </div>
      ) : (
        /* Enterprise export form */
        <div className="radar-card p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-radar-muted mb-1.5">
                Начальная дата
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-radar-muted mb-1.5">
                Конечная дата
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-radar-muted" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-radar-border rounded-xl text-sm text-white focus:outline-none focus:border-radar-accent/60 transition"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0E14] border border-radar-border text-xs text-radar-muted space-y-1">
            <div className="text-white font-medium">Формат выгрузки:</div>
            <p>
              Файл CSV (кодировка UTF-8 с BOM для идеальной совместимости с Microsoft Excel и Google Таблицами). Содержит дату, URL, лейбл конкурента, категорию события, текстовое саммари и diff.
            </p>
          </div>

          <button
            onClick={() => handleDownload(false)}
            className="px-6 py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-md transition flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Экспортировать историю изменений (CSV)
          </button>
        </div>
      )}
    </div>
  );
}
