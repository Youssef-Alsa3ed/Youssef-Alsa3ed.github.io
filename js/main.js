//canvas setup
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let CREAM = "rgba(26,25,22,";
let GOLD = "rgba(179,152,70,";

let W, H, particles, shapes;

function resize() {
  const docWidth = document.documentElement.scrollWidth;
  const docHeight = document.documentElement.scrollHeight;
  W = canvas.width = docWidth;
  H = canvas.height = docHeight;
  canvas.style.width = docWidth + "px";
  canvas.style.height = docHeight + "px";
}

function initParticles() {
  particles = Array.from({ length: 200 }, () => ({
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
    // Top-left area (more shapes, no center)
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
    // Top-right area
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
    // Hexagonal pyramids (new, top area)
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
    // Top-edge prisms (faster rotation)
    // { type:'cube', x:W*0.08, y:H*0.15, size:25, rot:0, speed:0.005 },
    { type: "prism", x: W * 0.2, y: H * 0.1, size: 20, rot: 0.5, speed: 0.012 },
    // Left edge near center
    { type: "hex", x: W * 0.15, y: H * 0.35, size: 20, rot: 0, speed: 0.001 },
    { type: "sq", x: W * 0.2, y: H * 0.4, size: 18, rot: 0.3, speed: 0.0015 },
    // Right edge near center
    { type: "hex", x: W * 0.8, y: H * 0.35, size: 22, rot: 1, speed: 0.0012 },
    { type: "sq", x: W * 0.75, y: H * 0.4, size: 16, rot: 0.7, speed: 0.0018 },
    // Bottom area - FEW shapes
    { type: "tri", x: W * 0.1, y: H * 0.75, size: 20, rot: 0, speed: 0.002 },
    { type: "hex", x: W * 0.9, y: H * 0.8, size: 18, rot: 0.5, speed: 0.0025 },
    { type: "cube", x: W * 0.15, y: H * 0.85, size: 18, rot: 0, speed: 0.016 },
    {
      type: "hexypramid",
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
  // Front face
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  // Back face
  ctx.strokeRect(-s / 2 + s * 0.3, -s / 2 - s * 0.3, s, s);
  // Connecting edges
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
  // Front face
  ctx.beginPath();
  ctx.moveTo(-s / 2, -s / 2);
  ctx.lineTo(s / 2, -s / 2);
  ctx.lineTo(s / 2, s / 2);
  ctx.lineTo(-s / 2, s / 2);
  ctx.closePath();
  ctx.stroke();
  // Back face
  ctx.beginPath();
  ctx.moveTo(-s / 2 + s * 0.3, -s / 2 - s * 0.3);
  ctx.lineTo(s / 2 + s * 0.3, -s / 2 - s * 0.3);
  ctx.lineTo(s / 2 + s * 0.3, s / 2 - s * 0.3);
  ctx.lineTo(-s / 2 + s * 0.3, s / 2 - s * 0.3);
  ctx.closePath();
  ctx.stroke();
  // Connecting edges
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
  // Base hexagon
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 2;
    const x = s * Math.cos(a);
    const y = s * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // Apex point (above center)
  const apexX = 0;
  const apexY = -s * 1.2;
  // Connecting edges from apex to base vertices
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
  // Front face
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = s * Math.cos(a);
    const y = s * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // Back face
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = s * Math.cos(a) + s * 0.3;
    const y = s * Math.sin(a) - s * 0.3;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  // Connecting edges
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

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.strokeStyle = CREAM + 0.4 * (1 - d / 110) + ")";
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function tick() {
  ctx.clearRect(0, 0, W, H);

  // shapes
  for (const s of shapes) {
    s.rot += s.speed;
    ctx.strokeStyle = CREAM + "0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (s.type === "hex") {
      drawHex(s.x, s.y, s.size, s.rot);
      ctx.stroke();
    } else if (s.type === "tri") {
      drawTri(s.x, s.y, s.size, s.rot);
      ctx.stroke();
    } else if (s.type === "cube") {
      drawCube(s.x, s.y, s.size, s.rot);
    } else if (s.type === "prism") {
      drawPrism(s.x, s.y, s.size, s.rot);
    } else if (s.type === "hexpyramid") {
      drawHexagonalPyramid(s.x, s.y, s.size, s.rot);
    } else if (s.type === "pentprism") {
      drawPentagonalPrism(s.x, s.y, s.size, s.rot);
    } else {
      drawSq(s.x, s.y, s.size, s.rot);
      ctx.stroke();
    }

    // second ring (golden)
    ctx.strokeStyle = GOLD + "0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (s.type === "hex") {
      drawHex(s.x, s.y, s.size * 1.6, -s.rot * 0.5);
      ctx.stroke();
    } else if (s.type === "tri") {
      drawTri(s.x, s.y, s.size * 1.5, -s.rot * 0.6);
      ctx.stroke();
    } else if (s.type === "cube") {
      drawCube(s.x, s.y, s.size * 1.6, s.rot);
    } else if (s.type === "prism") {
      drawPrism(s.x, s.y, s.size * 1.6, s.rot * 0.5);
    } else if (s.type === "pentprism") {
      drawPentagonalPrism(s.x, s.y, s.size * 1.6, s.rot);
    } else if (s.type === "hexpyramid") {
      drawHexagonalPyramid(s.x, s.y, s.size * 1.6, -s.rot * 0.5);
    } else if (s.type === "sq") {
      drawSq(s.x, s.y, s.size * 1.8, -s.rot * 0.7);
      ctx.stroke();
    }
  }

  // connections
  drawConnections();

  // particles
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

  requestAnimationFrame(tick);
}

// test if device is mobile to reduce resize calls on scroll
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let resizeTimeout;
const isMobile =
  /Mobi|Android/i.test(navigator.userAgent) ||
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

window.addEventListener("resize", () => {
  if (isMobile) {
    clearTimeout(resizeTimeout);
    let heightChangeFactor = Math.abs(window.innerHeight - lastHeight) / lastHeight;      
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth !== lastWidth || heightChangeFactor > 0.15) {
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        resize();
      }
    }, 200); 
  }
  else {
    resize();
    initParticles();
    initShapes();
  }
});
resize();
initParticles();
initShapes();
tick();

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.dataset.theme = "dark";
    themeToggle.textContent = "☀";
    themeToggle.title = "Switch to light mode";
    CREAM = "rgba(197,193,168, ";
    GOLD = "rgba(179,152,70,";
  } else {
    delete document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = "light";
    themeToggle.textContent = "◐";
    themeToggle.title = "Switch to dark mode";
    CREAM = "rgba(26,25,22, ";
    GOLD = "rgba(179,152,70,";
  }
  localStorage.setItem("theme", theme || "light");
}
// Load saved theme (default to dark to match original design)
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);
// Toggle on click
themeToggle.addEventListener("click", () => {
  const current =
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});
