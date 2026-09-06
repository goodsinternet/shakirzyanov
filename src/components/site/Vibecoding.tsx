"use client";

import { vibeFeatures, vibeSection } from "@/content/sections";
import { Reveal } from "@/components/site/Reveal";

/**
 * Секция «Что такое вайбкодинг?» — содержание сохранено 1:1.
 * Позиционирование «MVP за 7–14 дней» — правда и сильная сторона.
 */
export function Vibecoding() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Что такое <span className="gradient-text">вайбкодинг</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{vibeSection.subtitle}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vibeFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="surface-card h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
