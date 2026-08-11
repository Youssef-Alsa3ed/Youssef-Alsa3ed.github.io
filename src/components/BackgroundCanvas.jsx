import { useEffect, useRef } from "react";

const CREAM_DARK = "rgba(197,193,168,";
const CREAM_LIGHT = "rgba(26,25,22,";
const GOLD = "rgba(179,152,70,";

const LINK_DIST = 110;
const LINK_DIST2 = LINK_DIST * LINK_DIST;
const CELL = LINK_DIST;

export default function BackgroundCanvas({ theme }) {
  const canvasRef = useRef(null);
  const colorsRef = useRef({
    cream: theme === "dark" ? CREAM_DARK : CREAM_LIGHT,
  });

  useEffect(() => {
    colorsRef.current.cream =
      theme === "dark" ? CREAM_DARK : CREAM_LIGHT;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles, shapes, grid;

    function resize() {
      const docWidth = document.documentElement.scrollWidth;
      const docHeight = document.documentElement.scrollHeight;
      W = canvas.width = docWidth;
      H = canvas.height = docHeight;
      canvas.style.width = docWidth + "px";
      canvas.style.height = docHeight + "px";
    }

    function initParticles() {
      const count = Math.min(
        200,
        Math.max(80, Math.round(window.innerWidth / 9)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random(),
      }));
    }

    function initShapes() {
      shapes = [
        { type: "hex", x: W * 0.08, y: H * 0.1, size: 30, rot: 0, speed: 0.002 },
        { type: "tri", x: W * 0.12, y: H * 0.2, size: 38, rot: 1, speed: 0.0018 },
        {
          type: "pentprism",
          x: W * 0.08,
          y: H * 0.25,
          size: 25,
          rot: 0.5,
          speed: 0.002,
        },
        { type: "sq", x: W * 0.95, y: H * 0.28, size: 25, rot: 0.5, speed: 0.002 },
        {
          type: "prism",
          x: W * 0.92,
          y: H * 0.32,
          size: 30,
          rot: 1.5,
          speed: 0.009,
        },
        { type: "tri", x: W * 0.85, y: H * 0.08, size: 28, rot: 0, speed: 0.006 },
        {
          type: "hexpyramid",
          x: W * 0.1,
          y: H * 0.15,
          size: 25,
          rot: 0,
          speed: 0.005,
        },
        {
          type: "hexpyramid",
          x: W * 0.9,
          y: H * 0.15,
          size: 22,
          rot: 1,
          speed: 0.0055,
        },
        { type: "prism", x: W * 0.2, y: H * 0.1, size: 20, rot: 0.5, speed: 0.012 },
        { type: "hex", x: W * 0.15, y: H * 0.35, size: 20, rot: 0, speed: 0.001 },
        { type: "sq", x: W * 0.2, y: H * 0.4, size: 18, rot: 0.3, speed: 0.0015 },
        { type: "hex", x: W * 0.8, y: H * 0.35, size: 22, rot: 1, speed: 0.0012 },
        { type: "sq", x: W * 0.75, y: H * 0.4, size: 16, rot: 0.7, speed: 0.0018 },
        { type: "tri", x: W * 0.1, y: H * 0.75, size: 20, rot: 0, speed: 0.002 },
        { type: "hex", x: W * 0.9, y: H * 0.8, size: 18, rot: 0.5, speed: 0.0025 },
        { type: "cube", x: W * 0.15, y: H * 0.85, size: 18, rot: 0, speed: 0.016 },
        {
          type: "hexpyramid",
          x: W * 0.92,
          y: H * 0.9,
          size: 22,
          rot: 1,
          speed: 0.011,
        },
        {
          type: "pentprism",
          x: W * 0.85,
          y: H * 0.9,
          size: 25,
          rot: 0,
          speed: 0.008,
        },
        {
          type: "hexpyramid",
          x: W * 0.1,
          y: H * 0.95,
          size: 25,
          rot: 0,
          speed: 0.005,
        },
      ];
    }

    function drawHex(cx, cy, s, rot) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + (i * Math.PI) / 3;
        const x = cx + s * Math.cos(a);
        const y = cy + s * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawTri(cx, cy, s, rot) {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = rot + (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const x = cx + s * Math.cos(a);
        const y = cy + s * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawSq(cx, cy, s, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    }

    function drawCube(cx, cy, s, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.strokeRect(-s / 2 + s * 0.3, -s / 2 - s * 0.3, s, s);
      ctx.beginPath();
      ctx.moveTo(-s / 2, -s / 2);
      ctx.lineTo(-s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.moveTo(s / 2, -s / 2);
      ctx.lineTo(s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.moveTo(s / 2, s / 2);
      ctx.lineTo(s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.moveTo(-s / 2, s / 2);
      ctx.lineTo(-s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.stroke();
      ctx.restore();
    }

    function drawPrism(cx, cy, s, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(-s / 2, -s / 2);
      ctx.lineTo(s / 2, -s / 2);
      ctx.lineTo(s / 2, s / 2);
      ctx.lineTo(-s / 2, s / 2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.lineTo(s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.lineTo(s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.lineTo(-s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s / 2, -s / 2);
      ctx.lineTo(-s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.moveTo(s / 2, -s / 2);
      ctx.lineTo(s / 2 + s * 0.3, -s / 2 - s * 0.3);
      ctx.moveTo(s / 2, s / 2);
      ctx.lineTo(s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.moveTo(-s / 2, s / 2);
      ctx.lineTo(-s / 2 + s * 0.3, s / 2 - s * 0.3);
      ctx.stroke();
      ctx.restore();
    }

    function drawHexagonalPyramid(cx, cy, s, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 2;
        const x = s * Math.cos(a);
        const y = s * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      const apexX = 0;
      const apexY = -s * 1.2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 2;
        const x = s * Math.cos(a);
        const y = s * Math.sin(a);
        ctx.moveTo(apexX, apexY);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    function drawPentagonalPrism(cx, cy, s, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x = s * Math.cos(a);
        const y = s * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x = s * Math.cos(a) + s * 0.3;
        const y = s * Math.sin(a) - s * 0.3;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x1 = s * Math.cos(a);
        const y1 = s * Math.sin(a);
        const x2 = s * Math.cos(a) + s * 0.3;
        const y2 = s * Math.sin(a) - s * 0.3;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.restore();
    }

    function buildGrid() {
      grid = new Map();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const key =
          Math.floor(p.x / CELL) * 1000 + Math.floor(p.y / CELL);
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / CELL);
        const cy = Math.floor(p.y / CELL);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const cell = grid.get(gx * 1000 + gy);
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < LINK_DIST2) {
                ctx.strokeStyle =
                  colorsRef.current.cream +
                  0.4 * (1 - Math.sqrt(d2) / LINK_DIST) +
                  ")";
                ctx.lineWidth = 0.4;
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

    function tick() {
      ctx.clearRect(0, 0, W, H);
      const CREAM = colorsRef.current.cream;

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = CREAM + "0.35)";
      for (const s of shapes) {
        s.rot += s.speed;
        ctx.beginPath();
        switch (s.type) {
          case "hex":
            drawHex(s.x, s.y, s.size, s.rot);
            ctx.stroke();
            break;
          case "tri":
            drawTri(s.x, s.y, s.size, s.rot);
            ctx.stroke();
            break;
          case "cube":
            drawCube(s.x, s.y, s.size, s.rot);
            break;
          case "prism":
            drawPrism(s.x, s.y, s.size, s.rot);
            break;
          case "hexpyramid":
            drawHexagonalPyramid(s.x, s.y, s.size, s.rot);
            break;
          case "pentprism":
            drawPentagonalPrism(s.x, s.y, s.size, s.rot);
            break;
          default:
            drawSq(s.x, s.y, s.size, s.rot);
            ctx.stroke();
        }
      }

      ctx.strokeStyle = GOLD + "0.4)";
      for (const s of shapes) {
        ctx.beginPath();
        switch (s.type) {
          case "hex":
            drawHex(s.x, s.y, s.size * 1.6, -s.rot * 0.5);
            ctx.stroke();
            break;
          case "tri":
            drawTri(s.x, s.y, s.size * 1.5, -s.rot * 0.6);
            ctx.stroke();
            break;
          case "cube":
            drawCube(s.x, s.y, s.size * 1.6, s.rot);
            break;
          case "prism":
            drawPrism(s.x, s.y, s.size * 1.6, s.rot * 0.5);
            break;
          case "pentprism":
            drawPentagonalPrism(s.x, s.y, s.size * 1.6, s.rot);
            break;
          case "hexpyramid":
            drawHexagonalPyramid(s.x, s.y, s.size * 1.6, -s.rot * 0.5);
            break;
          case "sq":
            drawSq(s.x, s.y, s.size * 1.8, -s.rot * 0.7);
            ctx.stroke();
            break;
        }
      }

      buildGrid();
      drawConnections();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.fillStyle = CREAM + p.a * 0.45 + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    initParticles();
    initShapes();
    let raf = requestAnimationFrame(tick);

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeTimer;

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const heightChange = Math.abs(h - lastHeight) / lastHeight;
        if (Math.abs(w - lastWidth) > 2 || heightChange > 0.15) {
          lastWidth = w;
          lastHeight = h;
          resize();
          initParticles();
          initShapes();
        }
      }, 150);
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 z-0"
    />
  );
}
