document.addEventListener('DOMContentLoaded', () => {
    console.log("SYSTEM_STATUS: OPERATIONAL // Engine Active.");

    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // These IDs must match your HTML exactly
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // If this triggers, it means one of the IDs above returned 'null' or empty
            if (!name || !email || !message) {
                alert("CRITICAL ERROR: Incomplete form. Please fill all fields.");
                return;
            }

            const originalText = whatsappBtn.innerText;
            whatsappBtn.innerText = "TRANSMITTING SIGNAL...";
            whatsappBtn.style.opacity = "0.6";
            whatsappBtn.style.pointerEvents = "none";

            const phoneNumber = "2348157303901"; 
            const formattedMsg = encodeURIComponent(
                `*NEW PORTFOLIO INQUIRY*\n\n` +
                `*From:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Service:* ${subject}\n\n` +
                `*Message:* ${message}`
            );

            const whatsappURL = `https://wa.me/${phoneNumber}?text=${formattedMsg}`;

            setTimeout(() => {
                window.open(whatsappURL, '_blank').focus();
                whatsappBtn.innerText = originalText;
                whatsappBtn.style.opacity = "1";
                whatsappBtn.style.pointerEvents = "auto";
            }, 1200);
        });
    }

    // Scroll Reveal Logic
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.contact-card, .info-item-link').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        revealObserver.observe(el);
    });
});