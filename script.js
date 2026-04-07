const music = document.getElementById('bgMusic');
const musicStatus = document.getElementById('musicStatus');
const playToggle = document.getElementById('playToggle');
const songName = 'Forever Together';
let fadeInterval;

music.muted = true;

function unmuteOnInteraction() {
  if (!music.muted) return;
  music.muted = false;
  musicStatus.textContent = `Playing: ${songName}`;
  document.removeEventListener('click', unmuteOnInteraction);
}
document.addEventListener('click', unmuteOnInteraction, { once: true });

function openInGoogleMaps() {
  window.open('https://www.google.com/maps/search/?api=1&query=AG+Mahal+Nehru+Colony+Sivakasi', '_blank');
}

function tryAutoplay() {
  music.muted = true;
  music.volume = 0;
  music.play().then(() => {
    setPlayingState();
    setTimeout(() => {
      music.muted = false;
      music.volume = 0.85;
    }, 100);
  }).catch(() => {
    setPausedState();
    musicStatus.textContent = 'Autoplay blocked. Click the button';
  });
}

function toggleMusic() {
  if (music.paused) {
    music.muted = false;
    music.volume = 0.85;
    music.play().then(() => {
      localStorage.setItem('musicAllowed', 'true');
      playToggle.textContent = '⏸ Pause';
      musicStatus.textContent = 'Music playing';
      fadeInMusic();
    }).catch(() => {
      musicStatus.textContent = 'Tap again to allow audio';
    });
  } else {
    music.pause();
    playToggle.textContent = '▶ Play';
    musicStatus.textContent = 'Music paused';
    clearInterval(fadeInterval);
  }
}

function fadeInMusic() {
  let vol = 0;
  fadeInterval = setInterval(() => {
    vol += 0.05;
    music.volume = Math.min(vol, 1);
    if (vol >= 1) clearInterval(fadeInterval);
  }, 150);
}

musicStatus.textContent = `Song: ${songName}`;
function setPlayingState() {
  playToggle.textContent = '⏸ Pause';
  musicStatus.textContent = `Playing: ${songName}`;
}
function setPausedState() {
  playToggle.textContent = '▶ Play';
  musicStatus.textContent = `Paused: ${songName}`;
}
music.addEventListener('play', setPlayingState);
music.addEventListener('pause', setPausedState);

// Name Animation Sequence
function startNameAnimation() {
  const butterflies = document.querySelectorAll('.butterfly');
  const animatedName = document.querySelector('.animated-name');

  // Start butterfly animation
  butterflies.forEach(butterfly => {
    butterfly.style.animationPlayState = 'running';
  });

  // Show name after butterflies arrive
  setTimeout(() => {
    animatedName.style.opacity = '1';
    animatedName.style.animationPlayState = 'running';
  }, 2000);
}

// Initialize animation on page load
window.addEventListener('load', () => {
  revealSections();
  tryAutoplay();
  startNameAnimation();
});


const text = `~/engagement$ Post Call response- invite.json

{
    "status": "200 OK",
    "message":"Successfully Engaged!💍",
    "data": {
        "groom": "Manikandan",
        "bride": "Manicka Vasuki",
        "event": "Engagement 💍"
    }
}

~/welcome  to our engagement ceremony$ `;
let i = 0;
function type() {
  const container = document.getElementById('text');
  if (i < text.length) {
    container.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 20);
  } else {
    container.innerHTML += '<span class="cursor"></span>';
  }
}
type();

const sections = document.querySelectorAll('.section-box');
function revealSections() {
  sections.forEach((sec, index) => {
    const delay = index * 120;
    setTimeout(() => sec.classList.add('show'), delay);
  });
}
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });
});

const engagementDate = new Date('May 18, 2026 10:00:00').getTime();
const marriageDate = new Date('September 13, 2026 10:00:00').getTime();
function setCountdownValue(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = value.toString().padStart(2, '0');
  element.parentElement.classList.add('pulse');
  setTimeout(() => element.parentElement.classList.remove('pulse'), 500);
}
function updateCountdownFor(targetId, targetDate) {
  const now = Date.now();
  const diff = targetDate - now;
  const dayId = `${targetId}Days`;
  const hourId = `${targetId}Hours`;
  const minuteId = `${targetId}Minutes`;
  const secondId = `${targetId}Seconds`;
  if (diff <= 0) {
    setCountdownValue(dayId, 0);
    setCountdownValue(hourId, 0);
    setCountdownValue(minuteId, 0);
    setCountdownValue(secondId, 0);
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  setCountdownValue(dayId, d);
  setCountdownValue(hourId, h);
  setCountdownValue(minuteId, m);
  setCountdownValue(secondId, s);
}
function updateAllCountdowns() {
  updateCountdownFor('eng', engagementDate);
  updateCountdownFor('count', marriageDate);
}
updateAllCountdowns();
setInterval(updateAllCountdowns, 1000);

const galleryImages = [
  'couple.jpg',
  ...Array.from({ length: 49 }, (_, index) => `image1 (${index + 1}).jpeg`)
];
let currentGalleryIndex = 0;
const galleryImageEl = document.getElementById('galleryImage');
const galleryCounterEl = document.getElementById('galleryCounter');

function updateGallery() {
  const fileName = galleryImages[currentGalleryIndex];
  galleryImageEl.src = `assets/images/${fileName}`;
  galleryImageEl.alt = `Gallery photo ${currentGalleryIndex + 1}`;
  galleryCounterEl.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
  galleryImageEl.classList.remove('fade');
  void galleryImageEl.offsetWidth;
  galleryImageEl.classList.add('fade');
}

function showNextGalleryImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  updateGallery();
}

galleryImageEl.addEventListener('dragstart', event => event.preventDefault());
updateGallery();
setInterval(showNextGalleryImage, 1500);