// ══════════════════════════════════════════
//   PORTFOLIO — ALEJANDRO GUARDADO
//   main.js
// ══════════════════════════════════════════

// ── Cursor personalizado ──────────────────
function initCursor() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor     = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursor.className     = 'cursor';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 4 + 'px';
      cursor.style.top  = mouseY - 4 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX - 16 + 'px';
      cursorRing.style.top  = ringY - 16 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
  }
}

// ── Navbar al hacer scroll ────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Menú móvil ────────────────────────────
function initMobileMenu() {
  const btn  = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  btn?.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

// ── Animaciones al hacer scroll ──────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Nav link activo al hacer scroll ──────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('text-white'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('text-white');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}

// ── Texto de hero con efecto typewriter ──
function initTypewriter() {
  const roles = [
    'Desarrollador Web Junior.',
    'Técnico Informático.',
    'SysAdmin Linux.',
    'Enthusiasta de la Ciberseguridad.',
  ];
  const el = document.querySelector('.hero p');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function type() {
    const current = roles[roleIndex];
    if (deleting) {
      el.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting   = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  setTimeout(type, 1200);
}

// ── Año dinámico en el footer ─────────────
function initYear() {
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = footer.textContent.replace('2025', new Date().getFullYear());
  }
}

// ── Init ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initMobileMenu();
  initReveal();
  initActiveNav();
  initTypewriter();
  initYear();
});