import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import skills from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto w-full max-w-5xl px-5 py-24 sm:px-8">
      <SectionHeader label="02 // capabilities" index="/02" title="Skills" />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
        {skills.map((skill, i) => (
          <Reveal key={skill.icon} delay={i * 45}>
            <div className="group relative flex flex-col items-center gap-3 rounded-lg border border-accent-border bg-surface p-6 pt-9 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-card hover:shadow-[0_10px_40px_rgba(179,152,70,0.18)] active:-translate-y-1.5 active:border-gold/50 active:bg-card active:shadow-[0_10px_40px_rgba(179,152,70,0.18)]">
              <span className="pointer-events-none absolute left-2.5 top-2 font-mono text-[0.5rem] tracking-widest text-muted/50">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(179,152,70,0.1), transparent 70%)",
                }}
              />
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 fill-current text-text transition-all duration-300 group-hover:scale-110 group-hover:text-gold"
              >
                <use href={`/svg/svg-sprite.svg#${skill.icon}`} />
              </svg>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-gold">
                {skill.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}