import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import Nav from "./components/Nav";
import BackgroundCanvas from "./components/BackgroundCanvas";
import CursorGlow from "./components/CursorGlow";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        allowNestedScroll: true,
        naiveDimensions: true,
        stopInertiaOnNavigate: true,
        smoothWheel: true,
        lerp: 0.08,
        wheelMultiplier: 1,
        syncTouch: false,
        reduceMotion: prefersReducedMotion,
      }}
    >
      <Nav theme={theme} onToggle={toggleTheme} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-0 h-px bg-[linear-gradient(to_right,transparent,rgba(179,152,70,0.14),transparent)]"
        style={{ top: 48 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-0 h-px bg-[linear-gradient(to_right,transparent,rgba(179,152,70,0.14),transparent)]"
        style={{ bottom: 40 }}
      />

      <BackgroundCanvas theme={theme} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.05)_2px_4px)]"
      />

      <CursorGlow />

      <main className="relative z-10">
        <Hero />
        <Skills />
        <Work />
        <Contact />
      </main>

      <Footer />
    </ReactLenis>
  );
}