'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe,
  Plus,
  Play,
  Trash2,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { CompetitorUrl } from '@/lib/types';
import { AddCompetitorModal } from '@/components/AddCompetitorModal';
import { useLanguage } from '@/lib/i18n';
import { SHOW_BILLING } from '@/lib/config';

export default function CompetitorsPage() {
  const { t } = useLanguage();
  const [competitors, setCompetitors] = useState<CompetitorUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanningId, setScanningId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/competitors');
      if (res.ok) {
        const data = await res.json();
        setCompetitors(data.competitors || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('competitor-updated', handleUpdate);
    return () => window.removeEventListener('competitor-updated', handleUpdate);
  }, []);

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch('/api/competitors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCompetitors((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот сайт? / Are you sure?')) return;
    try {
      const res = await fetch(`/api/competitors?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCompetitors((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScanSingle = async (id: string, label: string) => {
    setScanningId(id);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitorId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        const result = data.results?.[0];
        if (result?.status === 'alert_created') {
          setStatusMessage(`🎯 AI: ${label} — ${result.alert?.summary || 'Новые изменения зафиксированы'}`);
        } else if (result?.status === 'unchanged') {
          setStatusMessage(`✅ ${label}: без изменений.`);
        } else {
          setStatusMessage(`📡 ${label}: снимок сохранён.`);
        }
        await loadData();
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setScanningId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            {t('comp.title')}
          </h1>
          <p className="text-xs text-radar-muted mt-1">
            {t('comp.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-[0_0_15px_rgba(61,255,176,0.2)] flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            {t('dash.addUrl')}
          </button>
        </div>
      </div>

      {/* Access indicator */}
      <div className="radar-card p-3.5 flex items-center justify-between bg-[#111724]">
        <div className="flex items-center gap-2 text-xs text-radar-text">
          <ShieldCheck className="w-4 h-4 text-radar-accent" />
          <span>{t('comp.unlimited')}: {competitors.length} сайтов в базе данных</span>
        </div>
        <div className="text-xs text-radar-accent font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-radar-accent animate-ping" />
          <span>AI Cloud Monitor</span>
        </div>
      </div>

      {/* Dynamic Status Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-radar-card border border-radar-accent/40 text-xs text-radar-accent flex items-center justify-between animate-fade-in shadow-md">
          <span>{statusMessage}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-radar-muted hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Competitors Table */}
      {loading ? (
        <div className="radar-card p-12 text-center text-radar-muted flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-radar-accent animate-spin" />
          <span className="text-xs">Загрузка...</span>
        </div>
      ) : competitors.length === 0 ? (
        /* Empty State */
        <div className="radar-card p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#161C28] border border-radar-border flex items-center justify-center mx-auto text-radar-accent">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">{t('comp.emptyTitle')}</h3>
          <p className="text-xs text-radar-muted max-w-sm mx-auto">
            {t('comp.emptyDesc')}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-radar-accent text-black font-semibold text-xs shadow-lg inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('comp.addFirst')}
          </button>
        </div>
      ) : (
        <div className="radar-card overflow-hidden border-radar-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E131D] text-radar-muted uppercase tracking-wider text-[11px] border-b border-radar-border">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">{t('comp.colName')}</th>
                  <th className="py-3.5 px-4 font-semibold">{t('comp.colUrl')}</th>
                  <th className="py-3.5 px-4 font-semibold">{t('comp.colFreq')}</th>
                  <th className="py-3.5 px-4 font-semibold">{t('comp.colLast')}</th>
                  <th className="py-3.5 px-4 font-semibold">{t('comp.colStatus')}</th>
                  <th className="py-3.5 px-4 font-semibold text-right">{t('comp.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-radar-border/60">
                {competitors.map((comp) => {
                  const isScanning = scanningId === comp.id;
                  return (
                    <tr
                      key={comp.id}
                      className="hover:bg-[#141A26] transition-colors group"
                    >
                      <td className="py-4 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-radar-accent" />
                          <span>{comp.label}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-radar-muted font-mono">
                        <a
                          href={comp.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-radar-accent flex items-center gap-1.5 transition-colors max-w-xs truncate"
                        >
                          <span className="truncate">{comp.url}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                        </a>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            comp.monitoring_frequency === 'realtime'
                              ? 'bg-radar-alert/15 text-radar-alert border-radar-alert/30'
                              : comp.monitoring_frequency === 'daily'
                              ? 'bg-radar-accent/15 text-radar-accent border-radar-accent/30'
                              : 'bg-radar-info/15 text-radar-info border-radar-info/30'
                          }`}
                        >
                          {comp.monitoring_frequency === 'realtime'
                            ? t('comp.realtime')
                            : comp.monitoring_frequency === 'daily'
                            ? t('comp.daily')
                            : t('comp.weekly')}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-radar-muted">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3 h-3 text-radar-muted/70" />
                          <span>
                            {comp.last_checked_at
                              ? new Date(comp.last_checked_at).toLocaleString('ru-RU', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : '—'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleActive(comp.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
                            comp.is_active
                              ? 'bg-radar-accent/10 text-radar-accent hover:bg-radar-accent/20'
                              : 'bg-radar-subtle/20 text-radar-muted hover:bg-radar-subtle/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              comp.is_active ? 'bg-radar-accent animate-pulse' : 'bg-radar-muted'
                            }`}
                          />
                          <span>{comp.is_active ? t('comp.active') : t('comp.pause')}</span>
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleScanSingle(comp.id, comp.label)}
                            disabled={isScanning}
                            className="p-1.5 rounded-lg text-radar-accent hover:bg-radar-accent/15 transition border border-radar-accent/20"
                            title={t('comp.runScan')}
                          >
                            {isScanning ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Play className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(comp.id)}
                            className="p-1.5 rounded-lg text-radar-muted hover:text-radar-alert hover:bg-radar-alert/15 transition"
                            title={t('comp.delete')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddCompetitorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
