document.addEventListener("DOMContentLoaded", function () {
  const lofiAudio = document.getElementById("lofiAudio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const progressBar = document.getElementById("progress");
  const rewindBtn = document.getElementById("rewindBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const currentTimeDisplay = document.getElementById("currentTime");
  const totalDurationDisplay = document.getElementById("totalDuration");

  let isPlaying = false;
  let currentSongIndex = 0;
  let playlist = [
    "public/1.mp3",
    "public/2.mp3",
    "public/3.mp3",
    "public/4.mp3",
    "public/5.mp3",
    "public/6.mp3",
    "public/7.mp3",
    "public/8.mp3",
    "public/9.mp3",
    "public/10.mp3",
    "public/11.mp3",
    "public/12.mp3",
    "public/13.mp3",
    "public/14.mp3",
    "public/15.mp3",
    "public/16.mp3",
    "public/17.mp3",
    "public/18.mp3",
    "public/19.mp3",
    "public/20.mp3",
    "public/21.mp3",
    "public/22.mp3",
    "public/23.mp3",
    "public/24.mp3",
    "public/25.mp3",
    "public/26.mp3",
    "public/234.mp3",
  ];

  function playSong(songIndex) {
    lofiAudio.src = playlist[songIndex];
    lofiAudio.play();
    isPlaying = true;
    updatePlayPauseButton();
  }

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
      playPauseBtn.classList.add("playing");
    } else {
      playPauseBtn.classList.remove("playing");
    }
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
  }

  function playPrevSong() {
    currentSongIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
  }

  function shufflePlaylist() {
    playlist = shuffleArray(playlist);
    playSong(0); // Start playing the shuffled playlist from the beginning
  }

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Function to format time (e.g., from seconds to "mm:ss")
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Update track duration display
  function updateTrackDurationDisplay() {
    currentTimeDisplay.textContent = formatTime(lofiAudio.currentTime);
    totalDurationDisplay.textContent = formatTime(lofiAudio.duration);
  }

  // Update track duration display when the audio is loaded
  lofiAudio.addEventListener("loadedmetadata", updateTrackDurationDisplay);

  // Update track duration display while playing
  lofiAudio.addEventListener("timeupdate", updateTrackDurationDisplay);

  function rewindSong() {
    lofiAudio.currentTime = 0; // Set current time to start of the song
  }

  // Implement sharing functionality
  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", shareContent);
  });

  function shareContent(event) {
    const platform = event.target.dataset.platform;
    const content = {
      title: "Check out this lo-fi track!",
      url: "https://example.com/lofi-track", // Replace with actual track URL
      description: "Enjoy some relaxing lo-fi music!",
    };

    switch (platform) {
      case "facebook":
        shareOnFacebook(content);
        break;
      case "twitter":
        shareOnTwitter(content);
        break;
      case "instagram":
        shareOnInstagram(content);
        break;
      // Add cases for other platforms
      default:
        console.error("Unsupported platform");
    }
  }

  function shareOnFacebook(content) {
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      content.url
    )}`;
    openShareDialog(url);
  }

  function shareOnTwitter(content) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      content.title
    )}&url=${encodeURIComponent(content.url)}`;
    openShareDialog(url);
  }

  function shareOnInstagram(content) {
    // Instagram sharing requires a different approach due to API limitations
    // You can guide users to manually share the content on Instagram
    alert(
      "To share on Instagram, please open the app and manually create a post."
    );
  }

  function openShareDialog(url) {
    window.open(url, "_blank", "width=600,height=400");
  }

  playPauseBtn.addEventListener("click", togglePlayPause);
  nextBtn.addEventListener("click", playNextSong);
  prevBtn.addEventListener("click", playPrevSong);
  rewindBtn.addEventListener("click", rewindSong);
  shuffleBtn.addEventListener("click", shufflePlaylist);

  volumeSlider.addEventListener("input", function () {
    lofiAudio.volume = volumeSlider.value;
  });

  lofiAudio.addEventListener("timeupdate", function () {
    const progress = (lofiAudio.currentTime / lofiAudio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  progressBar.addEventListener("click", function (e) {
    const seekPosition =
      (e.offsetX / progressBar.offsetWidth) * lofiAudio.duration;
    lofiAudio.currentTime = seekPosition;
  });

  lofiAudio.addEventListener("ended", function () {
    playNextSong();
  });

  // Start playing the first song
  playSong(currentSongIndex);
});
