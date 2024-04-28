document.addEventListener("DOMContentLoaded", function () {
  const lofiAudio = document.getElementById("lofiAudio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const progressBar = document.getElementById("progress");
  const rewindBtn = document.getElementById("rewindBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const currentTimeDisplay = document.getElementById("currentTime");
  const totalDurationDisplay = document.getElementById("totalDuration");
  const trackTitleDisplay = document.getElementById("trackTitle");
  const loopBtn = document.getElementById("loopBtn");

  let isPlaying = false;
  let currentSongIndex = 0;
  let isLooping = false;
  let playlist = [
    "public/01 No Spirit - That Time Of The Year (Kupla Master) (online-audio-converter.com).mp3",
    "public/02 Dimension 32 x Quantum Break - Something_s Magical (Kupla Master).mp3",
    "public/03 xander. X Lucid Keys - Snowballs (Kupla Master).mp3",
    "public/04 Thaehan - Waiting By The Fireplace (Kupla Master).mp3",
    "public/05 xander. X Lucid Keys - Snow on the Trees (Kupla Master).mp3",
    "public/06 Softy x Two Scents - Snowdrops (Kupla Master).mp3",
    "public/07 eleven x Fugee - December To Remember (Kupla Master).mp3",
    "public/08 Tibeauthetraveler x maeLstro x Lucie Cravero - Gentle Snowflakes (Kupla Master).mp3",
    "public/09 Thaehan - Letter To Santa (Kupla Master).mp3",
    "public/10 Lucid Keys - Mistletoe Wonder (Kupla Master).mp3",
    "public/11 No Spirit - Wishlist (Kupla Master).mp3",
    "public/12 HoKø - Red Hat (Kupla Master).mp3",
    "public/13 Lawrence Walther x vhskid. - Gingerbread Dreams (Kupla Master).mp3",
    "public/14 Jam_addict x Monocloud - Christmas Lullaby (Kupla Master).mp3",
    "public/16 Flâneur x Marsquake x Dani Catalá - Warmth Of The Heart (Kupla Master).mp3",
    "public/17 Odd Panda x Marsquake x No Spirit - Contemplative Times (Kupla Master).mp3",
    "public/18 Nothingtosay x Klemsis - December Wishes (Kupla Master).mp3",
    "public/19 Flâneur x Marsquake x Dani Catalá - Firewood And Hot Chocolate (Kupla Master).mp3",
    "public/20 Lucid Keys - Holiday Cheer (Kupla Master).mp3",
    "public/21 HoKø x Lucie Cravero - Santa_s Shop (Kupla Master).mp3",
    "public/22 Strong.AL_ x Simber x Lock - Warmth Of Christmas Haven (Kupla Master).mp3",
    "public/23 Softy x So.Lo - Snowy Hills (Kupla Master).mp3",
    "public/24 Kainbeats - Am Kaminknistern (Kupla Master).mp3",
    "public/25 Nothingtosay x Klemsis - Snowy Tree (Kupla Master).mp3",
    "public/26 Softy x Jazzyhan - Winter Time, Now (Kupla Master).mp3",
    "public/27 comodo - Mistletoe (Kupla Master).mp3",
    "public/28 Quist x Lofty - Seeing You In Every Snowflake (Kupla Master).mp3",
  ];

  // Array of custom track titles corresponding to each track in the playlist
  let trackTitles = [
    "No Spirit - That Time Of The Year",
    "Dimension 32 x Quantum Break - Something_s Magical",
    "xander. X Lucid Keys - Snowballs",
    "Thaehan - Waiting By The Fireplace",
    "xander. X Lucid Keys - Snow on the Trees",
    "Softy x Two Scents - Snowdrops",
    "eleven x Fugee - December To Remember",
    "Tibeauthetraveler x maeLstro x Lucie Cravero - Gentle Snowflakes",
    "Thaehan - Letter To Santa",
    "Lucid Keys - Mistletoe Wonder",
    "No Spirit - Wishlist",
    "HoKø - Red Hat",
    "Lawrence Walther x vhskid. - Gingerbread Dreams",
    "Jam_addict x Monocloud - Christmas Lullaby",
    "Flâneur x Marsquake x Dani Catalá - Warmth Of The Heart",
    "Odd Panda x Marsquake x No Spirit - Contemplative Times",
    "Nothingtosay x Klemsis - December Wishes",
    "Flâneur x Marsquake x Dani Catalá - Firewood And Hot Chocolate",
    "Lucid Keys - Holiday Cheer",
    "HoKø x Lucie Cravero - Santa_s Shop",
    "Strong.AL_ x Simber x Lock - Warmth Of Christmas Haven",
    "Softy x So.Lo - Snowy Hills",
    "Kainbeats - Am Kaminknistern",
    "Nothingtosay x Klemsis - Snowy Tree",
    "Softy x Jazzyhan - Winter Time, Now",
    "comodo - Mistletoe",
    "Quist x Lofty - Seeing You In Every Snowflake",
    // Add more custom titles here
  ];

  function toggleLoop() {
    isLooping = !isLooping;
    updateLoopButton();
  }

  function updateLoopButton() {
    if (isLooping) {
      loopBtn.classList.add("looping");
    } else {
      loopBtn.classList.remove("looping");
    }
  }

  function handleLooping() {
    if (isLooping && lofiAudio.currentTime >= lofiAudio.duration - 0.5) {
      playSong(currentSongIndex);
    }
  }

  loopBtn.addEventListener("click", toggleLoop);

  // Add this line to the event listener for timeupdate
  lofiAudio.addEventListener("timeupdate", function () {
    // Your existing code...
    handleLooping();
  });

  function playSong(songIndex) {
    lofiAudio.src = playlist[songIndex];
    lofiAudio.play();
    isPlaying = true;
    updatePlayPauseButton();
    updateTrackTitle(songIndex);
  }

  function updateTrackTitle(songIndex) {
    const currentTrackTitle = trackTitles[songIndex];
    trackTitleDisplay.textContent = currentTrackTitle;
  }

  document.addEventListener("keydown", function (event) {
    // Define key codes for the shortcuts
    const SPACEBAR_KEY = 32;
    const LEFT_ARROW_KEY = 37;
    const RIGHT_ARROW_KEY = 39;

    // Handle keyboard shortcuts
    switch (event.keyCode) {
      case SPACEBAR_KEY:
        togglePlayPause();
        break;
      case LEFT_ARROW_KEY:
        playPrevSong();
        break;
      case RIGHT_ARROW_KEY:
        playNextSong();
        break;
      // Add more cases for other shortcuts if needed
    }
  });

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

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function updateTrackDurationDisplay() {
    currentTimeDisplay.textContent = formatTime(lofiAudio.currentTime);
    totalDurationDisplay.textContent = formatTime(lofiAudio.duration);
  }

  lofiAudio.addEventListener("loadedmetadata", updateTrackDurationDisplay);
  lofiAudio.addEventListener("timeupdate", function () {
    updateTrackDurationDisplay();
    updateProgressBar();
  });

  function rewindSong() {
    lofiAudio.currentTime -= 10; // Rewind 10 seconds
  }

  playSong(currentSongIndex);

  playPauseBtn.addEventListener("click", togglePlayPause);
  nextBtn.addEventListener("click", playNextSong);
  prevBtn.addEventListener("click", playPrevSong);
  rewindBtn.addEventListener("click", rewindSong);

  volumeSlider.addEventListener("input", function () {
    lofiAudio.volume = volumeSlider.value;
  });

  progressBar.addEventListener("click", function (e) {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    const seekTime = percentage * lofiAudio.duration;
    lofiAudio.currentTime = seekTime;
    updateProgressBar();
  });

  let isDragging = false;
  progressBar.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateProgress(e);
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      updateProgress(e);
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  function updateProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(1, Math.max(0, offsetX / width));
    const seekTime = percentage * lofiAudio.duration;
    lofiAudio.currentTime = seekTime;
    updateProgressBar();
  }

  function updateProgressBar() {
    const progress = (lofiAudio.currentTime / lofiAudio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }

  lofiAudio.addEventListener("ended", function () {
    playNextSong();
  });
});
