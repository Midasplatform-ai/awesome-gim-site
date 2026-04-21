document.addEventListener('DOMContentLoaded', function () {

  // ─── Navbar hide/show on scroll ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScrollY = window.scrollY;
        if (navbar) {
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            navbar.classList.add('hidden-nav');
          } else {
            navbar.classList.remove('hidden-nav');
          }
        }
        lastScrollY = currentScrollY;
        ticking = false;

        // Back to top button
        const btt = document.getElementById('back-to-top');
        if (btt) {
          if (currentScrollY > 300) {
            btt.classList.add('visible');
          } else {
            btt.classList.remove('visible');
          }
        }
      });
      ticking = true;
    }
  });

  // ─── Mobile hamburger menu ────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate lines
      hamburger.classList.toggle('menu-open', isOpen);
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  // ─── Active nav link ──────────────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── FAQ Accordion ────────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.classList.remove('active');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.classList.add('active');
      }
    });
  });

  // ─── Animated number counters ─────────────────────────────────────────────
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1800;
          const start = performance.now();
          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target + suffix;
            }
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  // ─── Scroll fade-in animations ────────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  }

  // ─── Back to top ──────────────────────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Contact form success message ─────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ─── Gallery filter ───────────────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('active-filter');
          b.style.background = '';
          b.style.color = '';
          b.style.borderColor = '';
        });
        btn.classList.add('active-filter');
        btn.style.background = 'linear-gradient(135deg,#0EA5E9,#0369a1)';
        btn.style.color = 'white';
        btn.style.borderColor = '#0EA5E9';

        const cat = btn.getAttribute('data-filter');
        galleryCards.forEach(function (card) {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
            setTimeout(function () { card.style.opacity = '1'; }, 10);
          } else {
            card.style.opacity = '0';
            setTimeout(function () { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ─── Hamburger icon animation ─────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .hamburger-lines span {
      display: block; height: 2px; background: #f5f5f5;
      border-radius: 2px; transition: transform 0.3s, opacity 0.3s, background 0.3s;
    }
    .menu-open .hamburger-lines span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
    .menu-open .hamburger-lines span:nth-child(2) { opacity: 0; }
    .menu-open .hamburger-lines span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
  `;
  document.head.appendChild(style);

});