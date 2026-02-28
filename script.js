document.documentElement.classList.add('js');

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const animatedBlocks = document.querySelectorAll('.fade-up');

  animatedBlocks.forEach((el, index) => {
    el.style.setProperty('--delay', `${Math.min(index * 0.07, 0.35)}s`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    animatedBlocks.forEach((el) => observer.observe(el));
  } else {
    animatedBlocks.forEach((el) => el.classList.add('is-visible'));
  }
}

function initPageTransition() {
  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const isSameWindow = !link.target || link.target === '_self';
      const isInternalPage =
        href && href.endsWith('.html') && !href.startsWith('http') && !link.hasAttribute('download');

      if (!isInternalPage || !isSameWindow || href === currentPage) return;

      event.preventDefault();
      document.body.classList.add('is-leaving');
      window.setTimeout(() => {
        window.location.href = href;
      }, 260);
    });
  });
}

function updateCarousel(carousel, nextIndex) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const total = slides.length;

  if (!track || total === 0) return;

  const index = (nextIndex + total) % total;
  const offset = index * track.clientWidth;
  track.style.transform = `translateX(-${offset}px)`;
  carousel.dataset.index = String(index);

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    if (!track || slides.length === 0) return;

    if (!carousel.dataset.index) carousel.dataset.index = '0';

    carousel.querySelectorAll('[data-dir]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = Number(carousel.dataset.index || 0);
        const delta = btn.dataset.dir === 'next' ? 1 : -1;
        updateCarousel(carousel, current + delta);
      });
    });

    const dotsWrap = carousel.querySelector('.carousel-dots');
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Jump to slide ${i + 1}`);
        dot.addEventListener('click', () => updateCarousel(carousel, i));
        dotsWrap.appendChild(dot);
      });
    }

    let autoTimer = null;
    const startAuto = () => {
      if (prefersReducedMotion) return;
      autoTimer = window.setInterval(() => {
        const current = Number(carousel.dataset.index || 0);
        updateCarousel(carousel, current + 1);
      }, 4200);
    };

    const stopAuto = () => {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => {
      updateCarousel(carousel, Number(carousel.dataset.index || 0));
    });

    updateCarousel(carousel, Number(carousel.dataset.index || 0));
    startAuto();
  });
}

function initStackSwipers() {
  document.querySelectorAll('[data-stack-swipe]').forEach((wrap) => {
    const track = wrap.querySelector('.stack-track');
    if (!track) return;

    const step = () => Math.max(Math.floor(track.clientWidth * 0.72), 220);

    wrap.querySelectorAll('[data-stack-dir]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.stackDir === 'next' ? 1 : -1;
        track.scrollBy({ left: dir * step(), behavior: 'smooth' });
      });
    });
  });
}

if (!prefersReducedMotion) {
  initReveal();
  initPageTransition();
  initCarousels();
  initStackSwipers();
} else {
  document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('is-visible'));
  initCarousels();
  initStackSwipers();
}
