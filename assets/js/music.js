document.addEventListener('DOMContentLoaded', () => {

    // Page load animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.cinema-transition', {
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        onComplete: () => {
            document.querySelector('.cinema-transition').style.display = 'none';
        }
    })
        .from('.nav-corner', {
            opacity: 0,
            y: -10,
            duration: 1.5,
            stagger: 0.2
        }, '-=1')
        .from('.section-header', {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(5px)',
            duration: 1.5
        }, '-=1.2')
        .from('.gallery-filters', {
            opacity: 0,
            y: 10,
            duration: 1
        }, '-=1')
        .from('.video-item', {
            opacity: 0,
            y: 30,
            scale: 0.98,
            stagger: 0.1,
            duration: 1.2,
            clearProps: 'all'
        }, '-=0.8');

    // Video Play on hover behavior
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const video = item.querySelector('.hover-video');
        if (video) {
            item.addEventListener('mouseenter', () => video.play().catch(() => { }));
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // matching mdproy
            });
        }

        // Navigation Link Redirect
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    // Filtering Logic mapped from original mdproy
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allItems = document.querySelectorAll('.video-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            allItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-album') === filterValue) {
                    item.classList.remove('hidden-item');
                    // Small pop-in animation wrapper
                    gsap.fromTo(item,
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' }
                    );
                } else {
                    item.classList.add('hidden-item');
                }
            });
        });
    });

});
