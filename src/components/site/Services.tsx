"use client";

import { Send } from "lucide-react";
import { services, servicesSection } from "@/content/sections";
import { openMariaChat } from "@/lib/chat-events";
import { Reveal } from "@/components/site/Reveal";

/**
 * Секция услуг. Позиционирование смещено: не «закажите у меня»,
 * а «что я умею» — услуги доказывают навыки основателя.
 * Кнопки «Обсудить проект» сохранены, но приглушены (cta-button-muted),
 * чтобы не конкурировать с секцией «Домовой».
 */
export function Services() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{servicesSection.title}</h2>
          <p className="text-lg text-muted-foreground">{servicesSection.subtitle}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="surface-card h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{s.desc}</p>
                <button
                  onClick={openMariaChat}
                  className="cta-button-muted inline-flex items-center gap-2 w-fit"
                >
                  <Send size={16} />
                  Обсудить проект
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
