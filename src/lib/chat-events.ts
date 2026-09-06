/**
 * Событие открытия лид-чата «Мария».
 * Кнопки «Обсудить проект» диспетчат событие, виджет MariaChat его слушает.
 * Модуль без зависимостей — импортируется и из Hero, и из виджета.
 */

export const OPEN_CHAT_EVENT = "open-maria-chat";

export const openMariaChat = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  }
};
