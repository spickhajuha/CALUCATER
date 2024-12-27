// Get DOM elements
const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const speedControl = document.getElementById('speedControl');
const timeSlider = document.getElementById('timeSlider');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');
const videoControls = document.getElementById('videoControls');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Initialize video state
video.pause();

// Play/Pause Button
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.src = 'pause.png'; // Change to pause when playing
  } else {
    video.pause();
    playPauseBtn.src = 'play.png'; // Change to play when paused
  }
});

// Mute/Unmute Button
muteUnmuteBtn.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    muteUnmuteBtn.src = 'unmute.png'; // Change to unmute when muted
  } else {
    video.muted = true;
    muteUnmuteBtn.src = 'mute.png'; // Change to mute when unmuted
  }
});

// Volume Slider
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

// Speed Control
speedControl.addEventListener('change', () => {
  video.playbackRate = parseFloat(speedControl.value);
});

// Time Slider (Progress Bar)
video.addEventListener('loadedmetadata', () => {
  timeSlider.max = video.duration;
  let minutes = Math.floor(video.duration / 60);
  let seconds = Math.floor(video.duration % 60);
  durationDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

video.addEventListener('timeupdate', () => {
  timeSlider.value = video.currentTime;
  let currentTime = video.currentTime;
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  currentTimeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

timeSlider.addEventListener('input', () => {
  video.currentTime = timeSlider.value;
});

// Full-Screen Button
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Show Controls on Hover
document.querySelector('.video-container').addEventListener('mouseover', () => {
  videoControls.style.display = 'flex';
});

document.querySelector('.video-container').addEventListener('mouseout', () => {
  videoControls.style.display = 'none';
});

// Automatically hide controls after a few seconds of inactivity
let timeout;
document.querySelector('.video-container').addEventListener('mousemove', () => {
  clearTimeout(timeout);
  videoControls.style.display = 'flex'; // Show controls when mouse moves
  timeout = setTimeout(() => {
    videoControls.style.display = 'none'; // Hide after 3 seconds
  }, 3000);
});