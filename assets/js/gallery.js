document.addEventListener('DOMContentLoaded', () => {

    // Page load animations for CSS Column gallery
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
            y: 20,
            duration: 1.5,
            filter: 'blur(5px)'
        }, '-=1.2')
        .to('.photo-item', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power2.out"
        }, '-=0.8');

});
