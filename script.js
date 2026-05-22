/* ==========================================================================
   SALVADOR YAKUBU — PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cSYSTEM_STATUS: OPERATIONAL // Engine Active.', 'color:#3b82f6;font-weight:bold;font-family:monospace;');

    /* ------------------------------------------------------------------
       1. MOBILE HAMBURGER NAVIGATION
    ------------------------------------------------------------------ */
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (navToggle && navContainer) {
        navToggle.addEventListener('click', () => {
            const isOpen = navContainer.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
            navContainer.setAttribute('aria-hidden', !isOpen);
        });

        // Close menu when a nav link is clicked
        navContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navContainer.contains(e.target)) {
                navContainer.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ------------------------------------------------------------------
       2. STICKY NAV SHADOW ON SCROLL
    ------------------------------------------------------------------ */
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        const scrollHandler = () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    /* ------------------------------------------------------------------
       3. BACK TO TOP BUTTON
    ------------------------------------------------------------------ */
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ------------------------------------------------------------------
       4. SCROLL REVEAL
    ------------------------------------------------------------------ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ------------------------------------------------------------------
       5. WHATSAPP CONTACT FORM
    ------------------------------------------------------------------ */
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const name    = document.getElementById('name')?.value.trim();
            const email   = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields before sending.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const originalText = whatsappBtn.textContent;
            whatsappBtn.textContent = 'TRANSMITTING SIGNAL...';
            whatsappBtn.style.opacity = '0.65';
            whatsappBtn.style.pointerEvents = 'none';

            const phoneNumber = '2348157303901';
            const formattedMsg = encodeURIComponent(
                `*NEW PORTFOLIO INQUIRY*\n\n` +
                `*From:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Service:* ${subject}\n\n` +
                `*Message:* ${message}`
            );

            setTimeout(() => {
                window.open(`https://wa.me/${phoneNumber}?text=${formattedMsg}`, '_blank', 'noopener,noreferrer');
                whatsappBtn.textContent = originalText;
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.pointerEvents = 'auto';
            }, 1200);
        });
    }

    /* ------------------------------------------------------------------
       6. CONTACT FORM — INPUT HOVER ANIMATIONS
    ------------------------------------------------------------------ */
    document.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('focus', () => {
            el.closest('.input-group')?.querySelector('label')
              ?.style.setProperty('color', '#3b82f6');
        });
        el.addEventListener('blur', () => {
            el.closest('.input-group')?.querySelector('label')
              ?.style.setProperty('color', '#64748b');
        });
    });

    /* ------------------------------------------------------------------
       7. ACTIVE NAV LINK (auto-detect based on URL)
    ------------------------------------------------------------------ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});