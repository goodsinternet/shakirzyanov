"use client";

import { Send } from "lucide-react";
import { ctaSection } from "@/content/sections";
import { openMariaChat } from "@/lib/chat-events";
import { Reveal } from "@/components/site/Reveal";

/** Финальный CTA-блок — сохранён без изменений. */
export function CtaSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <Reveal>
          <div className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden" style={{ background: "var(--cta-gradient)" }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {ctaSection.title}
            </h2>
            <p className="text-lg text-primary-foreground/85 max-w-xl mx-auto mb-8">{ctaSection.subtitle}</p>
            <button
              onClick={openMariaChat}
              className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-[1.03] shadow-xl"
            >
              <Send size={20} />
              Обсудить проект
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
