import { useEffect, useRef } from "react";

const LINK_DIST = 90;
const LINK_DIST2 = LINK_DIST * LINK_DIST;
const CELL = LINK_DIST;

const COLORS = {
  dark: { dot: "197,193,168", line: "179,152,70", shape: "179,152,70" },
  light: { dot: "26,25,22", line: "82,66,18", shape: "82,66,18" },
};

/* ── 3D wireframe shape definitions (unit, scaled at draw time) ── */
const CUBE_V = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const CUBE_E = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const OCTA_V = [
  [0, 0, -1], [0, 0, 1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0],
];
const OCTA_E = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2],
];

const PYRAMID_V = [[-1, 0, -1], [1, 0, -1], [1, 0, 1], [-1, 0, 1], [0, 1.4, 0]];
const PYRAMID_E = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]];

const TETRA_V = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
const TETRA_E = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];

const HEX_V = [];
const HEX_E = [];
for (let i = 0; i < 6; i++) {
  const a = (i * Math.PI) / 3;
  HEX_V.push([Math.cos(a), -1, Math.sin(a)]);
  HEX_V.push([Math.cos(a), 1, Math.sin(a)]);
}
for (let i = 0; i < 6; i++) {
  const b = i * 2;
  const t = i * 2 + 1;
  HEX_E.push([b, (b + 2) % 12]);
  HEX_E.push([t, (t + 2) % 12]);
  HEX_E.push([b, t]);
}

export default function BackgroundCanvas({ theme }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const grid = new Map();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let lastW = 0;
    let particles = [];
    let shapes = [];
    let raf = 0;
    let timer = 0;

    function resize() {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const widthChanged = newW !== lastW;

      W = newW;
      H = newH;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      lastW = newW;
      if (!widthChanged) return; // URL-bar height jitter on mobile: keep scene, only resize backing store

      const count = Math.min(120, Math.max(50, Math.round((W * H) / 22000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.1 + 0.5,
      }));

      shapes = [
        { v: TETRA_V, e: TETRA_E, x: W * 0.08, y: H * 0.1, size: 34, rx: 0.4, ry: 0.1, rz: 0.2, sx: 0.011, sy: 0.006, sz: 0.002 },
        { v: CUBE_V, e: CUBE_E, x: W * 0.2, y: H * 0.85, size: 40, rx: 0.1, ry: 0.7, rz: 0.5, sx: 0.005, sy: 0.009, sz: 0.004 },
        { v: OCTA_V, e: OCTA_E, x: W * 0.5, y: H * 0.08, size: 26, rx: 1.1, ry: 0.4, rz: 0.8, sx: 0.009, sy: -0.007, sz: 0.005 },
        { v: HEX_V, e: HEX_E, x: W * 0.47, y: H * 0.88, size: 30, rx: 0.3, ry: 0.2, rz: 1.2, sx: 0.004, sy: 0.011, sz: -0.006 },
        { v: PYRAMID_V, e: PYRAMID_E, x: W * 0.78, y: H * 0.12, size: 36, rx: 0.6, ry: 1.3, rz: 0.1, sx: 0.008, sy: 0.005, sz: 0.01 },
        { v: CUBE_V, e: CUBE_E, x: W * 0.7, y: H * 0.62, size: 22, rx: 0.9, ry: 0.5, rz: 0.3, sx: -0.012, sy: 0.008, sz: 0.003 },
        { v: TETRA_V, e: TETRA_E, x: W * 0.93, y: H * 0.3, size: 28, rx: 0.2, ry: 0.9, rz: 0.6, sx: 0.006, sy: 0.01, sz: -0.007 },
        { v: OCTA_V, e: OCTA_E, x: W * 0.85, y: H * 0.78, size: 24, rx: 1.3, ry: 0.2, rz: 1.0, sx: 0.01, sy: 0.006, sz: 0.008 },
        { v: PYRAMID_V, e: PYRAMID_E, x: W * 0.32, y: H * 0.42, size: 18, rx: 0.5, ry: 0.8, rz: 1.1, sx: 0.007, sy: -0.009, sz: 0.005 },
      ];
    }

    function buildGrid() {
      grid.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const key = ((p.x / CELL) | 0) * 10000 + ((p.y / CELL) | 0);
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }
    }

    function drawShapes(c) {
      ctx.strokeStyle = "rgba(" + c.shape + ",0.5)";
      ctx.lineWidth = 1.2;
      const f = 320;
      for (const s of shapes) {
        s.rx += s.sx;
        s.ry += s.sy;
        s.rz += s.sz;
        const cx = Math.cos(s.rx);
        const sx = Math.sin(s.rx);
        const cy = Math.cos(s.ry);
        const sy = Math.sin(s.ry);
        const cz = Math.cos(s.rz);
        const sz = Math.sin(s.rz);
        const pts = new Array(s.v.length);
        for (let i = 0; i < s.v.length; i++) {
          const v = s.v[i];
          let x = v[0] * s.size;
          let y = v[1] * s.size;
          let z = v[2] * s.size;

          let t = y * cy - z * sy;
          z = y * sy + z * cy;
          y = t;

          t = x * cx - z * sx;
          z = x * sx + z * cx;
          x = t;

          t = x * cz - y * sz;
          y = x * sz + y * cz;
          x = t;

          const scale = f / (f + z);
          pts[i] = [s.x + x * scale, s.y + y * scale];
        }
        ctx.beginPath();
        for (const [a, b] of s.e) {
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
        }
        ctx.stroke();
      }
    }

    function tick() {
      const c = COLORS[themeRef.current];

      ctx.clearRect(0, 0, W, H);
      drawShapes(c);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        else if (p.y > H) p.y = 0;
        ctx.fillStyle = "rgba(" + c.dot + ",0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }

      buildGrid();

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = (p.x / CELL) | 0;
        const cy = (p.y / CELL) | 0;
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const cell = grid.get(gx * 10000 + gy);
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < LINK_DIST2) {
                ctx.strokeStyle =
                  "rgba(" +
                  c.line +
                  "," +
                  (0.35 * (1 - Math.sqrt(d2) / LINK_DIST)).toFixed(3) +
                  ")";
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    }

    function loop() {
      tick();
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduced) tick();
    else loop();

    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}