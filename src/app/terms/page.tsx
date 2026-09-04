'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, Shield, AlertTriangle, ArrowLeft, Cpu, Scale, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-radar-muted hover:text-radar-accent transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'ru' ? 'На главную' : 'Back to Home'}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-radar-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-radar-card border border-radar-accent/30 text-xs text-radar-accent">
            <Scale className="w-3.5 h-3.5" />
            <span>Условия предоставления сервиса / Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            {language === 'ru' ? 'Пользовательское соглашение' : 'Terms of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-radar-muted">
            {language === 'ru'
              ? 'Редакция от 4 сентября 2026 г. • Обязательно к ознакомлению перед использованием'
              : 'Last Updated: September 4, 2026 • Legally binding agreement for all users'}
          </p>
        </div>

        {/* Content Body */}
        {language === 'ru' ? (
          <article className="prose prose-invert max-w-none text-xs sm:text-sm text-radar-muted leading-relaxed space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-radar-accent" />
                1. Принятие соглашения и критерии допуска (18+)
              </h2>
              <p>
                Используя сервис <strong>CompetitorRadar</strong> (далее — «Сервис»), регистрируя личный кабинет или запуская мониторинг веб-страниц, вы подтверждаете, что полностью ознакомлены и безоговорочно согласны с настоящими Условиями использования (далее — «Соглашение»).
              </p>
              <div className="p-3.5 rounded-xl bg-[#141A25] border border-radar-accent/30 text-xs text-white">
                <strong>Возрастные ограничения и статус пользователя (COPPA / ГК РФ):</strong> Сервис предназначен исключительно для коммерческого использования (B2B) дееспособными физическими лицами, достигшими возраста <strong>18 лет</strong>, а также уполномоченными представителями юридических лиц и индивидуальных предпринимателей. Лицам моложе 18 лет использование Сервиса категорически запрещено.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-radar-accent" />
                2. Законность сбора данных и добросовестное использование
              </h2>
              <p>
                Сервис разработан в соответствии с нормами законодательства о свободном обращении открытой информации:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Сбор только общедоступных данных:</strong> Парсер Сервиса обращается исключительно к публично открытым страницам в глобальной сети Интернет (п. 2 ст. 7 Федерального закона РФ № 149-ФЗ, директива ЕС 96/9/EC, прецедент Федерального апелляционного суда США <em>hiQ Labs v. LinkedIn Corp.</em>).
                </li>
                <li>
                  <strong>Запрет несанкционированного доступа:</strong> Сервис не осуществляет обход систем аутентификации, взлом CAPTCHA закрытых контуров, перехват приватных сессий или сбор персональных данных частных лиц со страниц конкурентов.
                </li>
                <li>
                  <strong>Обязанности пользователя:</strong> Пользователь обязуется указывать для отслеживания только публичные коммерческие страницы (тарифы, описания продуктов, новостные разделы). Запрещается использовать Сервис для DoS/DDoS-атак, генерации чрезмерной нагрузки или спама.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-radar-accent" />
                3. Раскрытие информации об AI и дисклеймер точности (FTC / EU AI Act)
              </h2>
              <p>
                Сравнение снапшотов страниц и формирование текстовых выжимок в Telegram и Slack выполняются с использованием нейросетевых технологий <strong>AI Gemini</strong>.
              </p>
              <div className="p-3.5 rounded-xl bg-radar-card border border-radar-warning/30 text-xs text-radar-text space-y-2">
                <div className="flex items-center gap-2 text-radar-warning font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Предупреждение о характере аналитической информации (FTC Act):</span>
                </div>
                <p>
                  Все сводки, выводы и расчёты диффов, сгенерированные искусственным интеллектом, носят <strong>исключительно информационно-ознакомительный характер</strong>. Сервис не несёт ответственности за коммерческие, финансовые, ценовые или юридические решения, принятые пользователем на основании отчётов AI. Пользователю рекомендуется самостоятельно верифицировать первоисточник по указанной ссылке.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-radar-accent" />
                4. Ограничение ответственности
              </h2>
              <p>
                Сервис предоставляется на условиях «КАК ЕСТЬ» («AS IS») и «ПО МЕРЕ ДОСТУПНОСТИ» («AS AVAILABLE»). Мы предпринимаем разумные усилия для обеспечения непрерывной работы, однако не гарантируем абсолютную доступность отслеживаемых сайтов конкурентов в случае их блокировки, изменения структуры разметки или недоступности со стороны их хостинг-провайдеров.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-radar-accent" />
                5. Контакты и разрешение споров
              </h2>
              <p>
                По всем вопросам применения настоящего Соглашения, а также для направления уведомлений правообладателей обращаться по официальному адресу электронной почты:{' '}
                <a href="mailto:legal@competitorradar.io" className="text-radar-accent underline">
                  legal@competitorradar.io
                </a>.
              </p>
            </section>
          </article>
        ) : (
          <article className="prose prose-invert max-w-none text-xs sm:text-sm text-radar-muted leading-relaxed space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-radar-accent" />
                1. Acceptance of Terms & Eligibility (18+)
              </h2>
              <p>
                By accessing or using <strong>CompetitorRadar</strong> (&quot;Service&quot;), creating an account, or registering URLs for tracking, you agree to be bound by these Terms of Service (&quot;Terms&quot;).
              </p>
              <div className="p-3.5 rounded-xl bg-[#141A25] border border-radar-accent/30 text-xs text-white">
                <strong>Age Restriction & B2B Scope (COPPA Compliance):</strong> The Service is offered exclusively to commercial business entities and individuals who are at least <strong>18 years of age</strong>. We strictly prohibit registration or use by minors under 18.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-radar-accent" />
                2. Lawfulness of Web Crawling & Public Data
              </h2>
              <p>
                The Service operates in adherence to established legal doctrines regarding publicly accessible digital information:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Public Data Scope:</strong> The scraper queries exclusively unauthenticated, publicly visible websites. Under US Computer Fraud and Abuse Act (CFAA) jurisprudence (<em>hiQ Labs, Inc. v. LinkedIn Corp.</em>, 938 F.3d 985), accessing publicly available web data does not constitute unauthorized access.
                </li>
                <li>
                  <strong>No Bypass of Security:</strong> We do not circumvent password walls, private authorization tokens, or authenticated portals.
                </li>
                <li>
                  <strong>Customer Obligations:</strong> You agree to submit only publicly available URLs (pricing pages, product announcements) and warrant that tracking will not disrupt destination server integrity.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-radar-accent" />
                3. AI Intelligence Disclosure & Disclaimer (FTC Act)
              </h2>
              <p>
                Snapshot comparisons, event categorization, and natural language alerts are processed using <strong>AI Gemini</strong>.
              </p>
              <div className="p-3.5 rounded-xl bg-radar-card border border-radar-warning/30 text-xs text-radar-text space-y-2">
                <div className="flex items-center gap-2 text-radar-warning font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Informational Disclaimer:</span>
                </div>
                <p>
                  AI-generated insights and price variance reports are provided for <strong>internal competitive intelligence purposes only</strong>. They do not constitute financial, investment, legal, or pricing counsel. You are advised to independently verify critical changes via the direct destination link provided.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-radar-accent" />
                4. Limitation of Liability
              </h2>
              <p>
                The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. Under no circumstances shall CompetitorRadar be liable for indirect, incidental, or consequential damages resulting from third-party website modifications or downtime.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-radar-accent" />
                5. Legal Inquiries
              </h2>
              <p>
                Direct legal inquiries and notices to:{' '}
                <a href="mailto:legal@competitorradar.io" className="text-radar-accent underline">
                  legal@competitorradar.io
                </a>.
              </p>
            </section>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
