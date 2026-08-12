import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "hero", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const el = progressRef.current;
      if (el) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        el.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] bg-[linear-gradient(90deg,transparent_0%,rgba(179,152,70,0.35)_8%,#b39846_45%,#d4b55a_78%,rgba(255,255,255,0.9)_100%)] shadow-[0_0_12px_rgba(179,152,70,0.6)] transition-[width] duration-150 ease-linear"
        ref={progressRef}
      />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-6">
        <a
          href="#hero"
          className="group flex items-center gap-2 font-mono text-sm tracking-[0.3em] text-text"
        >
          <span className="text-gold transition-transform duration-300 group-hover:rotate-90">
            ◆
          </span>
          YS<span className="text-gold">_</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`font-mono text-[0.62rem] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  active === link.id
                    ? "text-accent"
                    : "text-muted hover:text-text"
                }`}
              >
                <span className="mr-1 text-gold/60">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={onToggle}
            className="flex h-9 w-9 items-center justify-center rounded border border-border text-text transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            {isDark ? (
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[18px] w-[18px] fill-current"
              >
                <use href="/svg/svg-sprite.svg#icon-sun" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[18px] w-[18px] fill-current"
              >
                <use href="/svg/svg-sprite.svg#icon-moon" />
              </svg>
            )}
          </button>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded border border-border md:hidden"
          >
            <span
              className={`h-px w-4 bg-text transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-text transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block font-mono text-sm uppercase tracking-[0.25em] transition-colors ${
                    active === link.id ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}