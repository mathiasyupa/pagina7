/* ============================================================
   CODENT · Interacciones premium
   Header blur al scroll · menú móvil · reveal on scroll ·
   scrollspy de navegación · placeholder de video.
   ============================================================ */
(() => {
    'use strict';

    const header = document.getElementById('header');
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    /* ---- Header con efecto blur al hacer scroll ---- */
    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 24);
                ticking = false;
            });
            ticking = true;
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Menú móvil ---- */
    const closeMenu = () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    };
    burger?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    /* ---- Reveal on scroll ---- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('in'), (i % 4) * 90);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in'));
    }

    /* ---- Scrollspy: resalta la sección activa ---- */
    const sections = navLinks
        .map(l => document.querySelector(l.getAttribute('href')))
        .filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = '#' + entry.target.id;
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
                }
            });
        }, { threshold: 0.5, rootMargin: '-30% 0px -50% 0px' });
        sections.forEach(s => spy.observe(s));
    }

    /* ---- Placeholder de video (demo) ---- */
    const playBtn = document.getElementById('playBtn');
    playBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const card = playBtn.closest('.video-media');
        if (card) {
            card.style.transition = 'opacity .3s ease';
            card.style.opacity = '.6';
            setTimeout(() => { card.style.opacity = ''; }, 300);
        }
        // En la versión final: aquí se incrusta el <video> o embed institucional.
    });

    /* ---- Año dinámico (si existe) ---- */
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
