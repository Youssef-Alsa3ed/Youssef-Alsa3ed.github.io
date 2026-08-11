import { useState } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { GITHUB_URL, EMAIL } from "../data/contact";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative mx-auto w-full max-w-5xl border-t border-border px-5 py-24 sm:px-8">
      <SectionHeader label="04 // transmission" index="/04" title="Contact" />

      <Reveal>
        <p className="mx-auto max-w-lg text-center font-serif text-lg italic tracking-[0.05em] text-muted sm:text-xl">
          Open to freelance work, collaborations, and interesting projects.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mx-auto mt-12 max-w-xl overflow-hidden rounded-md border border-border bg-card shadow-[0_8px_48px_rgba(0,0,0,0.35)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2 border-accent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 border-accent"
          />

          <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-2.5">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
              transmission // channel_04
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              online
            </span>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded border border-border px-4 py-3 transition-colors duration-300 hover:border-gold/50"
            >
              <span className="font-mono text-xs text-muted">
                <span className="mr-2 text-gold">&gt;</span>github
              </span>
              <span className="font-mono text-xs text-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗ Youssef-Alsa3ed
              </span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="group flex items-center justify-between rounded border border-border px-4 py-3 text-left transition-colors duration-300 hover:border-gold/50"
            >
              <span className="font-mono text-xs text-muted">
                <span className="mr-2 text-gold">&gt;</span>email
              </span>
              <span className="flex items-center gap-2 font-mono text-xs text-text">
                youssef.alsead5@gmail.com
                <span
                  className={`text-[0.6rem] uppercase tracking-widest transition-all duration-300 ${
                    copied ? "text-green-500" : "text-gold/70 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {copied ? "✓ copied" : "copy"}
                </span>
              </span>
            </button>
          </div>

          <div className="border-t border-border bg-surface px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
            {copied ? "> message cached to clipboard" : "> awaiting reply"}
            <span className="ml-1 inline-block h-3 w-[7px] animate-[blink_1s_step-end_infinite] bg-accent align-middle" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}