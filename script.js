/* ============================================================
   BASMALA ELTABAKH PORTFOLIO — script.js
   Typed text, scroll animations, particles, filter, form
   ============================================================ */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('show');
  }
  // Update active nav link
  updateActiveNav();
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== TYPED TEXT EFFECT =====
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Machine Learning Engineer',
  'AI Problem Solver',
  'Data Science Enthusiast',
  'Technical Mentor',
  'AI Systems Builder'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeLoop() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIdx === current.length) {
    typingSpeed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typingSpeed = 400; // pause before next word
  }
  setTimeout(typeLoop, typingSpeed);
}
setTimeout(typeLoop, 800);

// ===== PARTICLE SYSTEM =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${8 + Math.random() * 14}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.width = p.style.height = `${1 + Math.random() * 3}px`;
    p.style.opacity = `${0.2 + Math.random() * 0.6}`;
    container.appendChild(p);
  }
}
createParticles();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = `${width}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card, idx) => {
      const categories = card.getAttribute('data-category') || '';
      const show = filter === 'all' || categories.includes(filter);

      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${idx * 0.05}s`;
        // Re-trigger reveal
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50 + idx * 40);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendBtn = document.getElementById('send-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    // Simulate send (replace with real EmailJS / Formspree in production)
    setTimeout(() => {
      sendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PROFILE IMAGE FALLBACK =====
// Already handled with onerror in HTML, but this makes the placeholder always display if no image
window.addEventListener('load', () => {
  const img = document.getElementById('profile-photo');
  const placeholder = document.getElementById('profile-placeholder');
  if (img && (!img.src || img.naturalWidth === 0)) {
    img.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(el, target, decimals = 0, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const from = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = from + (target - from) * eased;
    el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.round(value) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = decimals > 0 ? target.toFixed(decimals) : target + suffix;
  }
  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text === '3.79') animateCounter(el, 3.79, 2);
      else if (text.includes('50')) animateCounter(el, 50, 0, '+');
      else if (text.includes('4')) animateCounter(el, 4, 0, '+');
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });

statNumbers.forEach(el => statsObserver.observe(el));

console.log('%c Basmala Eltabakh Portfolio ', 'background: #8b5cf6; color: white; font-size: 14px; padding: 4px 8px; border-radius: 4px;');
console.log('%c Machine Learning Engineer | AI Problem Solver', 'color: #a78bfa; font-size: 12px;');
