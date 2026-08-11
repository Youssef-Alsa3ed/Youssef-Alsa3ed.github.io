import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import projects from "../data/projects";

export default function Work() {
  return (
    <section id="work" className="relative mx-auto w-full max-w-5xl border-t border-border px-5 py-24 sm:px-8">
      <SectionHeader label="03 // log" index="/03" title="Projects" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 90}>
            <article className="group flex flex-col overflow-hidden rounded-md border border-border transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_48px_rgba(179,152,70,0.14)]">
              <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
                <span className="ml-3 truncate font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  {String(i + 1).padStart(2, "0")} · {project.title}
                </span>
              </div>

              <div className="relative aspect-video overflow-hidden bg-darker md:aspect-[4/3]">
                {project.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src={project.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={project.media}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-darker/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                />
              </div>

              <div className="flex flex-1 flex-col justify-end gap-2 p-5">
                <p className="font-sans text-sm leading-snug text-muted">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2.5 font-mono text-[0.55rem] uppercase tracking-[0.2em]">
                <span className="text-muted">{project.tag}</span>
                <span className="flex items-center gap-1 text-gold transition-transform duration-300 group-hover:translate-x-1">
                  $ ./run ↗
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}