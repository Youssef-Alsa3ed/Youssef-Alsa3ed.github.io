import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { GITHUB_URL, EMAIL } from "../data/contact";

function Button({ href, children }) {
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group relative overflow-hidden rounded-[3px] border border-border px-8 py-3 font-mono text-[0.72rem] uppercase tracking-[0.25em] text-text transition-colors duration-300 hover:border-gold hover:text-darker"
    >
      <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="relative">{children}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto w-full max-w-[900px] border-t border-border px-8 pb-16 pt-24 text-center"
    >
      <SectionHeader label="04 // transmission" index="/04" title="Contact" />

      <Reveal>
        <p
          className="mx-auto max-w-lg font-serif text-lg italic text-muted sm:text-xl"
          style={{ letterSpacing: "0.05em" }}
        >
          Open to freelance work, collaborations, and interesting projects.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Button href={GITHUB_URL}>
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
              >
                <use href="/svg/svg-sprite.svg#icon-github" />
              </svg>
              GitHub
            </span>
          </Button>
          <Button href={`mailto:${EMAIL}`}>
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href="/svg/svg-sprite.svg#icon-mail" />
              </svg>
              Email
            </span>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}