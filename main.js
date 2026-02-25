/**
 * Niraj Singh - Portfolio
 * Main JavaScript: Navbar, theme toggle, form validation, scroll effects
 */

(function () {
  'use strict';

  // ---------- DOM Elements ----------
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.navbar__nav');
  const navLinks = document.querySelectorAll('.navbar__link');
  const themeToggle = document.getElementById('themeToggle');
  const contactForm = document.getElementById('contactForm');
  const sections = document.querySelectorAll('.section');
  const skillCards = document.querySelectorAll('.skill-card');
  const yearSpan = document.getElementById('year');

  // ---------- Theme (Dark / Light) ----------
  const THEME_KEY = 'portfolio-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
    } else {
      setTheme(prefersDark.matches ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  initTheme();

  // ---------- Navbar: Hamburger & Mobile Menu ----------
  function openMenu() {
    nav?.classList.add('is-open');
    hamburger?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav?.classList.remove('is-open');
    hamburger?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = nav?.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // ---------- Smooth scroll (anchor links) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Active link on scroll ----------
  function setActiveLink() {
    const scrollY = window.scrollY;
    const offset = 120;

    sections.forEach(function (section) {
      const id = section.getAttribute('id');
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });

    if (scrollY < 100) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // ---------- Scroll: fade-in sections ----------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ---------- Skill bars: animate on scroll ----------
  skillCards.forEach(function (card) {
    const fill = card.querySelector('.skill-card__fill');
    if (fill) {
      fill.style.setProperty('--level', '0%');
    }
  });

  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-card__fill');
        const level = fill?.getAttribute('data-level');
        if (fill && level) {
          fill.style.setProperty('--level', level + '%');
        }
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(function (card) {
    skillObserver.observe(card);
  });

  // ---------- Contact form validation ----------
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.closest('.contact-form__group')?.classList.add('invalid');
  }

  function clearError(element) {
    if (!element) return;
    element.textContent = '';
    element.closest('.contact-form__group')?.classList.remove('invalid');
  }

  function validateName(value) {
    value = (value || '').trim();
    if (value.length < 2) return 'Name must be at least 2 characters.';
    return '';
  }

  function validateEmail(value) {
    value = (value || '').trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required.';
    if (!re.test(value)) return 'Please enter a valid email address.';
    return '';
  }

  function validateMessage(value) {
    value = (value || '').trim();
    if (value.length < 10) return 'Message must be at least 10 characters.';
    return '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput?.value || '';
      const email = emailInput?.value || '';
      const message = messageInput?.value || '';

      clearError(nameError);
      clearError(emailError);
      clearError(messageError);

      let valid = true;

      const nameMsg = validateName(name);
      if (nameMsg) {
        showError(nameError, nameMsg);
        valid = false;
      }

      const emailMsg = validateEmail(email);
      if (emailMsg) {
        showError(emailError, emailMsg);
        valid = false;
      }

      const messageMsg = validateMessage(message);
      if (messageMsg) {
        showError(messageError, messageMsg);
        valid = false;
      }

      if (valid) {
        contactForm.reset();
        clearError(nameError);
        clearError(emailError);
        clearError(messageError);
        alert('Thank you! Your message has been sent. I will get back to you soon.');
      }
    });

    [nameInput, emailInput, messageInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', function () {
        clearError(input.nextElementSibling);
        input.closest('.contact-form__group')?.classList.remove('invalid');
      });
      input.addEventListener('blur', function () {
        const id = input.id;
        let msg = '';
        if (id === 'name') msg = validateName(input.value);
        else if (id === 'email') msg = validateEmail(input.value);
        else if (id === 'message') msg = validateMessage(input.value);
        const errEl = document.getElementById(id + 'Error');
        if (msg) showError(errEl, msg);
        else clearError(errEl);
      });
    });
  }

  // ---------- Footer year ----------
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
