/**
 * Демо-кейсы портфолио. Правило честности:
 *  - никаких неподтверждённых цифр (пользователи, генерации, проценты);
 *  - только проверяемые факты: стек, что реализовано, какие задачи закрывает;
 *  - «Собран за N дней» — ТОЛЬКО если владелец подтвердил срок.
 *    Заполните builtDays числом — бейдж появится сам (null = скрыт).
 */

export type DemoProject = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  link: string;
  /** Акцентный цвет карточки — HSL-триплет, как в дизайн-системе. */
  accent: string;
  /** Какая задача закрывается (факт). */
  task: string;
  /** Что реализовано одним предложением (факт, проверяется по живому демо). */
  solution: string;
  /** Реализовано — пункты (проверяются по живому демо). */
  implemented: string[];
  /** Стек — универсальная подтверждаемая формулировка. */
  stack: string;
  /** Подтверждённый владельцем срок сборки в днях, иначе null. */
  builtDays: number | null;
  demoImage?: string;
  demoCaption?: string;
};

/** Универсальный стек для всех демо (живые веб-демо на React с AI-интеграцией). */
const UNIVERSAL_STACK = "Веб-приложение на React, AI-интеграция через API; собрано вайбкодингом";

export const projects: DemoProject[] = [
  {
    title: "Бюро заявок",
    subtitle: "Маркетплейс услуг",
    image: "/assets/portfolio-bureau-7Ylc0daK.png",
    imageAlt: "Бюро заявок",
    link: "https://application-bureau.lovable.app/",
    accent: "170 80% 50%",
    task: "Создать платформу для связи заказчиков с проверенными специалистами без бирж и рейтингов",
    solution: "Веб-приложение с формой заявки, личными кабинетами и тарифной системой",
    stack: UNIVERSAL_STACK,
    builtDays: null,
    implemented: [
      "Форма заявки с выбором категории работ",
      "Личные кабинеты заказчика и исполнителя",
      "Тарифная система и подбор проверенных специалистов",
    ],
  },
  {
    title: "Второй пилот",
    subtitle: "AI-ассистент для бизнеса",
    image: "/assets/portfolio-assistpilot-ycRJK9zE.png",
    imageAlt: "Второй пилот",
    link: "https://assist-pilot-pro.lovable.app/",
    accent: "200 90% 55%",
    task: "Разработать SaaS-платформу для автоматизации маркетинга и продаж с помощью ИИ",
    solution: "6 AI-инструментов: ответы на отзывы, контент, КП, анализ конкурентов, планировщик, база знаний",
    stack: UNIVERSAL_STACK,
    builtDays: null,
    implemented: [
      "Ответы на отзывы и генерация контента и КП",
      "Анализ конкурентов и планировщик публикаций",
      "База знаний в едином рабочем кабинете",
    ],
  },
  {
    title: "GutHealth AI",
    subtitle: "Диагностика здоровья ЖКТ",
    image: "/assets/portfolio-guthealth.webp",
    imageAlt: "GutHealth AI",
    link: "https://gut-health-report.replit.app/",
    accent: "140 70% 45%",
    task: "Создать лендинг с AI-квизом для персональной диагностики здоровья ЖКТ",
    solution: "Лендинг с интерактивным тестом, AI-анализом и генерацией персонального отчёта",
    stack: UNIVERSAL_STACK,
    builtDays: null,
    implemented: [
      "Лендинг с интерактивным AI-квизом",
      "AI-анализ ответов и генерация персонального отчёта",
    ],
  },
  {
    title: "CardMaker",
    subtitle: "AI-генератор карточек товаров",
    image: "/assets/portfolio-cardmaster-WqCr9oT_.png",
    imageAlt: "CardMaker",
    link: "https://preview--creatorcardbot.lovable.app/",
    accent: "35 85% 55%",
    task: "Автоматизировать создание карточек товаров для маркетплейсов",
    solution: "Веб-приложение с AI для генерации описаний, характеристик и инфографики товаров по фото",
    stack: UNIVERSAL_STACK,
    builtDays: null,
    demoImage: "/assets/cardmaster-demo-BPxx8JCo.png",
    demoCaption: "AI-генерация карточек для маркетплейсов",
    implemented: [
      "Генерация описаний и характеристик товара по фото",
      "Сборка инфографики карточек для маркетплейсов",
    ],
  },
];

export const portfolioSection = {
  eyebrow: "Портфолио",
  /** Новый честный заголовок вместо «Проекты с реальными результатами». */
  title: "Проекты: что умею собрать",
  subtitle:
    "Живые демо — откройте и проверьте сами. Каждый кейс: что внутри, что реализовано, какие задачи закрывает.",
} as const;
