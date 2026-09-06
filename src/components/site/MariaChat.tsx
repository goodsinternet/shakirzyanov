"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, SendHorizontal, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OPEN_CHAT_EVENT, openMariaChat } from "@/lib/chat-events";

/**
 * Чат-виджет «Мария» — сценарный AI-консультант, реплика исходного сайта.
 * Заявки уходят в Telegram владельцу через Supabase Edge Function (как раньше),
 * вызов напрямую через fetch — без дополнительных зависимостей.
 */

const SUPABASE_URL = "https://zpvqparewztfczgcjutq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdnFwYXJld3p0ZmN6Z2NqdXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTYyNDAsImV4cCI6MjA4NjgzMjI0MH0.XQZr6LvK7Schr0zJnxY5-Olr_VrI9AEhc6Dc6lyZhYE";

export const MARIA_AVATAR = "/assets/maria-avatar-DK2SW5aL.jpg";
export { openMariaChat };

type Msg = { from: "bot" | "user"; text: string };
type Step = "greeting" | "type" | "budget" | "deadline" | "name" | "phone" | "comment" | "done";
type Lead = { type: string; budget: string; deadline: string; name: string; phone: string; comment: string };

const QUICK_TYPES = ["Сайт", "Чат-бот", "Мобильное приложение", "MVP / вайбкодинг", "Другое"];

export function MariaChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Здравствуйте 👋\nЯ Мария — AI-консультант Алексея.\nПомогу рассчитать стоимость проекта и передать заявку напрямую разработчику.",
    },
    { from: "bot", text: "Какой тип проекта вас интересует?" },
  ]);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<Lead>({ type: "", budget: "", deadline: "", name: "", phone: "", comment: "" });
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const push = useCallback((from: Msg["from"], text: string) => {
    setMessages((m) => [...m, { from, text }]);
  }, []);

  const handleAnswer = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      setInput("");
      push("user", text);
      setTimeout(() => {
        if (step === "greeting" || step === "type") {
          setLead((l) => ({ ...l, type: text }));
          push("bot", "Какой у вас ориентировочный бюджет?");
          setStep("budget");
        } else if (step === "budget") {
          setLead((l) => ({ ...l, budget: text }));
          push("bot", "Какие сроки для реализации?");
          setStep("deadline");
        } else if (step === "deadline") {
          setLead((l) => ({ ...l, deadline: text }));
          push("bot", "Как вас зовут?");
          setStep("name");
        } else if (step === "name") {
          setLead((l) => ({ ...l, name: text }));
          push("bot", "Укажите ваш номер телефона для связи:");
          setStep("phone");
        } else if (step === "phone") {
          setLead((l) => ({ ...l, phone: text }));
          push("bot", "Хотите добавить комментарий к заявке? (или напишите «нет»)");
          setStep("comment");
        } else if (step === "comment") {
          setLead((l) => ({ ...l, comment: text }));
          push("bot", "Отлично! Нажмите кнопку ниже, чтобы отправить заявку Алексею.");
          setStep("done");
        }
      }, 400);
    },
    [step, push]
  );

  const submit = async () => {
    setSending(true);
    const message = `<b>🔔 Новая заявка с сайта</b>

<b>Имя:</b> ${lead.name}
<b>Телефон:</b> ${lead.phone}
<b>Тип проекта:</b> ${lead.type}
<b>Бюджет:</b> ${lead.budget}
<b>Сроки:</b> ${lead.deadline}
<b>Комментарий:</b> ${lead.comment || "—"}`;
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-telegram`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      push("bot", "✅ Заявка отправлена! Алексей свяжется с вами в ближайшее время.");
      toast({ title: "Заявка отправлена!" });
    } catch (e) {
      console.error("Error sending to Telegram:", e);
      push("bot", "❌ Не удалось отправить заявку. Попробуйте написать напрямую в Telegram.");
      toast({ title: "Ошибка отправки", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 overflow-hidden border-2 border-primary/30 bg-background"
        aria-label={open ? "Закрыть чат" : "Открыть чат"}
      >
        {open ? <X size={24} className="text-primary-foreground absolute z-10" /> : null}
        <img
          src={MARIA_AVATAR}
          alt="Мария"
          className={`w-full h-full object-cover ${open ? "opacity-40" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] max-w-[calc(100vw-2.5rem)] rounded-2xl shadow-2xl bg-background border border-border flex flex-col overflow-hidden"
            style={{ maxHeight: "min(500px, calc(100dvh - 9rem))" }}
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <img src={MARIA_AVATAR} alt="Мария" className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-sm">Мария</p>
                <p className="text-xs text-primary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  AI-консультант
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Свернуть чат"
                title="Свернуть чат"
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Minus size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "min(260px, 40dvh)" }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                      m.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {step === "greeting" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleAnswer(t)}
                      className="text-xs rounded-full border border-primary/30 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {step === "done" && (
                <button
                  onClick={submit}
                  disabled={sending}
                  className="cta-button w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  {sending ? "Отправляю…" : "Отправить заявку Алексею"}
                  {!sending && <SendHorizontal size={15} />}
                </button>
              )}
            </div>

            {step !== "done" && (
              <form
                className="p-3 border-t border-border flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnswer(input);
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ваш ответ…"
                  className="flex-1 bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  aria-label="Отправить"
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--cta-gradient)" }}
                >
                  <SendHorizontal size={16} className="text-primary-foreground" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
