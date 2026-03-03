document.addEventListener('DOMContentLoaded', () => {

    // Deep Cinematic Entrance
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Smooth release of the black transition overlay
    tl.to('.cinema-transition', {
        opacity: 0,
        duration: 2,
        delay: 0.5,
        onComplete: () => {
            document.querySelector('.cinema-transition').style.display = 'none';
        }
    })
        // Background video slowly breathes in (scales down slightly)
        .fromTo('#mainVideo',
            { scale: 1.2, filter: 'blur(10px)' },
            { scale: 1.05, filter: 'blur(0px)', duration: 3 },
            '-=1.5'
        )
        // Corner menus fade in
        .from('.nav-corner', {
            opacity: 0,
            y: -10,
            duration: 1.5,
            stagger: 0.2
        }, '-=2.5')
        // Massive Typography Reveal - Main Title First
        .from('#mainTitle', {
            scale: 1.1,
            opacity: 0,
            filter: 'blur(5px)',
            duration: 2,
            ease: 'power3.out'
        }, '-=2')
        .from('#albumLabel', {
            y: 20,
            opacity: 0,
            duration: 1.5
        }, '-=1.8')
        // Explore hint
        .from('.explore-hint', {
            opacity: 0,
            y: 10,
            duration: 1.5
        }, '-=1');

    // Subtle breathing animation on main title (continuous)
    gsap.to('#mainTitle', {
        scale: 1.02,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });


    // --- Video Navigation Logic ---
    const videos = [
        { title: "BAD ENOUGH", album: '\"Locket\" (Album)', src: "assets/videos/preview/md-badenough-preview.mp4", page: 'md-badenough.html' },
        { title: "SPINNIN", album: '\"Silence Between Songs\" (Album)', src: "assets/videos/preview/md-spinnin-preview.mp4", page: 'md-spinnin.html' },
        { title: "SELFISH", album: '\"Life Support\" (Album)', src: "assets/videos/preview/md-selfish-preview.mp4", page: 'md-selfish.html' },
        { title: "RECKLESS", album: '\"Silence Between Songs\" (Album)', src: "assets/videos/preview/md-reckless-preview.mp4", page: 'md-reckless.html' },
        { title: "MAKE YOU MINE", album: '\"Locket\" (Album)', src: "assets/videos/preview/md-makeyoumine-preview.mp4", page: 'md-makeyoumine.html' },
        { title: "GOOD IN GOODBYE", album: '\"Life Support\" (Album)', src: "assets/videos/preview/md-goodingoodbye-preview.mp4", page: 'md-goodingoodbye.html' }
    ];

    let currentIndex = 0;
    const mainVideo = document.getElementById('mainVideo');
    const mainTitle = document.getElementById('mainTitle');
    const albumLabel = document.getElementById('albumLabel');
    let isAnimating = false;

    function switchVideo(direction) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % videos.length;
        } else {
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        }

        const data = videos[currentIndex];

        // Animate Out Text
        gsap.to([mainTitle, albumLabel], {
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            filter: 'blur(10px)',
            duration: 0.8,
            ease: 'power2.in',
            onComplete: () => {
                // Swap text
                mainTitle.textContent = data.title;
                albumLabel.textContent = data.album;

                // Animate In Text
                gsap.fromTo([albumLabel, mainTitle],
                    { y: direction === 'next' ? 20 : -20, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.1, ease: 'expo.out' }
                );
            }
        });

        // Animate Video Crossfade (pseudo style by fading to black via opacity toggle)
        gsap.to(mainVideo, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                mainVideo.src = data.src;
                // Wait for video snippet to have enough data
                mainVideo.oncanplay = () => {
                    gsap.to(mainVideo, {
                        opacity: 0.8, // Return to base opacity
                        filter: 'blur(0px) brightness(1)', // reset filter in case mouse moved during transition
                        scale: 1,
                        duration: 1.5
                    });
                    isAnimating = false;
                    mainVideo.oncanplay = null; // clean up
                };
            }
        });
    }

    // Navigation elements
    const nextZone = document.getElementById('nextZone');
    const prevZone = document.getElementById('prevZone');

    nextZone.addEventListener('click', () => switchVideo('next'));
    prevZone.addEventListener('click', () => switchVideo('prev'));

    // --- Cinematic Depth Hover Effects ---
    const applyDepthEffect = () => {
        if (!isAnimating) {
            gsap.to(mainVideo, { filter: 'blur(6px) brightness(0.6)', scale: 1.02, duration: 0.6, ease: 'power2.out' });
        }
    };

    const removeDepthEffect = () => {
        if (!isAnimating) {
            gsap.to(mainVideo, { filter: 'blur(0px) brightness(1)', scale: 1, duration: 0.6, ease: 'power2.out' });
        }
    };

    nextZone.addEventListener('mouseenter', applyDepthEffect);
    nextZone.addEventListener('mouseleave', removeDepthEffect);
    prevZone.addEventListener('mouseenter', applyDepthEffect);
    prevZone.addEventListener('mouseleave', removeDepthEffect);

    // --- Video Click Through Logic (matches mdproy) ---
    const heroContainer = document.getElementById('heroContainer');
    if (heroContainer) {
        heroContainer.addEventListener('click', (e) => {
            // Do not navigate if clicking the overlay navigation zones or standard links
            if (e.target.closest('.zone') || e.target.closest('a')) return;

            const currentData = videos[currentIndex];
            if (currentData && currentData.page) {
                window.location.href = currentData.page;
            }
        });
    }

});
