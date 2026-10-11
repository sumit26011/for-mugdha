// Compliments list for Mugdha's Happiness Jar
const compliments = [
  "Your smile can literally fix anyone's terrible day — including mine! ✨",
  "You give the absolute best advice, even when I'm being stubborn. 🧠",
  "Nobody matches my wavelength of weirdness and humor quite like you do! 👯‍♀️",
  "You are fiercely loyal and the most supportive friend anyone could ever ask for. 💖",
  "Even when you're angry, you're still 1000% iconic. 👑",
  "The world is just so much brighter, louder, and happier with you around. 🌸",
  "You have an unmatched taste in music, food, and being an awesome human! 🍕",
  "Life without your daily updates and gossip would be utterly boring. ☕"
];

// Audio & Player Controls
const bgAudio = document.getElementById('bg-audio');
const musicDisc = document.getElementById('music-disc');
const toggleMusicBtn = document.getElementById('toggle-music-btn');
const mainPlayBtn = document.getElementById('main-play-btn');
const soundWave = document.getElementById('sound-wave');
const volumeSlider = document.getElementById('volume-slider');
const restart23Btn = document.getElementById('restart-23-btn');
const toggleYtVideoBtn = document.getElementById('toggle-yt-video-btn');
const ytEmbedBox = document.getElementById('yt-embed-box');
const ytIframe = document.getElementById('yt-iframe');

let hasInitialSeekDone = false;

function updatePlaybackUI(isPlaying) {
  if (isPlaying) {
    musicDisc.classList.add('spinning');
    toggleMusicBtn.textContent = '⏸️';
    if (mainPlayBtn) mainPlayBtn.textContent = '⏸️ Pause';
    if (soundWave) soundWave.classList.add('active');
  } else {
    musicDisc.classList.remove('spinning');
    toggleMusicBtn.textContent = '▶️';
    if (mainPlayBtn) mainPlayBtn.textContent = '▶️ Play Song';
    if (soundWave) soundWave.classList.remove('active');
  }
}

function playAudio() {
  if (!bgAudio) return;

  // Jump to 23s if first time playing
  if (!hasInitialSeekDone) {
    try {
      bgAudio.currentTime = 23;
    } catch (e) {
      console.warn("Could not seek yet:", e);
    }
    hasInitialSeekDone = true;
  }

  bgAudio.play().then(() => {
    updatePlaybackUI(true);
  }).catch(err => {
    console.warn("Autoplay blocked or waiting for user interaction:", err);
    updatePlaybackUI(false);
  });
}

function pauseAudio() {
  if (!bgAudio) return;
  bgAudio.pause();
  updatePlaybackUI(false);
}

function toggleAudio() {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

// Replay explicitly from 23 seconds
if (restart23Btn) {
  restart23Btn.addEventListener('click', () => {
    if (!bgAudio) return;
    bgAudio.currentTime = 23;
    playAudio();
  });
}

// Volume control
if (volumeSlider) {
  volumeSlider.addEventListener('input', (e) => {
    if (bgAudio) {
      bgAudio.volume = parseFloat(e.target.value);
    }
  });
}

// Watch Video toggle (also starts at 23s)
let isVideoOpen = false;
if (toggleYtVideoBtn) {
  toggleYtVideoBtn.addEventListener('click', () => {
    isVideoOpen = !isVideoOpen;
    if (isVideoOpen) {
      ytEmbedBox.classList.remove('hidden');
      ytIframe.src = "https://www.youtube.com/embed/uErMts4r-Gc?start=23&autoplay=1";
      toggleYtVideoBtn.textContent = "✖️ Hide Video";
      pauseAudio(); // Pause audio when video is playing to avoid double sound
    } else {
      ytEmbedBox.classList.add('hidden');
      ytIframe.src = "";
      toggleYtVideoBtn.textContent = "🎬 Watch Video";
    }
  });
}

// Top floating pill button
toggleMusicBtn.addEventListener('click', toggleAudio);

// In-card main play button
if (mainPlayBtn) {
  mainPlayBtn.addEventListener('click', toggleAudio);
}

// 2. Open Letter & Trigger Music
function openEnvelope() {
  const overlay = document.getElementById('envelope-overlay');
  const mainContent = document.getElementById('main-content');
  if (!overlay || overlay.style.display === 'none') return;

  // Set starting timestamp to exactly 23 seconds
  if (bgAudio) {
    try {
      bgAudio.currentTime = 23;
    } catch (e) {
      console.warn("Seek error:", e);
    }
    hasInitialSeekDone = true;
    playAudio();
  }

  overlay.classList.add('fade-out');
  setTimeout(() => {
    overlay.style.display = 'none';
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.style.opacity = '1';
    }
    // Launch welcome confetti
    launchConfetti();
  }, 500);
}

