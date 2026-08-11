import Reveal from "./Reveal";

export default function SectionHeader({ label, index, title }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-accent opacity-80">
          {label}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        <span className="font-mono text-xs tracking-widest text-muted/70">
          {index}
        </span>
      </div>
      <h2 className="mt-6 inline-block animate-[glitchIn_0.5s_steps(1)_both] text-2xl font-semibold uppercase tracking-[0.2em] text-text sm:text-3xl">
        {title}
      </h2>
    </Reveal>
  );
}