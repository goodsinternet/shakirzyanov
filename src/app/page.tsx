import { Hero } from "@/components/site/Hero";
import { Domovoy } from "@/components/site/Domovoy";
import { Services } from "@/components/site/Services";
import { Vibecoding } from "@/components/site/Vibecoding";
import { Portfolio } from "@/components/site/Portfolio";
import { CalculatorSection } from "@/components/site/CalculatorSection";
import { Trust } from "@/components/site/Trust";
import { CtaSection } from "@/components/site/CtaSection";
import { Footer } from "@/components/site/Footer";
import { MariaChat } from "@/components/site/MariaChat";

/**
 * Приоритеты страницы (Sber500 x Disrupt):
 *  1. Hero со статусом «строю собственный AI-продукт»
 *  2. Домовой — собственный продукт
 *  3. Услуги — доказательство навыков (CTA приглушены)
 *  4. Вайбкодинг — методология
 *  5. Портфолио «Что могу создать» — демо-кейсы с честными фактами
 *  6. Калькулятор → доверие → CTA → футер
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Domovoy />
        <Services />
        <Vibecoding />
        <Portfolio />
        <CalculatorSection />
        <Trust />
        <CtaSection />
      </main>
      <Footer />
      <MariaChat />
    </div>
  );
}