const openBtn = document.getElementById('open-letter-btn');
if (openBtn) {
  openBtn.addEventListener('click', openEnvelope);
}
const envelopeCard = document.querySelector('.envelope-card');
if (envelopeCard) {
  envelopeCard.addEventListener('click', (e) => {
    if (e.target.id !== 'open-letter-btn') {
      openEnvelope();
    }
  });
}

// 3. Anger Meter Logic
const angerSlider = document.getElementById('anger-slider');
const meterEmoji = document.getElementById('meter-emoji');
const meterFeedback = document.getElementById('meter-feedback');

angerSlider.addEventListener('input', (e) => {
  const val = parseInt(e.target.value);
  if (val <= 15) {
    meterEmoji.textContent = '🥰';
    meterFeedback.textContent = "YAYYY! Normal best friend mode restored! You are the absolute sweetest! ❤️";
    meterFeedback.style.color = "#2d6a4f";
  } else if (val <= 40) {
    meterEmoji.textContent = '🥺';
    meterFeedback.textContent = "Almost forgiven! Just one cup of iced coffee and a warm hug away!";
    meterFeedback.style.color = "#d97706";
  } else if (val <= 65) {
    meterEmoji.textContent = '😒';
    meterFeedback.textContent = "Mild annoyance detected. Deploying extra apologies and good vibes!";
    meterFeedback.style.color = "#ea580c";
  } else if (val <= 85) {
    meterEmoji.textContent = '😡';
    meterFeedback.textContent = "High danger zone! Sumit needs to apologize 1000 times & bring favorite food!";
    meterFeedback.style.color = "#dc2626";
  } else {
    meterEmoji.textContent = '🔥';
    meterFeedback.textContent = "DEFCON 1! Extreme emergency! Sumit is on full alert with peace treaties! 🚨";
    meterFeedback.style.color = "#991b1b";
  }
});

// 4. Runaway "No" Button
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const dodgeMessage = document.getElementById('dodging-message');
let dodgeCount = 0;
let yesScale = 1;

const dodgeQuotes = [
  "Nope! That button is currently out of order! 😜",
  "Error 404: 'No' option not found for Mugdha! 😉",
  "Nice try! The only valid option is YES! 💕",
  "You're way too sweet to stay mad forever! 🥹",
  "Look at that smile in the photo above! Forgive me already! 🌸",
  "Come on, Mugdha! Look how big the YES button is getting! 🥺"
];

function dodgeButton(e) {
  dodgeCount++;
  
  // Make the Yes button grow progressively bigger
  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Calculate random translation offset
  const maxX = 130;
  const maxY = 60;
  const randomX = (Math.random() - 0.5) * 2 * maxX;
  const randomY = (Math.random() - 0.5) * 2 * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Change message
  const quote = dodgeQuotes[dodgeCount % dodgeQuotes.length];
  dodgeMessage.textContent = quote;
}

noBtn.addEventListener('mouseenter', dodgeButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodgeButton(e);
});
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dodgeButton(e);
});

// 5. "Yes, I Forgive You!" Acceptance
function acceptApology() {
  const modal = document.getElementById('celebration-modal');
  modal.classList.remove('hidden');

  // Trigger grand confetti show
  grandCelebrationConfetti();

  // Reset Anger meter to 0
  angerSlider.value = 0;
  meterEmoji.textContent = '🥰';
  meterFeedback.textContent = "OFFICIALLY FORGIVEN! Best Friends for life! ❤️";
  meterFeedback.style.color = "#2d6a4f";
}

function closeCelebration() {
  document.getElementById('celebration-modal').classList.add('hidden');
}

// 6. Treat Coupons Claim
function claimCoupon(cardElement, couponName) {
  if (cardElement.classList.contains('claimed')) return;

  cardElement.classList.add('claimed');
  const btn = cardElement.querySelector('.coupon-btn');
  btn.textContent = 'Claimed! Valid Forever 🎟️';

  // Small confetti burst
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  }
}

// 7. Mugdha Compliments Jar
let lastIndex = -1;
function drawCompliment() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * compliments.length);
  } while (nextIndex === lastIndex && compliments.length > 1);
  
  lastIndex = nextIndex;
  const jarText = document.getElementById('jar-text');
  
  jarText.style.opacity = '0';
  setTimeout(() => {
    jarText.textContent = `"${compliments[nextIndex]}"`;
    jarText.style.opacity = '1';
  }, 200);

  // Micro sparkles
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.6 }
    });
  }
}

// 8. Floating Background Particles
const particleEmojis = ['🌸', '✨', '💖', '🌼', '🌷', '💫', '🦋'];
const container = document.getElementById('particles-container');

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
  
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.fontSize = (Math.random() * 18 + 14) + 'px';
  particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
  
  container.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

// Generate continuous gentle floaters
setInterval(createParticle, 600);
for (let i = 0; i < 15; i++) {
  createParticle();
}

// Confetti Helpers
function launchConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function grandCelebrationConfetti() {
  if (typeof confetti !== 'function') return;
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
