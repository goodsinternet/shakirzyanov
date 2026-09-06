"use client";

import { Send, Github } from "lucide-react";
import { site } from "@/content/site";
import { domovoy } from "@/content/domovoy";
import { openMariaChat } from "@/lib/chat-events";

/**
 * Футер: контакты, соцсети и место под ссылку на GitHub-репозиторий «Домового».
 * GitHub-ссылка управляется из src/content/domovoy.ts (links.github):
 * пока url === null — показывается плейсхолдер.
 */
export function Footer() {
  const github = domovoy.links.github;

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="section-container py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground order-3 sm:order-1">
            © {new Date().getFullYear()} {site.footer.copyright}
          </p>

          <div className="flex items-center gap-5 order-1 sm:order-2 flex-wrap justify-center">
            <a
              href={site.contacts.telegramBot}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Telegram
            </a>
            <a
              href={site.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={site.contacts.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              VK
            </a>

            {/* GitHub «Домового»: ссылка появится автоматически при заполнении domovoy.ts */}
            {github.url && github.enabled ? (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={15} />
                {github.label}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={github.disabledHint}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/50 cursor-not-allowed select-none"
              >
                <Github size={15} />
                GitHub — скоро
              </span>
            )}
          </div>

          <button
            onClick={openMariaChat}
            className="cta-button-muted inline-flex items-center gap-2 order-2 sm:order-3"
          >
            <Send size={15} />
            Обсудить проект
          </button>
        </div>
      </div>
    </footer>
  );
}
