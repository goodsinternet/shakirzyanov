"use client";

import { motion } from "framer-motion";
import {
  Forward,
  CreditCard,
  BellRing,
  ArrowRight,
  ArrowDown,
  MessageSquareText,
  CalendarCheck2,
  PlayCircle,
  Lock,
} from "lucide-react";
import { domovoy } from "@/content/domovoy";
import { Reveal } from "@/components/site/Reveal";

const STEP_ICONS = [Forward, CreditCard, BellRing];

/** Подпись продукта: стрелочная последовательность «сообщение → карточка → напоминание». */
const FLOW = [
  { label: "сообщение", icon: MessageSquareText },
  { label: "карточка", icon: CreditCard },
  { label: "напоминание", icon: BellRing },
];

/**
 * Секция «Домовой» — сразу после hero, первая в потоке страницы.
 * Весь контент берётся из src/content/domovoy.ts: владелец меняет статус
 * и включает ссылки (бот / видео / GitHub) без правки компонента.
 */
export function Domovoy() {
  const { links } = domovoy;

  return (
    <section id={domovoy.anchor} className="section-padding relative overflow-hidden">
      {/* Фоновые акценты секции */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-10 right-10 w-24 h-24 opacity-10 dot-grid" />
      </div>

      <div className="section-container relative z-10">
        {/* Бейдж над заголовком */}
        <Reveal className="text-center">
          <span className="inline-block text-xs sm:text-sm font-medium tracking-wider uppercase rounded-full border border-primary/25 bg-primary/[0.08] text-primary px-4 py-1.5 mb-6">
            {domovoy.badge}
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide mb-3">
            <span className="gradient-text hero-glow-text">{domovoy.title}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-foreground/80 font-medium mb-8">{domovoy.subtitle}</p>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            {domovoy.lead}
          </p>
        </Reveal>

        {/* Визуальная подпись продукта: сообщение → карточка → напоминание */}
        <Reveal className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" delay={0.05}>
          {FLOW.map((f, i) => (
            <div key={f.label} className="flex items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground/85">
                <f.icon size={16} className="text-primary" />
                {f.label}
              </span>
              {i < FLOW.length - 1 && (
                <>
                  <ArrowRight size={20} className="gradient-text hidden sm:inline-block" strokeWidth={2.5} />
                  <ArrowDown size={18} className="text-primary sm:hidden" strokeWidth={2.5} />
                </>
              )}
            </div>
          ))}
        </Reveal>

        {/* Три карточки «Как работает» */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2 mb-10">
          {domovoy.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={s.step} className="contents">
                <Reveal delay={i * 0.12} className="flex-1">
                  <div className="surface-card h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-subtle uppercase">
                        Шаг {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{s.step}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                  </div>
                </Reveal>
                {/* Стрелка последовательности — акцент между карточками */}
                {i < domovoy.steps.length - 1 && (
                  <>
                    <div className="hidden lg:flex items-center justify-center w-10 shrink-0">
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: "var(--cta-gradient)" }}
                      >
                        <ArrowRight size={18} className="text-primary-foreground" />
                      </motion.span>
                    </div>
                    <div className="flex lg:hidden justify-center py-1">
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: "var(--cta-gradient)" }}
                      >
                        <ArrowDown size={18} className="text-primary-foreground" />
                      </motion.span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Строка-фича: воскресный дайджест */}
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto rounded-xl border border-border/60 bg-secondary/40 px-5 py-4 mb-6 flex items-start sm:items-center gap-3">
            <CalendarCheck2 size={20} className="text-primary shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {domovoy.feature.text}{" "}
              <span className="font-semibold gradient-text">{domovoy.feature.example}</span>
            </p>
          </div>
        </Reveal>

        {/* Статус-строка — визуально выделенная, обновляется в src/content/domovoy.ts */}
        <Reveal delay={0.15}>
          <div
            className="max-w-2xl mx-auto rounded-xl border border-primary/25 bg-primary/[0.05] px-5 py-4 mb-10 flex items-center gap-3"
            data-domovoy-status
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
            </span>
            <p className="text-sm sm:text-base font-medium text-foreground/90">{domovoy.status}</p>
          </div>
        </Reveal>

        {/* Заглушки на будущее: видео-демо + «Попробовать бота».
            Оживают автоматически, когда в domovoy.ts появятся url и enabled: true. */}
        <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {links.video.url && links.video.enabled ? (
            <a
              href={links.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-outline inline-flex items-center gap-2"
            >
              <PlayCircle size={18} className="text-primary" />
              {links.video.label}
            </a>
          ) : (
            <span
              aria-disabled="true"
              title={links.video.disabledHint}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-3.5 text-muted-foreground cursor-not-allowed select-none"
            >
              <PlayCircle size={18} />
              {links.video.label} — {links.video.disabledHint}
            </span>
          )}

          {links.bot.url && links.bot.enabled ? (
            <a href={links.bot.url} target="_blank" rel="noopener noreferrer" className="cta-button hero-button-glow inline-flex items-center gap-2">
              {links.bot.label}
              <ArrowRight size={18} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              title={links.bot.disabledHint}
              className="inline-flex items-center gap-2 rounded-xl font-semibold px-7 py-3.5 bg-surface border border-border text-muted-foreground cursor-not-allowed select-none"
            >
              <Lock size={16} />
              {links.bot.label} — {links.bot.disabledHint}
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
