// app.js — komplett fil
// Hanterar mobilmeny (hamburger), stänger vid klick utanför,
// låser upplösning (scroll) när menyn är öppen och återställer på resize.

(function () {
  // Hämta nödvändiga element
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('menu');

  // Om markup saknar burger eller menu, gör ingenting
  if (!burger || !menu) {
    // Tips: se till att headern innehåller:
    // <button id="burger" class="burger" aria-controls="menu" aria-expanded="false" aria-label="Öppna menyn">☰</button>
    // <nav id="menu" class="menu" aria-hidden="true"> ... </nav>
    return;
  }

  // Hjälpare: öppna/stäng meny
  const openMenu = () => {
    burger.classList.add('is-open');
    menu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');

    // Lås scroll i bakgrunden på mobil när menyn är öppen
    // (använd <html> för att undvika innehållshopp)
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.touchAction = 'none';
  };

  const closeMenu = () => {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    // Återställ scroll
    document.documentElement.style.overflow = '';
    document.documentElement.style.touchAction = '';
  };

  const toggleMenu = () => {
    const isOpen = burger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  };

  // Klick på burgaren
  burger.addEventListener('click', (e) => {
    e.stopPropagation(); // förhindra att dokument-lyssnaren stänger direkt
    toggleMenu();
  });

  // Klick på länk i menyn → stäng
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) closeMenu();
  });

  // Klick utanför → stäng
  document.addEventListener('click', (e) => {
    // Om menyn inte är öppen behövs ingen koll
    if (!burger.classList.contains('is-open')) return;

    const clickedInsideMenu   = menu.contains(e.target);
    const clickedBurgerButton = burger.contains(e.target);
    if (!clickedInsideMenu && !clickedBurgerButton) {
      closeMenu();
    }
  });

  // Stäng med Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Hantera fönsterstorlek/rotation
  const DESKTOP_BREAKPOINT = 900; // matchar din CSS @media (min-width: 900px)

  const handleResize = () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      // Desktop: meny ska vara synlig, ingen scroll-låsning
      burger.classList.remove('is-open');
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = '';
      document.documentElement.style.touchAction = '';
    } else {
      // Mobil: startläge stängd (såvida användaren inte öppnat manuellt)
      if (!burger.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
      }
    }
  };

  // Kör vid start och på resize
  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });

  // Säkerställ att menyn inte “blinkar” fel vid initial inladdning
  // (t.ex. om CSS hinner applicera desktop-läge). Kör igen efter nästa frame.
  requestAnimationFrame(handleResize);
})();
