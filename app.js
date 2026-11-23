/* Kurwa Launcher — landing page interactions */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── download links ─────────────────────────────────────── */

const config = window.KURWA_CONFIG;

if (config) {
  for (const link of document.querySelectorAll('[data-download]')) {
    const url = config[`${link.dataset.download}Url`];
    if (url) link.setAttribute('href', url);
  }
}

/* ── header ─────────────────────────────────────────────── */

const headerEl = document.querySelector('.top');

const onScroll = () => {
  if (!headerEl) return;
  headerEl.classList.toggle('is-scrolled', window.scrollY > 16);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── mobile menu ────────────────────────────────────────── */

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) setOpen(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });
}

/* ── scroll reveal ──────────────────────────────────────── */

const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

/* ── mods demo ──────────────────────────────────────────── */

const demoRows = [...document.querySelectorAll('.demo__row')];
const demoCount = document.getElementById('demo-count');

const updateDemoCount = () => {
  if (!demoCount) return;
  const on = demoRows.filter((row) => row.classList.contains('is-on')).length;
  demoCount.textContent = `${on} из ${demoRows.length} включено`;
};

for (const row of demoRows) {
  const toggle = () => {
    row.classList.toggle('is-on');
    updateDemoCount();
  };

  row.addEventListener('click', toggle);
  row.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
}

updateDemoCount();

/* ── background preview modal ───────────────────────────── */

const modal = document.getElementById('bg-modal');
const modalVideo = document.getElementById('bg-video');
const modalTitle = document.getElementById('bg-title');
const modalClose = document.getElementById('bg-close');

const closeModal = () => {
  if (!modal || !modal.open) return;
  modal.close();
};

if (modal && modalVideo && modalTitle) {
  document.querySelectorAll('.bg-card').forEach((card) => {
    card.addEventListener('click', () => {
      const video = card.getAttribute('data-video');
      const title = card.getAttribute('data-title') ?? 'Фон';
      if (!video) return;

      modalTitle.textContent = title;
      modalVideo.src = video;
      modal.showModal();
      modalVideo.play().catch(() => undefined);
    });
  });

  modalClose?.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  modal.addEventListener('close', () => {
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

/* ── pause hero video in background ─────────────────────── */

const heroVideo = document.querySelector('.hero__video');

if (heroVideo) {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(() => undefined);
    }
  });
}

/* ── snow ───────────────────────────────────────────────── */

const canvas = document.getElementById('snow');

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let flakes = [];

  const createFlakes = () => {
    const count = Math.min(90, Math.max(28, Math.round(width / 24)));
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.9,
      speed: 12 + Math.random() * 38,
      drift: -8 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.16 + Math.random() * 0.5
    }));
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createFlakes();
  };

  let last = performance.now();

  const frame = (time) => {
    const delta = Math.min(0.05, (time - last) / 1000);
    last = time;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#eaf6ff';

    for (const flake of flakes) {
      flake.phase += delta * 0.6;
      flake.y += flake.speed * delta;
      flake.x += Math.sin(flake.phase) * 9 * delta + flake.drift * delta;

      if (flake.y > height + 4) {
        flake.y = -4;
        flake.x = Math.random() * width;
      }

      if (flake.x < -6) flake.x = width + 6;
      if (flake.x > width + 6) flake.x = -6;

      ctx.globalAlpha = flake.alpha;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(frame);
}

/* ── misc ───────────────────────────────────────────────── */

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
