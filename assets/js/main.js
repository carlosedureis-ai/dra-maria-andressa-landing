/**
 * DRA. MARIA ANDRESSA ARAÚJO — LANDING PAGE ENGINE
 * Apple Design Micro-Interactions, Smooth Accordions, Scroll Reveals, & WhatsApp Integrations
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initMobileMenu();
  initFaqAccordion();
  initFloatingWhatsApp();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. SCROLL REVEALS VIA INTERSECTION OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2. FLUID ISLAND NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!menuBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = menuBtn.classList.toggle('active');
    drawer.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    menuBtn.setAttribute('aria-expanded', isOpen);
  }

  function closeMenu() {
    menuBtn.classList.remove('active');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACCORDION FAQ INTERATIVO COM FLUID HEIGHT
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean single-view accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherContent) otherContent.style.maxHeight = null;
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight + 32}px`;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. FLOATING WHATSAPP ACTION ISLAND
   -------------------------------------------------------------------------- */
function initFloatingWhatsApp() {
  const floatingBtn = document.querySelector('.floating-whatsapp');
  const heroSection = document.querySelector('.hero-section');

  if (!floatingBtn) return;

  function checkScroll() {
    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 300;
    if (heroBottom < 100) {
      floatingBtn.classList.add('visible');
    } else {
      floatingBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/* --------------------------------------------------------------------------
   5. SMOOTH SCROLL PARA ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
