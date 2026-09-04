'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'en';

export interface Translations {
  [key: string]: string;
}

const ru: Translations = {
  // Navigation
  'nav.howItWorks': 'Как это работает',
  'nav.features': 'Возможности',
  'nav.pricing': 'Тарифы',
  'nav.tech': 'Технологии',
  'nav.faq': 'FAQ',
  'nav.dashboard': 'Дашборд',
  'nav.login': 'Войти',
  'nav.signup': 'Регистрация',
  'nav.startFree': 'Начать бесплатно',
  'nav.logout': 'Выйти',

  // Hero
  'hero.pill': 'Автоматический мониторинг конкурентов 24/7',
  'hero.title1': 'Узнавайте об изменениях у конкурентов ',
  'hero.titleHighlight': 'раньше, чем это заметит рынок',
  'hero.subtitle': 'CompetitorRadar автоматически парсит страницы цен, фич и промо-акций ваших соперников, сравнивает снапшоты через AI Gemini, отфильтровывает косметический шум и присылает главное прямо в Telegram.',
  'hero.startBtn': 'Запустить радар бесплатно',
  'hero.howBtn': 'Как это устроено',
  'hero.trust1': 'Парсинг без блокировок',
  'hero.trust2': 'Интеллект Gemini',
  'hero.trust3': 'Мгновенный бот Telegram',

  // How it works
  'how.badge': 'Архитектура системы',
  'how.title': 'От сырой веб-страницы до конкретного инсайта за 3 шага',
  'how.subtitle': 'Вам больше не нужно открывать вкладки конкурентов вручную. Автоматический конвейер отслеживания работает ежедневно.',
  'how.step1.title': 'Добавьте URL сайтов',
  'how.step1.desc': 'Укажите страницы цен, тарифов или продуктов конкурентов. Краулер немедленно сформирует первоначальный baseline snapshot в формате чистого Markdown.',
  'how.step2.title': 'AI-анализ различий',
  'how.step2.desc': 'Нейросеть Gemini построчно сопоставляет снапшоты «вчера» и «сегодня». Косметические правки, счётчики и баннеры игнорируются — фиксируются только бизнес-изменения.',
  'how.step3.title': 'Алерт в Telegram / Slack',
  'how.step3.desc': 'При выявлении значимого изменения сервис моментально отправляет структурированное уведомление: категория события, краткая суть и наглядный diff старой и новой версии.',

  // Features
  'feat.badge': 'Точность фильтрации',
  'feat.title': 'Фильтрация шума: только то, что влияет на выручку',
  'feat.subtitle': 'Большинство мониторов присылают сотни уведомлений при смене даты или CSS. CompetitorRadar через AI распознаёт смысл изменений:',
  'feat.price.title': 'Изменения цен и тарифов',
  'feat.price.desc': 'Детекция изменения стоимости подписок, скидок, валют, скрытых комиссий и лимитов планов.',
  'feat.feature.title': 'Новые продукты и фичи',
  'feat.feature.desc': 'Отслеживание запуска новых разделов, интеграций, модулей и страниц продуктовой документации.',
  'feat.offer.title': 'Офферы и промо-акции',
  'feat.offer.desc': 'Моментальный сигнал, когда конкурент запускает бесплатный триал, аудит или спецпредложение.',
  'feat.content.title': 'Смена позиционирования (CTA)',
  'feat.content.desc': 'Анализ изменения главных заголовков, УТП, ценностных предложений и кнопок захвата лидов.',

  // Personas
  'persona.badge': 'Целевая аудитория',
  'persona.title': 'Создано для тех, кто принимает ключевые решения',
  'persona.cmo.title': 'Директора по маркетингу (CMO)',
  'persona.cmo.desc': 'Знайте о рекламных офферах и ценовых ходах конкурентов раньше рынка. Защищайте долю компании и оперативно корректируйте собственные рекламные кампании.',
  'persona.prod.title': 'Продуктовые менеджеры',
  'persona.prod.desc': 'Отслеживайте продуктовый роадмап и релизы конкурентов без ручного прокликивания их лендингов. Будьте в курсе всех новых функций и изменений тарификации.',
  'persona.founder.title': 'B2B-фаундеры',
  'persona.founder.desc': 'Экономьте до 15 часов аналитической рутины в месяц. Получайте выжимку в Telegram и сразу понимайте, как реагировать на шаги конкурентов.',

  // FAQ
  'faq.badge': 'Вопросы и ответы',
  'faq.title': 'Часто задаваемые вопросы',
  'faq.q1': 'Как работает парсинг и не забанят ли меня конкуренты?',
  'faq.a1': 'Парсер обращается только к публично доступным страницам сайтов через распределённую сеть прокси. Запросы отправляются с интервалами, имитирующими обычного пользователя, поэтому риска блокировки нет.',
  'faq.q2': 'Какие страницы конкурентов лучше всего добавлять?',
  'faq.a2': 'Наибольшую пользу приносят страницы с тарифами (/pricing), списком продуктовых фич (/features), описанием интеграций, а также главные промо-лендинги.',
  'faq.q3': 'Как AI отличает реальные изменения от косметических правок?',
  'faq.a3': 'Парсер переводит страницу в чистый Markdown без стилей и скриптов. Затем модель Gemini анализирует смысл текста и сопоставляет только существенные бизнес-факторы: цены, условия, фичи и УТП.',
  'faq.q4': 'Можно ли получать алерты в командный канал Slack?',
  'faq.a4': 'Да! Интеграция со Slack через Incoming Webhooks доступна всем авторизованным пользователям в настройках.',
  'faq.q5': 'Как начать работу с сервисом?',
  'faq.a5': 'Зарегистрируйтесь в личном кабинете за 30 секунд, добавьте URL первого конкурента и привяжите Telegram бота.',

  // Final CTA
  'cta.title': 'Начните следить за конкурентами уже сегодня',
  'cta.subtitle': 'Подключите первого конкурента прямо сейчас. Первый снапшот и сравнительный отчёт сформируются в течение 1 минуты.',
  'cta.btn': 'Перейти в дашборд мониторинга',

  // Footer
  'footer.desc': 'AI-разведчик, который круглосуточно следит за изменениями на сайтах конкурентов и присылает главное в Telegram.',
  'footer.gemini': 'Сравнение на базе AI Gemini',
  'footer.product': 'Продукт',
  'footer.integrations': 'Интеграции',
  'footer.security': 'Безопасность',
  'footer.publicOnly': 'Парсинг только публичных страниц',
  'footer.rights': 'Все права защищены.',

  // Dashboard Sidebar & Header
  'dash.competitors': 'Конкуренты',
  'dash.alerts': 'Лента алертов',
  'dash.telegram': 'Привязка Telegram',
  'dash.slack': 'Интеграция Slack',
  'dash.billing': 'Тариф и биллинг',
  'dash.export': 'Экспорт данных',
  'dash.home': 'На главную',
  'dash.statusActive': 'РАДАР АКТИВЕН • ОРКЕСТРАЦИЯ 24/7',
  'dash.scanNow': 'Просканировать сейчас',
  'dash.scanning': 'AI-сканирование...',
  'dash.addUrl': 'Добавить URL',
  'dash.logout': 'Выйти из аккаунта',
  'dash.loggedAs': 'Вы вошли как:',

  // Competitors Table
  'comp.title': 'Отслеживаемые конкуренты',
  'comp.subtitle': 'Управляйте страницами для автоматического анализа и сравнения изменений',
  'comp.emptyTitle': 'Нет отслеживаемых сайтов',
  'comp.emptyDesc': 'Добавьте первого конкурента, чтобы запустить формирование baseline снапшота и автоматическое AI-слежение.',
  'comp.addFirst': 'Добавить первого конкурента',
  'comp.colName': 'Конкурент',
  'comp.colUrl': 'URL страницы',
  'comp.colFreq': 'Частота',
  'comp.colLast': 'Последняя проверка',
  'comp.colStatus': 'Статус',
  'comp.colActions': 'Действия',
  'comp.weekly': 'Еженедельно',
  'comp.daily': 'Ежедневно',
  'comp.realtime': 'Реалтайм',
  'comp.active': 'Активен',
  'comp.pause': 'Пауза',
  'comp.runScan': 'Запустить AI-проверку сейчас',
  'comp.delete': 'Удалить',
  'comp.unlimited': 'Неограниченный доступ',

  // Alerts Feed
  'alerts.title': 'Лента алертов',
  'alerts.subtitle': 'Существенные изменения на сайтах конкурентов, классифицированные AI',
  'alerts.newBadge': 'новых',
  'alerts.all': 'Все',
  'alerts.prices': 'Цены',
  'alerts.features': 'Новые фичи',
  'alerts.offers': 'Офферы',
  'alerts.content': 'Контент',
  'alerts.empty': 'Пока нет алертов',
  'alerts.emptyDesc': 'Как только конкуренты изменят цены, условия или запустят новые фичи, AI-разведчик сразу зафиксирует это здесь.',
  'alerts.confidence': 'Уверенность AI',
  'alerts.showDiff': 'Показать детали diff',
  'alerts.hideDiff': 'Скрыть детали',
  'alerts.read': 'Прочитано',
  'alerts.diffTitle': 'Фрагмент изменения (diff):',

  // Modal
  'modal.title': 'Добавить сайт конкурента',
  'modal.subtitle': 'AI сформирует baseline snapshot для отслеживания',
  'modal.urlLabel': 'URL страницы для мониторинга',
  'modal.urlPlaceholder': 'https://example.com/pricing',
  'modal.urlHint': 'Рекомендуется указывать страницы цен, тарифов, фич или главных офферов',
  'modal.nameLabel': 'Название конкурента (лейбл)',
  'modal.namePlaceholder': 'Например: Acme Corp Pricing',
  'modal.freqLabel': 'Частота проверок',
  'modal.cancel': 'Отмена',
  'modal.submit': 'Добавить и создать снимок',
  'modal.submitting': 'Парсинг и сохранение...',

  // Telegram
  'tg.title': 'Привязка Telegram',
  'tg.subtitle': 'Получайте оперативные алерты о действиях конкурентов прямо в ваш мессенджер',
  'tg.statusTitle': 'Статус подключения бота',
  'tg.connected': 'Подключено',
  'tg.waiting': 'Ожидает привязки',
  'tg.testBtn': 'Отправить тест',
  'tg.instTitle': 'Инструкция по подключению за 2 шага',
  'tg.step1': 'Перейдите по персональной ссылке:',
  'tg.step2': 'В открывшемся Telegram нажмите кнопку «Start»',
  'tg.step2Desc': 'Бот автоматически привяжет ваш аккаунт по уникальному токену и подтвердит готовность к доставке алертов.',
  'tg.openBtn': 'Открыть Telegram и нажать Start',

  // Slack
  'slack.title': 'Интеграция со Slack',
  'slack.subtitle': 'Транслируйте алерты об изменениях у конкурентов напрямую в командные каналы Slack',
  'slack.label': 'Slack Incoming Webhook URL',
  'slack.saveBtn': 'Сохранить вебхук',
  'slack.success': 'Slack Webhook успешно сохранён! Алерты будут дублироваться в выбранный канал.',

  // Export
  'exp.title': 'Экспорт истории (CSV)',
  'exp.subtitle': 'Выгружайте полную историю зафиксированных алертов, снапшотов и диффов',
  'exp.start': 'Начальная дата',
  'exp.end': 'Конечная дата',
  'exp.formatTitle': 'Формат выгрузки:',
  'exp.formatDesc': 'Файл CSV (кодировка UTF-8 с BOM для полной совместимости с Microsoft Excel и Google Таблицами).',
  'exp.btn': 'Экспортировать историю изменений (CSV)',

  // Auth
  'auth.loginTitle': 'Вход в личный кабинет',
  'auth.loginSubtitle': 'Введите email и пароль для доступа к мониторингу',
  'auth.signupTitle': 'Регистрация в CompetitorRadar',
  'auth.signupSubtitle': 'Создайте аккаунт и подключите первый сайт за 60 секунд',
  'auth.email': 'Рабочий Email',
  'auth.password': 'Пароль',
  'auth.passwordHint': 'Минимум 6 символов',
  'auth.loginBtn': 'Войти в дашборд',
  'auth.signupBtn': 'Зарегистрироваться и войти',
  'auth.noAccount': 'Нет аккаунта?',
  'auth.haveAccount': 'Уже есть аккаунт?',

  // Cookies & Legal Compliance
  'cookie.title': 'Файлы Cookie и конфиденциальность',
  'cookie.desc': 'Мы используем файлы cookie и технические данные для обеспечения работы сервиса, защиты сессий и аналитики в строгом соответствии с GDPR (ЕС), 152-ФЗ (РФ) и CCPA (США).',
  'cookie.acceptAll': 'Принять все',
  'cookie.essential': 'Только необходимые',
  'cookie.learnMore': 'Подробнее в Политике',
  'legal.privacy': 'Политика конфиденциальности',
  'legal.terms': 'Условия использования',
  'legal.cookies': 'Настройки Cookies',
  'legal.ageConfirm': 'Мне исполнилось 18 лет, принимаю',
  'legal.and': 'и соглашаюсь с',
  'legal.consentText': 'на обработку персональных данных (152-ФЗ, GDPR, CCPA).',
  'legal.publicNotice': 'Сервис осуществляет автоматизированный сбор исключительно общедоступной открытой информации (п. 2 ст. 7 149-ФЗ РФ, прецедент США hiQ v. LinkedIn CFAA, директива ЕС Database Directive).',
  'legal.aiNotice': 'Сравнительный анализ и выжимки генерируются AI Gemini и носят справочно-информационный характер.',
  'legal.contactEmail': 'Для обращений правообладателей и субъектов данных: legal@competitorradar.io',
};

