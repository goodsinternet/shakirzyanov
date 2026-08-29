/**
 * Данные секций услуг и вайбкодинга.
 * Тон: не «закажите у меня», а «что я умею» — услуги как доказательство
 * навыков основателя. Кнопки остаются, но визуально приглушены (см. компонент).
 */

import {
  Globe,
  Bot,
  Smartphone,
  Rocket,
  Zap,
  PiggyBank,
  FlaskConical,
  Sparkles,
  BotMessageSquare,
  FileCheck,
  Timer,
  Eye,
  Layers,
  LifeBuoy,
  Calculator,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const services: Service[] = [
  {
    icon: Globe,
    title: "Сайты",
    desc: "Лендинги, корпоративные сайты, интернет-магазины — под ключ с адаптивным дизайном и SEO.",
  },
  {
    icon: Bot,
    title: "Чат-боты",
    desc: "Telegram, WhatsApp и веб-боты с AI, оплатой и CRM-интеграциями.",
  },
  {
    icon: Smartphone,
    title: "Мобильные приложения",
    desc: "Кроссплатформенные приложения для iOS и Android с нативным UX.",
  },
  {
    icon: Rocket,
    title: "Вайбкодинг / MVP-запуск",
    desc: "Быстрый запуск идеи — от прототипа до работающего продукта за 2 недели.",
  },
];

export const servicesSection = {
  title: "Услуги",
  /** Подзаголовок смещён с «для вашего бизнеса» на доказательство навыков. */
  subtitle: "Чем я решаю задачи — те же навыки, на которых строится «Домовой»",
} as const;

export type VibeFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const vibeFeatures: VibeFeature[] = [
  {
    icon: Zap,
    title: "Запуск MVP за 7–14 дней",
    desc: "От идеи до рабочего продукта за рекордные сроки",
  },
  {
    icon: PiggyBank,
    title: "Экономия бюджета",
    desc: "До 70% экономии по сравнению с классической разработкой",
  },
  {
    icon: FlaskConical,
    title: "Быстрое тестирование гипотез",
    desc: "Проверяйте бизнес-идеи без лишних рисков",
  },
  {
    icon: Sparkles,
    title: "Современный UX",
    desc: "Интерфейсы, которые любят пользователи",
  },
  {
    icon: BotMessageSquare,
    title: "AI и автоматизация",
    desc: "Интеллектуальные решения из коробки",
  },
];

export const vibeSection = {
  title: "Что такое вайбкодинг?",
  subtitle:
    "Современный подход к разработке digital-продуктов, который сочетает дизайн-мышление, AI-инструменты и быструю сборку MVP.",
} as const;

export type TrustItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const trustItems: TrustItem[] = [
  {
    icon: FileCheck,
    title: "Работа по договору",
    desc: "Юридическая защита на каждом этапе",
  },
  {
    icon: Timer,
    title: "Фиксированные сроки",
    desc: "Дедлайны прописаны и соблюдаются",
  },
  {
    icon: Eye,
    title: "Прозрачный процесс",
    desc: "Вы видите прогресс в реальном времени",
  },
  {
    icon: Layers,
    title: "Современный стек",
    desc: "React, AI, автоматизация — лучшие технологии",
  },
  {
    icon: LifeBuoy,
    title: "Поддержка после запуска",
    desc: "Не бросаю проект после сдачи",
  },
];

export const trustTitle = "Почему мне доверяют";

export const calculatorSection = {
  icon: Calculator,
  title: "Калькулятор стоимости",
  subtitle: "Получите ориентировочную стоимость за 30 секунд",
} as const;

export const ctaSection = {
  title: "Готовы запустить сильный digital-продукт?",
  subtitle: "Обсудим ваш проект, рассчитаем стоимость и сроки — бесплатно и без обязательств.",
} as const;
