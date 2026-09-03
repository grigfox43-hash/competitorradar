import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CompetitorRadar — AI-разведчик изменений сайтов конкурентов',
  description: 'Автоматический мониторинг сайтов конкурентов: ежедневный парсинг, интеллектуальное сравнение через AI Gemini, фильтрация шума и моментальные алерты в Telegram.',
  keywords: ['мониторинг конкурентов', 'анализ цен', 'AI разведка', 'telegram алерты', 'маркетинг', 'CompetitorRadar'],
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
      <body className="min-h-screen bg-radar-bg text-radar-text antialiased selection:bg-radar-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
