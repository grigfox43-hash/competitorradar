'use client';

import React, { useState } from 'react';
import { Calendar, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function ExportSettingsPage() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-09-03');

  const handleDownload = () => {
    const url = `/api/export/alerts.csv?demo=true`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
          <FileSpreadsheet className="w-6 h-6 text-radar-accent" />
          <span>{t('exp.title')}</span>
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          {t('exp.subtitle')}
        </p>
      </div>

      <div className="radar-card p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-radar-muted mb-1.5">
              {t('exp.start')}
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
              {t('exp.end')}
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
          <div className="text-white font-medium">{t('exp.formatTitle')}</div>
          <p>{t('exp.formatDesc')}</p>
        </div>

        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-md transition flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          {t('exp.btn')}
        </button>
      </div>
    </div>
  );
}
