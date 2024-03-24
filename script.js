document.addEventListener('DOMContentLoaded', function() {
    const lofiAudio = document.getElementById('lofiAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progress');
    
    let isPlaying = false;

    function togglePlayPause() {
        if (isPlaying) {
            lofiAudio.pause();
        } else {
            lofiAudio.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
    }

    function updatePlayPauseButton() {
        if (isPlaying) {
            playPauseBtn.classList.add('playing'); // Add 'playing' class when playing
        } else {
            playPauseBtn.classList.remove('playing'); // Remove 'playing' class when paused
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    volumeSlider.addEventListener('input', function() {
        lofiAudio.volume = volumeSlider.value;
    });

    lofiAudio.addEventListener('timeupdate', function() {
        const progress = (lofiAudio.currentTime / lofiAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    progressBar.addEventListener('click', function(e) {
        const seekPosition = (e.offsetX / progressBar.offsetWidth) * lofiAudio.duration;
        lofiAudio.currentTime = seekPosition;
    });
});
