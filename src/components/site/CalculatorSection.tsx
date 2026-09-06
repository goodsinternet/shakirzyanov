"use client";

import { useMemo, useState } from "react";
import { Calculator, Send } from "lucide-react";
import { projectTypes, complexities, extras, calcEstimate, formatRub } from "@/content/calculator";
import { calculatorSection } from "@/content/sections";
import { openMariaChat } from "@/lib/chat-events";
import { Reveal } from "@/components/site/Reveal";

/**
 * Калькулятор стоимости — перенесён с исходного сайта без изменений логики.
 * Находится ниже по потоку (после портфолио).
 */
export function CalculatorSection() {
  const [type, setType] = useState("landing");
  const [complexity, setComplexity] = useState("basic");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((c) => c !== id) : [...s, id]));

  const estimate = useMemo(() => calcEstimate(type, complexity, selected), [type, complexity, selected]);

  return (
    <section className="section-padding">
      <div className="section-container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <Calculator className="inline -mt-2 mr-2" size={36} />
            {calculatorSection.title}
          </h2>
          <p className="text-lg text-muted-foreground">{calculatorSection.subtitle}</p>
        </Reveal>
        <Reveal>
          <div className="surface-card max-w-3xl mx-auto !p-6 sm:!p-10">
            <div className="mb-8">
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Тип проекта</p>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      type === t.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Сложность</p>
              <div className="flex flex-wrap gap-2">
                {complexities.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      complexity === c.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Дополнительно</p>
              <div className="flex flex-wrap gap-2">
                {extras.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => toggle(e.id)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      selected.includes(e.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {e.label}
                    {e.price ? ` +${formatRub(e.price)}` : e.percent ? ` +${e.percent}%` : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ориентировочная стоимость</p>
                <p className="text-2xl font-bold gradient-text">
                  {formatRub(estimate.min)} – {formatRub(estimate.max)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Примерные сроки</p>
                <p className="text-2xl font-bold">{estimate.days}</p>
              </div>
            </div>

            <button
              onClick={openMariaChat}
              className="cta-button inline-flex items-center gap-2 w-full justify-center text-lg py-4"
            >
              <Send size={20} />
              Заказать проект
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
