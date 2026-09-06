/**
 * Общие данные сайта: мета-теги, hero, контакты.
 * Меняйте тексты здесь — компоненты подхватят автоматически.
 */

export const site = {
  meta: {
    title: "Алексей Шакирзянов — Домовой: AI-продукт для семьи + digital-разработка",
    description:
      "Строю собственный AI-продукт «Домовой» — семейный диспетчер в Telegram. Плюс digital-разработка: сайты, чат-боты и запуск MVP через вайбкодинг за 7–14 дней.",
  },

  hero: {
    role: "Digital-разработчик & AI-интегратор",
    nameFirst: "Алексей",
    nameLast: "Шакирзянов",
    subtitle:
      "Разрабатываю сайты, чат-боты, мобильные приложения и запускаю проекты через вайбкодинг — быстро, современно, с фокусом на прибыль.",
    photo: "/assets/alexey-photo.webp",
    photoAlt: "Алексей Шакирзянов — digital-разработчик",
    portfolioAnchor: "#portfolio",
  },

  contacts: {
    telegramBot: "https://t.me/alexey_shakirzyanov_bot",
    whatsapp: "https://wa.me/79043948771",
    vk: "https://vk.com/ashakirzyanov63",
  },

  footer: {
    copyright: "Алексей Шакирзянов. Все права защищены.",
  },
} as const;
