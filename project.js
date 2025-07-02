function toggleMenu() {
    var menu = document.getElementById('menu');
    if(menu.style.display === 'block'){
        menu.style.display = 'none';
    }else{
        menu.style.display = 'block';
    }
}

let buttons = document.querySelectorAll(".modebtn");
let body = document.querySelector("body");

function clearThemes() {
  body.classList.remove("dark", "default","light", "bluish", "neon");
}
document.body.classList.add(localStorage.getItem('theme'));
function refreshTabs() {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => {
    content.style.display = "none"; // temporarily hide
    void content.offsetWidth; // force reflow
    content.style.display = "";
  });
}
buttons.forEach(button => {
  button.addEventListener("click", () => {
    clearThemes();
    let mode = button.getAttribute("data-mode");
    body.classList.add(mode);
    localStorage.setItem('theme', mode );
    console.log("Theme changed to:", mode); // Debug check
  });
});
const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Add active class to the clicked tab and its content
      tab.classList.add("active");
      document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
    });
  });
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const nextBtn = document.querySelectorAll("#playPause-1")[1];
const prevBtn = document.querySelectorAll("#playPause-1")[0];
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const titleDisplay = document.getElementById("songTitle");
const artistDisplay = document.getElementById("artistName");
const songElements = document.querySelectorAll(".song");
const imgIcon = document.getElementById("songIcon");

let currentIndex = 0;
let songs = [];

songElements.forEach((el, index) => {
  songs.push({
    src: el.dataset.src,
    title: el.dataset.title,
    artist: el.dataset.artist
  });

  el.addEventListener("click", () => {
    currentIndex = index;
    loadSong(currentIndex);
  });
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleDisplay.textContent = song.title;
  artistDisplay.textContent = song.artist;
  
  const imageName = song.src.replace("music/","photos/").replace(".mp3", ".jpg");
  songIcon.src = imageName;
  audio.play();
  playPauseBtn.textContent = "⏸";
}

playPauseBtn.addEventListener("click", () => {
  if (!audio.src) {
    loadSong(currentIndex);
  } else if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    current.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
});
