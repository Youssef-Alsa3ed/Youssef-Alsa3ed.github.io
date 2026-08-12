import { useEffect, useState } from "react";

export default function OpeningOverlay() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div className="absolute inset-x-0 top-0 h-1/2 animate-[curtainTop_0.8s_cubic-bezier(0.65,0,0.35,1)_0.3s_both] border-b border-gold/40 bg-darker" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 animate-[curtainBottom_0.8s_cubic-bezier(0.65,0,0.35,1)_0.3s_both] border-t border-gold/40 bg-darker" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[curtainFade_0.5s_ease_0.9s_both] font-mono text-xs uppercase tracking-[0.4em] text-gold">
        ys_
      </div>
    </div>
  );
}
