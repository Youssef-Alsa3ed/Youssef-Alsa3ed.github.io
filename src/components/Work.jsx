import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import projects from "../data/projects";

export default function Work() {
  return (
    <>
      <section
        id="work"
        className="relative z-10 mx-auto w-full max-w-[900px] border-t border-border px-8 pt-24"
      >
        <SectionHeader label="03 // log" index="/03" title="Projects" />
      </section>

      <section className="relative z-10 mx-auto w-full max-w-[900px] px-8 pb-24">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {projects.map((project, i) => {
            const inner = (
              <>
                {project.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] group-active:scale-[1.04]"
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
                    style={
                      project.id === "supertracer"
                        ? { objectPosition: "center 78%" }
                        : undefined
                    }
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] group-active:scale-[1.04]"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/50">
                  <h3 className="max-h-0 overflow-hidden px-3 pt-0 text-lg font-semibold text-white opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:pt-2 group-hover:opacity-100 group-active:max-h-10 group-active:pt-2 group-active:opacity-100">
                    {project.title}
                  </h3>
                  <p className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm leading-snug text-white/90">
                    <span>{project.description}</span>
                    <svg
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 shrink-0 fill-current text-gold/80 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-active:translate-x-0.5 group-active:opacity-100"
                    >
                      <use href="/svg/svg-sprite.svg#icon-arrow-up-right" />
                    </svg>
                  </p>
                </div>
              </>
            );

            return (
              <Reveal key={project.id} delay={(i % 2) * 80}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex min-h-[240px] items-center justify-center overflow-hidden rounded border border-border bg-black/20 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_24px_rgba(179,152,70,0.15)] active:border-gold/40 active:shadow-[0_0_24px_rgba(179,152,70,0.15)]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group relative flex min-h-[240px] items-center justify-center overflow-hidden rounded border border-border bg-black/20">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}