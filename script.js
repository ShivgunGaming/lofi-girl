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
  const band1Slider = document.getElementById("band1");
  const band2Slider = document.getElementById("band2");

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

  let audioContext;

  function initializeAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(lofiAudio);
    const equalizer = audioContext.createBiquadFilter();
    equalizer.type = "peaking";
    equalizer.frequency.value = 1000;
    equalizer.gain.value = 0;
    equalizer.Q.value = 1;

    source.connect(equalizer);
    equalizer.connect(audioContext.destination);

    function adjustEqualizer(bandIndex, gainValue) {
      const minGain = -40;
      const maxGain = 40;
      const frequencyRange = [30, 18000];
      const frequency = Math.pow(2, bandIndex) * frequencyRange[0];
      gainValue = Math.max(minGain, Math.min(maxGain, gainValue));
      equalizer.gain.setValueAtTime(gainValue, audioContext.currentTime);
      console.log(`Adjusted gain for band ${bandIndex}: ${gainValue} dB`);
    }

    band1Slider.addEventListener("input", function () {
      adjustEqualizer(0, parseFloat(this.value));
    });

    band2Slider.addEventListener("input", function () {
      adjustEqualizer(1, parseFloat(this.value));
    });

    // Add event listeners and other functionality here...
  }

  playPauseBtn.addEventListener("click", function () {
    if (!audioContext) {
      initializeAudioContext();
    }
    console.log("Play/Pause button clicked");
    togglePlayPause();
  });

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

  lofiAudio.addEventListener("timeupdate", function () {
    handleLooping();
  });

  function playSong(songIndex) {
    lofiAudio.src = playlist[songIndex];
    lofiAudio.play()
      .then(() => {
        // Audio playback started successfully
        isPlaying = true;
        updatePlayPauseButton();
        updateTrackTitle(songIndex);
      })
      .catch(error => {
        // Error occurred while loading or playing the audio
        console.error('Error playing audio:', error);
      });
  }

  function updateTrackTitle(songIndex) {
    const currentTrackTitle = trackTitles[songIndex];
    trackTitleDisplay.textContent = currentTrackTitle;
  }

  document.addEventListener("keydown", function (event) {
    const SPACEBAR_KEY = 32;
    const LEFT_ARROW_KEY = 37;
    const RIGHT_ARROW_KEY = 39;
    const UP_ARROW_KEY = 38;
    const DOWN_ARROW_KEY = 40;
    const L_KEY = 76;

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
      case UP_ARROW_KEY:
        increaseVolume();
        break;
      case DOWN_ARROW_KEY:
        decreaseVolume();
        break;
      case L_KEY:
        toggleLoop();
        break;
      default:
        break;
    }
  });

  function togglePlayPause() {
    console.log("Toggling play/pause");
    if (isPlaying) {
      console.log("Pausing audio");
      lofiAudio.pause();
    } else {
      console.log("Playing audio");
      lofiAudio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
  }

  function updatePlayPauseButton() {
    if (isPlaying) {
      playPauseBtn.innerHTML =
        "<img width='80' height='80' src='https://img.icons8.com/sf-black-filled/100/FA5252/pause.png' alt='pause' />";
    } else {
      playPauseBtn.innerHTML =
        "<img width='80' height='80' src='https://img.icons8.com/sf-black-filled/100/FA5252/play.png' alt='play' />";
    }
  }

  lofiAudio.addEventListener("timeupdate", function () {
    const currentTime = lofiAudio.currentTime;
    const duration = lofiAudio.duration;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalDurationDisplay.textContent = formatTime(duration);
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  function playPrevSong() {
    currentSongIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
  }

  prevBtn.addEventListener("click", playPrevSong);
  nextBtn.addEventListener("click", playNextSong);

  function increaseVolume() {
    if (lofiAudio.volume < 1) {
      lofiAudio.volume += 0.1;
    }
    volumeSlider.value = lofiAudio.volume;
  }

  function decreaseVolume() {
    if (lofiAudio.volume > 0) {
      lofiAudio.volume -= 0.1;
    }
    volumeSlider.value = lofiAudio.volume;
  }

  volumeSlider.addEventListener("input", function () {
    lofiAudio.volume = parseFloat(this.value);
  });

  rewindBtn.addEventListener("click", function () {
    lofiAudio.currentTime = 0;
  });

  lofiAudio.addEventListener("ended", function () {
    if (!isLooping) {
      playNextSong();
    }
  });

  playSong(currentSongIndex);
});
