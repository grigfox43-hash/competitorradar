'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft, Mail, Globe, Database, UserCheck } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-radar-bg flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb / Back link */}
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR (EU) • 152-ФЗ (РФ) • CCPA / CPRA (US)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            {language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-radar-muted">
            {language === 'ru'
              ? 'Редакция от 4 сентября 2026 г. • Действует для всех пользователей CompetitorRadar'
              : 'Last Updated: September 4, 2026 • Applicable to all CompetitorRadar users'}
          </p>
        </div>

        {/* Content Body */}
        {language === 'ru' ? (
          <article className="prose prose-invert max-w-none text-xs sm:text-sm text-radar-muted leading-relaxed space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-radar-accent" />
                1. Общие положения и оператор данных
              </h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сервиса <strong>CompetitorRadar</strong> (далее — «Сервис», «мы»).
              </p>
              <p>
                Политика разработана в строгом соответствии с требованиями <strong>Федерального закона РФ № 152-ФЗ «О персональных данных»</strong>, Общего регламента по защите данных Европейского Союза (<strong>EU General Data Protection Regulation, GDPR 2016/679</strong>), Закона штата Калифорния о защите прав потребителей (<strong>CCPA/CPRA</strong>) и применимых нормативных актов о цифровых сервисах.
              </p>
              <p>
                Контактный адрес оператора по вопросам конфиденциальности и защите персональных данных:{' '}
                <a href="mailto:privacy@competitorradar.io" className="text-radar-accent underline">
                  privacy@competitorradar.io
                </a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-radar-accent" />
                2. Категории собираемых данных
              </h2>
              <p>Мы обрабатываем только минимально необходимый объём информации, требующийся для работы Сервиса:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Учётные данные:</strong> адрес электронной почты (Email) и необратимый криптографический хеш пароля (алгоритм PBKDF2 SHA-256 с индивидуальной солью). Мы никогда не храним и не передаём пароли в открытом виде.</li>
                <li><strong>Настройки мониторинга:</strong> перечень целевых общедоступных URL-адресов конкурентов, добавленных пользователем, пользовательские ярлыки и периодичность проверок.</li>
                <li><strong>Технические идентификаторы каналов доставки:</strong> токен привязки Telegram-бота и Webhook URL для доставки уведомлений в Slack.</li>
                <li><strong>Техническая информация и метаданные:</strong> IP-адрес, тип браузера, файлы cookie сессии (`auth_token`), языковые настройки (`cr_lang`) и статус согласия на обработку cookies (`cr_cookie_consent`).</li>
              </ul>
              <div className="p-3.5 rounded-xl bg-[#111724] border border-radar-border/70 text-xs">
                <strong>Важно:</strong> Сервис не собирает и не обрабатывает биометрические персональные данные, а также специальные категории персональных данных (сведения о расовой, национальной принадлежности, политических взглядах, состоянии здоровья).
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-radar-accent" />
                3. Правовые основания и цели обработки
              </h2>
              <p>Обработка персональных данных осуществляется на следующих основаниях:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Исполнение соглашения (п. 5 ч. 1 ст. 6 152-ФЗ; ст. 6(1)(b) GDPR):</strong> предоставление доступа к личному кабинету, автоматизированному парсингу и доставке алертов.</li>
                <li><strong>Законный интерес оператора (ст. 6(1)(f) GDPR):</strong> предотвращение несанкционированного доступа, защита от DDoS-атак, обеспечение стабильности и безопасности облачной инфраструктуры.</li>
                <li><strong>Согласие пользователя (п. 1 ч. 1 ст. 6 152-ФЗ; ст. 6(1)(a) GDPR):</strong> выражаемое при регистрации и выборе настроек файлов cookie.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-radar-accent" />
                4. Права субъектов данных (GDPR, 152-ФЗ, CCPA)
              </h2>
              <p>Каждому пользователю гарантируются следующие права:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Право на доступ (ст. 14 152-ФЗ; ст. 15 GDPR):</strong> получение подтверждения факта обработки и выгрузка своих данных.</li>
                <li><strong>Право на исправление (ст. 16 GDPR):</strong> возможность скорректировать неточные или устаревшие сведения.</li>
                <li><strong>Право на удаление / «Право на забвение» (ст. 17 GDPR; ст. 14 152-ФЗ; CCPA):</strong> полное безвозвратное удаление аккаунта, истории алертов и сайтов конкурентов по запросу.</li>
                <li><strong>Право на отзыв согласия:</strong> прекращение обработки персональных данных путём направления запроса на email или удаления аккаунта.</li>
                <li><strong>Запрет продажи данных (CCPA / CPRA "Do Not Sell or Share My Personal Info"):</strong> Сервис <em>ни при каких обстоятельствах не продаёт, не передаёт в аренду и не распространяет</em> персональные данные пользователей рекламным или брокерским сетям.</li>
              </ul>
              <p>
                Для реализации любых прав направьте запрос на почту{' '}
                <a href="mailto:privacy@competitorradar.io" className="text-radar-accent underline">
                  privacy@competitorradar.io
                </a>. Срок ответа составляет не более 10 рабочих дней.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-radar-accent" />
                5. Статус данных мониторинга сайтов
              </h2>
              <p>
                Парсер CompetitorRadar обращается <strong>исключительно к публично открытым страницам в сети Интернет</strong>, доступным любому пользователю без ввода логина и пароля (в соответствии с п. 2 ст. 7 Федерального закона № 149-ФЗ «Об информации, информационных технологиях и о защите информации», директивой ЕС Database Directive и практикой Апелляционного суда США 9-го округа по делу <em>hiQ Labs v. LinkedIn</em>).
              </p>
              <p>
                Сравнение текстов осуществляется посредством модели AI Gemini с фильтрацией личной информации и извлечением исключительно объективных бизнес-показателей (цены, формулировки тарифных планов, описание функций).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-radar-accent" />
                6. Защита данных и сроки хранения
              </h2>
              <p>
                Все сетевые соединения защищены современными протоколами шифрования TLS 1.3 / HTTPS. База данных размещена в изолированном защищённом облачном контуре. Данные аккаунта хранятся в течение срока действия учётной записи и безвозвратно уничтожаются при её удалении.
              </p>
            </section>
          </article>
        ) : (
          <article className="prose prose-invert max-w-none text-xs sm:text-sm text-radar-muted leading-relaxed space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-radar-accent" />
                1. General Provisions & Data Controller
              </h2>
              <p>
                This Privacy Policy (&quot;Policy&quot;) governs the collection, processing, and protection of personal data by <strong>CompetitorRadar</strong> (&quot;Service&quot;, &quot;we&quot;, &quot;us&quot;).
              </p>
              <p>
                We comply with the <strong>EU General Data Protection Regulation (GDPR 2016/679)</strong>, the <strong>California Consumer Privacy Act as amended by the CPRA (CCPA/CPRA)</strong>, Russian Federal Law No. 152-FZ &quot;On Personal Data&quot;, and applicable ePrivacy Directives.
              </p>
              <p>
                Contact our Data Protection Officer:{' '}
                <a href="mailto:privacy@competitorradar.io" className="text-radar-accent underline">
                  privacy@competitorradar.io
                </a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-radar-accent" />
                2. Information We Collect
              </h2>
              <p>We process only data strictly necessary to provide the intelligence monitoring services:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Account Credentials:</strong> Work email address and salted cryptographic hash of your password (PBKDF2 SHA-256). We never store raw passwords.</li>
                <li><strong>Target Configuration:</strong> Public competitor URLs submitted for tracking, monitoring frequencies, and custom labels.</li>
                <li><strong>Delivery Integration Tokens:</strong> Telegram bot pairing identifiers and user-provided Slack Webhook URLs.</li>
                <li><strong>Telemetry & Session Data:</strong> IP address, device telemetry, authentication cookies (`auth_token`), language preferences (`cr_lang`), and cookie consent flags (`cr_cookie_consent`).</li>
              </ul>
              <div className="p-3.5 rounded-xl bg-[#111724] border border-radar-border/70 text-xs">
                <strong>Notice:</strong> We do not collect or process sensitive personal data, biometric markers, or information concerning minors (the service is strictly intended for individuals aged 18+).
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-radar-accent" />
                3. Legal Bases for Processing (GDPR Art. 6)
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Contract Performance (Art. 6(1)(b) GDPR):</strong> Provision of dashboard features, crawler execution, and alert delivery.</li>
                <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> System uptime, abuse mitigation, rate limiting, and security telemetry.</li>
                <li><strong>User Consent (Art. 6(1)(a) GDPR):</strong> Optional cookies and marketing preferences.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-radar-accent" />
                4. Your Rights (GDPR, CCPA/CPRA, 152-FZ)
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Right of Access & Portability:</strong> Obtain a copy of your stored records and configuration.</li>
                <li><strong>Right to Rectification:</strong> Request correction of outdated or inaccurate information.</li>
                <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Full deletion of your account, competitors list, and snapshot diffs.</li>
                <li><strong>&quot;Do Not Sell or Share My Personal Info&quot; (CCPA):</strong> We <em>do not sell, monetize, or rent</em> your personal data to third parties, data brokers, or advertisers.</li>
              </ul>
              <p>
                To exercise any rights, please email{' '}
                <a href="mailto:privacy@competitorradar.io" className="text-radar-accent underline">
                  privacy@competitorradar.io
                </a>. We process requests within 10 business days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-radar-accent" />
                5. Legality of Public Data Crawling
              </h2>
              <p>
                CompetitorRadar monitors exclusively <strong>publicly accessible, unauthenticated web pages</strong> without bypassing logins or paywalls. This is in accordance with US 9th Circuit precedent (<em>hiQ Labs, Inc. v. LinkedIn Corp.</em> under the CFAA), Section 7 of Russian Federal Law 149-FZ, and the European Database Directive.
              </p>
              <p>
                Textual diff analysis is performed via AI Gemini strictly to assess macro business factors (pricing, features, value propositions).
              </p>
            </section>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
