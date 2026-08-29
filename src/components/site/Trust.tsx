"use client";

import { trustItems, trustTitle } from "@/content/sections";
import { Reveal } from "@/components/site/Reveal";

/** Секция «Почему мне доверяют» — сохранена без изменений. */
export function Trust() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{trustTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="surface-card h-full flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <t.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{t.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
