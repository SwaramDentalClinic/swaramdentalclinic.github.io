/**
 * SWARAM DENTAL CLINIC — Navigation & UI JS
 * Handles: sticky header, mobile nav, active links,
 *          back-to-top, review modal.
 * NOTE: accordion, carousel, counters, scroll-reveal
 *       are all handled by main.js — do NOT duplicate here.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ——— Sticky header ——— */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ——— Mobile nav ——— */
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const overlay     = mobileNav && mobileNav.querySelector('.mobile-nav__overlay');
  const closeBtn    = mobileNav && mobileNav.querySelector('.mobile-nav__close');

  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    if (hamburger) { hamburger.classList.add('is-active'); hamburger.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    if (hamburger) { hamburger.classList.remove('is-active'); hamburger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    mobileNav && mobileNav.classList.contains('is-open') ? closeNav() : openNav();
  });
  if (overlay) overlay.addEventListener('click', closeNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
      closeReviewModal();
    }
  });

  /* ——— Mobile submenu accordion ——— */
  document.querySelectorAll('.mobile-nav__link[data-sub-toggle]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var sub = link.nextElementSibling;
      if (!sub) return;
      var isOpen = sub.classList.contains('is-open');
      document.querySelectorAll('.mobile-nav__sub.is-open').forEach(function (s) {
        s.classList.remove('is-open');
        if (s.previousElementSibling) s.previousElementSibling.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        sub.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ——— Active nav link ——— */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
    if (href && href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ——— Back to top ——— */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ——— Review form + thank-you modal ——— */
  var reviewForm    = document.getElementById('reviewForm');
  var reviewModal   = document.getElementById('reviewModal');
  var modalClose    = document.getElementById('reviewModalClose');
  var modalOverlay  = document.getElementById('reviewModalOverlay');

  function openReviewModal() {
    if (!reviewModal) return;
    reviewModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeReviewModal() {
    if (!reviewModal) return;
    reviewModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      reviewForm.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) { valid = false; }
      });
      if (!valid) return;
      reviewForm.reset();
      openReviewModal();
    });
  }

  if (modalClose)   modalClose.addEventListener('click', closeReviewModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeReviewModal);

});
