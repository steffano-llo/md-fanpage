document.addEventListener('DOMContentLoaded', () => {
    /* --- Streaming Icons Fade-In Animation --- */
    const streamIcons = document.querySelectorAll('.stream-icon');
    if (streamIcons.length > 0) {
        // Set initial state for icons
        gsap.set(streamIcons, { opacity: 0, y: 20, scale: 0.9 });

        gsap.to(streamIcons, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.6, // wait slightly for the video iframe to load before popping in
            stagger: 0.15, // cascading pop-in effect
            ease: 'back.out(1.7)' // gives a slight, elegant bounce
        });
    }
});

/* --- Cinematic Video Title Animation --- */
const videoTitle = document.getElementById('video-title-anim');
if (videoTitle) {
    gsap.to(videoTitle, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out'
    });
}

/* --- Custom YouTube Audio Control --- */
let player;

window.onYouTubeIframeAPIReady = function () {
    const iframe = document.getElementById('youtube-player');
    if (iframe) {
        player = new YT.Player('youtube-player', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        function onPlayerReady(event) {
            // Initial setup when player is ready can go here
        }

        function onPlayerStateChange(event) {
            if (event.data === 1) {
                if (window.progressInterval) clearInterval(window.progressInterval);
                window.progressInterval = setInterval(updateProgressBar, 100);

                const playIcon = document.getElementById('play-icon');
                if (playIcon) {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                }
            } else {
                if (window.progressInterval) clearInterval(window.progressInterval);
                const playIcon = document.getElementById('play-icon');
                if (playIcon && event.data === 2) {
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const audioBtn = document.getElementById('custom-audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    const playBtn = document.getElementById('custom-play-btn');
    const playIcon = document.getElementById('play-icon');

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (player && player.getPlayerState) {
                const playerState = player.getPlayerState();
                if (playerState === 1) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        });
    }

    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (player && player.isMuted) {
                if (player.isMuted()) {
                    player.unMute();
                    audioIcon.classList.remove('fa-volume-mute');
                    audioIcon.classList.add('fa-volume-up');
                    audioBtn.style.opacity = '1';

                    const volumeSlider = document.getElementById('volume-slider');
                    if (volumeSlider) {
                        if (volumeSlider.value == 0) {
                            volumeSlider.value = 100;
                            player.setVolume(100);
                        } else {
                            player.setVolume(volumeSlider.value);
                        }
                    }
                } else {
                    player.mute();
                    audioIcon.classList.remove('fa-volume-up');
                    audioIcon.classList.add('fa-volume-mute');
                    audioBtn.style.opacity = '0.7';
                }
            }
        });
    }

    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            if (player && player.setVolume) {
                const volume = parseInt(e.target.value);
                player.setVolume(volume);

                if (volume === 0) {
                    player.mute();
                    audioIcon.classList.remove('fa-volume-up', 'fa-volume-down');
                    audioIcon.classList.add('fa-volume-mute');
                    audioBtn.style.opacity = '0.7';
                } else {
                    if (player.isMuted()) {
                        player.unMute();
                        audioBtn.style.opacity = '1';
                    }
                    audioIcon.classList.remove('fa-volume-mute', 'fa-volume-up', 'fa-volume-down');
                    if (volume < 50) {
                        audioIcon.classList.add('fa-volume-down');
                    } else {
                        audioIcon.classList.add('fa-volume-up');
                    }
                }
            }
        });
    }

    const fullscreenBtn = document.getElementById('custom-fullscreen-btn');
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    const videoContainer = document.querySelector('.iframe-responsive-container');

    if (fullscreenBtn && videoContainer) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenIcon.classList.remove('fa-compress');
                fullscreenIcon.classList.add('fa-expand');
            } else {
                fullscreenIcon.classList.remove('fa-expand');
                fullscreenIcon.classList.add('fa-compress');
            }
        });
    }

    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');

    window.updateProgressBar = () => {
        if (player && player.getDuration) {
            const duration = player.getDuration();
            const currentTime = player.getCurrentTime();
            if (duration > 0) {
                const percent = (currentTime / duration) * 100;
                if (progressBar) progressBar.style.width = percent + '%';
            }
        }
    };

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (player && player.getDuration) {
                const duration = player.getDuration();
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = clickX / rect.width;
                const seekTime = duration * percent;

                player.seekTo(seekTime, true);
                if (progressBar) progressBar.style.width = (percent * 100) + '%';
            }
        });
    }
});
