// script.js — robust accent picker + year + auto-active nav
document.addEventListener('DOMContentLoaded', () => {
  // 1) dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) accent picker (with persistence + keyboard support)
  const ACCENT_KEY = 'siteAccent';
  const storedAccent = localStorage.getItem(ACCENT_KEY);

  // apply stored accent if present
  if (storedAccent) {
    document.documentElement.style.setProperty('--accent', storedAccent);
  }

  const swatches = document.querySelectorAll('.accent-picker .swatch');

  const setAccent = (c) => {
    if (!c) return;
    document.documentElement.style.setProperty('--accent', c);
    localStorage.setItem(ACCENT_KEY, c);

    // update active class
    document.querySelectorAll('.accent-picker .swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.accent === c);
    });
  };

  // wire up swatches
  if (swatches && swatches.length) {
    swatches.forEach(s => {
      // ensure data-accent exists
      const accent = s.dataset.accent;
      s.setAttribute('tabindex', '0');          // keyboard focus
      s.setAttribute('role', 'button');
      if (!s.hasAttribute('aria-label')) {
        s.setAttribute('aria-label', `Accent ${accent || ''}`);
      }

      // click
      s.addEventListener('click', () => setAccent(accent));

      // keyboard (Enter / Space)
      s.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          setAccent(accent);
        }
      });
    });

    // if stored accent exists, mark the matching swatch active
    if (storedAccent) {
      document.querySelectorAll('.accent-picker .swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.accent === storedAccent);
      });
    }
  } else {
    // debugging hint in console if no swatches found
    // (you can remove this after confirming it works)
    // console.warn('No accent swatches found. Make sure .accent-picker .swatch elements exist and have data-accent attributes.');
  }

  // 3) auto active navbar link -> add pill class
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    try {
      const linkUrl = new URL(link.href, location.href).href;
      if (linkUrl === location.href) link.classList.add('pill');
    } catch (e) {
      // fallback: compare href strings
      if (link.getAttribute('href') === location.pathname.split('/').pop()) link.classList.add('pill');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const picker = document.querySelector(".accent-picker");
  const toggle = picker.querySelector(".toggle");

  toggle.addEventListener("click", () => {
    picker.classList.toggle("open");
  });
});

