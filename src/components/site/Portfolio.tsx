"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Zap, Wrench, CheckCircle2, ExternalLink, ArrowRight, CalendarDays } from "lucide-react";
import { projects, portfolioSection, type DemoProject } from "@/content/projects";
import { openMariaChat } from "@/lib/chat-events";
import { Reveal } from "@/components/site/Reveal";

function FactRow({
  icon: Icon,
  label,
  children,
  accent,
}: {
  icon: typeof Target;
  label: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: `hsl(${accent} / 0.25)`, background: `hsl(${accent} / 0.05)` }}
    >
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
        <Icon size={14} style={{ color: `hsl(${accent})` }} />
        {label}
      </p>
      <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: DemoProject; index: number }) {
  const reversed = index % 2 !== 0;
  return (
    <Reveal delay={index * 0.12}>
      <motion.div
        className="group relative rounded-3xl overflow-hidden border border-border/50 transition-colors duration-500 hover:border-primary/30"
        style={{
          background: `linear-gradient(135deg, hsl(${p.accent} / 0.04), transparent 40%), hsl(var(--surface))`,
        }}
      >
        <div className={`grid lg:grid-cols-2 ${reversed ? "lg:[direction:rtl]" : ""}`}>
          {/* Изображение-превью со ссылкой на демо */}
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block min-h-[240px] lg:min-h-[380px] overflow-hidden [direction:ltr]"
            aria-label={`${p.title} — открыть проект`}
          >
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/30" />
            <span
              className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold px-3 py-2 backdrop-blur-sm transition-transform group-hover:translate-x-0.5"
              style={{ background: `hsl(${p.accent} / 0.85)`, color: "hsl(230 15% 5%)" }}
            >
              Открыть проект
              <ExternalLink size={13} />
            </span>
          </a>

          {/* Контент: демо-бейдж, факты вместо метрик */}
          <div className="p-6 sm:p-10 [direction:ltr]">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Бейдж честности: это демо, а не коммерческий кейс */}
              <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.15em] px-2.5 py-1">
                Демо-кейс
              </span>
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase px-2.5 py-1 rounded-md"
                style={{ background: `hsl(${p.accent} / 0.12)`, color: `hsl(${p.accent})` }}
              >
                {p.subtitle}
              </span>
              {p.builtDays !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 text-secondary-foreground text-[11px] font-semibold px-2.5 py-1">
                  <CalendarDays size={12} className="text-primary" />
                  Собран за {p.builtDays} дней
                </span>
              )}
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold mb-5">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {p.title}
              </a>
            </h3>

            <div className="grid gap-3 mb-4">
              <FactRow icon={Target} label="Задача" accent={p.accent}>
                {p.task}
              </FactRow>
              <FactRow icon={Zap} label="Решение" accent={p.accent}>
                {p.solution}
              </FactRow>
              <FactRow icon={Wrench} label="Стек" accent={p.accent}>
                {p.stack}
              </FactRow>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Что внутри
            </p>
            <ul className="space-y-1.5 mb-6">
              {p.implemented.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={openMariaChat} className="cta-button-muted inline-flex items-center gap-2">
                Хочу похожий проект
              </button>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Смотреть демо
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

/**
 * Портфолио — «Что могу создать».
 * Правило честности: только проверяемые факты (стек, реализация, живое демо),
 * никаких неподтверждённых цифр. Каждая карточка помечена бейджем «Демо-кейс».
 */
export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="section-container relative z-10">
        <Reveal className="text-center mb-20">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4">
            {portfolioSection.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {portfolioSection.titleLead}{" "}
            <span className="gradient-text">{portfolioSection.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {portfolioSection.subtitle}
          </p>
        </Reveal>
        <div className="grid gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
