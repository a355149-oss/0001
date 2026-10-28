/* ======================================
   SCRIPT.JS — Chen Yi-Hao Portfolio
   ====================================== */

// ---- 1. PARTICLES CANVAS ----
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6
        ? `rgba(0,210,255,${this.alpha})`
        : `rgba(255,215,0,${this.alpha * 0.5})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParts() {
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < Math.min(count, 120); i++) particles.push(new Particle());
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,210,255,${0.07 * (1 - d / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initParts(); });
  resize();
  initParts();
  loop();
})();


// ---- 2. TYPING EFFECT ----
(function initTyping() {
  const roles = [
    '數位商管跨領域人才',
    '電子商務愛好者',
    '智慧科技探索者',
    '商業創新思考者',
    '南山中學優秀學生',
  ];
  const el = document.getElementById('typed-role');
  if (!el) return;

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 110);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 55);
    }
  }
  type();
})();


// ---- 3. COUNTER ANIMATION ----
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  let started = false;

  function runCounters() {
    if (started) return;
    started = true;
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }

  const hero = document.getElementById('hero');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) runCounters(); });
  }, { threshold: 0.5 });
  if (hero) obs.observe(hero);
})();


// ---- 4. SKILL BAR ANIMATION ----
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const fill = bar.querySelector('.skill-fill');
        const pct = bar.dataset.pct;
        fill.style.width = pct + '%';
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();


// ---- 5. SCROLL FADE-IN ----
(function initFadeIn() {
  const targets = [
    '.about-card',
    '.skill-category',
    '.domain-card',
    '.timeline-card',
    '.contact-item',
    '.contact-card',
    '.vision-quote',
  ];

  const elements = document.querySelectorAll(targets.join(','));
  elements.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => obs.observe(el));
})();


// ---- 6. NAVBAR SCROLL EFFECT ----
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(5, 10, 20, 0.97)';
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      nav.style.background = 'rgba(5, 10, 20, 0.85)';
      nav.style.boxShadow = 'none';
    }
  });
})();


// ---- 7. ACTIVE NAV LINK ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#00d2ff';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();


// ---- 8. AVATAR IMAGE FALLBACK ----
(function initAvatarFallback() {
  const img = document.getElementById('avatar-img');
  if (!img) return;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const wrap = img.closest('.avatar-img-wrap');
    if (wrap) {
      wrap.style.background = 'linear-gradient(135deg, #0d1a2e, #00d2ff22)';
      const initials = document.createElement('div');
      initials.textContent = '陳';
      initials.style.cssText = `
        position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:4rem; font-weight:900; color:#00d2ff; font-family:Outfit,sans-serif;
      `;
      wrap.appendChild(initials);
    }
  });
})();


// ---- 9. MOUSE PARALLAX ON HERO AVATAR ----
(function initParallax() {
  const container = document.querySelector('.avatar-container');
  const hero = document.getElementById('hero');
  if (!container || !hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    container.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    container.style.transform = 'translate(0,0)';
    container.style.transition = 'transform 0.8s ease';
  });

  hero.addEventListener('mouseenter', () => {
    container.style.transition = 'transform 0.15s ease';
  });
})();


// ---- 10. SCROLL INDICATOR HIDE ----
(function initScrollHide() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
  });
})();
