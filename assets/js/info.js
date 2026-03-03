document.addEventListener('DOMContentLoaded', () => {

    // Deep Cinematic Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Smooth release of the black transition overlay
    tl.to('.cinema-transition', {
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        onComplete: () => {
            document.querySelector('.cinema-transition').style.display = 'none';
        }
    })
        // Corner menus fade in
        .from('.nav-corner', {
            opacity: 0,
            y: -10,
            duration: 1.5,
            stagger: 0.2
        }, '-=1.0');

    /* --- Info Page Animations --- */
    const infoSection = document.getElementById('info-content');
    if (infoSection) {
        // Fade in the whole section (background + overlay)
        gsap.to(infoSection, {
            opacity: 1,
            duration: 1.2,
            delay: 0.5,
            ease: 'power2.inOut'
        });

        // Slide and fade in the text wrapper slightly after
        gsap.to('.info-content-wrapper', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 1.0,
            ease: 'power3.out'
        });

        /* --- Spotlight Effect --- */
        const layerTextContent = document.querySelector('.layer-text');

        window.addEventListener('mousemove', (e) => {
            const rect = infoSection.getBoundingClientRect();
            if (e.clientY <= rect.bottom) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (layerTextContent && !layerTextContent.classList.contains('is-focused')) {
                    layerTextContent.classList.add('is-focused');
                }

                // Use GSAP for butter smooth cursor tracking
                gsap.to(infoSection, {
                    '--cursor-x': `${x}px`,
                    '--cursor-y': `${y}px`,
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        });

        document.addEventListener('mouseleave', () => {
            gsap.to(infoSection, {
                '--cursor-x': `-1000px`,
                '--cursor-y': `-1000px`,
                duration: 0.5
            });
            if (layerTextContent) {
                layerTextContent.classList.remove('is-focused');
            }
        });
    }

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.info-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { opacity: 1, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { opacity: 0.7, duration: 0.3 });
        });
    });

});
