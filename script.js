// === Background particles ===
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');
pCanvas.width = window.innerWidth;
pCanvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * pCanvas.width;
    this.y = Math.random() * pCanvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > pCanvas.width || this.y < 0 || this.y > pCanvas.height) {
      this.reset();
    }
  }
  draw() {
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    pCtx.fill();
  }
}

for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === Confetti ===
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#1dd1a1', '#ff6348', '#f6d365', '#fda085'];

class Confetti {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.type = Math.random() > 0.5 ? 'rect' : 'circle';
    this.w = Math.random() * 10 + 4;
    this.h = this.type === 'rect' ? Math.random() * 6 + 3 : this.w;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 8;
    this.speedY = Math.random() * 3 + 1.5;
    this.speedX = (Math.random() - 0.5) * 2;
    this.opacity = Math.random() * 0.6 + 0.4;
    this.sway = Math.random() * 0.5;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * this.sway) * 0.5;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height + 20) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }
    ctx.restore();
  }
}

for (let i = 0; i < 200; i++) {
  const c = new Confetti();
  c.y = Math.random() * canvas.height;
  pieces.push(c);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// === Mouse sparkles ===
const sparkles = [];

function createSparkle(x, y) {
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.5;
    const speed = Math.random() * 3 + 1;
    sparkles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

document.addEventListener('mousemove', (e) => {
  createSparkle(e.clientX, e.clientY);
});

let sparkleAnimId;

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => { p.update(); p.draw(); });

  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.03;
    s.size *= 0.97;
    if (s.life <= 0 || s.size < 0.2) {
      sparkles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = s.life;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  sparkleAnimId = requestAnimationFrame(animateSparkles);
}
animateSparkles();

// Override the simple animateConfetti with the combined version
// (the combined version in animateSparkles already draws confetti)

// === Resize ===
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
});
