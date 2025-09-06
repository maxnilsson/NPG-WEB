// Delad JS för Nordic Property Group AB

// Burger-meny
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');
burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  menu.style.display = open ? 'none' : 'flex';
});

// Årtal i footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Scroll-in reveal (stagger) ---
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.revealDelay || 0;
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-visible');
      revealIO.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.revealDelay = i * 60;
  revealIO.observe(el);
});

// Parallax på hero-kortet
(() => {
  const card = document.getElementById('heroCard');
  const hero = document.querySelector('.hero');
  if (!card || !hero) return;

  const maxTilt = 6; // grader
  function onMove(e){
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;   // 0..1
    const y = (e.clientY - r.top)  / r.height;  // 0..1
    const tiltX = (0.5 - y) * maxTilt;          // invert Y
    const tiltY = (x - 0.5) * maxTilt;
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
  }
  function reset(){ card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; }

  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', reset);
})();
