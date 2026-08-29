/**
 * Данные калькулятора стоимости — перенесены с исходного сайта без изменений.
 */

export type ProjectType = {
  id: string;
  label: string;
  min: number;
  max: number;
  days: [number, number];
};

export type Complexity = { id: string; label: string; mult: number };
export type Extra = { id: string; label: string; price?: number; percent?: number };

export const projectTypes: ProjectType[] = [
  { id: "landing", label: "Лендинг", min: 5000, max: 20000, days: [3, 7] },
  { id: "corporate", label: "Корпоративный сайт", min: 25000, max: 120000, days: [14, 30] },
  { id: "shop", label: "Интернет-магазин", min: 30000, max: 250000, days: [20, 45] },
  { id: "chatbot", label: "Чат-бот", min: 7000, max: 70000, days: [5, 20] },
  { id: "mobile", label: "Мобильное приложение", min: 50000, max: 400000, days: [30, 60] },
];

export const complexities: Complexity[] = [
  { id: "basic", label: "Базовый", mult: 1 },
  { id: "medium", label: "Средний", mult: 1.6 },
  { id: "premium", label: "Премиум", mult: 2.5 },
];

export const extras: Extra[] = [
  { id: "design", label: "Дизайн с нуля", price: 15000 },
  { id: "crm", label: "Интеграция CRM", price: 20000 },
  { id: "ai", label: "AI-функционал", price: 25000 },
  { id: "urgent", label: "Срочная разработка", percent: 30 },
];

export const formatRub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

export function calcEstimate(typeId: string, complexityId: string, extraIds: string[]) {
  const type = projectTypes.find((t) => t.id === typeId)!;
  const complexity = complexities.find((c) => c.id === complexityId)!;
  let min = type.min * complexity.mult;
  let max = type.max * complexity.mult;
  let dMin = type.days[0];
  let dMax = type.days[1];
  extraIds.forEach((id) => {
    const extra = extras.find((e) => e.id === id);
    if (!extra) return;
    if (extra.price) {
      min += extra.price;
      max += extra.price;
    }
    if (extra.percent) {
      min *= 1 + extra.percent / 100;
      max *= 1 + extra.percent / 100;
    }
    if (id === "urgent") {
      dMin = Math.max(1, Math.round(dMin * 0.6));
      dMax = Math.max(2, Math.round(dMax * 0.6));
    }
  });
  return {
    min: Math.round(min),
    max: Math.round(max),
    days: `${dMin}–${dMax} дней`,
  };
}
