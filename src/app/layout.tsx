import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { CookieBanner } from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'CompetitorRadar — AI-разведчик изменений сайтов конкурентов',
  description: 'Автоматический мониторинг сайтов конкурентов: ежедневный парсинг, интеллектуальное сравнение через AI Gemini, фильтрация шума и моментальные алерты в Telegram.',
  keywords: ['мониторинг конкурентов', 'анализ цен', 'AI разведка', 'telegram алерты', 'маркетинг', 'CompetitorRadar'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'CompetitorRadar — AI-разведчик изменений сайтов конкурентов',
    description: 'Следите за ценами, фичами и офферами конкурентов с автоматической доставкой в Telegram.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-radar-bg text-radar-text antialiased selection:bg-radar-accent selection:text-black">
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
