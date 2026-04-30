/* =============================================
   THE MOST STUNNING PORTFOLIO — JAVASCRIPT
   ============================================= */
(() => {
    'use strict';

    // ==========================================
    // CREATIVE PRELOADER with Particles
    // ==========================================
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    const barFill = document.getElementById('preloaderBarFill');

    // Loader particle canvas
    const loaderCanvas = document.getElementById('loaderCanvas');
    const lctx = loaderCanvas.getContext('2d');
    loaderCanvas.width = window.innerWidth;
    loaderCanvas.height = window.innerHeight;
    const loaderParticles = [];
    for (let i = 0; i < 60; i++) {
        loaderParticles.push({
            x: Math.random() * loaderCanvas.width,
            y: Math.random() * loaderCanvas.height,
            r: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            color: ['rgba(139,92,246,', 'rgba(34,211,238,', 'rgba(244,114,182,'][~~(Math.random() * 3)]
        });
    }
    let loaderRunning = true;
    function drawLoaderParticles() {
        if (!loaderRunning) return;
        lctx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
        loaderParticles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > loaderCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > loaderCanvas.height) p.vy *= -1;
            lctx.beginPath();
            lctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            lctx.fillStyle = p.color + '0.5)';
            lctx.fill();
        });
        // Connect nearby
        for (let i = 0; i < loaderParticles.length; i++) {
            for (let j = i + 1; j < loaderParticles.length; j++) {
                const dx = loaderParticles[i].x - loaderParticles[j].x;
                const dy = loaderParticles[i].y - loaderParticles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    lctx.beginPath();
                    lctx.moveTo(loaderParticles[i].x, loaderParticles[i].y);
                    lctx.lineTo(loaderParticles[j].x, loaderParticles[j].y);
                    lctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - d / 120)})`;
                    lctx.lineWidth = 0.5;
                    lctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawLoaderParticles);
    }
    drawLoaderParticles();

    let count = 0;
    const countUp = setInterval(() => {
        count += Math.floor(Math.random() * 6) + 2;
        if (count > 100) count = 100;
        counter.textContent = count + ' %';
        barFill.style.width = count + '%';
        if (count >= 100) {
            clearInterval(countUp);
            setTimeout(() => {
                preloader.classList.add('done');
                loaderRunning = false;
            }, 500);
        }
    }, 50);

    // ==========================================
    // INTERACTIVE CONSTELLATION CANVAS
    // ==========================================
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let W, H, mouseCanvas = { x: -9999, y: -9999 };
    const particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST = 150;
    const MOUSE_DIST = 200;

    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
            // Mouse attraction
            const dx = mouseCanvas.x - this.x;
            const dy = mouseCanvas.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                this.x += dx * 0.008;
                this.y += dy * 0.008;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animateCanvas() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / CONNECT_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            // Mouse connections
            const dx = particles[i].x - mouseCanvas.x;
            const dy = particles[i].y - mouseCanvas.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseCanvas.x, mouseCanvas.y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - dist / MOUSE_DIST)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    document.addEventListener('mousemove', e => {
        mouseCanvas.x = e.clientX;
        mouseCanvas.y = e.clientY;
    });

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let cx = 0, cy = 0, rx = 0, ry = 0;

    if (window.matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; dot.style.left = cx + 'px'; dot.style.top = cy + 'px'; });
        (function movRing() {
            rx += (cx - rx) * 0.1; ry += (cy - ry) * 0.1;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(movRing);
        })();
        document.querySelectorAll('[data-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => { dot.classList.add('active'); ring.classList.add('active'); });
            el.addEventListener('mouseleave', () => { dot.classList.remove('active'); ring.classList.remove('active'); });
        });
    }

    // ==========================================
    // SCROLL REVEAL
    // ==========================================
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

    // ==========================================
    // SKILL BARS
    // ==========================================
    const skillObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.width + '%'; skillObs.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-fill').forEach(b => skillObs.observe(b));

    // ==========================================
    // STAT COUNTERS
    // ==========================================
    const cntObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, end = +el.dataset.count, dur = 1800, t0 = performance.now();
            (function tick(t) {
                const p = Math.min((t - t0) / dur, 1);
                el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
                if (p < 1) requestAnimationFrame(tick);
            })(t0);
            cntObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num[data-count]').forEach(n => cntObs.observe(n));

    // ==========================================
    // NAVBAR
    // ==========================================
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 60);

        // Active section
        let cur = 'hero';
        allSections.forEach(s => { if (y >= s.offsetTop - 200) cur = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));

        // Scroll progress
        const prog = y / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        document.getElementById('scrollProgress').style.width = prog + '%';

        // Back to top
        document.getElementById('toTop').classList.toggle('visible', y > 500);
    }, { passive: true });

    // Mobile nav
    const burger = document.getElementById('navBurger');
    const navLinksEl = document.getElementById('navLinks');
    burger.addEventListener('click', () => { burger.classList.toggle('active'); navLinksEl.classList.toggle('open'); });
    navLinks.forEach(l => l.addEventListener('click', () => { burger.classList.remove('active'); navLinksEl.classList.remove('open'); }));

    // Back to top
    document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); });
    });

    // ==========================================
    // TYPED TEXT
    // ==========================================
    const typedEl = document.getElementById('heroTyped');
    const phrases = ['full-stack website', 'stunning interfaces', 'smooth frontend', 'scalable backend', 'people ideas into reality ', 'jaw-dropping products'];
    let pi = 0, ci2 = 0, del = false;
    (function type() {
        const phrase = phrases[pi];
        typedEl.textContent = phrase.substring(0, del ? --ci2 : ++ci2);
        let spd = del ? 30 : 65;
        if (!del && ci2 === phrase.length) { spd = 2500; del = true; }
        else if (del && ci2 === 0) { del = false; pi = (pi + 1) % phrases.length; spd = 400; }
        setTimeout(type, spd);
    })();

    // ==========================================
    // PARALLAX HERO
    // ==========================================
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
            heroContent.style.transform = `translateY(${y * 0.35}px)`;
            heroContent.style.opacity = 1 - y / window.innerHeight * 0.8;
        }
    }, { passive: true });

    // ==========================================
    // 3D TILT ON ABOUT CARD
    // ==========================================
    const card3d = document.querySelector('.about-card-3d');
    if (card3d && window.matchMedia('(pointer:fine)').matches) {
        card3d.addEventListener('mousemove', e => {
            const r = card3d.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card3d.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
            const shine = card3d.querySelector('.about-card-shine');
            if (shine) shine.style.background = `linear-gradient(${105 + x * 60}deg, transparent 30%, rgba(255,255,255,0.04) 45%, transparent 55%)`;
        });
        card3d.addEventListener('mouseleave', () => { card3d.style.transform = ''; });
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');

    if (contactForm) {
        // Glow effect on form wrapper when interacting
        const formWrapper = document.querySelector('.contact-form-wrapper');
        contactForm.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => {
                if (formWrapper) formWrapper.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            });
            input.addEventListener('blur', () => {
                if (formWrapper) formWrapper.style.borderColor = '';
            });
        });

        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // Validate
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !message) return;

            // Loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Open mailto link
            const subject = document.getElementById('formSubject').value.trim() || 'New Contact Submission';
            const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
            window.location.href = `mailto:shivamsingh25104@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');

                // Reset after showing success
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 800);
        });
    }

    // ==========================================
    // FORM INPUT RIPPLE ANIMATION
    // ==========================================
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateX(4px)';
            setTimeout(() => { this.parentElement.style.transform = ''; }, 200);
        });
    });

    // ==========================================
    // WORK ITEMS — 3D TILT ON HOVER
    // ==========================================
    if (window.matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('mousemove', e => {
                const r = item.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                item.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }

})();

