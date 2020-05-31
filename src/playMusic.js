const playBtn = document.querySelector('.play-btn');
const audio = new Audio('/img/audio.mp3');
let isPlaying = false;

export default function playMusic() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
  }
  playBtn.classList.toggle('pause-btn');

  audio.addEventListener('ended', () => {
    playBtn.classList.toggle('pause-btn');
  }, false);
}
