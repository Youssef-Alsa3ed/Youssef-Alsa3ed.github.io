export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-5 py-28 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-24 h-14 w-14 border-l-2 border-t-2 border-accent/40 sm:left-16"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-6 h-14 w-14 border-b-2 border-r-2 border-accent/40 sm:right-16"
      />

      <div className="relative w-full max-w-2xl animate-[fadeUp_0.9s_ease_both] rounded-md border border-border bg-card p-7 pt-12 text-center shadow-[0_8px_64px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors duration-300 sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent"
        />

        <div className="relative mx-auto mb-10 h-[130px] w-[130px] before:absolute before:-inset-1.5 before:rounded-full before:border before:border-accent before:opacity-[0.45] before:animate-[spinSlow_18s_linear_infinite] after:absolute after:-inset-3 after:rounded-full after:border after:border-dashed after:border-text/30 after:animate-[spinSlow_20s_linear_infinite_reverse]">
          <img
            src="/media/avatar2.webp"
            alt="Youssef Sayed"
            loading="eager"
            decoding="async"
            className="relative h-full w-full rounded-full border-2 border-gold/40 object-cover"
          />
        </div>

        <code className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent opacity-70">
          YS // profile
        </code>
        <h1 className="mt-3 animate-[glitchIn_0.5s_steps(1)_0.4s_both] text-4xl font-bold uppercase tracking-[0.18em] text-text sm:text-5xl">
          Youssef Sayed
        </h1>
        <p className="mt-3 font-serif text-sm italic tracking-[0.08em] text-accent opacity-80 sm:text-base">
          Engineering Student · Software Engineer
        </p>
        <div className="mt-9 flex justify-center">
          <code className="rounded border border-border bg-surface px-4 py-2 font-mono text-xs tracking-widest text-accent">
            <span className="text-gold">$</span> whoami
            <span className="ml-1 inline-block h-3 w-[7px] animate-[blink_1s_step-end_infinite] bg-accent align-middle" />
          </code>
        </div>
        <div className="my-8 flex items-center gap-4 opacity-35">
          <span className="h-px flex-1 bg-accent" />
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-accent">
            ◆ bio graphy ◆
          </span>
          <span className="h-px flex-1 bg-accent" />
        </div>

        <ul className="mx-auto inline-block list-none space-y-3 text-left">
          {[
            "Second year engineering student → Electrical Engineering",
            "Web developer · React · Express · MongoDB",
            "C++ · OpenGL · Unity · Game Developer",
            "Low-level systems & graphics enthusiast",
          ].map((item) => (
            <li
              key={item}
              className="relative pl-6 font-sans text-base leading-tight tracking-[0.04em] text-text opacity-85 sm:text-lg"
            >
              <span className="absolute left-0 top-1 text-[0.5rem] text-accent opacity-70">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#skills"
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 animate-[pulseSoft_2s_ease-in-out_infinite] flex-col items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted"
      >
        scroll
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current"
        >
          <use href="/svg/svg-sprite.svg#icon-down-arrow" />
        </svg>
      </a>
    </section>
  );
}
