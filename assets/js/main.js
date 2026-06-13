/* Rotary Club of East Lake Sunrise — site interactions
   Plain vanilla JS, no dependencies, no third-party tracking. */

/* Flag JS as available so CSS only hides .reveal content when JS can reveal it */
document.documentElement.classList.add('js');

(function () {
  'use strict';

  // --- Mobile nav toggle ---
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', header.classList.contains('nav-open') ? 'true' : 'false');
    });
    // Close the drawer when a link is tapped
    header.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); });
    });
  }

  // --- Header shadow on scroll ---
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- FAQ accordion (accessible) ---
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      item.classList.toggle('open');
      q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    });
  });

  // --- Auto-fill current year in the footer ---
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // --- Scroll reveal (IntersectionObserver; reduced-motion safe, no-JS fallback) ---
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