const en: Translations = {
  // Navigation
  'nav.howItWorks': 'How It Works',
  'nav.features': 'Features',
  'nav.pricing': 'Pricing',
  'nav.tech': 'Technology',
  'nav.faq': 'FAQ',
  'nav.dashboard': 'Dashboard',
  'nav.login': 'Log In',
  'nav.signup': 'Sign Up',
  'nav.startFree': 'Start Free',
  'nav.logout': 'Log Out',

  // Hero
  'hero.pill': 'Automated 24/7 Competitor Intelligence',
  'hero.title1': 'Discover competitor changes ',
  'hero.titleHighlight': 'before the market notices',
  'hero.subtitle': 'CompetitorRadar crawls competitor pricing, features, and promo pages, compares snapshots using AI Gemini, filters cosmetic noise, and delivers critical insights directly to Telegram.',
  'hero.startBtn': 'Launch Free Radar',
  'hero.howBtn': 'How It Works',
  'hero.trust1': 'Anti-block crawling',
  'hero.trust2': 'Gemini Intelligence',
  'hero.trust3': 'Instant Telegram Bot',

  // How it works
  'how.badge': 'System Architecture',
  'how.title': 'From raw web page to actionable insight in 3 steps',
  'how.subtitle': 'No more manual checking of competitor tabs. Our automated intelligence pipeline runs around the clock.',
  'how.step1.title': 'Add Target URLs',
  'how.step1.desc': 'Enter competitor pricing, feature, or offer pages. The scraper creates an initial baseline snapshot in clean Markdown.',
  'how.step2.title': 'AI Difference Analysis',
  'how.step2.desc': 'Gemini neural model compares "yesterday" vs "today" snapshots. Styling tweaks, date counters, and ads are ignored — only business changes trigger alerts.',
  'how.step3.title': 'Telegram / Slack Alert',
  'how.step3.desc': 'Upon detecting meaningful shifts, structured alerts arrive instantly: category, Russian/English summary, and exact diff snippets.',

  // Features
  'feat.badge': 'Noise Filtering',
  'feat.title': 'Filter the noise: only what affects revenue',
  'feat.subtitle': 'Most monitors spam hundreds of alerts for date or CSS changes. CompetitorRadar uses AI to grasp actual business meaning:',
  'feat.price.title': 'Price & Plan Adjustments',
  'feat.price.desc': 'Detect subscription changes, discounts, currency updates, hidden transaction fees, and plan quotas.',
  'feat.feature.title': 'New Products & Features',
  'feat.feature.desc': 'Track new product modules, integrations, documentation sections, and roadmap milestones.',
  'feat.offer.title': 'Promotions & Special Offers',
  'feat.offer.desc': 'Instant notification when a competitor launches a free trial, audit, or migration credit.',
  'feat.content.title': 'Positioning Shifts (CTA)',
  'feat.content.desc': 'Analysis of headline changes, value propositions, elevator pitches, and lead capture messaging.',

  // Personas
  'persona.badge': 'Target Audience',
  'persona.title': 'Built for key strategic decision makers',
  'persona.cmo.title': 'Chief Marketing Officers (CMO)',
  'persona.cmo.desc': 'Know competitor marketing offers and pricing moves ahead of the pack. Defend company market share and adjust ad messaging.',
  'persona.prod.title': 'Product Managers',
  'persona.prod.desc': 'Track competitor feature releases without manual browsing. Stay updated on all new capabilities and packaging tiers.',
  'persona.founder.title': 'B2B Founders',
  'persona.founder.desc': 'Save 15+ hours of analytical routine monthly. Receive structured briefings in Telegram and react swiftly.',

  // FAQ
  'faq.badge': 'FAQ',
  'faq.title': 'Frequently Asked Questions',
  'faq.q1': 'How does crawling work and will I get blocked?',
  'faq.a1': 'The crawler only queries publicly accessible web pages via rotating residential proxies at human-like intervals with zero blocking risk.',
  'faq.q2': 'Which competitor pages yield the highest value?',
  'faq.a2': 'Pricing pages (/pricing), product feature lists (/features), integration directories, and main marketing landing pages.',
  'faq.q3': 'How does AI separate real changes from cosmetic tweaks?',
  'faq.a3': 'The engine converts pages into pure markdown, stripping scripts and styles. Gemini evaluates semantic business factors: prices, features, and value props.',
  'faq.q4': 'Can I receive notifications in a team Slack channel?',
  'faq.a4': 'Yes! Slack Incoming Webhook integration is fully accessible to registered users in dashboard settings.',
  'faq.q5': 'How do I get started?',
  'faq.a5': 'Sign up in 30 seconds, add your first competitor URL, and link your Telegram bot in two clicks.',

  // Final CTA
  'cta.title': 'Start tracking competitors today',
  'cta.subtitle': 'Connect your first competitor now. Your baseline snapshot and AI comparison report will be ready within 1 minute.',
  'cta.btn': 'Go to Monitoring Dashboard',

  // Footer
  'footer.desc': 'AI intelligence scout continuously monitoring competitor websites and delivering key insights to Telegram.',
  'footer.gemini': 'Powered by AI Gemini',
  'footer.product': 'Product',
  'footer.integrations': 'Integrations',
  'footer.security': 'Security',
  'footer.publicOnly': 'Public pages scraping only',
  'footer.rights': 'All rights reserved.',

  // Dashboard Sidebar & Header
  'dash.competitors': 'Competitors',
  'dash.alerts': 'Alerts Feed',
  'dash.telegram': 'Telegram Pairing',
  'dash.slack': 'Slack Integration',
  'dash.billing': 'Billing & Plans',
  'dash.export': 'Data Export',
  'dash.home': 'Back to Website',
  'dash.statusActive': 'RADAR ACTIVE • 24/7 ORCHESTRATION',
  'dash.scanNow': 'Scan Now',
  'dash.scanning': 'AI Scanning...',
  'dash.addUrl': 'Add URL',
  'dash.logout': 'Log Out',
  'dash.loggedAs': 'Logged in as:',

  // Competitors Table
  'comp.title': 'Monitored Competitors',
  'comp.subtitle': 'Manage web pages for automated AI analysis and difference tracking',
  'comp.emptyTitle': 'No monitored websites yet',
  'comp.emptyDesc': 'Add your first competitor to initiate baseline snapshotting and automated AI tracking.',
  'comp.addFirst': 'Add First Competitor',
  'comp.colName': 'Competitor',
  'comp.colUrl': 'Page URL',
  'comp.colFreq': 'Frequency',
  'comp.colLast': 'Last Check',
  'comp.colStatus': 'Status',
  'comp.colActions': 'Actions',
  'comp.weekly': 'Weekly',
  'comp.daily': 'Daily',
  'comp.realtime': 'Real-time',
  'comp.active': 'Active',
  'comp.pause': 'Paused',
  'comp.runScan': 'Run AI Check Now',
  'comp.delete': 'Delete',
  'comp.unlimited': 'Unlimited Access',

  // Alerts Feed
  'alerts.title': 'Alerts Feed',
  'alerts.subtitle': 'Meaningful competitor changes classified and distilled by AI',
  'alerts.newBadge': 'new',
  'alerts.all': 'All',
  'alerts.prices': 'Prices',
  'alerts.features': 'New Features',
  'alerts.offers': 'Offers',
  'alerts.content': 'Content',
  'alerts.empty': 'No alerts yet',
  'alerts.emptyDesc': 'Once competitors modify prices, terms, or launch new features, the AI radar will log them here.',
  'alerts.confidence': 'AI Confidence',
  'alerts.showDiff': 'Show diff details',
  'alerts.hideDiff': 'Hide details',
  'alerts.read': 'Read',
  'alerts.diffTitle': 'Change Snippet (diff):',

  // Modal
  'modal.title': 'Add Competitor Website',
  'modal.subtitle': 'AI will generate a baseline snapshot for subsequent tracking',
  'modal.urlLabel': 'Target Page URL',
  'modal.urlPlaceholder': 'https://example.com/pricing',
  'modal.urlHint': 'Recommended: pricing, features, solutions, or key landing pages',
  'modal.nameLabel': 'Competitor Name (Label)',
  'modal.namePlaceholder': 'e.g. Acme Corp Pricing',
  'modal.freqLabel': 'Monitoring Frequency',
  'modal.cancel': 'Cancel',
  'modal.submit': 'Add & Create Snapshot',
  'modal.submitting': 'Parsing & Saving...',

  // Telegram
  'tg.title': 'Telegram Pairing',
  'tg.subtitle': 'Receive instant alerts about competitor actions directly in your messenger',
  'tg.statusTitle': 'Bot Connection Status',
  'tg.connected': 'Connected',
  'tg.waiting': 'Waiting for pairing',
  'tg.testBtn': 'Send Test Alert',
  'tg.instTitle': 'Two-Step Connection Guide',
  'tg.step1': 'Click your personal pairing link:',
  'tg.step2': 'In the opened Telegram app, tap "Start"',
  'tg.step2Desc': 'The bot will automatically associate your account token and confirm delivery readiness.',
  'tg.openBtn': 'Open Telegram & Tap Start',

  // Slack
  'slack.title': 'Slack Integration',
  'slack.subtitle': 'Stream competitor change alerts directly into your team Slack channels',
  'slack.label': 'Slack Incoming Webhook URL',
  'slack.saveBtn': 'Save Webhook',
  'slack.success': 'Slack Webhook saved successfully! Alerts will be mirrored to your channel.',

  // Export
  'exp.title': 'History Export (CSV)',
  'exp.subtitle': 'Download full history of recorded alerts, snapshots, and diffs',
  'exp.start': 'Start Date',
  'exp.end': 'End Date',
  'exp.formatTitle': 'Export Format:',
  'exp.formatDesc': 'CSV file (UTF-8 with BOM for native Microsoft Excel and Google Sheets compatibility).',
  'exp.btn': 'Export History (CSV)',

  // Auth
  'auth.loginTitle': 'Log In to Dashboard',
  'auth.loginSubtitle': 'Enter your email and password to access competitor radar',
  'auth.signupTitle': 'Register for CompetitorRadar',
  'auth.signupSubtitle': 'Create an account and connect your first website in 60 seconds',
  'auth.email': 'Work Email',
  'auth.password': 'Password',
  'auth.passwordHint': 'At least 6 characters',
  'auth.loginBtn': 'Log In to Dashboard',
  'auth.signupBtn': 'Sign Up & Enter',
  'auth.noAccount': "Don't have an account?",
  'auth.haveAccount': 'Already have an account?',

  // Cookies & Legal Compliance
  'cookie.title': 'Cookies & Privacy Notice',
  'cookie.desc': 'We use cookies and technical telemetry to ensure core functionality, session security, and analytics in strict compliance with GDPR (EU), 152-FZ (RU), and CCPA (US).',
  'cookie.acceptAll': 'Accept All',
  'cookie.essential': 'Essential Only',
  'cookie.learnMore': 'Privacy Policy',
  'legal.privacy': 'Privacy Policy',
  'legal.terms': 'Terms of Service',
  'legal.cookies': 'Cookie Settings',
  'legal.ageConfirm': 'I am 18+ years old, accept the',
  'legal.and': 'and agree to the',
  'legal.consentText': 'for personal data processing (152-FZ, GDPR, CCPA).',
  'legal.publicNotice': 'Our service crawls strictly publicly available, unauthenticated web data (Sec. 7 of 149-FZ RU, US 9th Cir. hiQ v. LinkedIn CFAA, EU Database Directive).',
  'legal.aiNotice': 'Comparative diffs and analytical insights are generated by AI Gemini and provided for informational purposes only.',
  'legal.contactEmail': 'For copyright inquiries and data subject requests: legal@competitorradar.io',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('cr_lang') as Language;
    if (saved === 'ru' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cr_lang', lang);
    document.cookie = `cr_lang=${lang}; path=/; max-age=31536000`;
  };

  const t = (key: string): string => {
    const dict = language === 'ru' ? ru : en;
    return dict[key] || ru[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
