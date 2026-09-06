"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Send, ChevronDown, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { openMariaChat } from "@/lib/chat-events";

/**
 * Hero: имя, должность и фото сохранены.
 * Добавлено по новому позиционированию:
 *  - статусная строка «Сейчас: строю собственный AI-продукт — Домовой»
 *    со ссылкой-якорем на секцию «Домовой»;
 *  - кнопка «Проект Домовой →» (ведёт на ту же секцию).
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Фоновые декорации — как на исходном сайте */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(200, 90%, 55%), transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="section-container pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-subtle text-sm font-medium tracking-widest uppercase mb-4">
              {site.hero.role}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]">
              {site.hero.nameFirst}
              <br />
              <span className="gradient-text hero-glow-text">{site.hero.nameLast}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-lg">
              {site.hero.subtitle}
            </p>

            {/* Статусная строка: собственный продукт — путь к секции Домового */}
            <a
              href="#domovoy"
              className="group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-2 mb-8 text-sm sm:text-base transition-colors hover:border-primary/50 hover:bg-primary/10"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-foreground/90">
                Сейчас: строю собственный AI-продукт —{" "}
                <span className="font-semibold text-primary group-hover:underline">
                  Домовой
                </span>
              </span>
            </a>

            <div className="flex flex-wrap gap-4">
              {/* Главная кнопка — теперь продукт */}
              <a href="#domovoy" className="cta-button hero-button-glow inline-flex items-center gap-2">
                Проект Домовой
                <ArrowRight size={18} />
              </a>
              {/* «Обсудить проект» остаётся, визуально приглушена относительно продукта */}
              <button
                onClick={openMariaChat}
                className="cta-button-muted inline-flex items-center gap-2 py-3.5 px-6"
              >
                <Send size={16} />
                Обсудить проект
              </button>
              <a
                href={site.hero.portfolioAnchor}
                className="cta-button-outline inline-flex items-center gap-2"
              >
                <ChevronDown size={18} />
                Смотреть портфолио
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <motion.div
                className="absolute -inset-3 rounded-[2rem]"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(var(--primary) / 0.3), hsl(200 90% 55% / 0.15), transparent, hsl(var(--primary) / 0.3))",
                  filter: "blur(20px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20 dot-grid" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 opacity-15 dot-grid" />
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 0 40px -10px hsl(var(--primary) / 0.3), var(--shadow-elevated)" }}
              >
                <Image
                  src={site.hero.photo}
                  alt={site.hero.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 288px, 384px"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
