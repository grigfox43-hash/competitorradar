'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertTriangle, ExternalLink, Sparkles, Loader2, RefreshCw } from 'lucide-react';

export default function TelegramSettingsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const loadLinkInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/telegram/link');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinkInfo();
  }, []);

  const handleTestMessage = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/telegram/test', { method: 'POST' });
      const json = await res.json();
      setTestResult(json.message || 'Тестовое сообщение отправлено!');
    } catch (err: any) {
      setTestResult(`Ошибка: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-heading">
          Привязка Telegram
        </h1>
        <p className="text-xs text-radar-muted mt-1">
          Получайте оперативные алерты о действиях конкурентов прямо в ваш мессенджер
        </p>
      </div>

      {loading ? (
        <div className="radar-card p-12 text-center text-radar-muted">
          <Loader2 className="w-6 h-6 text-radar-accent animate-spin mx-auto mb-2" />
          <span className="text-xs">Загрузка статуса привязки...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Connection Status Card */}
          <div className="radar-card p-6 border-radar-border bg-[#111724]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-radar-border flex items-center justify-center text-radar-accent">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Статус подключения бота</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {data?.isConnected ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-radar-accent font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Подключено (@{data.botUsername})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-radar-warning font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" /> Ожидает привязки
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTestMessage}
                  disabled={testing}
                  className="px-4 py-2 rounded-xl bg-radar-card border border-radar-border hover:border-radar-accent/40 text-xs font-semibold text-white flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-radar-accent" />
                  )}
                  Отправить тест
                </button>
              </div>
            </div>

            {testResult && (
              <div className="mt-4 p-3 rounded-lg bg-radar-accent/10 border border-radar-accent/30 text-xs text-radar-accent animate-fade-in">
                {testResult}
              </div>
            )}
          </div>

          {/* Instructions Step-by-Step (Spec 5.2) */}
          <div className="radar-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-xs">
              Инструкция по подключению за 2 шага
            </h3>

            <div className="space-y-3 text-xs text-radar-muted">
              <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-radar-border flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-radar-accent/20 text-radar-accent font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  1
                </span>
                <div>
                  <div className="text-white font-medium mb-0.5">Перейдите по персональной ссылке:</div>
                  <a
                    href={data?.deepLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-radar-accent hover:underline font-mono text-[11px] break-all inline-flex items-center gap-1 mt-1"
                  >
                    <span>{data?.deepLink}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-radar-border flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-radar-accent/20 text-radar-accent font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                  2
                </span>
                <div>
                  <div className="text-white font-medium mb-0.5">В открывшемся Telegram нажмите кнопку «Start»</div>
                  <p className="text-radar-muted text-[11px] leading-relaxed">
                    Бот автоматически привяжет ваш аккаунт по уникальному токену и подтвердит готовность к доставке алертов.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={data?.deepLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-radar-accent hover:bg-radar-accent/90 text-black font-semibold text-xs shadow-md transition"
              >
                <Send className="w-4 h-4" />
                Открыть Telegram и нажать Start
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
