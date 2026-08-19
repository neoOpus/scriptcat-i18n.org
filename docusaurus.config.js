// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";

const { defaultLocale, i18nDocFallbacks = {} } = require("./scripts/check-config.json");
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
const docsFallbackLocale = i18nDocFallbacks[currentLocale]?.sourceLocale;
const docsPath = docsFallbackLocale
  ? `i18n/${docsFallbackLocale}/docusaurus-plugin-content-docs/current`
  : "docs";

const metadataByLocale = {
  "zh-Hans": {
    keywords:
      "scriptcat,userscript,browser extension,浏览器扩展,用户脚本,后台脚本,脚本猫,tampermonkey,violentmonkey,greasemonkey,javascript,自动化脚本,网页增强",
    description:
      "ScriptCat 是一个可以执行自定义脚本的浏览器扩展，支持用户脚本、后台脚本等多种脚本类型。提供强大的脚本管理、同步、订阅等功能。",
  },
  en: {
    keywords:
      "scriptcat,userscript,browser extension,user scripts,background scripts,scheduled scripts,userscript manager,tampermonkey,violentmonkey,greasemonkey,javascript,browser automation",
    description:
      "ScriptCat is an open-source browser extension for user scripts, background scripts, and scheduled scripts, with powerful management, sync, and subscription features.",
  },
  ru: {
    keywords:
      "scriptcat,userscript,расширение браузера,пользовательские скрипты,фоновые скрипты,скрипты по расписанию,менеджер пользовательских скриптов,tampermonkey,violentmonkey,greasemonkey,javascript,автоматизация браузера",
    description:
      "ScriptCat — открытое расширение браузера для пользовательских, фоновых скриптов и скриптов по расписанию с удобным управлением, синхронизацией и подписками.",
  },
  ja: {
    keywords:
      "scriptcat,userscript,ブラウザ拡張機能,ユーザースクリプト,バックグラウンドスクリプト,スケジュールスクリプト,ユーザースクリプトマネージャー,tampermonkey,violentmonkey,greasemonkey,javascript,ブラウザ自動化",
    description:
      "ScriptCatは、ユーザースクリプト、バックグラウンドスクリプト、スケジュールスクリプトに対応したオープンソースのブラウザ拡張機能です。強力な管理、同期、購読機能を備えています。",
  },
  vi: {
    keywords:
      "scriptcat,userscript,tiện ích mở rộng trình duyệt,script người dùng,script nền,script theo lịch,trình quản lý userscript,tampermonkey,violentmonkey,greasemonkey,javascript,tự động hóa trình duyệt",
    description:
      "ScriptCat là một tiện ích mở rộng trình duyệt mã nguồn mở dành cho script người dùng, script nền và script theo lịch, với các tính năng quản lý, đồng bộ hóa và đăng ký mạnh mẽ.",
  },
  de: {
    keywords:
      "scriptcat,userscript,Browser-Erweiterung,Benutzerskripte,Hintergrundskripte,geplante Skripte,Userscript-Manager,tampermonkey,violentmonkey,greasemonkey,javascript,Browser-Automatisierung",
    description:
      "ScriptCat ist eine quelloffene Browser-Erweiterung für Benutzerskripte, Hintergrundskripte und geplante Skripte mit leistungsstarker Verwaltung, Synchronisierung und Abonnementfunktionen.",
  },
  "zh-Hant": {
    keywords:
      "scriptcat,userscript,瀏覽器擴充功能,使用者腳本,背景腳本,排程腳本,腳本猫,tampermonkey,violentmonkey,greasemonkey,javascript,自動化腳本,網頁增強",
    description:
      "ScriptCat 是一款可執行自訂腳本的瀏覽器擴充功能，支援使用者腳本、背景腳本等多種腳本類型，提供強大的腳本管理、同步、訂閱等功能。",
  },
  es: {
    keywords:
      "scriptcat,userscript,extensión de navegador,scripts de usuario,scripts en segundo plano,scripts programados,gestor de userscripts,tampermonkey,violentmonkey,greasemonkey,javascript,automatización del navegador",
    description:
      "ScriptCat es una extensión de navegador de código abierto para scripts de usuario, scripts en segundo plano y scripts programados, con potentes funciones de gestión, sincronización y suscripción.",
  },
  fr: {
    keywords:
      "scriptcat,userscript,extension de navigateur,scripts utilisateur,scripts en arrière-plan,scripts planifiés,gestionnaire de userscripts,tampermonkey,violentmonkey,greasemonkey,javascript,automatisation du navigateur",
    description:
      "ScriptCat est une extension de navigateur open source pour les scripts utilisateur, les scripts en arrière-plan et les scripts planifiés, avec de puissantes fonctionnalités de gestion, de synchronisation et d'abonnement.",
  },
  ar: {
    keywords:
      "scriptcat,userscript,امتداد المتصفح,سكربتات المستخدم,سكربتات الخلفية,سكربتات مجدولة,مدير سكربتات المستخدم,tampermonkey,violentmonkey,greasemonkey,javascript,أتمتة المتصفح",
    description:
      "ScriptCat هو امتداد متصفح مفتوح المصدر لسكربتات المستخدم وسكربتات الخلفية والسكربتات المجدولة، مع ميزات قوية للإدارة والمزامنة والاشتراك.",
  },
  it: {
    keywords:
      "scriptcat,userscript,estensione del browser,script utente,script in background,script pianificati,gestore di userscript,tampermonkey,violentmonkey,greasemonkey,javascript,automazione del browser",
    description:
      "ScriptCat è un'estensione del browser open source per script utente, script in background e script pianificati, con potenti funzionalità di gestione, sincronizzazione e abbonamento.",
  },
  pt: {
    keywords:
      "scriptcat,userscript,extensão de navegador,scripts de usuário,scripts em segundo plano,scripts agendados,gerenciador de userscripts,tampermonkey,violentmonkey,greasemonkey,javascript,automação de navegador",
    description:
      "ScriptCat é uma extensão de navegador de código aberto para scripts de usuário, scripts em segundo plano e scripts agendados, com recursos avançados de gerenciamento, sincronização e assinatura.",
  },
  fa: {
    keywords:
      "scriptcat,userscript,افزونه مرورگر,اسکریپت کاربری,اسکریپت پس‌زمینه,اسکریپت زمان‌بندی‌شده,مدیر اسکریپت کاربری,tampermonkey,violentmonkey,greasemonkey,javascript,اتوماسیون مرورگر",
    description:
      "ScriptCat یک افزونه متن‌باز مرورگر برای اسکریپت‌های کاربری، اسکریپت‌های پس‌زمینه و اسکریپت‌های زمان‌بندی‌شده است، با قابلیت‌های قدرتمند مدیریت، همگام‌سازی و اشتراک.",
  },
  nl: {
    keywords:
      "scriptcat,userscript,browserextensie,gebruikersscripts,achtergrondscripts,geplande scripts,userscript-manager,tampermonkey,violentmonkey,greasemonkey,javascript,browserautomatisering",
    description:
      "ScriptCat is een open-source browserextensie voor gebruikersscripts, achtergrondscripts en geplande scripts, met krachtige functies voor beheer, synchronisatie en abonnementen.",
  },
  bn: {
    keywords:
      "scriptcat,userscript,ব্রাউজার এক্সটেনশন,ইউজার স্ক্রিপ্ট,ব্যাকগ্রাউন্ড স্ক্রিপ্ট,নির্ধারিত স্ক্রিপ্ট,ইউজারস্ক্রিপ্ট ম্যানেজার,tampermonkey,violentmonkey,greasemonkey,javascript,ব্রাউজার অটোমেশন",
    description:
      "ScriptCat একটি ওপেন-সোর্স ব্রাউজার এক্সটেনশন যা ইউজার স্ক্রিপ্ট, ব্যাকগ্রাউন্ড স্ক্রিপ্ট এবং নির্ধারিত স্ক্রিপ্ট সমর্থন করে, শক্তিশালী ব্যবস্থাপনা, সিঙ্ক ও সাবস্ক্রিপশন সুবিধাসহ।",
  },
  id: {
    keywords:
      "scriptcat,userscript,ekstensi browser,skrip pengguna,skrip latar belakang,skrip terjadwal,pengelola userscript,tampermonkey,violentmonkey,greasemonkey,javascript,otomatisasi browser",
    description:
      "ScriptCat adalah ekstensi browser sumber terbuka untuk skrip pengguna, skrip latar belakang, dan skrip terjadwal, dengan fitur manajemen, sinkronisasi, dan langganan yang canggih.",
  },
  hy: {
    keywords:
      "scriptcat,userscript,բրաուզերի ընդլայնում,օգտագործողի սկրիպտներ,ֆոնային սկրիպտներ,ժամանակացույցով սկրիպտներ,userscript մենեջեր,tampermonkey,violentmonkey,greasemonkey,javascript,բրաուզերի ավտոմատացում",
    description:
      "ScriptCat-ը բաց կոդով բրաուզերի ընդլայնում է օգտագործողի, ֆոնային և ժամանակացույցով սկրիպտների համար՝ հզոր կառավարման, համաժամեցման և բաժանորդագրության գործառույթներով։",
  },
  uk: {
    keywords:
      "scriptcat,userscript,розширення браузера,користувацькі скрипти,фонові скрипти,скрипти за розкладом,менеджер userscript,tampermonkey,violentmonkey,greasemonkey,javascript,автоматизація браузера",
    description:
      "ScriptCat — це браузерне розширення з відкритим кодом для користувацьких, фонових скриптів і скриптів за розкладом, з потужними функціями керування, синхронізації та підписки.",
  },
  tr: {
    keywords:
      "scriptcat,userscript,tarayıcı eklentisi,kullanıcı betikleri,arka plan betikleri,zamanlanmış betikler,userscript yöneticisi,tampermonkey,violentmonkey,greasemonkey,javascript,tarayıcı otomasyonu",
    description:
      "ScriptCat, kullanıcı betikleri, arka plan betikleri ve zamanlanmış betikler için açık kaynaklı bir tarayıcı eklentisidir; güçlü yönetim, senkronizasyon ve abonelik özellikleri sunar.",
  },
  ko: {
    keywords:
      "scriptcat,userscript,브라우저 확장 프로그램,유저 스크립트,백그라운드 스크립트,예약 스크립트,유저스크립트 매니저,tampermonkey,violentmonkey,greasemonkey,javascript,브라우저 자동화",
    description:
      "ScriptCat은 유저 스크립트, 백그라운드 스크립트, 예약 스크립트를 지원하는 오픈소스 브라우저 확장 프로그램으로, 강력한 관리·동기화·구독 기능을 제공합니다.",
  },
};
const metadata = metadataByLocale[currentLocale] ?? metadataByLocale[defaultLocale];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ScriptCat",
  tagline: "强大的用户脚本管理器，激活浏览器的无限可能",
  url: "https://docs.scriptcat.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  favicon: "img/logo.png",

  trailingSlash: true,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "scriptscat", // Usually your GitHub org/user name.
  projectName: "scriptcat.org", // Usually your repo name.

  plugins: [
    ["@gracefullight/docusaurus-plugin-tailwind", {}],
    [
      "@docusaurus/plugin-client-redirects",
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        // /docs/use/use/ is the quick-start doc; /docs/use/ itself has never
        // resolved (broken footer link + broken in-content links) — redirect
        // it instead of renaming the existing doc, so no published URL moves.
        redirects: [
          {
            to: "/docs/use/use/",
            from: "/docs/use/",
          },
        ],
      }),
    ],
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale,
    locales: ["zh-Hans", "en", "ja", "ru", "vi", "de", "zh-Hant", "es", "fr", "ar", "it", "pt", "fa", "nl", "bn", "id", "hy", "uk", "tr", "ko"],
    localeConfigs: {
      "zh-Hans": {
        label: "简体中文",
        direction: "ltr",
        htmlLang: "zh-Hans",
      },
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en",
      },
      ja: {
        label: "日本語",
        direction: "ltr",
        htmlLang: "ja",
      },
      ru: {
        label: "Русский",
        direction: "ltr",
        htmlLang: "ru",
      },
      vi: {
        label: "Tiếng Việt",
        direction: "ltr",
        htmlLang: "vi",
      },
      de: {
        label: "Deutsch",
        direction: "ltr",
        htmlLang: "de",
      },
      "zh-Hant": {
        label: "繁體中文",
        direction: "ltr",
        htmlLang: "zh-Hant",
      },
      es: {
        label: "Español",
        direction: "ltr",
        htmlLang: "es",
      },
      fr: {
        label: "Français",
        direction: "ltr",
        htmlLang: "fr",
      },
      ar: {
        label: "العربية",
        direction: "rtl",
        htmlLang: "ar",
      },
      it: {
        label: "Italiano",
        direction: "ltr",
        htmlLang: "it",
      },
      pt: {
        label: "Português",
        direction: "ltr",
        htmlLang: "pt",
      },
      fa: {
        label: "فارسی",
        direction: "rtl",
        htmlLang: "fa",
      },
      nl: {
        label: "Nederlands",
        direction: "ltr",
        htmlLang: "nl",
      },
      bn: {
        label: "বাংলা",
        direction: "ltr",
        htmlLang: "bn",
      },
      id: {
        label: "Bahasa Indonesia",
        direction: "ltr",
        htmlLang: "id",
      },
      hy: {
        label: "Հայերեն",
        direction: "ltr",
        htmlLang: "hy",
      },
      uk: {
        label: "Українська",
        direction: "ltr",
        htmlLang: "uk",
      },
      tr: {
        label: "Türkçe",
        direction: "ltr",
        htmlLang: "tr",
      },
      ko: {
        label: "한국어",
        direction: "ltr",
        htmlLang: "ko",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Docusaurus normally falls back to the default (Chinese) docs tree.
          // For configured locales, use another locale as the base tree while
          // still letting localized files override it. check:i18n restricts
          // which paths may rely on this fallback.
          path: docsPath,
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/scriptscat/scriptcat.org/edit/main",
          // So "Edit this page" on /en/ docs opens the en source file, not zh.
          editLocalizedFiles: true,
        },
        // No blog/ directory exists; without this, newer Docusaurus versions
        // emit an empty /blog/ index route that was never part of the site.
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-7MBECV28JV",
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: "weekly",
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content: metadata.keywords,
        },
        {
          name: "description",
          content: metadata.description,
        },
      ],
      navbar: {
        title: "ScriptCat",
        logo: {
          alt: "ScriptCat",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "use/use",
            position: "left",
            label: "使用文档",
          },
          {
            type: "doc",
            docId: "dev/index",
            position: "left",
            label: "开发文档",
          },
          {
            type: "doc",
            docId: "change/index",
            position: "right",
            label: "更新日志",
          },
          {
            href: "https://learn.scriptcat.org/",
            label: "脚本开发指南",
            position: "right",
          },
          {
            href: "https://github.com/scriptscat/scriptcat",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "使用指南",
                to: "/docs/use/use",
              },
              {
                label: "开发指南",
                to: "/docs/dev",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "油猴中文网",
                href: "https://bbs.tampermonkey.net.cn/",
              },
              {
                label: "脚本猫脚本站",
                href: "https://scriptcat.org/",
              },
              {
                label: "Discord",
                href: "https://discord.gg/JF76nHCCM7",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/scriptscat/scriptcat",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ScriptCat, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        appId: "CWJJXTJUJS",
        apiKey: "283cbc6053e086e74123140ab8677465",
        indexName: "scriptcat",
        contextualSearch: true,
        searchPagePath: "search",
      },
    }),
};

module.exports = config;
