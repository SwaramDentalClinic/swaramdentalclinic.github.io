/**
 * SWARAM DENTAL CLINIC — Main JavaScript
 * Phase A: Core interactions and animations
 */

'use strict';

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach((el) => observer.observe(el));
}


/* ============================================================
   COUNTER ANIMATION — for stat numbers
   ============================================================ */

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = current.toLocaleString('en-IN') + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('en-IN') + suffix;
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}


/* ============================================================
   MOBILE NAV — hamburger toggle
   ============================================================ */

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav    = document.querySelector('[data-nav-menu]');
  const body   = document.body;

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }
  });

  // Close on nav link click (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    });
  });
}


/* ============================================================
   STICKY HEADER
   ============================================================ */

function initStickyHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const SCROLL_THRESHOLD = 80;

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* ============================================================
   ACTIVE NAV LINK — highlight current page
   ============================================================ */

function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}


/* ============================================================
   DROPDOWN NAV
   ============================================================ */

function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const menu    = dropdown.querySelector('[data-dropdown-menu]');
    if (!trigger || !menu) return;

    trigger.addEventListener('mouseenter', () => menu.classList.add('is-open'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('is-open'));

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.classList.toggle('is-open');
      }
    });
  });
}


/* ============================================================
   TESTIMONIAL CAROUSEL — simple CSS-driven
   ============================================================ */

function initTestimonialCarousel() {
  const carousel   = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track      = carousel.querySelector('[data-carousel-track]');
  const prevBtn    = carousel.querySelector('[data-carousel-prev]');
  const nextBtn    = carousel.querySelector('[data-carousel-next]');
  const dotsWrap   = carousel.querySelector('[data-carousel-dots]');

  if (!track) return;

  const cards        = Array.from(track.children);
  let current        = 0;
  let autoplayTimer  = null;

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getSlidesPerView());
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, getMaxIndex()));
    const offset = current * (100 / getSlidesPerView());
    track.style.transform = `translateX(-${offset}%)`;
    updateDots();
    updateButtons();
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('[data-dot]').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function updateButtons() {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= getMaxIndex();
  }

  function buildDots() {
    if (!dotsWrap) return;
    const count = getMaxIndex() + 1;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('data-dot', '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goTo(current >= getMaxIndex() ? 0 : current + 1);
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  prevBtn && prevBtn.addEventListener('click', () => { stopAutoplay(); goTo(current - 1); startAutoplay(); });
  nextBtn && nextBtn.addEventListener('click', () => { stopAutoplay(); goTo(current + 1); startAutoplay(); });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAutoplay();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAutoplay();
    }
  });

  window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
  });

  buildDots();
  goTo(0);
  startAutoplay();
}


/* ============================================================
   FAQ ACCORDION
   ============================================================ */

function initAccordion() {
  const items = document.querySelectorAll('[data-accordion-item]');

  items.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const content = item.querySelector('[data-accordion-content]');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach((i) => {
        i.classList.remove('is-open');
        i.querySelector('[data-accordion-trigger]').setAttribute('aria-expanded', 'false');
        const c = i.querySelector('[data-accordion-content]');
        if (c) c.style.maxHeight = null;
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}


/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */

function initBackToTop() {
  const btn = document.querySelector('[data-back-to-top]');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   APPOINTMENT FORM — basic client-side validation
   ============================================================ */

function initAppointmentForm() {
  const forms = document.querySelectorAll('[data-appointment-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      let valid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach((field) => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          group && group.classList.add('has-error');
        } else {
          group && group.classList.remove('has-error');
        }
      });

      if (valid) {
        // Show success state
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.textContent = 'Request Sent!';
          submitBtn.disabled = true;
        }

        // WhatsApp fallback — build message
        const name    = form.querySelector('[name="name"]')?.value || '';
        const phone   = form.querySelector('[name="phone"]')?.value || '';
        const service = form.querySelector('[name="service"]')?.value || '';
        const msg = encodeURIComponent(
          `Hello Swaram Dental Clinic, I would like to book an appointment.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}`
        );

        window.open(`https://wa.me/918484851686?text=${msg}`, '_blank');
      }
    });
  });
}


/* ============================================================
   PHONE NUMBER TRACKING (click)
   ============================================================ */

function initPhoneTracking() {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', () => {
      // gtag event if GA is loaded
      if (typeof gtag === 'function') {
        gtag('event', 'phone_click', {
          event_category: 'engagement',
          event_label: link.href
        });
      }
    });
  });
}


/* ============================================================
   LAZY LOAD IMAGES
   ============================================================ */

function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach((img) => observer.observe(img));
}


/* ============================================================
   INIT ALL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initMobileNav();
  initStickyHeader();
  initActiveNav();
  initDropdowns();
  initTestimonialCarousel();
  initAccordion();
  initBackToTop();
  initAppointmentForm();
  initPhoneTracking();
  initLazyImages();
});
