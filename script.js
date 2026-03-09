const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.querySelectorAll("#playlist li");
const title = document.getElementById("songTitle");

let currentSong = 0;

// Load Song
function loadSong(index) {
  audio.src = playlist[index].getAttribute("data-src");
  title.textContent = playlist[index].textContent;
}

// Play / Pause
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

// Next
nextBtn.onclick = () => {
  currentSong++;
  if (currentSong >= playlist.length) {
    currentSong = 0;
  }
  loadSong(currentSong);
  audio.play();
};

// Previous
prevBtn.onclick = () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }
  loadSong(currentSong);
  audio.play();
};

// Playlist click
playlist.forEach((song, index) => {
  song.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
  });
});

// Progress update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Initial load
loadSong(currentSong);
